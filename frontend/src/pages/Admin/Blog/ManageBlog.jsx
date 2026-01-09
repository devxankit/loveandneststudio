import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2, Calendar, Eye, Search, Filter, Plus, X, Upload, Loader } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { getPosts, deletePost, createPost, updatePost, uploadImage } from '../../../services/api';
import LazyImage from '../../../components/common/LazyImage'; // Imported optimized image component

const BlogPostModal = ({ isOpen, onClose, post, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        tags: '',
        coverImage: null,
        isPublished: true
    });
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || '',
                excerpt: post.excerpt || '',
                content: post.content || '',
                tags: post.tags ? post.tags.join(', ') : '',
                coverImage: post.coverImage,
                isPublished: post.isPublished ?? true
            });
            setPreview(post.coverImage);
        } else {
            setFormData({ title: '', excerpt: '', content: '', tags: '', coverImage: null, isPublished: true });
            setPreview(null);
        }
    }, [post, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleContentChange = (content) => {
        setFormData(prev => ({ ...prev, content }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFormData(prev => ({ ...prev, coverImage: e.target.files[0] }));
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    // Custom Image Handler for Quill
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const data = new FormData();
                data.append('image', file);

                try {
                    const res = await uploadImage(data);
                    const url = res.data.url;
                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', url);
                } catch (err) {
                    console.error('Image upload failed', err);
                    alert("Failed to upload image.");
                }
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', 'video'],
                ['clean']
            ],
            handlers: { image: imageHandler }
        }
    }), []);

    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image', 'video'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('excerpt', formData.excerpt);
        data.append('content', formData.content);
        data.append('tags', formData.tags);
        data.append('isPublished', formData.isPublished);

        if (formData.coverImage instanceof File) {
            data.append('coverImage', formData.coverImage);
        }

        try {
            await onSave(data, post?._id);
            onClose();
        } catch (error) {
            console.error("Save failed", error);
            alert(error.response?.data?.message || "Failed to save post. Please check all fields.");
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    // Helper for preview thumb
    const getPreviewUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('blob:')) return url; // Local blob
        if (url.includes('cloudinary.com') && !url.includes('w_')) {
            return url.replace('/upload/', '/upload/w_200,f_auto,q_auto/');
        }
        return url;
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-[#5A2A45]/40 backdrop-blur-sm" onClick={onClose} />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-[#FAF9F6] w-full max-w-7xl h-[90vh] rounded-[3rem] shadow-2xl relative flex flex-col overflow-hidden">

                {/* Header */}
                <div className="px-8 py-6 border-b border-[#5A2A45]/5 flex justify-between items-center bg-white/50 backdrop-blur-md">
                    <h2 className="font-display text-2xl text-[#5A2A45]">{post ? 'Edit Narrative' : 'New Story'}</h2>
                    <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#5A2A45]/5 transition-colors text-[#5A2A45]"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Meta Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F8A86]">Cover Narrative</label>
                                <div className="aspect-[4/5] bg-[#F9F7F2] rounded-3xl relative group overflow-hidden border-2 border-dashed border-[#5A2A45]/10 hover:border-[#5A2A45]/30 transition-all duration-500 shadow-inner">
                                    {preview ? (
                                        <LazyImage src={getPreviewUrl(preview)} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#5A2A45]/30 p-8 text-center">
                                            <Upload size={40} strokeWidth={1} className="mb-4" />
                                            <span className="text-[10px] uppercase tracking-widest font-bold">Upload Cinematic Cover</span>
                                        </div>
                                    )}
                                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F8A86] mb-3">Story Excerpt</label>
                                    <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="A brief glimpse into this story..." className="w-full p-5 bg-[#FAF9F6] rounded-2xl outline-none min-h-[140px] text-sm text-[#6E5A52] leading-relaxed border border-transparent focus:border-[#B77A8C]/20 transition-all shadow-sm" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F8A86] mb-3">Tags & Curations</label>
                                    <input name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g. Motherhood, Tips, Studio" className="w-full p-5 bg-[#FAF9F6] rounded-2xl outline-none text-sm text-[#6E5A52] border border-transparent focus:border-[#B77A8C]/20 transition-all shadow-sm" />
                                </div>
                            </div>
                        </div>

                        {/* Editor Content */}
                        <div className="lg:col-span-8 flex flex-col">
                            <div className="mb-8">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F8A86] mb-3">Story Title</label>
                                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title of your narrative" className="w-full p-6 bg-[#FAF9F6] rounded-2xl outline-none font-display text-4xl text-[#5A2A45] placeholder-[#5A2A45]/20 border border-transparent focus:border-[#B77A8C]/20 transition-all shadow-sm" required />
                            </div>

                            <div className="flex-1 min-h-[500px] flex flex-col bg-[#FAF9F6] rounded-2xl overflow-hidden border border-[#5A2A45]/5 shadow-sm">
                                <ReactQuill
                                    ref={quillRef}
                                    theme="snow"
                                    value={formData.content}
                                    onChange={handleContentChange}
                                    modules={modules}
                                    formats={formats}
                                    className="h-full flex-1"
                                    placeholder="Begin your narrative..."
                                />
                                <style>{`
                                    .ql-toolbar.ql-snow { border: none !important; background: white; padding: 15px; border-bottom: 1px solid rgba(90,42,69,0.05) !important; }
                                    .ql-container.ql-snow { border: none !important; font-family: 'Outfit', sans-serif; }
                                    
                                    /* Editor Typography Mirroring Frontend */
                                    .ql-editor { 
                                        min-height: 400px; 
                                        padding: 30px; 
                                        font-family: 'Outfit', sans-serif;
                                        font-size: 1.125rem; 
                                        color: #8F8A86; 
                                        line-height: 1.8; 
                                    }
                                    
                                    /* Headings */
                                    .ql-editor h1, .ql-editor h2, .ql-editor h3 {
                                        font-family: 'Playfair Display', serif;
                                        color: #5A2A45;
                                        margin-top: 1.5em;
                                        margin-bottom: 0.5em;
                                    }
                                    .ql-editor h2 { font-size: 2rem; font-style: italic; }
                                    .ql-editor h3 { font-size: 1.5rem; }

                                    /* Blockquotes */
                                    .ql-editor blockquote {
                                        border-left: 4px solid #E8CBB6 !important;
                                        padding-left: 1.5rem;
                                        font-family: 'Playfair Display', serif;
                                        font-style: italic;
                                        color: #5A2A45;
                                        background: rgba(249, 247, 242, 0.5);
                                    }

                                    /* Intro Drop Cap Simulation */
                                    .ql-editor p:first-of-type {
                                        font-size: 1.25rem;
                                        color: rgba(90, 42, 69, 0.85);
                                    }
                                    .ql-editor p:first-of-type::first-letter {
                                        float: left;
                                        font-family: 'Playfair Display', serif;
                                        font-size: 3.5rem;
                                        line-height: 0.8;
                                        color: #B77A8C;
                                        margin-right: 0.5rem;
                                    }

                                    /* Placeholder */
                                    .ql-editor.ql-blank::before { color: rgba(90,42,69,0.2) !important; font-style: normal; }
                                 `}</style>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 bg-[#FAF9F6] border-t border-[#5A2A45]/5 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="px-10 py-4 rounded-full text-[#6E5A52] font-bold text-xs uppercase tracking-widest hover:bg-[#F1EBDD] transition-all">Discard</button>
                    <button onClick={handleSubmit} disabled={saving} className="px-12 py-4 rounded-full bg-[#5A2A45] text-[#F1EBDD] font-bold text-xs uppercase tracking-widest hover:bg-[#4a2238] shadow-xl hover:shadow-2xl transition-all disabled:opacity-50">
                        {saving ? 'Synchronizing...' : (post ? 'Update Journal' : 'Publish Story')}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const BlogPostCard = ({ post, onEdit, onDelete }) => {
    // Generate optimized thumbnail URL for performance
    const thumbUrl = post.coverImage && post.coverImage.includes('cloudinary.com')
        ? post.coverImage.replace('/upload/', '/upload/w_500,q_auto,f_auto/')
        : post.coverImage;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[2rem] border border-[#5A2A45]/5 overflow-hidden group hover:shadow-[0_20px_40px_rgba(90,42,69,0.08)] transition-all duration-500"
        >
            <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-[280px] h-[240px] md:h-auto relative overflow-hidden bg-[#F1EBDD]">
                    {thumbUrl ? (
                        <LazyImage src={thumbUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#5A2A45]/10 font-display text-5xl">L&O</div>
                    )}
                    {!post.isPublished && (
                        <div className="absolute top-4 left-4 z-10">
                            <span className="bg-[#B77A8C] text-white text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg">Draft</span>
                        </div>
                    )}
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 text-[10px] text-[#8F8A86] font-bold mb-4 uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#B77A8C]/60" /> {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8CBB6]"></span>
                            <span>{Math.ceil((post.content?.split(' ').length || 0) / 200)} Min Read</span>
                        </div>
                        <h3 className="font-display text-2xl text-[#5A2A45] mb-3 leading-tight group-hover:text-[#B77A8C] transition-colors">{post.title}</h3>
                        <p className="font-outfit text-[#6E5A52]/70 text-sm leading-relaxed line-clamp-2 mb-6">{post.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#f0ebe5] pt-6">
                        <div className="flex flex-wrap gap-2">
                            {post.tags && post.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-[#F9F7F2] rounded-md text-[9px] font-bold uppercase tracking-wider text-[#B77A8C]">{tag}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Use a Link or regular button for view logic */}
                            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#5A2A45]/10 flex items-center justify-center text-[#6E5A52] hover:bg-[#5A2A45] hover:text-white transition-all hover:scale-110">
                                <Eye size={16} />
                            </a>
                            <button onClick={() => onEdit(post)} className="w-10 h-10 rounded-full border border-[#5A2A45]/10 flex items-center justify-center text-[#6E5A52] hover:bg-[#5A2A45] hover:text-white transition-all hover:scale-110">
                                <Edit3 size={16} />
                            </button>
                            <button onClick={() => onDelete(post._id)} className="w-10 h-10 rounded-full border border-[#5A2A45]/10 flex items-center justify-center text-[#6E5A52] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all hover:scale-110">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ManageBlog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all'); // all, published, drafts

    const fetchPosts = async () => {
        try {
            const res = await getPosts({ includeDrafts: 'true' });
            setPosts(res.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Move this narrative to your archives? This action is permanent.")) {
            // Optimistic Update: Immediately remove from UI
            const previousPosts = [...posts];
            setPosts(posts.filter(post => post._id !== id));

            try {
                await deletePost(id);
                // Success: Do nothing, UI is already correct
            } catch (error) {
                console.error("Delete failed", error);
                // Revert UI on failure
                setPosts(previousPosts);
                alert("Failed to delete post.");
            }
        }
    };

    const handleSave = async (formData, id) => {
        if (id) {
            await updatePost(id, formData);
        } else {
            await createPost(formData);
        }
        setIsModalOpen(false);
        setEditingPost(null);
        fetchPosts();
    };

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = activeFilter === 'all' ||
                (activeFilter === 'published' && post.isPublished) ||
                (activeFilter === 'drafts' && !post.isPublished);

            return matchesSearch && matchesStatus;
        });
    }, [posts, searchTerm, activeFilter]);

    if (loading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-[#5A2A45]">
            <Loader className="animate-spin mb-4 text-[#B77A8C]" size={40} />
            <span className="font-outfit uppercase tracking-widest text-sm font-bold opacity-40">Curating Your Stories...</span>
        </div>
    );

    return (
        <div className="space-y-12 max-w-[1300px] mx-auto min-h-screen pb-40">
            {/* Upper Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-10 h-[1px] bg-[#B77A8C]"></span>
                        <span className="font-outfit text-xs font-bold uppercase tracking-[0.3em] text-[#B77A8C]">Love & Nest Editorial</span>
                    </div>
                    <h1 className="font-display text-5xl md:text-6xl text-[#5A2A45] tracking-tight">The Journal</h1>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5A2A45]/30 group-focus-within:text-[#B77A8C] transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Find a story..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-white border border-[#5A2A45]/5 rounded-full text-sm outline-none focus:border-[#B77A8C]/30 shadow-sm transition-all"
                        />
                    </div>
                    <button
                        onClick={() => { setEditingPost(null); setIsModalOpen(true); }}
                        className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#5A2A45] text-[#F1EBDD] px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#4a2238] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    >
                        <Plus size={18} />
                        <span>Craft New Entry</span>
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-8 border-b border-[#5A2A45]/5 pb-4 overflow-x-auto no-scrollbar">
                {[
                    { id: 'all', label: 'Everything' },
                    { id: 'published', label: 'Live' },
                    { id: 'drafts', label: 'Work in Progress' }
                ].map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`font-outfit text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all relative pb-4 ${activeFilter === filter.id ? 'text-[#5A2A45]' : 'text-[#8F8A86] hover:text-[#5A2A45]'}`}
                    >
                        {filter.label}
                        {activeFilter === filter.id && (
                            <motion.div layoutId="blogFilter" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B77A8C]" />
                        )}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.map(post => (
                        <BlogPostCard
                            key={post._id}
                            post={post}
                            onEdit={(p) => { setEditingPost(p); setIsModalOpen(true); }}
                            onDelete={handleDelete}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-40 bg-[#F9F7F2] rounded-[3rem] border border-dashed border-[#5A2A45]/10">
                    <div className="max-w-xs mx-auto opacity-30 flex flex-col items-center">
                        <Search size={48} className="mb-4" strokeWidth={1} />
                        <p className="font-outfit text-xs font-bold uppercase tracking-widest">No matching stories found in this curation.</p>
                    </div>
                </div>
            )}

            <BlogPostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                post={editingPost}
                onSave={handleSave}
            />
        </div>
    );
};

export default ManageBlog;

