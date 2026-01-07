import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2, Calendar, Eye, Search, Filter, Plus, X, Upload, Loader } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getPosts, deletePost, createPost, updatePost, uploadImage } from '../../../services/api';

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
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] w-full max-w-6xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="p-8 border-b border-[#5A2A45]/5 flex justify-between items-center bg-[#FAF9F6]">
                    <div>
                        <h2 className="font-display text-3xl text-[#5A2A45]">{post ? 'Refine Story' : 'Draft New Story'}</h2>
                        <p className="text-xs text-[#8F8A86] uppercase tracking-widest mt-1">Journal Entry #{post?._id?.slice(-6) || 'New'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#5A2A45]/60 group-hover:text-[#5A2A45]">Published</span>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B77A8C]"></div>
                            </div>
                        </label>
                        <button onClick={onClose} className="p-3 hover:bg-[#F1EBDD] rounded-full text-[#5A2A45] transition-colors"><X size={24} /></button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Meta Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F8A86]">Cover Narrative</label>
                                <div className="aspect-[4/5] bg-[#F9F7F2] rounded-3xl relative group overflow-hidden border-2 border-dashed border-[#5A2A45]/10 hover:border-[#5A2A45]/30 transition-all duration-500 shadow-inner">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
                                    .ql-editor { min-height: 400px; padding: 30px; font-size: 1.1rem; color: #6E5A52; line-height: 1.8; }
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

const BlogPostCard = ({ post, onEdit, onDelete }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[2rem] border border-[#5A2A45]/5 overflow-hidden group hover:shadow-[0_20px_40px_rgba(90,42,69,0.08)] transition-all duration-500"
    >
        <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-[280px] h-[240px] md:h-auto relative overflow-hidden bg-[#F1EBDD]">
                {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#5A2A45]/10 font-display text-5xl">L&O</div>
                )}
                {!post.isPublished && (
                    <div className="absolute top-4 left-4">
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
                    <h3 className="font-display text-3xl text-[#5A2A45] leading-[1.2] mb-4 group-hover:text-[#B77A8C] transition-colors duration-300 line-clamp-2">{post.title}</h3>
                    <p className="text-[#6E5A52] text-sm leading-relaxed line-clamp-2 font-light opacity-80">{post.excerpt}</p>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#F1EBDD]">
                    <div className="flex items-center gap-2">
                        <button onClick={() => onEdit(post)} className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#FAF9F6] text-[#5A2A45] text-[10px] font-bold uppercase tracking-widest hover:bg-[#5A2A45] hover:text-[#F1EBDD] transition-all duration-300">
                            <Edit3 size={14} /> Refine
                        </button>
                        <button onClick={() => onDelete(post._id)} className="p-2.5 rounded-full hover:bg-rose-50 text-rose-300 hover:text-rose-500 transition-colors">
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <button
                        onClick={() => window.open(`${window.location.origin}/blog/${post.slug}`, '_blank')}
                        className="flex items-center gap-2 text-[#B77A8C] text-[10px] font-bold uppercase tracking-[0.2em] hover:text-[#5A2A45] transition-all"
                    >
                        Live Preview <Eye size={16} />
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);

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
            await deletePost(id);
            fetchPosts();
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

