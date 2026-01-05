import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2, Calendar, Eye, Search, Filter, Plus, X, Upload, Loader } from 'lucide-react';
import { getPosts, deletePost, createPost, updatePost } from '../../../services/api';

const BlogPostModal = ({ isOpen, onClose, post, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        tags: '',
        coverImage: null
    });
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                tags: post.tags ? post.tags.join(', ') : '',
                coverImage: post.coverImage // URL
            });
            setPreview(post.coverImage);
        } else {
            setFormData({ title: '', excerpt: '', content: '', tags: '', coverImage: null });
            setPreview(null);
        }
    }, [post, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFormData(prev => ({ ...prev, coverImage: e.target.files[0] }));
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('excerpt', formData.excerpt);
        data.append('content', formData.content);
        data.append('tags', formData.tags);
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display text-3xl text-[#5A2A45]">{post ? 'Edit Story' : 'New Story'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-[#F1EBDD] rounded-full text-[#5A2A45]"><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="relative h-48 bg-[#F9F7F2] rounded-xl flex items-center justify-center border-2 border-dashed border-[#5A2A45]/10 overflow-hidden group hover:border-[#5A2A45]/30 transition-colors">
                        {preview ? (
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center text-[#5A2A45]/40">
                                <Upload className="mx-auto mb-2" />
                                <span className="text-xs uppercase tracking-widest font-bold">Upload Cover</span>
                            </div>
                        )}
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    </div>

                    <div className="grid gap-4">
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="Article Title" className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-display text-xl text-[#5A2A45] placeholder-[#5A2A45]/30" required />
                        <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="Brief Excerpt" className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none min-h-[80px]" required />
                        {/* Simple Textarea for Content - Rich Text Editor would be better but keeping it simple as requested */}
                        <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Full Story Content (HTML allowed)" className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none min-h-[200px] font-mono text-sm" required />
                        <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none text-sm" />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-full text-[#6E5A52] font-bold text-xs uppercase tracking-widest hover:bg-[#F9F7F2]">Cancel</button>
                        <button type="submit" disabled={saving} className="px-8 py-3 rounded-full bg-[#5A2A45] text-[#F1EBDD] font-bold text-xs uppercase tracking-widest hover:bg-[#4a2238] shadow-lg disabled:opacity-50">
                            {saving ? 'Saving...' : (post ? 'Update Story' : 'Publish Story')}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const BlogPostCard = ({ post, onEdit, onDelete }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-[1.5rem] border border-[#5A2A45]/5 overflow-hidden group hover:shadow-[0_15px_30px_rgba(90,42,69,0.06)] transition-all duration-300"
    >
        <div className="flex flex-col md:flex-row h-full">
            {/* Image Side */}
            <div className="md:w-1/3 min-h-[200px] relative overflow-hidden bg-[#F1EBDD]">
                {post.coverImage ? (
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#5A2A45]/20 font-display text-4xl">L&N</div>
                )}
            </div>

            {/* Content Side */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 text-xs text-[#6E5A52]/60 font-medium mb-3 uppercase tracking-wide">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString()}</span>
                        {post.tags && post.tags.length > 0 && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-[#B77A8C]"></span>
                                <span>{post.tags[0]}</span>
                            </>
                        )}
                    </div>
                    <h3 className="font-display text-2xl text-[#5A2A45] leading-tight mb-3 group-hover:text-[#B77A8C] transition-colors">{post.title}</h3>
                    <p className="text-[#6E5A52] text-sm leading-relaxed line-clamp-2 mb-6 font-light">{post.excerpt}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F1EBDD]">
                    <div className="flex items-center gap-2">
                        <button onClick={() => onEdit(post)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F9F7F2] text-[#5A2A45] text-xs font-bold uppercase tracking-wider hover:bg-[#5A2A45] hover:text-white transition-colors">
                            <Edit3 size={14} /> Edit
                        </button>
                        <button className="p-2 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" onClick={() => onDelete(post._id)}>
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <button className="flex items-center gap-1 text-[#B77A8C] text-xs font-bold uppercase tracking-widest hover:text-[#5A2A45] transition-colors">
                        Preview <Eye size={14} />
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

    const fetchPosts = async () => {
        try {
            const res = await getPosts({ includeDrafts: 'true' });
            setPosts(res.data);
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
        if (confirm("Delete this story permanently?")) {
            await deletePost(id);
            setPosts(posts.filter(p => p._id !== id));
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

    const openEdit = (post) => {
        setEditingPost(post);
        setIsModalOpen(true);
    };

    const openNew = () => {
        setEditingPost(null);
        setIsModalOpen(true);
    };

    if (loading) return <div className="h-screen flex items-center justify-center text-[#5A2A45]"><Loader className="animate-spin mr-2" /> Loading Stories...</div>;

    return (
        <div className="space-y-8 max-w-[1200px] mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="font-display text-4xl text-[#5A2A45] mb-2">Journal Manager</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Share stories, tips, and updates with your audience.</p>
                </div>

                <button
                    onClick={openNew}
                    className="flex items-center gap-2 bg-[#5A2A45] text-[#F1EBDD] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                    <Plus size={16} />
                    <span>Write New Article</span>
                </button>
            </div>

            {/* List */}
            <div className="space-y-6">
                <AnimatePresence>
                    {posts.map(post => (
                        <BlogPostCard key={post._id} post={post} onEdit={openEdit} onDelete={handleDelete} />
                    ))}
                </AnimatePresence>
            </div>

            {posts.length === 0 && (
                <div className="text-center py-20 text-[#5A2A45]/40">
                    <p>No stories found. Start writing!</p>
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
