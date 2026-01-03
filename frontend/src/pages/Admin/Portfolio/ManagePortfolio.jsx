import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Trash2, Upload, Plus, Edit2, X, Filter, CheckCircle } from 'lucide-react';

// Categories matching the frontend
const categories = ['All', 'Newborn', 'Maternity', 'Baby', 'Family'];

const ManagePortfolio = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    // Mock Data (Simulating backend)
    const [portfolioItems, setPortfolioItems] = useState([
        { id: 1, title: 'Sweet Dreams', category: 'Newborn', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 2, title: 'Tiny Fingers', category: 'Newborn', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 3, title: 'Maternity Glow', category: 'Maternity', image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 4, title: 'Family Love', category: 'Family', image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 5, title: 'Baby Steps', category: 'Baby', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ]);

    const filteredItems = activeCategory === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeCategory);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this image?')) {
            setPortfolioItems(items => items.filter(item => item.id !== id));
        }
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto min-h-screen">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="font-display text-4xl text-[#5A2A45] mb-2">Portfolio Manager</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Curate your visual legacy. Add, edit, or remove work.</p>
                </div>

                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center gap-2 bg-[#5A2A45] text-[#F1EBDD] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
                >
                    <Upload size={16} className="group-hover:animate-bounce" />
                    <span>Upload New Work</span>
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-white/60 backdrop-blur-md rounded-2xl w-fit shadow-sm border border-white/40 sticky top-24 z-10">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden
                            ${activeCategory === cat
                                ? 'text-[#F1EBDD] shadow-md'
                                : 'text-[#6E5A52]/60 hover:text-[#5A2A45] hover:bg-white'
                            }`}
                    >
                        {activeCategory === cat && (
                            <motion.div
                                layoutId="activePill"
                                className="absolute inset-0 bg-[#5A2A45] z-0"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            {cat} {activeCategory === cat && <CheckCircle size={12} />}
                        </span>
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredItems.map(item => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-3 rounded-[1.5rem] shadow-sm border border-[#5A2A45]/5 group relative select-none hover:shadow-xl transition-all duration-500"
                        >
                            <div className="aspect-[4/5] overflow-hidden rounded-[1rem] mb-4 relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Hover Overlay Actions */}
                                <div className="absolute inset-0 bg-[#5A2A45]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
                                    <h3 className="text-white font-display text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                                    <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        <button className="p-3 bg-white text-[#5A2A45] rounded-full hover:scale-110 transition-transform shadow-lg" title="Edit Details">
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                            className="p-3 bg-rose-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                                            title="Delete Image"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Tag */}
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold text-[#5A2A45] opacity-100 group-hover:opacity-0 transition-opacity">
                                    {item.category}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Add New Placeholder Card */}
                <motion.div
                    layout
                    onClick={() => setIsUploadModalOpen(true)}
                    className="aspect-[4/5] rounded-[1.5rem] border-2 border-dashed border-[#5A2A45]/10 flex flex-col items-center justify-center text-[#5A2A45]/40 hover:text-[#5A2A45] hover:border-[#5A2A45]/40 hover:bg-[#5A2A45]/5 transition-all cursor-pointer group bg-[#F9F7F2]"
                >
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#5A2A45]/10">
                        <Plus size={32} className="text-[#B77A8C]" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Add to {activeCategory === 'All' ? 'Library' : activeCategory}</span>
                </motion.div>
            </motion.div>

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsUploadModalOpen(false)}
                            className="absolute inset-0 bg-[#5A2A45]/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="bg-white w-full max-w-2xl rounded-[2.5rem] p-8 md:p-10 relative z-10 shadow-2xl overflow-hidden"
                        >
                            {/* Decorative Blur */}
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#B77A8C]/20 rounded-full blur-[80px] pointer-events-none"></div>

                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="font-display text-3xl md:text-4xl text-[#5A2A45] mb-2">Upload Asset</h2>
                                    <p className="text-[#6E5A52] text-sm">Add a new masterpiece to your collection.</p>
                                </div>
                                <button
                                    onClick={() => setIsUploadModalOpen(false)}
                                    className="p-2 hover:bg-[#5A2A45]/5 rounded-full transition-colors"
                                >
                                    <X size={24} className="text-[#5A2A45]" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left: Dropzone */}
                                <div className="border-2 border-dashed border-[#5A2A45]/20 rounded-[1.5rem] bg-[#F9F7F2] p-6 flex flex-col items-center justify-center text-center hover:border-[#5A2A45]/40 hover:bg-[#5A2A45]/5 transition-all cursor-pointer h-full min-h-[250px] group">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Image size={32} className="text-[#B77A8C]" />
                                    </div>
                                    <p className="text-[#5A2A45] font-bold text-lg mb-1">Drag & Drop Image</p>
                                    <p className="text-xs text-[#6E5A52]/60 mb-4">or click to browse</p>
                                    <div className="text-[10px] uppercase tracking-widest text-[#B77A8C] border border-[#B77A8C]/20 px-3 py-1 rounded-full">
                                        Max 5MB • JPG/PNG
                                    </div>
                                </div>

                                {/* Right: Details Form */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-xs uppercase tracking-widest text-[#5A2A45] font-bold">Asset Title</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white border border-[#E6D1CB] rounded-xl px-4 py-3 text-[#5A2A45] focus:outline-none focus:border-[#B77A8C] focus:shadow-lg transition-all"
                                            placeholder="e.g. Baby in Basket"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs uppercase tracking-widest text-[#5A2A45] font-bold">Category</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {categories.filter(c => c !== 'All').map(cat => (
                                                <button
                                                    key={cat}
                                                    className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border transition-all
                                                        ${activeCategory === cat
                                                            ? 'bg-[#5A2A45] text-white border-[#5A2A45]'
                                                            : 'bg-white text-[#5A2A45]/60 border-[#E6D1CB] hover:border-[#5A2A45]'
                                                        }`}
                                                    onClick={() => setActiveCategory(cat)}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs uppercase tracking-widest text-[#5A2A45] font-bold">Description (Optional)</label>
                                        <textarea
                                            rows="3"
                                            className="w-full bg-white border border-[#E6D1CB] rounded-xl px-4 py-3 text-[#5A2A45] focus:outline-none focus:border-[#B77A8C] focus:shadow-lg transition-all text-sm resize-none"
                                            placeholder="Add a caption..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    onClick={() => setIsUploadModalOpen(false)}
                                    className="px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs text-[#5A2A45] hover:bg-[#5A2A45]/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="bg-[#5A2A45] text-[#F1EBDD] px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                                    <CheckCircle size={16} />
                                    Publish Asset
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManagePortfolio;
