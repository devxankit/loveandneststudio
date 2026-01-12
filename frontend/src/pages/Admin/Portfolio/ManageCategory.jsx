import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Plus, Trash2, Layout, Save, X, ImageIcon, Type, Sparkles, LayoutGrid, Play } from 'lucide-react';
import { getPage, updatePageSectionJSON, uploadImage, createPage, getNewbornPage, updateNewbornPage, getMaternityPage, updateMaternityPage, getBabyPage, updateBabyPage, getFamilyPage, updateFamilyPage, getCakeSmashPage, updateCakeSmashPage, getHospitalPage, updateHospitalPage, getHospitalSession, updateHospitalSession, getToddlerPage, updateToddlerPage, getPreBirthdayPage, updatePreBirthdayPage, getBirthdayPage, updateBirthdayPage } from '../../../services/api';

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
    const isCakeSmash = category === 'cakesmash';
    const isHospital = category === 'hospital';
    const isToddler = category === 'toddler';
    const isPreBirthday = category === 'pre-birthday';
    const isBirthday = category === 'birthday';

    useEffect(() => {
        fetchData();
    }, [category]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (isPreBirthday) {
                const { data } = await getPreBirthdayPage();
                setPageData({
                    hero: data.hero || { title: 'Pre-Birthday', subtitle: 'Capturing High Hopes', tagline: 'A Magical Journey', images: [] },
                    cta: data.cta || { title: "Let's Make Their First Wish Come True", description: "...", buttonText: "Reserve Your Date", buttonLink: "/contact" },
                    themeColor: data.themeColor || '#FDE2E4'
                });
            } else if (isBirthday) {
                const { data } = await getBirthdayPage();
                setPageData({
                    hero: data.hero || { title: 'Birthday Celebrations', subtitle: 'Capturing Every Joyous Year', tagline: 'Timeless Memories of Growing Up', floatingImages: [] },
                    intro: data.intro || { title: 'A Day to Remember', description: '...', image: '' },
                    gallery: data.gallery || [],
                    videos: data.videos || [],
                    themes: data.themes || [],
                    cta: data.cta || { title: "Make Their Wish Last Forever", text: "...", buttonText: "Reserve Your Date", buttonLink: "/contact" },
                    themeColor: data.themeColor || '#FDE2E4'
                });
            } else if (isToddler) {
                const { data } = await getToddlerPage();
                setPageData({
                    hero: data.hero || { title: 'Toddler', subtitle: 'Photography & Videography', tagline: 'From Planning to Execution', images: [] },
                    gallery: data.gallery || [],
                    themeColor: data.themeColor || '#5A2A45'
                });
            } else if (isNewborn) {
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
                    adventureModal: data.adventureModal || { topImage: '', content: '', sideImage: '' },
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
            } else if (isHospital) {
                const { data } = await getHospitalPage();
                // We also fetch all sessions to show them in a tab
                const sessions = await Promise.all(['birth', 'newborn', 'family'].map(async (type) => {
                    const res = await getHospitalSession(type);
                    return res.data;
                }));

                setPageData({
                    hero: data.hero || { title: 'Hospital Sessions', description: '...', image: '', buttonText: 'Read More' },
                    categoriesSection: data.categoriesSection || { title: 'Current Obsessions' },
                    categories: data.categories || [],
                    sessions: sessions, // Array of session data
                    gallery: []
                });
                if (activeTab === 'gallery') setActiveTab('hero');
            } else if (isCakeSmash) {
                const { data } = await getCakeSmashPage();
                setPageData(data || {
                    hero: { title: 'Cake Smash & Birthday', subtitle: 'Celebrating Milestones', backgroundImage: '' },
                    celebrationText: { title: 'A Sweet Celebration', description: '' },
                    giftGrid: { title: 'A Sweet Celebration', tagline: 'Pure Childhood Joy', images: ['', '', '', ''] },
                    hangingGrid: { title: 'Capturing Every Giggle', tagline: 'The Gallery', images: ['', '', ''] },
                    experience: [],
                    cta: { title: "Let's Plan the Party!", buttonText: "Book A Session", buttonLink: "/contact" },
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
            } else if (isCakeSmash) {
                await updateCakeSmashPage(newData);
            } else if (isToddler) {
                await updateToddlerPage(newData);
            } else if (isPreBirthday) {
                await updatePreBirthdayPage(newData);
            } else if (isBirthday) {
                await updateBirthdayPage(newData);
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
                    ...(isMaternity ? [
                        { id: 'hero', label: 'Hero', icon: Layout },
                        { id: 'editorial', label: 'Editorial', icon: Type },
                        { id: 'silhouette', label: 'Silhouette', icon: ImageIcon },
                        { id: 'journey', label: 'Journey', icon: Sparkles },
                        { id: 'poses', label: 'Poses Grid', icon: Layout },
                        { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                        { id: 'cta', label: 'CTA', icon: Save }
                    ] : isBaby ? [
                        { id: 'hero', label: 'Hero', icon: Layout },
                        { id: 'welcome', label: 'Welcome', icon: Sparkles },
                        { id: 'adventure', label: 'Adventure Modal', icon: Type },
                        { id: 'puzzle', label: 'Puzzle Grid', icon: Layout }
                    ] : isFamily ? [
                        { id: 'hero', label: 'Hero', icon: Layout },
                        { id: 'philosophy', label: 'Philosophy', icon: Sparkles },
                        { id: 'banner', label: 'Banner', icon: ImageIcon },
                        { id: 'stories', label: 'Selected Stories', icon: Type },
                        { id: 'mosaic', label: 'Mosaic', icon: Layout },
                        { id: 'arch', label: 'Arch Grid', icon: Plus },
                        { id: 'collage', label: 'Holiday Collage', icon: ImageIcon }
                    ] : isHospital ? [
                        { id: 'hero', label: 'Hero', icon: Type },
                        { id: 'categories', label: 'Categories', icon: Layout },
                        { id: 'sessions', label: 'Sessions', icon: ImageIcon }
                    ] : isCakeSmash ? [
                        { id: 'hero', label: 'Hero', icon: Layout },
                        { id: 'intro', label: 'Intro Text', icon: Type },
                        { id: 'giftGrid', label: 'Gift Grid', icon: Layout },
                        { id: 'hanging', label: 'Hanging Grid', icon: ImageIcon },
                        { id: 'cta', label: 'CTA', icon: Save }
                    ] : isToddler ? [
                        { id: 'hero', label: 'Arched Hero', icon: Layout },
                        { id: 'gallery', label: 'Art Grid', icon: ImageIcon }
                    ] : isBirthday ? [
                        { id: 'hero', label: 'Birthday Hero', icon: Layout },
                        { id: 'intro', label: 'Intro Narrative', icon: Type },
                        { id: 'themes', label: 'Theme Collections', icon: LayoutGrid },
                        { id: 'gallery', label: 'Image Vault', icon: ImageIcon },
                        { id: 'videos', label: 'Videos', icon: Play },
                        { id: 'cta', label: 'Ending CTA', icon: Save }
                    ] : [ // Newborn or Default
                        { id: 'hero', label: 'Hero', icon: Layout },
                        { id: 'welcome', label: 'Welcome', icon: Sparkles },
                        { id: 'gallery', label: 'Gallery', icon: ImageIcon }
                    ])
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

                {/* 1. GALLERY TAB (Restricted to categories that use the simple gallery) */}
                {activeTab === 'gallery' && !isBaby && !isFamily && !isHospital && !isCakeSmash && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#5A2A45]">{isToddler ? 'Art Grid Archive' : 'Gallery Images'}</h2>
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

                {/* GENERIC HERO TAB (Excluding categories with dedicated Hero blocks) */}
                {activeTab === 'hero' && !isFamily && !isHospital && !isBaby && !isCakeSmash && !isToddler && (
                    <div className="max-w-4xl space-y-8">
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
                    </div>
                )}

                {/* BABY HERO TAB */}
                {activeTab === 'hero' && isBaby && (
                    <div className="max-w-4xl space-y-8">
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
                    </div>
                )}

                {/* TODDLER HERO TAB */}
                {activeTab === 'hero' && isToddler && (
                    <div className="max-w-[1240px] space-y-12">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#5A2A45]">Editorial Hero Management</h2>
                            <button
                                onClick={() => updateAll({
                                    ...pageData,
                                    hero: {
                                        ...pageData.hero,
                                        title: document.getElementById('t-title').value,
                                        tagline: document.getElementById('t-tagline').value,
                                        phoneNumber: document.getElementById('t-phone').value,
                                        email: document.getElementById('t-email').value,
                                    }
                                })}
                                className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl hover:brightness-110 transition-all flex items-center gap-2"
                            >
                                <Save size={16} /> {saving ? 'Saving...' : 'Save Editorial Content'}
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Left: Text Content */}
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Main Headline</label>
                                        <input id="t-title" defaultValue={pageData.hero.title} className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none font-display text-2xl" placeholder="e.g. Pure Wonder" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Editorial Tagline</label>
                                        <textarea id="t-tagline" defaultValue={pageData.hero.tagline} rows="3" className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none italic leading-relaxed" placeholder="e.g. Capturing the raw essence of growing up..." />
                                    </div>
                                    <div className="md:col-span-2 border-t border-[#5A2A45]/5 pt-6 mt-2">
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B77A8C] mb-6">Contact Pill Information</h4>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Pill Phone</label>
                                                <input id="t-phone" defaultValue={pageData.hero.phoneNumber} className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none text-sm" placeholder="+91 987..." />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Pill Email</label>
                                                <input id="t-email" defaultValue={pageData.hero.email} className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none text-sm" placeholder="hello@..." />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Layered Gallery Frames */}
                            <div className="space-y-6 bg-[#F9F7F2]/50 p-8 rounded-[3rem] border border-[#5A2A45]/5">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A2A45] text-center mb-6">Layered Gallery Frames</label>
                                <div className="grid grid-cols-2 gap-8">
                                    {/* Slot 1: Large Arched Frame */}
                                    <div className="space-y-4 col-span-1">
                                        <div className="aspect-[3/4] bg-white rounded-t-full relative group overflow-hidden border-4 border-white shadow-xl">
                                            <img src={pageData.hero.images[0] || 'https://via.placeholder.com/600x800'} className="w-full h-full object-cover" />
                                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity text-center p-4">
                                                Update Main<br />Arched Frame
                                                <input type="file" className="hidden" onChange={async (e) => {
                                                    const url = await handleUploadImage(e.target.files[0]);
                                                    if (url) {
                                                        const newImgs = [...(pageData.hero.images || ['', '', '', ''])];
                                                        newImgs[0] = url;
                                                        updateAll({ ...pageData, hero: { ...pageData.hero, images: newImgs } });
                                                    }
                                                }} />
                                            </label>
                                        </div>
                                        <p className="text-[9px] text-center text-[#5A2A45] font-bold uppercase tracking-widest opacity-60">1. Main Center Frame</p>
                                    </div>

                                    {/* Slot 2: Small Floating Moment */}
                                    <div className="space-y-4 pt-12">
                                        <div className="aspect-square bg-white rounded-3xl relative group overflow-hidden border-4 border-white shadow-lg rotate-[-5deg]">
                                            <img src={pageData.hero.images[1] || 'https://via.placeholder.com/400'} className="w-full h-full object-cover" />
                                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity text-center p-4">
                                                Update Floating<br />Corner Piece
                                                <input type="file" className="hidden" onChange={async (e) => {
                                                    const url = await handleUploadImage(e.target.files[0]);
                                                    if (url) {
                                                        const newImgs = [...(pageData.hero.images || ['', '', '', ''])];
                                                        newImgs[1] = url;
                                                        updateAll({ ...pageData, hero: { ...pageData.hero, images: newImgs } });
                                                    }
                                                }} />
                                            </label>
                                        </div>
                                        <p className="text-[9px] text-center text-[#5A2A45] font-bold uppercase tracking-widest opacity-60">2. Bottom-Left Moment</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}



                {/* PRE-BIRTHDAY HERO TAB */}
                {activeTab === 'hero' && isPreBirthday && (
                    <div className="max-w-[1240px] space-y-12">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#5A2A45]">Pre-Birthday Magic Hero</h2>
                            <button
                                onClick={() => updateAll({
                                    ...pageData,
                                    hero: {
                                        ...pageData.hero,
                                        title: document.getElementById('pb-title').value,
                                        subtitle: document.getElementById('pb-subtitle').value,
                                        tagline: document.getElementById('pb-tagline').value,
                                    }
                                })}
                                className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl hover:brightness-110 transition-all flex items-center gap-2"
                            >
                                <Save size={16} /> {saving ? 'Saving...' : 'Save Hero Content'}
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45]">Hero Title</label>
                                    <input id="pb-title" defaultValue={pageData.hero.title} className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none font-display text-2xl" />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45]">Hero Subtitle</label>
                                    <input id="pb-subtitle" defaultValue={pageData.hero.subtitle} className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none" />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45]">Hero Tagline</label>
                                    <input id="pb-tagline" defaultValue={pageData.hero.tagline} className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none italic" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45] text-center">Hero Images (Floating Circle & Bow)</label>
                                <div className="grid grid-cols-2 gap-6">
                                    {[0, 1].map((i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="aspect-square bg-white rounded-full relative group overflow-hidden border-4 border-white shadow-xl">
                                                <img src={pageData.hero.images[i] || 'https://via.placeholder.com/400'} className="w-full h-full object-cover" />
                                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity text-center">
                                                    Update<br />Slot {i + 1}
                                                    <input type="file" className="hidden" onChange={async (e) => {
                                                        const url = await handleUploadImage(e.target.files[0]);
                                                        if (url) {
                                                            const newImgs = [...(pageData.hero.images || ['', ''])];
                                                            newImgs[i] = url;
                                                            updateAll({ ...pageData, hero: { ...pageData.hero, images: newImgs } });
                                                        }
                                                    }} />
                                                </label>
                                            </div>
                                            <p className="text-[9px] text-center text-[#5A2A45] font-bold uppercase opacity-60">{i === 0 ? 'Main Circle' : 'Overlay/Bow Style'}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* PRE-BIRTHDAY CAKE GRID TAB */}
                {activeTab === 'cakeGrid' && isPreBirthday && (
                    <div className="max-w-[1240px] space-y-12">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#5A2A45]">Cake Shape Gallery Management</h2>
                            <button
                                onClick={() => updateAll({
                                    ...pageData,
                                    cakeGrid: {
                                        ...pageData.cakeGrid,
                                        title: document.getElementById('cg-title').value,
                                        description: document.getElementById('cg-desc').value,
                                    }
                                })}
                                className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl hover:brightness-110 transition-all flex items-center gap-2"
                            >
                                <Save size={16} /> {saving ? 'Saving...' : 'Save Structure Content'}
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1 space-y-6">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45]">Section Title</label>
                                    <input id="cg-title" defaultValue={pageData.cakeGrid.title} className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none font-display text-xl" />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45]">Description</label>
                                    <textarea id="cg-desc" defaultValue={pageData.cakeGrid.description} rows="4" className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none text-sm leading-relaxed" />
                                </div>
                            </div>
                            <div className="lg:col-span-2 space-y-8">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45] text-center">Cake Structure Images (7 slots)</label>
                                <div className="grid grid-cols-4 gap-4">
                                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="aspect-[3/4] bg-white rounded-xl relative group overflow-hidden border border-[#5A2A45]/10">
                                                <img src={pageData.cakeGrid.images[i] || 'https://via.placeholder.com/400x533'} className="w-full h-full object-cover" />
                                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity text-center p-2">
                                                    Update<br />Slot {i + 1}
                                                    <input type="file" className="hidden" onChange={async (e) => {
                                                        const url = await handleUploadImage(e.target.files[0]);
                                                        if (url) {
                                                            const newImgs = [...(pageData.cakeGrid.images || ['', '', '', '', '', '', ''])];
                                                            newImgs[i] = url;
                                                            updateAll({ ...pageData, cakeGrid: { ...pageData.cakeGrid, images: newImgs } });
                                                        }
                                                    }} />
                                                </label>
                                            </div>
                                            <p className="text-[9px] text-center text-[#5A2A45] font-bold uppercase opacity-50">Tier {i < 1 ? '1' : i < 3 ? '2' : i < 5 ? '3' : '4'}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* BIRTHDAY TABS CONTENT */}
                {activeTab === 'hero' && isBirthday && (
                    <div className="max-w-[1240px] space-y-12">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#5A2A45]">Hero & Atmosphere</h2>
                            <button onClick={() => updateAll({
                                ...pageData,
                                hero: {
                                    ...pageData.hero,
                                    title: document.getElementById('b-title').value,
                                    subtitle: document.getElementById('b-subtitle').value,
                                    tagline: document.getElementById('b-tagline').value,
                                }
                            })} className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl flex items-center gap-2">
                                <Save size={16} /> Save Hero
                            </button>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Main Headline</label>
                                    <input id="b-title" defaultValue={pageData.hero?.title} className="w-full p-4 bg-[#F9F7F2] rounded-2xl font-display text-2xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Subtitle</label>
                                    <input id="b-subtitle" defaultValue={pageData.hero?.subtitle} className="w-full p-4 bg-[#F9F7F2] rounded-2xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Tagline</label>
                                    <input id="b-tagline" defaultValue={pageData.hero?.tagline} className="w-full p-4 bg-[#F9F7F2] rounded-2xl italic" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Background Image</label>
                                <div className="aspect-video bg-[#F9F7F2] rounded-3xl relative group overflow-hidden border border-[#5A2A45]/10">
                                    <img src={pageData.hero?.backgroundImage || 'https://via.placeholder.com/800x450'} className="w-full h-full object-cover" />
                                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-xs uppercase font-bold tracking-widest">
                                        Update Backdrop
                                        <input type="file" className="hidden" onChange={async (e) => {
                                            const url = await handleUploadImage(e.target.files[0]);
                                            if (url) updateAll({ ...pageData, hero: { ...pageData.hero, backgroundImage: url } });
                                        }} />
                                    </label>
                                </div>

                                <div className="pt-4">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-4">Floating Atmosphere Images (Recommended 3)</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[0, 1, 2].map((idx) => (
                                            <div key={idx} className="aspect-square bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10">
                                                <img src={pageData.hero?.floatingImages?.[idx] || 'https://via.placeholder.com/200'} className="w-full h-full object-cover" />
                                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-[10px] text-white font-bold uppercase tracking-tighter">
                                                    Upload
                                                    <input type="file" className="hidden" onChange={async (e) => {
                                                        const url = await handleUploadImage(e.target.files[0]);
                                                        if (url) {
                                                            const newFloats = [...(pageData.hero.floatingImages || [])];
                                                            while (newFloats.length <= idx) newFloats.push('');
                                                            newFloats[idx] = url;
                                                            updateAll({ ...pageData, hero: { ...pageData.hero, floatingImages: newFloats } });
                                                        }
                                                    }} />
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'intro' && isBirthday && (
                    <div className="max-w-4xl space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#5A2A45]">Birthday Narrative</h2>
                            <button onClick={() => updateAll({
                                ...pageData,
                                intro: {
                                    ...pageData.intro,
                                    title: document.getElementById('bi-title').value,
                                    description: document.getElementById('bi-desc').value,
                                }
                            })} className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl flex items-center gap-2">
                                <Save size={16} /> Save Narrative
                            </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Story Title</label>
                                    <input id="bi-title" defaultValue={pageData.intro?.title} className="w-full p-4 bg-[#F9F7F2] rounded-2xl font-display text-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Narrative Content</label>
                                    <textarea id="bi-desc" defaultValue={pageData.intro?.description} rows="6" className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Narrative Image</label>
                                <div className="aspect-[3/4] bg-[#F9F7F2] rounded-3xl relative group overflow-hidden">
                                    <img src={pageData.intro?.image || 'https://via.placeholder.com/600x800'} className="w-full h-full object-cover" />
                                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-xs uppercase font-bold tracking-widest">
                                        Update Image
                                        <input type="file" className="hidden" onChange={async (e) => {
                                            const url = await handleUploadImage(e.target.files[0]);
                                            if (url) updateAll({ ...pageData, intro: { ...pageData.intro, image: url } });
                                        }} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'themes' && isBirthday && (
                    <div className="space-y-12">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#5A2A45]">Theme Collections</h2>
                            <button onClick={() => {
                                const newThemes = [...(pageData.themes || []), { title: 'New Theme', description: 'Describe the setup...', image: '' }];
                                updateAll({ ...pageData, themes: newThemes });
                            }} className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl flex items-center gap-2">
                                <Plus size={16} /> Add Theme
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {pageData.themes?.map((theme, i) => (
                                <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-[#5A2A45]/10 shadow-sm relative group space-y-4">
                                    <button
                                        onClick={() => {
                                            if (confirm("Delete this theme?")) {
                                                const updated = pageData.themes.filter((_, idx) => idx !== i);
                                                updateAll({ ...pageData, themes: updated });
                                            }
                                        }}
                                        className="absolute top-4 right-4 p-2 bg-rose-100 text-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    <div className="aspect-[16/10] rounded-[2rem] overflow-hidden bg-[#F9F7F2] relative">
                                        <img src={theme.image || 'https://via.placeholder.com/600x400'} className="w-full h-full object-cover" />
                                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-xs text-white font-bold uppercase tracking-widest transition-opacity">
                                            Update Image
                                            <input type="file" className="hidden" onChange={async (e) => {
                                                const url = await handleUploadImage(e.target.files[0]);
                                                if (url) {
                                                    const updated = [...pageData.themes];
                                                    updated[i].image = url;
                                                    updateAll({ ...pageData, themes: updated });
                                                }
                                            }} />
                                        </label>
                                    </div>

                                    <div className="space-y-2">
                                        <input
                                            defaultValue={theme.title}
                                            className="w-full p-2 text-xl font-display text-[#5A2A45] bg-transparent border-b border-transparent focus:border-[#5A2A45]/20 outline-none"
                                            placeholder="Theme Title"
                                            onChange={(e) => {
                                                const updated = [...pageData.themes];
                                                updated[i].title = e.target.value;
                                                setPageData({ ...pageData, themes: updated });
                                            }}
                                        />
                                        <textarea
                                            defaultValue={theme.description}
                                            className="w-full p-2 text-sm text-[#6E5A52] bg-transparent outline-none resize-none"
                                            placeholder="Description..."
                                            rows="3"
                                            onChange={(e) => {
                                                const updated = [...pageData.themes];
                                                updated[i].description = e.target.value;
                                                setPageData({ ...pageData, themes: updated });
                                            }}
                                        />
                                        <div className="flex justify-end">
                                            <button onClick={() => updateAll(pageData)} className="text-[10px] font-bold uppercase tracking-widest text-[#5A2A45]/40 hover:text-[#5A2A45] transition-colors">Confirm Text Changes</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'videos' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#5A2A45]">{isBirthday ? 'Birthday Cinematic Clips' : 'Video Showcase'}</h2>
                            <span className="text-xs bg-[#F9F7F2] px-3 py-1 rounded-full text-[#6E5A52] font-bold">{pageData.videos?.length || 0} / 2 videos</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Upload New Video Slot */}
                            {(!pageData.videos || pageData.videos.length < 2) && (
                                <label className="aspect-[9/16] bg-[#F9F7F2] rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-dashed border-[#5A2A45]/20 cursor-pointer hover:bg-[#5A2A45]/5 transition-all group overflow-hidden">
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                        <Plus className="text-[#5A2A45]" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Upload {isBirthday ? 'Magic' : 'Video'}</p>
                                    <p className="text-[10px] text-[#5A2A45]/50 mt-1 px-4 text-center">Vertical (9:16) recommended</p>
                                    <input type="file" className="hidden" accept="video/*" onChange={async (e) => {
                                        const url = await handleUploadImage(e.target.files[0]);
                                        if (url) {
                                            const updatedVideos = [...(pageData.videos || []), url];
                                            updateAll({ ...pageData, videos: updatedVideos });
                                        }
                                    }} />
                                </label>
                            )}

                            {/* Existing Videos */}
                            {pageData.videos?.map((vid, i) => (
                                <div key={i} className="aspect-[9/16] relative group rounded-[2.5rem] overflow-hidden shadow-xl bg-black border border-[#5A2A45]/10">
                                    <video src={vid} className="w-full h-full object-cover" controls muted />
                                    <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                                        <span className="text-[10px] text-white font-bold uppercase tracking-tighter">Slot {i + 1}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (confirm("Remove this video?")) {
                                                const updated = pageData.videos.filter((_, idx) => idx !== i);
                                                updateAll({ ...pageData, videos: updated });
                                            }
                                        }}
                                        className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'cta' && isBirthday && (
                    <div className="max-w-4xl space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#5A2A45]">Birthday Ending CTA</h2>
                            <button onClick={() => updateAll({
                                ...pageData,
                                cta: {
                                    ...pageData.cta,
                                    title: document.getElementById('bc-title').value,
                                    text: document.getElementById('bc-text').value,
                                    buttonText: document.getElementById('bc-btn').value,
                                    buttonLink: document.getElementById('bc-link').value,
                                }
                            })} className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl flex items-center gap-2">
                                <Save size={16} /> Save CTA
                            </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">CTA Headline</label>
                                    <input id="bc-title" defaultValue={pageData.cta?.title} className="w-full p-4 bg-[#F9F7F2] rounded-2xl font-display text-2xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">CTA Description</label>
                                    <textarea id="bc-text" defaultValue={pageData.cta?.text} rows="4" className="w-full p-4 bg-[#F9F7F2] rounded-2xl" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Button Text</label>
                                    <input id="bc-btn" defaultValue={pageData.cta?.buttonText} className="w-full p-4 bg-[#F9F7F2] rounded-2xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Button Link</label>
                                    <input id="bc-link" defaultValue={pageData.cta?.buttonLink} className="w-full p-4 bg-[#F9F7F2] rounded-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* PRE-BIRTHDAY CTA TAB */}
                {activeTab === 'cta' && isPreBirthday && (
                    <div className="max-w-4xl space-y-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-display text-2xl text-[#5A2A45]">CTA Section Content</h2>
                            <button
                                onClick={() => updateAll({
                                    ...pageData,
                                    cta: {
                                        title: document.getElementById('pb-cta-title').value,
                                        description: document.getElementById('pb-cta-desc').value,
                                        buttonText: document.getElementById('pb-cta-btn').value,
                                        buttonLink: document.getElementById('pb-cta-link').value,
                                    }
                                })}
                                disabled={saving}
                                className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl flex items-center gap-2"
                            >
                                <Save size={16} /> {saving ? 'Saving...' : 'Save CTA Content'}
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Headline</label>
                                    <textarea id="pb-cta-title" defaultValue={pageData.cta?.title} rows="3" className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none font-display text-2xl" placeholder="Use <br /> for line breaks" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Description</label>
                                    <textarea id="pb-cta-desc" defaultValue={pageData.cta?.description} rows="4" className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none text-sm leading-relaxed" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Button Text</label>
                                    <input id="pb-cta-btn" defaultValue={pageData.cta?.buttonText} className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Button Link</label>
                                    <input id="pb-cta-link" defaultValue={pageData.cta?.buttonLink} className="w-full p-4 bg-[#F9F7F2] rounded-2xl outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* 3. WELCOME TAB (For categories using the generic welcome section) */}
                {activeTab === 'welcome' && !isMaternity && !isBaby && !isFamily && !isHospital && !isCakeSmash && (
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

                {/* ADVENTURE MODAL TAB (Baby Only) */}
                {activeTab === 'adventure' && isBaby && (
                    <div className="space-y-12">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl text-[#5A2A45]">Adventure Modal Content</h2>
                            <button onClick={() => updateAll({
                                ...pageData,
                                adventureModal: {
                                    ...pageData.adventureModal,
                                    content: document.getElementById('adv-content').value
                                }
                            })} className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs uppercase font-bold shadow-lg">
                                {saving ? 'Saving...' : 'SAVE MODAL CONTENT'}
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-4 text-center">Top Hero Image</label>
                                    <div className="aspect-video bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10 shadow-md">
                                        <img src={pageData.adventureModal?.topImage} className="w-full h-full object-cover" />
                                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity text-center px-4">
                                            Change Top Image
                                            <input type="file" className="hidden" onChange={async (e) => {
                                                const url = await handleUploadImage(e.target.files[0]);
                                                if (url) updateAll({ ...pageData, adventureModal: { ...pageData.adventureModal, topImage: url } });
                                            }} />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-4 text-center">Vertical side Image</label>
                                    <div className="aspect-[3/4] max-w-[300px] mx-auto bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10 shadow-md">
                                        <img src={pageData.adventureModal?.sideImage} className="w-full h-full object-cover" />
                                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity text-center px-4">
                                            Change Side Image
                                            <input type="file" className="hidden" onChange={async (e) => {
                                                const url = await handleUploadImage(e.target.files[0]);
                                                if (url) updateAll({ ...pageData, adventureModal: { ...pageData.adventureModal, sideImage: url } });
                                            }} />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Modal Story Content</label>
                                <textarea
                                    id="adv-content"
                                    defaultValue={pageData.adventureModal?.content}
                                    rows={15}
                                    className="w-full p-6 bg-[#F9F7F2] rounded-2xl outline-none font-outfit text-gray-600 leading-relaxed resize-none"
                                    placeholder="Enter the full adventure story here..."
                                />
                                <p className="text-[10px] text-[#8F8A86] italic uppercase tracking-wider">Note: This content appears when users click the 'My Full Adventure' button.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* HOSPITAL HERO TAB */}
                {isHospital && activeTab === 'hero' && (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        let img = pageData.hero.image;
                        if (fd.get('newHero')?.size > 0) img = await handleUploadImage(fd.get('newHero'));
                        updateAll({
                            ...pageData,
                            hero: {
                                title: fd.get('title'),
                                description: fd.get('desc'),
                                buttonText: fd.get('btn'),
                                image: img
                            }
                        }, updateHospitalPage);
                    }} className="max-w-4xl space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Hospital Title</label>
                                    <input name="title" defaultValue={pageData.hero.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Hero Description</label>
                                    <textarea name="desc" defaultValue={pageData.hero.description} rows={6} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none resize-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Button Text</label>
                                    <input name="btn" defaultValue={pageData.hero.buttonText} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">
                                    {saving ? 'Saving...' : 'SAVE HERO'}
                                </button>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Main Hero Image</label>
                                <div className="aspect-video bg-[#F9F7F2] rounded-xl relative group overflow-hidden border-2 border-dashed border-[#5A2A45]/20">
                                    <img src={pageData.hero.image} className="w-full h-full object-cover" />
                                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] font-bold">
                                        CHANGE PHOTO <input type="file" name="newHero" className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                )}

                {isHospital && activeTab === 'categories' && (
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-3xl border border-[#5A2A45]/10 shadow-sm mb-8">
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Categories Section Title (Hand-written style)</label>
                            <div className="flex gap-4">
                                <input
                                    defaultValue={pageData.categoriesSection?.title}
                                    className="flex-grow p-4 bg-[#F9F7F2] rounded-xl outline-none font-display text-2xl"
                                    placeholder="e.g., Current Obsessions"
                                    onChange={(e) => setPageData({ ...pageData, categoriesSection: { ...pageData.categoriesSection, title: e.target.value } })}
                                />
                                <button onClick={() => updateAll(pageData, updateHospitalPage)} className="bg-[#5A2A45] text-white px-8 py-2 rounded-xl text-xs font-bold uppercase">
                                    {saving ? 'Saving...' : 'SAVE TITLE'}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Hospital Categories</h3>
                            <button onClick={async () => {
                                const newCats = [...pageData.categories];
                                newCats.push({ title: 'New Category', description: 'Description', image: '', link: '/portfolio/hospital/new' });
                                updateAll({ ...pageData, categories: newCats }, updateHospitalPage);
                            }} className="bg-[#5A2A45] text-white px-4 py-2 rounded-full text-xs uppercase font-bold flex items-center gap-2">
                                <Plus size={14} /> Add Category
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {pageData.categories.map((cat, index) => (
                                <div key={index} className="bg-[#F9F7F2] p-4 rounded-2xl border border-[#5A2A45]/10 space-y-4">
                                    <div className="aspect-[4/5] rounded-xl overflow-hidden relative group">
                                        <img src={cat.image} className="w-full h-full object-cover" />
                                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] font-bold">
                                            CHANGE <input type="file" className="hidden" onChange={async (e) => {
                                                const url = await handleUploadImage(e.target.files[0]);
                                                if (url) {
                                                    const newCats = [...pageData.categories];
                                                    newCats[index].image = url;
                                                    updateAll({ ...pageData, categories: newCats }, updateHospitalPage);
                                                }
                                            }} />
                                        </label>
                                    </div>
                                    <input
                                        defaultValue={cat.title}
                                        className="w-full p-2 bg-white rounded-lg outline-none font-bold text-[#5A2A45]"
                                        onChange={(e) => {
                                            const newCats = [...pageData.categories];
                                            newCats[index].title = e.target.value;
                                            setPageData({ ...pageData, categories: newCats });
                                        }}
                                    />
                                    <textarea
                                        defaultValue={cat.description}
                                        rows={3}
                                        className="w-full p-2 bg-white rounded-lg outline-none text-xs text-gray-600"
                                        onChange={(e) => {
                                            const newCats = [...pageData.categories];
                                            newCats[index].description = e.target.value;
                                            setPageData({ ...pageData, categories: newCats });
                                        }}
                                    />
                                    <div className="flex justify-between items-center">
                                        <input
                                            defaultValue={cat.link}
                                            className="p-1 text-[10px] bg-white rounded-md outline-none text-gray-400"
                                            onChange={(e) => {
                                                const newCats = [...pageData.categories];
                                                newCats[index].link = e.target.value;
                                                setPageData({ ...pageData, categories: newCats });
                                            }}
                                        />
                                        <button onClick={() => {
                                            const newCats = pageData.categories.filter((_, i) => i !== index);
                                            updateAll({ ...pageData, categories: newCats }, updateHospitalPage);
                                        }} className="text-red-400 hover:text-red-600">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <button onClick={() => updateAll(pageData, updateHospitalPage)} className="w-full bg-[#5A2A45]/10 text-[#5A2A45] py-2 rounded-lg text-xs font-bold uppercase hover:bg-[#5A2A45] hover:text-white transition-all">
                                        Save Changes
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* HOSPITAL SESSIONS TAB */}
                {isHospital && activeTab === 'sessions' && (
                    <div className="space-y-12">
                        <div className="border-b border-[#5A2A45]/10 pb-4">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Sub-Session Galleries</h3>
                            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Manage fresh 48, birth story, and family sessions.</p>
                        </div>

                        <div className="space-y-16">
                            {(pageData.sessions || []).map((session, sIndex) => (
                                <div key={sIndex} className="bg-white p-8 rounded-3xl shadow-sm border border-[#5A2A45]/5 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-display text-xl text-[#5A2A45] capitalize">{session.type} Session</h4>
                                        <button
                                            onClick={async () => {
                                                setSaving(true);
                                                try {
                                                    await updateHospitalSession(session.type, session);
                                                    setMessage({ type: 'success', text: `${session.type} session updated successfully!` });
                                                } catch (err) {
                                                    setMessage({ type: 'error', text: 'Failed to update session.' });
                                                } finally {
                                                    setSaving(false);
                                                }
                                            }}
                                            className="bg-[#5A2A45] text-white px-6 py-2 rounded-full text-xs font-bold uppercase shadow-md active:scale-95 transition-all"
                                        >
                                            {saving ? 'Saving...' : `SAVE ${session.type.toUpperCase()} SESSION`}
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-8">
                                        <div className="space-y-4">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Display Title</label>
                                            <input
                                                defaultValue={session.hero?.title || session.type}
                                                className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-display text-lg"
                                                onChange={(e) => {
                                                    const newSessions = [...pageData.sessions];
                                                    newSessions[sIndex].hero = { ...newSessions[sIndex].hero, title: e.target.value };
                                                    setPageData({ ...pageData, sessions: newSessions });
                                                }}
                                            />
                                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mt-4">Meta Text</label>
                                            <textarea
                                                defaultValue={session.hero?.text}
                                                rows={4}
                                                className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none text-sm text-gray-600"
                                                onChange={(e) => {
                                                    const newSessions = [...pageData.sessions];
                                                    newSessions[sIndex].hero = { ...newSessions[sIndex].hero, text: e.target.value };
                                                    setPageData({ ...pageData, sessions: newSessions });
                                                }}
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-4">Gallery Images (Puzzle Grid)</label>
                                            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                                                {Array.from({ length: 12 }).map((_, i) => {
                                                    const url = session.puzzleImages?.[i] || '';
                                                    return (
                                                        <div key={i} className="aspect-square bg-[#F9F7F2] rounded-lg relative group overflow-hidden border border-[#5A2A45]/5">
                                                            <img src={url} className="w-full h-full object-cover" />
                                                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                                                                <input type="file" className="hidden" onChange={async (e) => {
                                                                    const uploadedUrl = await handleUploadImage(e.target.files[0]);
                                                                    if (uploadedUrl) {
                                                                        const newSessions = [...pageData.sessions];
                                                                        const newImgs = [...(newSessions[sIndex].puzzleImages || [])];
                                                                        while (newImgs.length <= i) newImgs.push('');
                                                                        newImgs[i] = uploadedUrl;
                                                                        newSessions[sIndex].puzzleImages = newImgs;
                                                                        setPageData({ ...pageData, sessions: newSessions });
                                                                    }
                                                                }} />
                                                                <Upload size={14} className="text-white" />
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
                                <input id="j-toptext" defaultValue={pageData.journey.topText} placeholder="Small Top Text (e.g. Every Kick...)" className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none mb-2" />
                                <input id="j-title" defaultValue={pageData.journey.title} placeholder="Title" className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none mb-2" />
                                <input id="j-subtitle" defaultValue={pageData.journey.subtitle} placeholder="Subtitle" className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none mb-2" />
                                <input id="j-midtext" defaultValue={pageData.journey.midGalleryText} placeholder="Mid-Gallery Text (e.g. Visual Poetry)" className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                <button onClick={() => updateAll({
                                    ...pageData,
                                    journey: {
                                        ...pageData.journey,
                                        topText: document.getElementById('j-toptext').value,
                                        title: document.getElementById('j-title').value,
                                        subtitle: document.getElementById('j-subtitle').value,
                                        midGalleryText: document.getElementById('j-midtext').value
                                    }
                                })}
                                    className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl active:scale-[0.98]">
                                    {saving ? 'Saving...' : 'SAVE TEXT'}
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Timeline Images (Fixed 10 Slots)</label>
                                    <span className="text-[10px] text-[#B77A8C] font-bold uppercase">5 images - Text - 5 images</span>
                                </div>
                                <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                    {Array.from({ length: 10 }).map((_, i) => {
                                        const img = pageData.journey.images[i] || '';
                                        return (
                                            <div key={i} className="flex items-center gap-4 bg-[#F9F7F2] p-4 rounded-2xl border border-[#5A2A45]/5 group">
                                                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-white flex items-center justify-center">
                                                    <img src={img || mImg5} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-[#5A2A45] font-bold text-xs uppercase mb-1">Image Slot {i + 1}</p>
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
                                                                    updateAll({ ...pageData, journey: { ...pageData.journey, images: newImages.slice(0, 10) } });
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



                {activeTab === 'stories' && isFamily && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Selected Stories</h3>
                            <div className="flex gap-4">
                                <button onClick={() => {
                                    // Scrape current text values first to avoid losing unsaved edits when adding
                                    const cards = document.querySelectorAll('.story-card');
                                    const currentWorks = Array.from(cards).map((card, index) => ({
                                        image: pageData.selectedWorks[index]?.image || '',
                                        title: card.querySelector('.story-title-input').value,
                                        subtitle: card.querySelector('.story-subtitle-input').value
                                    }));
                                    // Add new item
                                    updateAll({ ...pageData, selectedWorks: [...currentWorks, { title: 'New Story', subtitle: 'Subtitle', image: '' }] });
                                }} className="bg-[#5A2A45] text-white px-4 py-2 rounded-full text-xs uppercase font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
                                    <Plus size={14} /> Add Pattern
                                </button>
                                <button onClick={() => {
                                    const cards = document.querySelectorAll('.story-card');
                                    const newWorks = Array.from(cards).map((card, index) => ({
                                        image: pageData.selectedWorks[index]?.image || '', // Preserve image from state
                                        title: card.querySelector('.story-title-input').value,
                                        subtitle: card.querySelector('.story-subtitle-input').value
                                    }));
                                    updateAll({ ...pageData, selectedWorks: newWorks });
                                }} className="bg-green-600 text-white px-6 py-2 rounded-full text-xs uppercase font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all">
                                    {saving ? 'Saving...' : 'Save All Changes'}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {(pageData.selectedWorks || []).map((work, index) => (
                                <div key={index} className="story-card bg-[#F9F7F2] p-4 md:p-6 rounded-2xl border border-[#5A2A45]/10 shadow-sm relative flex flex-col md:flex-row gap-6 items-start">
                                    <button
                                        onClick={() => {
                                            const newWorks = pageData.selectedWorks.filter((_, i) => i !== index);
                                            updateAll({ ...pageData, selectedWorks: newWorks });
                                        }}
                                        className="absolute top-2 right-2 text-red-300 hover:text-red-500 p-2"
                                        title="Remove"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    <div className="w-full md:w-32 aspect-[4/5] bg-white rounded-xl overflow-hidden shadow-sm relative group/img flex-shrink-0">
                                        <img src={work.image || familyPortrait2Default} className="w-full h-full object-cover" />
                                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity text-center px-1">
                                            Change
                                            <input type="file" className="hidden" onChange={async (e) => {
                                                const url = await handleUploadImage(e.target.files[0]);
                                                if (url) {
                                                    const newWorks = [...pageData.selectedWorks];
                                                    // We must also preserve current text inputs from DOM to avoid overwriting with stale state
                                                    const cards = document.querySelectorAll('.story-card');
                                                    cards.forEach((card, i) => {
                                                        if (newWorks[i]) {
                                                            newWorks[i].title = card.querySelector('.story-title-input').value;
                                                            newWorks[i].subtitle = card.querySelector('.story-subtitle-input').value;
                                                        }
                                                    });

                                                    newWorks[index].image = url;
                                                    updateAll({ ...pageData, selectedWorks: newWorks });
                                                }
                                            }} />
                                        </label>
                                    </div>

                                    <div className="flex-grow w-full space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-1">Title</label>
                                            <input
                                                className="story-title-input w-full p-3 bg-white rounded-lg outline-none font-display text-lg text-[#5A2A45]"
                                                defaultValue={work.title}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-1">Subtitle</label>
                                            <input
                                                className="story-subtitle-input w-full p-3 bg-white rounded-lg outline-none font-outfit text-sm text-[#8F8A86]"
                                                defaultValue={work.subtitle}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {(pageData.selectedWorks?.length === 0) && (
                                <div className="text-center py-12 text-[#8F8A86]">
                                    <p>No stories added yet. Click "Add Pattern" to start.</p>
                                </div>
                            )}
                        </div>
                    </div>
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
                                {saving ? 'Saving...' : 'SAVE ARCH GRID'}
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

                {activeTab === 'collage' && isFamily && (
                    <div className="space-y-12">
                        <div className="flex items-center justify-between">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Holiday Collage Grid (5 Images)</h3>
                            <button onClick={() => updateAll({
                                ...pageData,
                                collage: {
                                    ...pageData.collage,
                                    title: document.getElementById('collage-title').value,
                                    subtitle: document.getElementById('collage-subtitle').value
                                }
                            })}
                                className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs uppercase font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all">
                                {saving ? 'Saving...' : 'SAVE COLLAGE'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {[
                                { label: 'Top Left', desc: 'Landscape' },
                                { label: 'Bottom Left', desc: 'Portrait' },
                                { label: 'Center Arch', desc: 'Main Focus' },
                                { label: 'Top Right', desc: 'Landscape' },
                                { label: 'Bottom Right', desc: 'Portrait' }
                            ].map((slot, i) => {
                                const images = pageData.collage?.images || [];
                                const img = images[i] || '';
                                return (
                                    <div key={i} className="space-y-2 group">
                                        <div className="flex flex-col items-center">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A2A45]">{slot.label}</label>
                                            <span className="text-[8px] uppercase text-[#8F8A86]">{slot.desc}</span>
                                        </div>
                                        <div className="aspect-[4/5] bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10 shadow-md">
                                            <img src={img || (i === 2 ? familyStoryDefault : familyDetail1Default)} className="w-full h-full object-cover" />
                                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity text-center px-4">
                                                Change {slot.label}
                                                <input type="file" className="hidden" onChange={async (e) => {
                                                    const url = await handleUploadImage(e.target.files[0]);
                                                    if (url) {
                                                        const newImgs = [...(pageData.collage?.images || [])];
                                                        while (newImgs.length <= i) newImgs.push('');
                                                        newImgs[i] = url;
                                                        updateAll({ ...pageData, collage: { ...pageData.collage, images: newImgs.slice(0, 5) } });
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
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Main Title</label>
                                    <input id="collage-title" defaultValue={pageData.collage?.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-display text-2xl" placeholder="HAPPIEST HOLIDAYS" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Subtitle / Caption</label>
                                    <input id="collage-subtitle" defaultValue={pageData.collage?.subtitle} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-outfit" placeholder="warm wishes from the arlington family" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- CAKE SMASH SPECIFIC TABS --- */}

                {activeTab === 'hero' && isCakeSmash && (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        let bg = pageData.hero.backgroundImage;
                        if (fd.get('newBg')?.size > 0) bg = await handleUploadImage(fd.get('newBg'));
                        updateAll({
                            ...pageData,
                            hero: {
                                ...pageData.hero,
                                tagline: fd.get('tagline'),
                                title: fd.get('title'),
                                subtitle: fd.get('subtitle'),
                                backgroundImage: bg
                            }
                        });
                    }} className="max-w-4xl space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Hero Background</label>
                                <div className="aspect-video bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10">
                                    <img src={pageData.hero.backgroundImage} className="w-full h-full object-cover" />
                                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity">
                                        Change Background
                                        <input type="file" name="newBg" className="hidden" />
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Display Tagline</label>
                                    <input name="tagline" defaultValue={pageData.hero.tagline || 'The Birthday Collection'} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" placeholder="e.g. The Birthday Collection" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Service Title</label>
                                    <input name="title" defaultValue={pageData.hero.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-display text-2xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Subtitle</label>
                                    <input name="subtitle" defaultValue={pageData.hero.subtitle} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                                </div>
                                <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl active:scale-[0.98]">
                                    {saving ? 'Saving...' : 'SAVE HERO'}
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {activeTab === 'intro' && isCakeSmash && (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        updateAll({
                            ...pageData,
                            celebrationText: {
                                title: fd.get('title'),
                                description: fd.get('description')
                            }
                        });
                    }} className="max-w-2xl space-y-6">
                        <h2 className="font-display text-2xl text-[#5A2A45] mb-4">Intro Celebration Text</h2>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Title</label>
                            <input name="title" defaultValue={pageData.celebrationText?.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-display text-xl" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Description</label>
                            <textarea name="description" defaultValue={pageData.celebrationText?.description} rows={6} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none resize-none" />
                        </div>
                        <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">
                            {saving ? 'Saving...' : 'SAVE INTRO'}
                        </button>
                    </form>
                )}

                {activeTab === 'giftGrid' && isCakeSmash && (
                    <div className="space-y-12">
                        <div className="flex items-center justify-between">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Sweet Celebration Gift Tray (4 Images)</h3>
                            <button onClick={() => updateAll({
                                ...pageData,
                                giftGrid: {
                                    ...pageData.giftGrid,
                                    title: document.getElementById('cake-gift-title').value,
                                    tagline: document.getElementById('cake-gift-tagline').value
                                }
                            })}
                                className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs uppercase font-bold shadow-lg hover:brightness-110 transition-all">
                                {saving ? 'Saving...' : 'SAVE TRAY CHANGES'}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[0, 1, 2, 3].map((i) => {
                                const images = pageData.giftGrid?.images || ['', '', '', ''];
                                const img = images[i] || '';
                                return (
                                    <div key={i} className="space-y-2 group">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] text-center">Slot {i + 1}</label>
                                        <div className="aspect-square bg-[#F9F7F2] rounded-2xl relative group overflow-hidden border border-[#5A2A45]/10 shadow-md">
                                            <img src={img} className="w-full h-full object-cover" />
                                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity text-center px-4">
                                                Update Slot {i + 1}
                                                <input type="file" className="hidden" onChange={async (e) => {
                                                    const url = await handleUploadImage(e.target.files[0]);
                                                    if (url) {
                                                        const newImgs = [...(pageData.giftGrid?.images || ['', '', '', ''])];
                                                        newImgs[i] = url;
                                                        updateAll({ ...pageData, giftGrid: { ...pageData.giftGrid, images: newImgs } });
                                                    }
                                                }} />
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Tray Title</label>
                                <input id="cake-gift-title" defaultValue={pageData.giftGrid?.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-display text-xl" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Artistic Tagline (Hand-written style)</label>
                                <input id="cake-gift-tagline" defaultValue={pageData.giftGrid?.tagline} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-display italic" placeholder="e.g. Hand-crafted moments" />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'hanging' && isCakeSmash && (
                    <div className="space-y-12">
                        <div className="flex items-center justify-between">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Hanging Gallery (3 Circular Images)</h3>
                            <button onClick={() => updateAll({
                                ...pageData,
                                hangingGrid: {
                                    ...pageData.hangingGrid,
                                    title: document.getElementById('cake-hang-title').value,
                                    tagline: document.getElementById('cake-hang-tagline').value
                                }
                            })}
                                className="bg-[#5A2A45] text-white px-8 py-3 rounded-full text-xs uppercase font-bold shadow-lg hover:brightness-110 transition-all">
                                {saving ? 'Saving...' : 'SAVE GALLERY CHANGES'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[0, 1, 2].map((i) => {
                                const images = pageData.hangingGrid?.images || ['', '', ''];
                                const img = images[i] || '';
                                return (
                                    <div key={i} className="flex flex-col items-center gap-4">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A2A45]">Slot {i + 1}</label>
                                        <div className="w-48 h-48 rounded-full bg-[#F9F7F2] relative group overflow-hidden border-4 border-white shadow-xl">
                                            <img src={img} className="w-full h-full object-cover" />
                                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] uppercase font-bold tracking-widest transition-opacity text-center px-4">
                                                Update Image
                                                <input type="file" className="hidden" onChange={async (e) => {
                                                    const url = await handleUploadImage(e.target.files[0]);
                                                    if (url) {
                                                        const newImgs = [...(pageData.hangingGrid?.images || ['', '', ''])];
                                                        newImgs[i] = url;
                                                        updateAll({ ...pageData, hangingGrid: { ...pageData.hangingGrid, images: newImgs } });
                                                    }
                                                }} />
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Gallery Title</label>
                                <input id="cake-hang-title" defaultValue={pageData.hangingGrid?.title} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-display text-xl" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Tagline (e.g. The Gallery)</label>
                                <input id="cake-hang-tagline" defaultValue={pageData.hangingGrid?.tagline} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'cta' && isCakeSmash && (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        updateAll({
                            ...pageData,
                            cta: {
                                title: fd.get('title'),
                                buttonText: fd.get('buttonText'),
                                buttonLink: fd.get('buttonLink')
                            }
                        });
                    }} className="max-w-2xl space-y-6">
                        <h2 className="font-display text-2xl text-[#5A2A45] mb-4">Footer Call to Action</h2>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">CTA Title</label>
                            <input name="title" defaultValue={pageData.cta?.title || "Let's Plan the Party!"} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-display text-xl" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Button Text</label>
                                <input name="buttonText" defaultValue={pageData.cta?.buttonText || "Book A Session"} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-2">Button Link</label>
                                <input name="buttonLink" defaultValue={pageData.cta?.buttonLink || "/contact"} className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none" placeholder="/contact" />
                            </div>
                        </div>
                        <button type="submit" disabled={saving} className="w-full bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl hover:brightness-110 transition-all">
                            {saving ? 'Saving...' : 'SAVE CTA SECTION'}
                        </button>
                    </form>
                )}

            </div>
        </div>
    );
};

export default ManageCategory;
