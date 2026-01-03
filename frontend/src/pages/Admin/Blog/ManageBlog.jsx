import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2, Calendar, Eye, Search, Filter, Plus, ChevronRight } from 'lucide-react';

const BlogPostCard = ({ post, onDelete }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-[1.5rem] border border-[#5A2A45]/5 overflow-hidden group hover:shadow-[0_15px_30px_rgba(90,42,69,0.06)] transition-all duration-300"
    >
        <div className="flex flex-col md:flex-row h-full">
            {/* Image Side */}
            <div className="md:w-1/3 min-h-[200px] relative overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-[#5A2A45]">
                    {post.category}
                </div>
            </div>

            {/* Content Side */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 text-xs text-[#6E5A52]/60 font-medium mb-3 uppercase tracking-wide">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-[#B77A8C]"></span>
                        <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-2xl text-[#5A2A45] leading-tight mb-3 group-hover:text-[#B77A8C] transition-colors">{post.title}</h3>
                    <p className="text-[#6E5A52] text-sm leading-relaxed line-clamp-2 mb-6 font-light">{post.excerpt}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F1EBDD]">
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F9F7F2] text-[#5A2A45] text-xs font-bold uppercase tracking-wider hover:bg-[#5A2A45] hover:text-white transition-colors">
                            <Edit3 size={14} /> Edit
                        </button>
                        <button className="p-2 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" onClick={() => onDelete(post.id)}>
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
    // Mock Data
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'When Is the Best Time to Plan Your Maternity Photoshoot?',
            excerpt: 'Discover why 28–32 weeks is the safest and most beautiful time for a relaxed, magazine-style maternity shoot experience. We discuss outfits, locations, and more.',
            date: 'Jan 2, 2026',
            category: 'Maternity Guide',
            readTime: '4 min read',
            image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            title: 'Styling for Your Newborn Session',
            excerpt: 'Neutral tones, soft fabrics, and heirloom props. Learn how to style your baby for timeless photographs that will never go out of style.',
            date: 'Dec 15, 2025',
            category: 'Newborn Tips',
            readTime: '6 min read',
            image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
    ]);

    const handleDelete = (id) => {
        if (confirm("Delete this post?")) setPosts(posts.filter(p => p.id !== id));
    };

    return (
        <div className="space-y-8 max-w-[1200px] mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="font-display text-4xl text-[#5A2A45] mb-2">Journal Manager</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Share stories, tips, and updates with your audience.</p>
                </div>

                <button
                    className="flex items-center gap-2 bg-[#5A2A45] text-[#F1EBDD] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                    <Plus size={16} />
                    <span>Write New Article</span>
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-[#5A2A45]/5">
                <div className="flex-1 min-w-[200px] relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A2A45]/30" size={18} />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="w-full bg-[#F9F7F2] border-none rounded-xl pl-12 pr-4 py-3 text-[#5A2A45] focus:ring-0 placeholder-[#5A2A45]/30"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-3 rounded-xl bg-[#F9F7F2] text-[#5A2A45] font-bold uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-[#E8CBB6]/20 transition-colors">
                        <Filter size={14} /> Filter
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-6">
                <AnimatePresence>
                    {posts.map(post => (
                        <BlogPostCard key={post.id} post={post} onDelete={handleDelete} />
                    ))}
                </AnimatePresence>
            </div>

            {posts.length === 0 && (
                <div className="text-center py-20 text-[#5A2A45]/40">
                    <p>No stories found. Start writing!</p>
                </div>
            )}
        </div>
    );
};

export default ManageBlog;
