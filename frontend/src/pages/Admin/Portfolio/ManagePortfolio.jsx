import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Save, Upload, Plus, Trash2, Edit2, X, CheckCircle, Layout, Layers, Type, Heart } from 'lucide-react';
import { getPortfolioPage, updatePortfolioPage, uploadImage } from '../../../services/api';

// Default Image Imports for Seeding (Fallback UI)
import newbornImg from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153410.png';
import maternityImg from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225737.png';
import babyImg from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153257.png';
import familyImg from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153401.png';

const ManagePortfolio = () => {
    const [activeTab, setActiveTab] = useState('categories');
    const [loading, setLoading] = useState(true);
    const [pageData, setPageData] = useState({
        hero: { titleLine1: '', titleLine2: '', subtext1: '', subtext2: '', strip1: [], strip2: [], strip3: [] },
        categories: [],
        experience: { titleLine1: '', titleLine2: '', buttonText: '', buttonLink: '' }
    });
    const [saving, setSaving] = useState(false);

    // Edit Category Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getPortfolioPage();
            if (res.data.data || res.data) {
                const data = res.data.data || res.data;
                setPageData({
                    hero: data.hero || { titleLine1: 'Port', titleLine2: 'folio', subtext1: '/ Est. 2012 /', subtext2: '/ Dehradun /', strip1: [], strip2: [], strip3: [] },
                    categories: data.categories || [],
                    experience: data.experience || { titleLine1: 'Every moment', titleLine2: 'is a masterpiece.', buttonText: 'Book Your Story', buttonLink: '/contact' }
                });
            }
        } catch (error) {
            console.error("Failed to fetch portfolio page", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await uploadImage(formData);
            return res.data.url;
        } catch (error) {
            console.error("Upload failed", error);
            alert("Image upload failed");
            return null;
        }
    };

    const handleSaveAll = async (updatedData = pageData) => {
        setSaving(true);
        try {
            await updatePortfolioPage(updatedData);
            setPageData(updatedData);
        } catch (error) {
            console.error("Save failed", error);
            alert("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    // --- HERO BRANDING HANDLERS ---
    const handleHeroTextChange = (e) => {
        const { name, value } = e.target;
        setPageData(prev => ({
            ...prev,
            hero: { ...prev.hero, [name]: value }
        }));
    };

    // --- HERO STRIPS HANDLERS ---
    const handleAddHeroImage = async (stripName, file) => {
        if (!file) return;
        const url = await handleUploadImage(file);
        if (url) {
            const updatedHero = {
                ...pageData.hero,
                [stripName]: [...(pageData.hero[stripName] || []), url]
            };
            handleSaveAll({ ...pageData, hero: updatedHero });
        }
    };

    const handleRemoveHeroImage = (stripName, index) => {
        const updatedStrip = [...(pageData.hero[stripName] || [])];
        updatedStrip.splice(index, 1);
        const updatedHero = { ...pageData.hero, [stripName]: updatedStrip };
        handleSaveAll({ ...pageData, hero: updatedHero });
    };

    // --- CATEGORIES HANDLERS ---
    const openEditCategory = (cat) => {
        setCurrentCategory(cat);
        setEditForm({ ...cat });
        setIsEditModalOpen(true);
    };

    const handleCategorySave = async () => {
        let imageUrl = editForm.image;
        if (editForm.newImageFile) {
            const url = await handleUploadImage(editForm.newImageFile);
            if (url) imageUrl = url;
            else return;
        }

        const cleanForm = { ...editForm, image: imageUrl };
        delete cleanForm.newImageFile;

        const updatedCats = pageData.categories.map(c => c.id === currentCategory.id ? cleanForm : c);
        handleSaveAll({ ...pageData, categories: updatedCats });
        setIsEditModalOpen(false);
    };

    // --- EXPERIENCE SECTION HANDLERS ---
    const handleExperienceChange = (e) => {
        const { name, value } = e.target;
        setPageData(prev => ({
            ...prev,
            experience: { ...prev.experience, [name]: value }
        }));
    };

    if (loading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-[#5A2A45]">
            <Layers className="animate-spin mb-4 text-[#B77A8C]" size={40} />
            <span className="font-outfit uppercase tracking-widest text-sm font-bold opacity-40">Loading Portfolio Manager...</span>
        </div>
    );

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto min-h-screen pb-40">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="font-display text-5xl text-[#5A2A45] mb-2 tracking-tight">Portfolio Layout</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Curate the landing experience for your creative archives.</p>
                </div>
                <button
                    onClick={() => handleSaveAll()}
                    disabled={saving}
                    className="flex items-center gap-3 bg-[#5A2A45] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#4a2238] transition-all shadow-xl hover:shadow-2xl"
                >
                    <Save size={18} />
                    {saving ? 'Synchronizing...' : 'Save Layout'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-[#5A2A45]/5 pb-4 overflow-x-auto no-scrollbar">
                {[
                    { id: 'categories', label: 'Gallery Categories', icon: Layout },
                    { id: 'hero-text', label: 'Hero Branding', icon: Type },
                    { id: 'hero-strips', label: 'Animated Strips', icon: Layers },
                    { id: 'experience', label: 'Bottom CTA', icon: Heart },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`font-outfit text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all relative pb-4 flex items-center gap-2 ${activeTab === tab.id ? 'text-[#5A2A45]' : 'text-[#8F8A86] hover:text-[#5A2A45]'}`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div layoutId="portTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B77A8C]" />
                        )}
                    </button>
                ))}
            </div>

            <div className="pt-4">
                {/* 1. CATEGORIES */}
                {activeTab === 'categories' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pageData.categories.map((cat, idx) => (
                            <motion.div layout key={cat.id || idx} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-[#5A2A45]/5 hover:shadow-2xl transition-all group relative">
                                <div className="aspect-[4/5] relative">
                                    <img src={cat.image || (cat.id === 'newborn' ? newbornImg : cat.id === 'maternity' ? maternityImg : cat.id === 'baby' ? babyImg : cat.id === 'cakesmash' ? babyImg : cat.id === 'toddler' ? babyImg : familyImg)} alt={cat.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors" />
                                    <button
                                        onClick={() => openEditCategory(cat)}
                                        className="absolute top-6 right-6 bg-white/90 p-3 rounded-full text-[#5A2A45] shadow-lg hover:scale-110 transition-transform"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-display text-3xl text-[#5A2A45] mb-1">{cat.title}</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-[#B77A8C] font-bold mb-4">{cat.subtitle}</p>
                                    <p className="text-sm text-[#6E5A52] line-clamp-2 font-light opacity-80">{cat.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* 2. HERO TEXT */}
                {activeTab === 'hero-text' && (
                    <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm max-w-4xl">
                        <h3 className="font-display text-3xl text-[#5A2A45] mb-8">Hero Typography</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Main Title Part 1</label>
                                    <input name="titleLine1" value={pageData.hero.titleLine1} onChange={handleHeroTextChange} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none border border-transparent focus:border-[#B77A8C]/20 font-display text-2xl text-[#5A2A45]" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Main Title Part 2</label>
                                    <input name="titleLine2" value={pageData.hero.titleLine2} onChange={handleHeroTextChange} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none border border-transparent focus:border-[#B77A8C]/20 font-display text-2xl text-[#5A2A45]" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Subtext Left</label>
                                    <input name="subtext1" value={pageData.hero.subtext1} onChange={handleHeroTextChange} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none border border-transparent focus:border-[#B77A8C]/20 font-outfit text-sm tracking-widest uppercase text-[#6E5A52]" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Subtext Right</label>
                                    <input name="subtext2" value={pageData.hero.subtext2} onChange={handleHeroTextChange} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none border border-transparent focus:border-[#B77A8C]/20 font-outfit text-sm tracking-widest uppercase text-[#6E5A52]" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 p-8 bg-[#FAF9F6] rounded-3xl border border-dashed border-[#5A2A45]/10">
                            <p className="text-center text-[#5A2A45]/40 text-xs font-medium uppercase tracking-[0.2em]">Live Preview in Header: {pageData.hero.titleLine1}{pageData.hero.titleLine2}</p>
                        </div>
                    </div>
                )}

                {/* 3. HERO STRIPS */}
                {activeTab === 'hero-strips' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['strip1', 'strip2', 'strip3'].map((stripName, idx) => (
                            <div key={stripName} className="bg-white p-8 rounded-[2.5rem] border border-[#5A2A45]/5 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-display text-2xl text-[#5A2A45]">Column {idx + 1}</h3>
                                    <span className="text-[10px] font-bold px-3 py-1 bg-[#FAF9F6] rounded-full text-[#B77A8C] uppercase tracking-widest">{(pageData.hero[stripName] || []).length} Archives</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar no-scrollbar">
                                    {(pageData.hero[stripName] || []).map((img, i) => (
                                        <div key={i} className="relative group rounded-2xl overflow-hidden aspect-[3/4] shadow-md">
                                            <img src={img} className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                                            <button
                                                onClick={() => handleRemoveHeroImage(stripName, i)}
                                                className="absolute top-2 right-2 bg-rose-500/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    <label className="flex flex-col items-center justify-center gap-2 aspect-[3/4] bg-[#FAF9F6] border-2 border-dashed border-[#5A2A45]/10 rounded-2xl cursor-pointer hover:bg-[#5A2A45]/5 transition-all text-[#5A2A45]/40 hover:text-[#5A2A45]">
                                        <Plus size={24} strokeWidth={1} />
                                        <span className="text-[8px] font-bold uppercase tracking-widest">Add Frame</span>
                                        <input type="file" className="hidden" onChange={(e) => handleAddHeroImage(stripName, e.target.files[0])} />
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 4. EXPERIENCE */}
                {activeTab === 'experience' && (
                    <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm max-w-4xl">
                        <h3 className="font-display text-3xl text-[#5A2A45] mb-8">Bottom Experience CTA</h3>
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Main Headline</label>
                                    <input name="titleLine1" value={pageData.experience.titleLine1} onChange={handleExperienceChange} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-2xl text-[#5A2A45]" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Italicized Accent</label>
                                    <input name="titleLine2" value={pageData.experience.titleLine2} onChange={handleExperienceChange} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display italic text-2xl text-[#5A2A45]" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Button Text</label>
                                    <input name="buttonText" value={pageData.experience.buttonText} onChange={handleExperienceChange} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-outfit font-bold text-xs uppercase tracking-widest text-[#6E5A52]" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Button Link</label>
                                    <input name="buttonLink" value={pageData.experience.buttonLink} onChange={handleExperienceChange} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-outfit text-xs text-[#6E5A52]" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* EDIT CATEGORY MODAL */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative overflow-hidden"
                        >
                            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-8 right-8 p-3 hover:bg-[#F1EBDD] rounded-full text-[#5A2A45]"><X size={24} /></button>

                            <h2 className="font-display text-4xl text-[#5A2A45] mb-8">Refine Category</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Preview */}
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Vibe Preview</label>
                                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#FAF9F6] relative group">
                                        <img
                                            src={editForm.newImageFile ? URL.createObjectURL(editForm.newImageFile) : editForm.image}
                                            className="w-full h-full object-cover"
                                        />
                                        <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                                            <Upload className="mb-2" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Update Portrait</span>
                                            <input type="file" className="hidden" onChange={(e) => setEditForm({ ...editForm, newImageFile: e.target.files[0] })} />
                                        </label>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-2">Display Title</label>
                                        <input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-2xl text-[#5A2A45]" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-2">Tagline</label>
                                        <input value={editForm.subtitle} onChange={e => setEditForm({ ...editForm, subtitle: e.target.value })} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none text-[10px] uppercase font-bold tracking-[0.2em] text-[#B77A8C]" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-2">Short Narrative</label>
                                        <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows="4" className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none text-sm text-[#6E5A52] leading-relaxed" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex gap-4">
                                <button onClick={() => setIsEditModalOpen(false)} className="flex-1 py-4 rounded-full font-bold uppercase tracking-widest text-xs text-[#6E5A52] hover:bg-[#FAF9F6]">Discard</button>
                                <button
                                    onClick={handleCategorySave}
                                    disabled={saving}
                                    className="flex-[2] bg-[#5A2A45] text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] shadow-xl transition-all"
                                >
                                    {saving ? "Synchronizing..." : "Update Category"}
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
