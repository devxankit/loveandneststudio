import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Plus, Trash2, Layout, Save, X, ImageIcon, Type, Sparkles } from 'lucide-react';
import { getPage, updatePageSectionJSON, uploadImage, createPage, getNewbornPage, updateNewbornPage } from '../../../services/api';

const ManageCategory = () => {
    const { category } = useParams(); // newborn, maternity, baby, family
    const [loading, setLoading] = useState(true);
    const [pageData, setPageData] = useState(null); // Will hold { hero: {}, welcome: {}, gallery: [] }
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('gallery'); // gallery | hero | welcome

    // Capitalize for display
    const title = category?.charAt(0).toUpperCase() + category?.slice(1);
    const isNewborn = category === 'newborn'; // Special handling for Newborn as per user request

    useEffect(() => {
        fetchData();
    }, [category]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (isNewborn) {
                const { data } = await getNewbornPage();
                // Ensure default structure if empty
                setPageData({
                    hero: data.hero || { title: `Sweet ${title}`, subtitle: 'Helping Your Littles Shine', image: '' },
                    welcome: data.welcome || { title: 'Welcome', text: `Welcome to Love & Nest Studio's ${title} Portfolio.`, image: '' },
                    gallery: data.gallery || []
                });
            } else {
                // Fallback for others using the Generic PageContent system
                const res = await getPage(`portfolio-${category}`);
                const sections = res.data?.sections || [];
                setPageData({
                    hero: sections.find(s => s.id === 'hero')?.content || { title: `Sweet ${title}`, subtitle: 'Helping Your Littles Shine', image: '' },
                    welcome: sections.find(s => s.id === 'welcome')?.content || { title: 'Welcome', text: `Welcome to Love & Nest Studio's ${title} Portfolio.`, image: '' },
                    gallery: sections.find(s => s.id === 'gallery')?.content?.images || []
                });
            }
        } catch (error) {
            console.error("Fetch failed", error);
            // Default empty state
            setPageData({ hero: { title: `Sweet ${title}`, subtitle: 'Helping Your Littles Shine', image: '' }, welcome: { title: 'Welcome', text: `Welcome to Love & Nest Studio's ${title} Portfolio.`, image: '' }, gallery: [] });
        } finally {
            setLoading(false);
        }
    };

    const handleUploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            setSaving(true);
            const res = await uploadImage(formData);
            return res.data.url;
        } catch (error) {
            console.error("Upload failed", error);
            alert("Image upload failed");
            return null;
        } finally {
            setSaving(false);
        }
    };

    // --- SAVE HANDLERS ---

    // 1. GALLERY SUBMIT
    const handleAddGalleryImage = async (file) => {
        if (!file) return;
        const url = await handleUploadImage(file);
        if (url) {
            const updatedGallery = [...pageData.gallery, url];
            await updateAll({ ...pageData, gallery: updatedGallery });
        }
    };

    const handleRemoveGalleryImage = async (index) => {
        if (!confirm("Remove this image?")) return;
        const updatedGallery = pageData.gallery.filter((_, i) => i !== index);
        await updateAll({ ...pageData, gallery: updatedGallery });
    };

    // 2. HERO SUBMIT
    const handleHeroSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let imageUrl = pageData.hero.image;
        const file = formData.get('newImage');
        if (file && file.size > 0) {
            const uploaded = await handleUploadImage(file);
            if (uploaded) imageUrl = uploaded;
        }

        const updatedHero = {
            title: formData.get('title'),
            subtitle: formData.get('subtitle'),
            image: imageUrl
        };
        await updateAll({ ...pageData, hero: updatedHero });
    };

    // 3. WELCOME SUBMIT
    const handleWelcomeSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let imageUrl = pageData.welcome.image;
        const file = formData.get('newImage');
        if (file && file.size > 0) {
            const uploaded = await handleUploadImage(file);
            if (uploaded) imageUrl = uploaded;
        }

        const updatedWelcome = {
            title: formData.get('title'),
            text: formData.get('text'),
            image: imageUrl
        };
        await updateAll({ ...pageData, welcome: updatedWelcome });
    };

    // --- CENTRAL UPDATE LOGIC ---
    const updateAll = async (newData) => {
        setSaving(true);
        // Optimistic Update
        setPageData(newData);
        try {
            if (isNewborn) {
                await updateNewbornPage(newData);
            } else {
                // If using generic system, we have to map it back to sections array
                // NOT IMPLEMENTED FULLY since user focused on Newborn checks
                console.log("Saving generic...", newData);
                // This part would need to be implemented to map newData back to the sections array
                // and then call updatePageSectionJSON for each modified section or a single updatePage call.
                // For now, we'll simulate the old behavior for generic pages.
                const sectionsToUpdate = [];
                if (newData.hero) sectionsToUpdate.push({ id: 'hero', content: newData.hero });
                if (newData.welcome) sectionsToUpdate.push({ id: 'welcome', content: newData.welcome });
                if (newData.gallery) sectionsToUpdate.push({ id: 'gallery', content: { images: newData.gallery } });

                for (const section of sectionsToUpdate) {
                    await updatePageSectionJSON(`portfolio-${category}`, section.id, section.content);
                }
            }
        } catch (error) {
            console.error("Save failed", error);
            alert("Save failed: " + error.message);
            // Revert optimistic update if save fails
            fetchData();
        } finally {
            setSaving(false);
        }
    };


    if (loading) return <div className="p-10 text-center text-[#5A2A45]">Loading...</div>;
    if (!pageData) return null;

    return (
        <div className="max-w-[1600px] mx-auto min-h-screen pb-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b border-[#E6D1CB] pb-6">
                <div>
                    <h1 className="font-display text-4xl text-[#5A2A45] mb-2">{title} Portfolio</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Manage content for the {title} category page.</p>
                </div>
                {saving && <span className="text-[#B77A8C] animate-pulse font-bold">Saving...</span>}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-[#E6D1CB]">
                {[
                    { id: 'gallery', label: 'Gallery Grid', icon: ImageIcon },
                    { id: 'hero', label: 'Hero Section', icon: Layout },
                    { id: 'welcome', label: 'Welcome Section', icon: Sparkles },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 px-4 font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2 ${activeTab === tab.id ? 'text-[#5A2A45] border-b-2 border-[#5A2A45]' : 'text-[#6E5A52]/60 hover:text-[#5A2A45]'}`}
                    >
                        <tab.icon size={16} /> {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#5A2A45]/5 min-h-[500px]">

                {/* 1. GALLERY TAB */}
                {activeTab === 'gallery' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#5A2A45]">Gallery Images</h2>
                            <span className="text-xs bg-[#F9F7F2] px-3 py-1 rounded-full text-[#6E5A52] font-bold">{pageData.gallery.length} items</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            <label className="aspect-square bg-[#F9F7F2] rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-[#5A2A45]/20 cursor-pointer hover:bg-[#5A2A45]/5 hover:border-[#5A2A45]/40 transition-all group">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                    <Plus className="text-[#5A2A45]" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Add Image</span>
                                <input type="file" className="hidden" multiple accept="image/*" onChange={(e) => handleAddGalleryImage(e.target.files[0])} />
                            </label>

                            <AnimatePresence>
                                {pageData.gallery.map((img, idx) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        key={idx}
                                        className="aspect-square relative group rounded-2xl overflow-hidden shadow-sm"
                                    >
                                        <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleRemoveGalleryImage(idx)}
                                                className="p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-lg"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                {/* 2. HERO TAB */}
                {activeTab === 'hero' && (
                    <form onSubmit={handleHeroSave} className="max-w-3xl space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Hero Background Image</label>
                                <div className="relative aspect-[3/4] bg-[#F9F7F2] rounded-2xl overflow-hidden border-2 border-dashed border-[#5A2A45]/20 group hover:border-[#5A2A45]/40 transition-colors">
                                    {pageData.hero.image ? (
                                        <img src={pageData.hero.image} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-[#5A2A45]/40">No Image</div>
                                    )}
                                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold uppercase tracking-widest text-xs">
                                        Change Image
                                        <input type="file" name="newImage" className="hidden" accept="image/*" />
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Main Title</label>
                                    <input name="title" defaultValue={pageData.hero.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl font-display text-2xl text-[#5A2A45] outline-none border border-transparent focus:border-[#5A2A45]/20 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Subtitle</label>
                                    <input name="subtitle" defaultValue={pageData.hero.subtitle} className="w-full p-4 bg-[#F9F7F2] rounded-xl font-outfit text-[#6E5A52] outline-none border border-transparent focus:border-[#5A2A45]/20 transition-colors" />
                                </div>
                                <div className="pt-4">
                                    <button type="submit" disabled={saving} className="bg-[#5A2A45] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-colors shadow-lg">
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}

                {/* 3. WELCOME TAB */}
                {activeTab === 'welcome' && (
                    <form onSubmit={handleWelcomeSave} className="max-w-3xl space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Text Side */}
                            <div className="space-y-6 order-2 md:order-1">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Title</label>
                                    <input name="title" defaultValue={pageData.welcome.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl font-display text-2xl text-[#5A2A45] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Content</label>
                                    <textarea name="text" defaultValue={pageData.welcome.text} rows={8} className="w-full p-4 bg-[#F9F7F2] rounded-xl font-outfit text-[#6E5A52] outline-none resize-none" />
                                </div>
                                <div className="pt-4">
                                    <button type="submit" disabled={saving} className="bg-[#5A2A45] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-colors shadow-lg">
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>

                            {/* Image Side */}
                            <div className="order-1 md:order-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Visual Image (Map/Graphic)</label>
                                <div className="relative aspect-[4/5] bg-[#F9F7F2] rounded-2xl overflow-hidden border-2 border-dashed border-[#5A2A45]/20 group hover:border-[#5A2A45]/40 transition-colors">
                                    {pageData.welcome.image ? (
                                        <img src={pageData.welcome.image} className="w-full h-full object-contain p-4" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-[#5A2A45]/40">No Image</div>
                                    )}
                                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold uppercase tracking-widest text-xs">
                                        Change Image
                                        <input type="file" name="newImage" className="hidden" accept="image/*" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                )}

            </div>
        </div>
    );
};

export default ManageCategory;
