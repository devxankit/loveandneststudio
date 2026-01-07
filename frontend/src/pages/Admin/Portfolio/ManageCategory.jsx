import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Plus, Trash2, Layout, Save, X, ImageIcon, Type, Sparkles } from 'lucide-react';
import { getPage, updatePageSectionJSON, uploadImage, createPage, getNewbornPage, updateNewbornPage, getMaternityPage, updateMaternityPage, getBabyPage, updateBabyPage, getFamilyPage, updateFamilyPage } from '../../../services/api';

// Fallback images from assets for Family
import familyHeroDefault from '../../../assets/images/portfolio/family/Screenshot 2025-12-31 111323.png';
import familyPhilosophyDefault from '../../../assets/images/portfolio/family/Screenshot 2025-12-31 111330.png';
import familyBannerDefault from '../../../assets/images/portfolio/family/Screenshot 2025-12-31 120803.png';
import familyPortrait2Default from '../../../assets/images/portfolio/family/Screenshot 2025-12-31 120811.png';
import familyStoryDefault from '../../../assets/images/portfolio/family/Screenshot 2025-12-31 120820.png';
import familyDetail1Default from '../../../assets/images/portfolio/family/Screenshot 2025-12-31 120831.png';
import familyDetail2Default from '../../../assets/images/portfolio/family/Screenshot 2025-12-31 120844.png';
import familyLineArtDefault from '../../../assets/images/portfolio/family/line art/Screenshot_2025-12-31_145813-removebg-preview.png';

// Fallback images from assets for Baby
import babyHero1 from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153257.png';
import babyHero2 from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153305.png';
import babyHero3 from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153316.png';
import babyWelcome from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153341.png';

// Fallback images from assets for Maternity
import mImg1 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225737.png';
import mImg2 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225745.png';
import mImg3 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225753.png';
import mImg4 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225801.png';
import mImg5 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225807.png';
import mImg6 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225812.png';
import mImg7 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225901.png';
import mImg8 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225916.png';
import mImg9 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225924.png';
import mImg10 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 230059.png';
import mImg11 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 230114.png';
import mImg12 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 230124.png';

// Fallback images from assets for Newborn
import newbornHeroDefault from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153410.png';
import newbornWelcomeDefault from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153341.png';

const ManageCategory = () => {
    const { category } = useParams(); // newborn, maternity, baby, family
    const [loading, setLoading] = useState(true);
    const [pageData, setPageData] = useState(null); // Will hold { hero: {}, welcome: {}, gallery: [] }
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('gallery');
    const [message, setMessage] = useState({ type: '', text: '' }); // { type: 'success' | 'error', text: '' }

    // Capitalize for display
    const title = category?.charAt(0).toUpperCase() + category?.slice(1);
    const isNewborn = category === 'newborn';
    const isMaternity = category === 'maternity';
    const isBaby = category === 'baby';
    const isFamily = category === 'family';

    useEffect(() => {
        fetchData();
    }, [category]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (isNewborn) {
                const { data } = await getNewbornPage();
                setPageData({
                    hero: data.hero || { title: `Sweet ${title}`, subtitle: 'Helping Your Littles Shine', image: '' },
                    welcome: data.welcome || { title: 'Welcome', text: `Welcome to Love & Nest Studio's ${title} Portfolio.`, image: '' },
                    gallery: data.gallery || []
                });
            } else if (isMaternity) {
                const { data } = await getMaternityPage();
                setPageData({
                    hero: data.hero || { title: 'Motherhood', subtitle: 'The beauty of', image: '' },
                    editorial: data.editorial || { title: 'A Moment Suspended in Time', text: '...', image1: '', image2: '' },
                    silhouette: data.silhouette || { title: 'The Art of Silhouette', text: '...', image: '' },
                    journey: data.journey || { title: 'The Journey', subtitle: 'Growing with love', images: [] },
                    poses: data.poses || { title: 'Studio Maternity Poses', subtitle: "You'll Love", images: [] },
                    gallery: data.gallery || [],
                    cta: data.cta || { title: 'Ready to capture your glow?', text: "Let's create timeless art..." }
                });
            } else if (isBaby) {
                const { data } = await getBabyPage();
                setPageData({
                    hero: data.hero || { title: 'Coming Soon', subtitle: 'Something Beautiful', text: '...', images: [] },
                    welcome: data.welcome || { handwriting: 'welcome!', title: "Let's break the ice", text: '...', image: '', buttonText: 'My Full Adventure' },
                    puzzleImages: data.puzzleImages || [],
                    gallery: [] // Ensure gallery exists to avoid length errors
                });
                if (activeTab === 'gallery') setActiveTab('hero');
            } else if (isFamily) {
                const res = await getFamilyPage();
                const data = res.data.data || res.data; // Handle both direct and wrapped responses
                setPageData({
                    hero: data.hero || { fixedBgImage: '', experienceText: '13 Years of Experience', titleLine1: 'Preserving Your', titleLine2: 'Family Legacy' },
                    philosophy: data.philosophy || { image: '', titleLine1: 'Cherishing Every', titleLine2: 'Fleeting Moment', text1: '', text2: '', author: 'Anamika', role: 'Lead Photographer' },
                    banner: data.banner || { image: '', quote: '"Where life happens"' },
                    selectedWorks: data.selectedWorks || [],
                    mosaic: data.mosaic || { image1: '', title: 'Ready to tell your story?', image2: '' },
                    archGrid: data.archGrid || { images: ['', '', '', '', ''], lineArtImage: '', title: 'Ready to frame your memories?' },
                    gallery: []
                });
                if (activeTab === 'gallery') setActiveTab('hero');
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
        setMessage({ type: '', text: '' });
        setPageData(newData);
        try {
            if (isNewborn) {
                await updateNewbornPage(newData);
            } else if (isMaternity) {
                await updateMaternityPage(newData);
            } else if (isBaby) {
                await updateBabyPage(newData);
            } else if (isFamily) {
                await updateFamilyPage(newData);
            } else {
                const sectionsToUpdate = [];
                if (newData.hero) sectionsToUpdate.push({ id: 'hero', content: newData.hero });
                if (newData.welcome) sectionsToUpdate.push({ id: 'welcome', content: newData.welcome });
                if (newData.gallery) sectionsToUpdate.push({ id: 'gallery', content: { images: newData.gallery } });

                for (const section of sectionsToUpdate) {
                    await updatePageSectionJSON(`portfolio-${category}`, section.id, section.content);
                }
            }
            setMessage({ type: 'success', text: 'Changes saved successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 5000);
        } catch (error) {
            console.error("Save failed", error);
            setMessage({ type: 'error', text: "Save failed: " + error.message });
            fetchData();
        } finally {
            setSaving(false);
        }
    };


    if (loading) return <div className="p-10 text-center text-[#5A2A45]">Loading...</div>;
    if (!pageData) return null;

    return (
        <div className="max-w-[1600px] mx-auto min-h-screen pb-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b border-[#E6D1CB] pb-6 relative">
                <div>
                    <h1 className="font-display text-4xl text-[#5A2A45] mb-2">{title} Portfolio</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Manage content for the {title} category page.</p>
                </div>

                <AnimatePresence>
                    {message.text && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, x: '-50%' }}
                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, y: -20, x: '-50%' }}
                            className={`fixed top-10 left-1/2 z-[100] px-8 py-4 rounded-xl shadow-2xl font-bold uppercase tracking-widest text-sm ${message.type === 'success' ? 'bg-[#5A2A45] text-white' : 'bg-red-500 text-white'}`}
                        >
                            {message.type === 'success' ? '✓ ' : '✕ '} {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 md:gap-4 mb-8 border-b border-[#E6D1CB]">
                {[
                    ...(!isBaby && !isFamily ? [{ id: 'gallery', label: 'Gallery', icon: ImageIcon }] : []),
                    ...(!isFamily ? [{ id: 'hero', label: 'Hero', icon: Layout }] : []),
                    ...(!isMaternity && !isBaby && !isFamily ? [{ id: 'welcome', label: 'Welcome', icon: Sparkles }] : []),
                    ...(isMaternity ? [
                        { id: 'editorial', label: 'Editorial', icon: Type },
                        { id: 'silhouette', label: 'Silhouette', icon: ImageIcon },
                        { id: 'journey', label: 'Journey', icon: Sparkles },
                        { id: 'poses', label: 'Poses Grid', icon: Layout },
                        { id: 'cta', label: 'CTA', icon: Save }
                    ] : []),
                    ...(isBaby ? [
                        { id: 'welcome', label: 'Welcome', icon: Sparkles },
                        { id: 'puzzle', label: 'Puzzle Grid', icon: Layout }
                    ] : []),
                    ...(isFamily ? [
                        { id: 'hero', label: 'Hero', icon: Layout },
                        { id: 'philosophy', label: 'Philosophy', icon: Sparkles },
                        { id: 'banner', label: 'Banner', icon: ImageIcon },
                        { id: 'mosaic', label: 'Mosaic', icon: Layout },
                        { id: 'arch', label: 'Arch Grid', icon: Plus }
                    ] : [])
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 px-2 md:px-4 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-colors flex items-center gap-1 md:gap-2 ${activeTab === tab.id ? 'text-[#5A2A45] border-b-2 border-[#5A2A45]' : 'text-[#6E5A52]/60 hover:text-[#5A2A45]'}`}
                    >
                        <tab.icon size={14} /> {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#5A2A45]/5 min-h-[500px]">

                {/* 1. GALLERY TAB */}
                {activeTab === 'gallery' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#5A2A45]">Gallery Images</h2>
                            <span className="text-xs bg-[#F9F7F2] px-3 py-1 rounded-full text-[#6E5A52] font-bold">{pageData.gallery?.length || 0} items</span>
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
                                {pageData.gallery?.map((img, idx) => (
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

                {activeTab === 'hero' && !isFamily && (
                    <div className="max-w-4xl space-y-8">
                        {!isBaby && !isFamily ? (
                            <form onSubmit={handleHeroSave} className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Hero Background Image</label>
                                    <div className="relative aspect-[3/4] bg-[#F9F7F2] rounded-2xl overflow-hidden border-2 border-dashed border-[#5A2A45]/20 group hover:border-[#5A2A45]/40 transition-colors">
                                        <img src={pageData.hero.image || (isMaternity ? mImg1 : isNewborn ? newbornHeroDefault : null)} className="w-full h-full object-cover" />
                                        <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold uppercase tracking-widest text-xs">
                                            Change Image
                                            <input type="file" name="newImage" className="hidden" accept="image/*" />
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Main Title</label>
                                        <input name="title" defaultValue={pageData.hero.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl font-display text-2xl text-[#5A2A45] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Subtitle</label>
                                        <input name="subtitle" defaultValue={pageData.hero.subtitle} className="w-full p-4 bg-[#F9F7F2] rounded-xl font-outfit text-[#6E5A52] outline-none" />
                                    </div>
                                    <div className="pt-4">
                                        <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl active:scale-[0.98]">
                                            {saving ? 'Saving...' : 'SAVE CHANGES'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-8">
                                {/* Baby Hero - Background Images */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Background Scrolling Images</label>
                                        <label className="bg-[#5A2A45] text-white px-3 py-1 rounded-full text-[10px] uppercase font-bold cursor-pointer hover:bg-[#4a2238]">
                                            Add Background Image
                                            <input type="file" className="hidden" onChange={async (e) => {
                                                const url = await handleUploadImage(e.target.files[0]);
                                                if (url) updateAll({ ...pageData, hero: { ...pageData.hero, images: [...pageData.hero.images, url] } });
                                            }} />
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {(pageData.hero.images.length > 0 ? pageData.hero.images : [babyHero1, babyHero2, babyHero3]).map((img, i) => (
                                            <div key={i} className="aspect-square relative group rounded-xl overflow-hidden shadow-sm">
                                                <img src={img} className="w-full h-full object-cover" />
                                                <button onClick={() => updateAll({ ...pageData, hero: { ...pageData.hero, images: pageData.hero.images.filter((_, idx) => idx !== i) } })} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Baby Hero - Text Content */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Coming Soon Title</label>
                                            <input id="h-title" defaultValue={pageData.hero.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Subtitle</label>
                                            <input id="h-subtitle" defaultValue={pageData.hero.subtitle} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Description Text</label>
                                            <textarea id="h-text" defaultValue={pageData.hero.text} rows={4} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none resize-none" />
                                        </div>
                                        <button onClick={() => updateAll({
                                            ...pageData,
                                            hero: {
                                                ...pageData.hero,
                                                title: document.getElementById('h-title').value,
                                                subtitle: document.getElementById('h-subtitle').value,
                                                text: document.getElementById('h-text').value
                                            }
                                        })} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase text-xs shadow-lg">
                                            {saving ? 'Saving...' : 'SAVE HERO TEXT'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* 3. WELCOME TAB (Non-Maternity, Non-Baby) */}
                {activeTab === 'welcome' && !isMaternity && !isBaby && (
                    <form onSubmit={handleWelcomeSave} className="max-w-3xl space-y-8">
                        {/* ... (keep existing welcome form content) */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6 order-2 md:order-1">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Title</label>
                                    <input name="title" defaultValue={pageData.welcome?.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl font-display text-2xl text-[#5A2A45] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Content</label>
                                    <textarea name="text" defaultValue={pageData.welcome?.text} rows={8} className="w-full p-4 bg-[#F9F7F2] rounded-xl font-outfit text-[#6E5A52] outline-none resize-none" />
                                </div>
                                <div className="pt-4">
                                    <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl active:scale-[0.98]">
                                        {saving ? 'Saving...' : 'SAVE CHANGES'}
                                    </button>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Image</label>
                                <div className="relative aspect-[4/5] bg-[#F9F7F2] rounded-2xl overflow-hidden border-2 border-dashed border-[#5A2A45]/20 group">
                                    <img src={pageData.welcome?.image || (isBaby ? babyWelcome : isNewborn ? newbornWelcomeDefault : null)} className="w-full h-full object-contain p-4" />
                                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold uppercase tracking-widest text-xs">
                                        Change <input type="file" name="newImage" className="hidden" accept="image/*" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                )}

                {/* 3. WELCOME TAB (Baby Only) */}
                {activeTab === 'welcome' && isBaby && (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        let img = pageData.welcome.image;
                        const f = fd.get('newImage');
                        if (f?.size > 0) img = await handleUploadImage(f);
                        await updateAll({
                            ...pageData,
                            welcome: {
                                handwriting: fd.get('handwriting'),
                                title: fd.get('title'),
                                text: fd.get('text'),
                                buttonText: fd.get('buttonText'),
                                image: img
                            }
                        });
                    }} className="max-w-4xl space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Handwriting Intro</label>
                                    <input name="handwriting" defaultValue={pageData.welcome?.handwriting} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" placeholder="e.g., welcome!" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Main Title</label>
                                    <input name="title" defaultValue={pageData.welcome?.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Content Text</label>
                                    <textarea name="text" defaultValue={pageData.welcome?.text} rows={6} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none resize-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Button Text</label>
                                    <input name="buttonText" defaultValue={pageData.welcome?.buttonText} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">
                                    {saving ? 'Saving...' : 'SAVE WELCOME SECTION'}
                                </button>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Ice Breaker Image</label>
                                <div className="aspect-[4/5] bg-[#F9F7F2] rounded-xl relative group overflow-hidden border-2 border-dashed border-[#5A2A45]/20">
                                    <img src={pageData.welcome?.image} className="w-full h-full object-cover" />
                                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] font-bold">
                                        CHANGE PHOTO <input type="file" name="newImage" className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                )}

                {/* 4. EDITORIAL TAB (Maternity Only) */}
                {activeTab === 'editorial' && isMaternity && (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        let i1 = pageData.editorial.image1;
                        let i2 = pageData.editorial.image2;
                        const f1 = fd.get('newImage1');
                        if (f1?.size > 0) i1 = await handleUploadImage(f1);
                        const f2 = fd.get('newImage2');
                        if (f2?.size > 0) i2 = await handleUploadImage(f2);
                        await updateAll({
                            ...pageData,
                            editorial: { title: fd.get('title'), text: fd.get('text'), image1: i1, image2: i2 }
                        });
                    }} className="max-w-4xl space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Featured Images</label>
                                <div className="flex gap-4">
                                    <div className="w-1/2 aspect-[3/4] bg-[#F9F7F2] rounded-xl relative group overflow-hidden">
                                        <img src={pageData.editorial.image1 || mImg2} className="w-full h-full object-cover" />
                                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] font-bold">CHANGE <input type="file" name="newImage1" className="hidden" /></label>
                                    </div>
                                    <div className="w-1/2 aspect-[3/4] bg-[#F9F7F2] rounded-xl relative group overflow-hidden">
                                        <img src={pageData.editorial.image2 || mImg3} className="w-full h-full object-cover" />
                                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] font-bold">CHANGE <input type="file" name="newImage2" className="hidden" /></label>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Title</label>
                                    <input name="title" defaultValue={pageData.editorial.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Text</label>
                                    <textarea name="text" defaultValue={pageData.editorial.text} rows={6} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl active:scale-[0.98]">
                                    {saving ? 'Saving...' : 'SAVE EDITORIAL'}
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* 5. SILHOUETTE TAB (Maternity Only) */}
                {activeTab === 'silhouette' && isMaternity && (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        let img = pageData.silhouette.image;
                        const f = fd.get('newImage');
                        if (f?.size > 0) img = await handleUploadImage(f);
                        await updateAll({
                            ...pageData,
                            silhouette: { title: fd.get('title'), text: fd.get('text'), image: img }
                        });
                    }} className="max-w-4xl space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="aspect-[3/4] bg-[#F9F7F2] rounded-xl relative group overflow-hidden">
                                <img src={pageData.silhouette.image || mImg4} className="w-full h-full object-cover" />
                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-xs font-bold">CHANGE IMAGE <input type="file" name="newImage" className="hidden" /></label>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Silhouette Section Title</label>
                                    <input name="title" defaultValue={pageData.silhouette.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Section Text</label>
                                    <textarea name="text" defaultValue={pageData.silhouette.text} rows={6} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl active:scale-[0.98]">
                                    {saving ? 'Saving...' : 'SAVE SILHOUETTE'}
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* 6. JOURNEY TAB (Maternity Only) */}
                {activeTab === 'journey' && isMaternity && (
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Text Content</label>
                                <input id="j-title" defaultValue={pageData.journey.title} placeholder="Title" className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none mb-2" />
                                <input id="j-subtitle" defaultValue={pageData.journey.subtitle} placeholder="Subtitle" className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                <button onClick={() => updateAll({ ...pageData, journey: { ...pageData.journey, title: document.getElementById('j-title').value, subtitle: document.getElementById('j-subtitle').value } })}
                                    className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl active:scale-[0.98]">
                                    {saving ? 'Saving...' : 'SAVE TEXT'}
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Timeline Images (Fixed 5 Slots)</label>
                                    <span className="text-[10px] text-[#B77A8C] font-bold uppercase">Showing 5 months of growth</span>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {[0, 1, 2, 3, 4].map((i) => {
                                        const img = pageData.journey.images[i] || '';
                                        return (
                                            <div key={i} className="flex items-center gap-4 bg-[#F9F7F2] p-4 rounded-2xl border border-[#5A2A45]/5 group">
                                                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-white flex items-center justify-center">
                                                    <img src={img || (i === 0 ? mImg5 : i === 1 ? mImg6 : i === 2 ? mImg7 : i === 3 ? mImg8 : mImg9)} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-[#5A2A45] font-bold text-xs uppercase mb-1">Journey Item {i}</p>
                                                    <p className="text-[#8F8A86] text-[10px] uppercase tracking-widest mb-2">Month {(i * 2) + 3}</p>
                                                    <div className="flex gap-2">
                                                        <label className="bg-white border border-[#5A2A45]/20 text-[#5A2A45] px-3 py-1 rounded-full text-[10px] uppercase font-bold cursor-pointer hover:bg-[#5A2A45] hover:text-white transition-colors">
                                                            {img ? 'Change Image' : 'Upload Image'}
                                                            <input type="file" className="hidden" onChange={async (e) => {
                                                                const url = await handleUploadImage(e.target.files[0]);
                                                                if (url) {
                                                                    const newImages = [...pageData.journey.images];
                                                                    // Pad array if needed
                                                                    while (newImages.length <= i) newImages.push('');
                                                                    newImages[i] = url;
                                                                    updateAll({ ...pageData, journey: { ...pageData.journey, images: newImages.slice(0, 5) } });
                                                                }
                                                            }} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 7. POSES TAB (Maternity Only) */}
                {activeTab === 'poses' && isMaternity && (
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Poses Grid Text</label>
                                <input id="p-title" defaultValue={pageData.poses.title} placeholder="Title" className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none mb-2" />
                                <input id="p-subtitle" defaultValue={pageData.poses.subtitle} placeholder="Subtitle" className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                <button onClick={() => updateAll({ ...pageData, poses: { ...pageData.poses, title: document.getElementById('p-title').value, subtitle: document.getElementById('p-subtitle').value } })}
                                    className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl active:scale-[0.98]">
                                    {saving ? 'Saving...' : 'SAVE TEXT'}
                                </button>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Poses Images (8 Images Recommended)</label>
                                <div className="grid grid-cols-4 gap-2">
                                    <label className="aspect-[3/4] bg-[#F9F7F2] border-2 border-dashed border-[#5A2A45]/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#5A2A45]/5">
                                        <Plus size={20} className="text-[#5A2A45]/40" />
                                        <input type="file" className="hidden" onChange={async (e) => {
                                            const url = await handleUploadImage(e.target.files[0]);
                                            if (url) updateAll({ ...pageData, poses: { ...pageData.poses, images: [...pageData.poses.images, url] } });
                                        }} />
                                    </label>
                                    {pageData.poses.images.map((img, i) => (
                                        <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden group">
                                            <img src={img} className="w-full h-full object-cover" />
                                            <button onClick={() => updateAll({ ...pageData, poses: { ...pageData.poses, images: pageData.poses.images.filter((_, idx) => idx !== i) } })} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 8. CTA TAB (Maternity Only) */}
                {activeTab === 'cta' && isMaternity && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        updateAll({
                            ...pageData,
                            cta: { title: fd.get('title'), text: fd.get('text') }
                        });
                    }} className="max-w-xl space-y-6">
                        <h2 className="font-display text-2xl text-[#5A2A45] mb-4">Call to Action (Footer Section)</h2>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">CTA Title</label>
                            <input name="title" defaultValue={pageData.cta.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">CTA Text</label>
                            <textarea name="text" defaultValue={pageData.cta.text} rows={4} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                        </div>
                        <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl active:scale-[0.98]">
                            {saving ? 'Saving...' : 'SAVE CTA SECTION'}
                        </button>
                    </form>
                )}

                {/* 9. PUZZLE GRID TAB (Baby Only) */}
                {activeTab === 'puzzle' && isBaby && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Sneak Peek Puzzle (Fixed 15 Slots)</h3>
                            <span className="text-[10px] bg-[#F9F7F2] text-[#8F8A86] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Matches Page Layout</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {Array.from({ length: 15 }).map((_, i) => {
                                const img = pageData.puzzleImages[i] || '';
                                return (
                                    <div key={i} className="space-y-2 group">
                                        <div className="aspect-square relative rounded-2xl overflow-hidden bg-[#F9F7F2] border border-[#5A2A45]/5 shadow-sm">
                                            <img src={img || (i === 0 ? mImg7 : i === 1 ? mImg8 : i === 2 ? mImg9 : i === 3 ? mImg10 : i === 4 ? mImg11 : mImg12)} className="w-full h-full object-cover" />
                                            <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white font-bold text-[10px] uppercase tracking-widest">
                                                {img ? 'Change Image' : 'Upload Image'}
                                                <input type="file" className="hidden" onChange={async (e) => {
                                                    const url = await handleUploadImage(e.target.files[0]);
                                                    if (url) {
                                                        const newImages = [...pageData.puzzleImages];
                                                        while (newImages.length <= i) newImages.push('');
                                                        newImages[i] = url;
                                                        updateAll({ ...pageData, puzzleImages: newImages.slice(0, 15) });
                                                    }
                                                }} />
                                            </label>
                                        </div>
                                        <p className="text-center text-[10px] font-bold text-[#5A2A45]/40 uppercase tracking-widest">Slot {i + 1}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 10. FAMILY TABS (Hero, Philosophy, Banner, Stories, Mosaic, Arch) */}
                {activeTab === 'hero' && isFamily && (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        let img = pageData.hero.fixedBgImage;
                        if (fd.get('newBg')?.size > 0) img = await handleUploadImage(fd.get('newBg'));
                        updateAll({
                            ...pageData,
                            hero: {
                                fixedBgImage: img,
                                experienceText: fd.get('expText'),
                                titleLine1: fd.get('t1'),
                                titleLine2: fd.get('t2')
                            }
                        });
                    }} className="max-w-4xl space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Background Watermark Image</label>
                                <div className="aspect-video bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10">
                                    <img src={pageData.hero.fixedBgImage || familyHeroDefault} className="w-full h-full object-cover opacity-30" />
                                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity">
                                        Change Background
                                        <input type="file" name="newBg" className="hidden" />
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Experience Subtitle</label>
                                    <input name="expText" defaultValue={pageData.hero.experienceText} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" placeholder="e.g. 13 Years of Experience" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Main Title Line 1</label>
                                    <input name="t1" defaultValue={pageData.hero.titleLine1} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" placeholder="Preserving Your" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Main Title Line 2 (Italic)</label>
                                    <input name="t2" defaultValue={pageData.hero.titleLine2} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" placeholder="Family Legacy" />
                                </div>
                                <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl active:scale-[0.98]">
                                    {saving ? 'Saving...' : 'SAVE HERO CONTENT'}
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {activeTab === 'philosophy' && isFamily && (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        let img = pageData.philosophy.image;
                        if (fd.get('newImg')?.size > 0) img = await handleUploadImage(fd.get('newImg'));
                        updateAll({
                            ...pageData,
                            philosophy: {
                                image: img,
                                titleLine1: fd.get('t1'),
                                titleLine2: fd.get('t2'),
                                text1: fd.get('text1'),
                                text2: fd.get('text2'),
                                author: fd.get('author'),
                                role: fd.get('role')
                            }
                        });
                    }} className="max-w-5xl space-y-8">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Philosophy Image</label>
                                <div className="aspect-[4/5] bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10 shadow-lg">
                                    <img src={pageData.philosophy.image || familyPhilosophyDefault} className="w-full h-full object-cover" />
                                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity">
                                        Change Image
                                        <input type="file" name="newImg" className="hidden" />
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Title Line 1</label>
                                    <input name="t1" defaultValue={pageData.philosophy.titleLine1} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Title Line 2 (Italic)</label>
                                    <input name="t2" defaultValue={pageData.philosophy.titleLine2} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Description Paragraph 1</label>
                                    <textarea name="text1" defaultValue={pageData.philosophy.text1} rows={4} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Description Paragraph 2</label>
                                    <textarea name="text2" defaultValue={pageData.philosophy.text2} rows={4} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Author Name</label>
                                        <input name="author" defaultValue={pageData.philosophy.author} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-display italic" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Role Title</label>
                                        <input name="role" defaultValue={pageData.philosophy.role} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-outfit" />
                                    </div>
                                </div>
                                <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl active:scale-[0.98]">
                                    {saving ? 'Saving...' : 'SAVE PHILOSOPHY'}
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {activeTab === 'banner' && isFamily && (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        let img = pageData.banner.image;
                        if (fd.get('newImg')?.size > 0) img = await handleUploadImage(fd.get('newImg'));
                        updateAll({
                            ...pageData,
                            banner: { image: img, quote: fd.get('quote') }
                        });
                    }} className="max-w-4xl space-y-8">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-4">Cinematic Banner</label>
                            <div className="aspect-[21/9] bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10 shadow-xl">
                                <img src={pageData.banner.image || familyBannerDefault} className="w-full h-full object-cover" />
                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity">
                                    Change Banner
                                    <input type="file" name="newImg" className="hidden" />
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Banner Quote</label>
                            <input name="quote" defaultValue={pageData.banner.quote} className="w-full p-6 bg-[#F9F7F2] rounded-2xl outline-none font-display italic text-xl text-[#5A2A45]" placeholder='"Where life happens"' />
                        </div>
                        <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl active:scale-[0.98]">
                            {saving ? 'Saving...' : 'SAVE BANNER'}
                        </button>
                    </form>
                )}



                {activeTab === 'mosaic' && isFamily && (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        updateAll({
                            ...pageData,
                            mosaic: { ...pageData.mosaic, title: fd.get('title') }
                        });
                    }} className="max-w-4xl space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Mosaic Image 1</label>
                                <div className="aspect-square bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10 shadow-lg">
                                    <img src={pageData.mosaic.image1 || familyDetail1Default} className="w-full h-full object-cover" />
                                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest">
                                        Update Image
                                        <input type="file" className="hidden" onChange={async (e) => {
                                            const url = await handleUploadImage(e.target.files[0]);
                                            if (url) updateAll({ ...pageData, mosaic: { ...pageData.mosaic, image1: url } });
                                        }} />
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Mosaic Image 2</label>
                                <div className="aspect-square bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10 shadow-lg">
                                    <img src={pageData.mosaic.image2 || familyDetail2Default} className="w-full h-full object-cover" />
                                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest">
                                        Update Image
                                        <input type="file" className="hidden" onChange={async (e) => {
                                            const url = await handleUploadImage(e.target.files[0]);
                                            if (url) updateAll({ ...pageData, mosaic: { ...pageData.mosaic, image2: url } });
                                        }} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Mosaic Center Title</label>
                            <input name="title" defaultValue={pageData.mosaic.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none text-center font-display text-xl" />
                        </div>

                        <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl active:scale-[0.98]">
                            {saving ? 'Saving...' : 'SAVE MOSAIC SETTINGS'}
                        </button>
                    </form>
                )}

                {activeTab === 'arch' && isFamily && (
                    <div className="space-y-12">
                        <div className="flex items-center justify-between">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Animated Arch Grid (5 Slots)</h3>
                            <button onClick={() => updateAll({ ...pageData, archGrid: { ...pageData.archGrid, title: document.getElementById('arch-title').value } })}
                                className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs uppercase font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all">
                                {saving ? 'Saving...' : 'SAVE ALL ARCH CHANGES'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {[0, 1, 2, 3, 4].map((i) => {
                                const img = pageData.archGrid.images[i] || '';
                                return (
                                    <div key={i} className="space-y-2 group">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] text-center">Slot {i + 1}</label>
                                        <div className="aspect-[4/6] bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10 shadow-md">
                                            <img src={img || (i === 0 ? familyDetail2Default : i === 1 ? familyPhilosophyDefault : i === 2 ? familyStoryDefault : i === 3 ? familyPortrait2Default : familyDetail1Default)} className="w-full h-full object-cover" />
                                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity text-center px-4">
                                                Update Slot {i + 1}
                                                <input type="file" className="hidden" onChange={async (e) => {
                                                    const url = await handleUploadImage(e.target.files[0]);
                                                    if (url) {
                                                        const newImgs = [...pageData.archGrid.images];
                                                        while (newImgs.length <= i) newImgs.push('');
                                                        newImgs[i] = url;
                                                        updateAll({ ...pageData, archGrid: { ...pageData.archGrid, images: newImgs.slice(0, 5) } });
                                                    }
                                                }} />
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-[#5A2A45]/10">
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Center Line Art Overlay (PNG)</label>
                                <div className="aspect-square bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10 flex items-center justify-center">
                                    <img src={pageData.archGrid.lineArtImage || familyLineArtDefault} className="max-w-[80%] h-auto object-contain" />
                                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity">
                                        Change Line Art
                                        <input type="file" className="hidden" onChange={async (e) => {
                                            const url = await handleUploadImage(e.target.files[0]);
                                            if (url) updateAll({ ...pageData, archGrid: { ...pageData.archGrid, lineArtImage: url } });
                                        }} />
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Arch Section Footer Title</label>
                                    <input id="arch-title" defaultValue={pageData.archGrid.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-display text-2xl" placeholder="Ready to frame your memories?" />
                                </div>
                                <p className="text-xs text-[#8F8A86] leading-relaxed">
                                    The Arch Grid uses Slot 3 (Center) as the main focus. Tip: Use Slot 3 for your favorite family portrait. The Line Art overlay will sit right on top of it.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ManageCategory;
