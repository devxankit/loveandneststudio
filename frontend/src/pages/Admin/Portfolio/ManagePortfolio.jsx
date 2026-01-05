import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Save, Upload, Plus, Trash2, Edit2, X, CheckCircle, Layout, Layers } from 'lucide-react';
import { getPage, updatePageSectionJSON, uploadImage, createPage } from '../../../services/api';

// Default Image Imports for Seeding
import newbornImg from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153410.png';
import maternityImg from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225737.png';
import babyImg from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153257.png';
import familyImg from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153401.png';

// Extra images
import m1 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225745.png';
import m2 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225753.png';
import m3 from '../../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225807.png';
import b1 from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153305.png';
import b2 from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153316.png';
import b3 from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153323.png';
import f1 from '../../../assets/images/portfolio/family/Screenshot 2025-12-31 111330.png';
import f2 from '../../../assets/images/portfolio/family/Screenshot 2025-12-31 120803.png';
import f3 from '../../../assets/images/portfolio/family/Screenshot 2025-12-31 120811.png';

const ManagePortfolio = () => {
    const [activeTab, setActiveTab] = useState('categories'); // 'categories' | 'hero'
    const [loading, setLoading] = useState(true);
    const [pageData, setPageData] = useState(null);
    const [saving, setSaving] = useState(false);

    // Edit Category Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [editForm, setEditForm] = useState({});

    // Defaults for Seeding
    const defaultStrip1 = [newbornImg, b1, babyImg, b2, familyImg, b3, newbornImg, newbornImg, b1, babyImg];
    const defaultStrip2 = [maternityImg, m1, m2, newbornImg, m3, babyImg, maternityImg, m1, m2, newbornImg];
    const defaultStrip3 = [familyImg, f1, f2, maternityImg, f3, babyImg, familyImg, familyImg, f1, f2];

    const defaultCategories = [
        { id: 'newborn', title: 'Newborn', subtitle: 'The First Breath', description: 'Pure, innocent moments that fly by so quickly.', image: newbornImg, link: '/portfolio/newborn', accent: 'bg-[#B77A8C]' },
        { id: 'maternity', title: 'Maternity', subtitle: 'The Radiance of Life', description: 'Celebrating the strength and beauty of your journey.', image: maternityImg, link: '/portfolio/maternity', accent: 'bg-[#E8CBB6]' },
        { id: 'baby', title: 'Baby', subtitle: 'Tiny Milestones', description: 'Capturing the wonder and growth of your little one.', image: babyImg, link: '/portfolio/baby', accent: 'bg-[#8F8A86]' },
        { id: 'family', title: 'Family', subtitle: 'Heart & Home', description: 'The connections that mean the absolute world.', image: familyImg, link: '/portfolio/family', accent: 'bg-[#5A2A45]' }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getPage('portfolio');
            if (res.data) {
                setPageData(res.data);
            }
        } catch (error) {
            console.error("No portfolio page found, requires init?", error);
            // If 404, we might want to initialize it later on first save
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

    // --- HERO SECTION HANDLERS ---
    const getHeroContent = () => {
        const section = pageData?.sections?.find(s => s.id === 'hero');
        return section?.content || { strip1: [], strip2: [], strip3: [] };
    };

    const handleAddHeroImage = async (stripName, file) => {
        if (!file) return;
        const url = await handleUploadImage(file);
        if (url) {
            const currentContent = getHeroContent();
            const updatedStrips = {
                ...currentContent,
                [stripName]: [...(currentContent[stripName] || []), url]
            };
            await saveSection('hero', updatedStrips);
        }
    };

    const handleRemoveHeroImage = async (stripName, index) => {
        const currentContent = getHeroContent();
        const updatedStrip = [...(currentContent[stripName] || [])];
        updatedStrip.splice(index, 1);

        const updatedStrips = {
            ...currentContent,
            [stripName]: updatedStrip
        };
        await saveSection('hero', updatedStrips);
    };

    // --- CATEGORIES HANDLERS ---
    const getCategories = () => {
        const section = pageData?.sections?.find(s => s.id === 'categories');
        return section?.content || [];
    };

    const openEditCategory = (cat) => {
        setCurrentCategory(cat);
        setEditForm({ ...cat });
        setIsEditModalOpen(true);
    };

    const handleCategorySave = async () => {
        const currentCats = getCategories();
        let updatedCats;

        // Check if image needs upload (if it's a File object) - though here we usually handle upload separately or before
        // For simplicity, let's assume image upload happens in the form immediately or we handle it here:
        let imageUrl = editForm.image;
        if (editForm.newImageFile) {
            const url = await handleUploadImage(editForm.newImageFile);
            if (url) imageUrl = url;
            else return; // Failed
        }

        const cleanForm = { ...editForm, image: imageUrl };
        delete cleanForm.newImageFile;

        if (currentCategory) {
            // Update
            updatedCats = currentCats.map(c => c.id === currentCategory.id ? cleanForm : c);
        } else {
            // Add new (if we supported adding new categories)
            updatedCats = [...currentCats, { ...cleanForm, id: Date.now().toString() }];
        }

        await saveSection('categories', updatedCats);
        setIsEditModalOpen(false);
    };

    const initializePage = async () => {
        setSaving(true);
        try {
            const initialSections = [
                { id: 'hero', title: 'Hero Animation', type: 'gallery-strips', content: { strip1: defaultStrip1, strip2: defaultStrip2, strip3: defaultStrip3 } },
                { id: 'categories', title: 'Categories', type: 'categories-list', content: defaultCategories }
            ];
            await createPage({ pageSlug: 'portfolio', title: 'Portfolio', sections: initialSections });
            await fetchData();
        } catch (error) {
            console.error("Init failed", error);
            alert("Failed to initialize page.");
        } finally {
            setSaving(false);
        }
    };

    // --- SHARED SAFE LOGIC ---
    const saveSection = async (sectionId, content) => {
        setSaving(true);
        try {
            if (!pageData) {
                // If page doesn't exist, we MUST use initializePage to ensure full structure
                // But if user clicked "Save" on a small edit, we might lose other defaults.
                // So we'll try to use defaults for the OTHER section.
                const initialSections = [
                    {
                        id: 'hero',
                        title: 'Hero Animation',
                        type: 'gallery-strips',
                        content: sectionId === 'hero' ? content : { strip1: defaultStrip1, strip2: defaultStrip2, strip3: defaultStrip3 }
                    },
                    {
                        id: 'categories',
                        title: 'Categories',
                        type: 'categories-list',
                        content: sectionId === 'categories' ? content : defaultCategories
                    }
                ];
                await createPage({ pageSlug: 'portfolio', title: 'Portfolio', sections: initialSections });
                await fetchData();
            } else {
                await updatePageSectionJSON('portfolio', sectionId, content);
                setPageData(prev => ({
                    ...prev,
                    sections: prev.sections.map(s => s.id === sectionId ? { ...s, content } : s)
                }));
            }
        } catch (error) {
            console.error("Save failed", error);
            alert("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading Content Manager...</div>;

    const categories = getCategories();
    const heroContent = getHeroContent();

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto min-h-screen pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="font-display text-4xl text-[#5A2A45] mb-2">Portfolio Page</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Manage the hero animation and portfolio categories.</p>
                </div>
                {saving && <span className="text-[#B77A8C] animate-pulse font-bold">Saving Changes...</span>}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-[#E6D1CB]">
                <button
                    onClick={() => setActiveTab('categories')}
                    className={`pb-4 px-4 font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2 ${activeTab === 'categories' ? 'text-[#5A2A45] border-b-2 border-[#5A2A45]' : 'text-[#6E5A52]/60 hover:text-[#5A2A45]'}`}
                >
                    <Layout size={16} /> Categories
                </button>
                <button
                    onClick={() => setActiveTab('hero')}
                    className={`pb-4 px-4 font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2 ${activeTab === 'hero' ? 'text-[#5A2A45] border-b-2 border-[#5A2A45]' : 'text-[#6E5A52]/60 hover:text-[#5A2A45]'}`}
                >
                    <Layers size={16} /> Hero Animation
                </button>
            </div>

            {/* CONTENT: CATEGORIES */}
            {activeTab === 'categories' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.length === 0 && (
                        <div className="col-span-full text-center text-gray-400 py-10 flex flex-col items-center gap-4">
                            <p>No categories found. Initialize the page with default content?</p>
                            <button
                                onClick={initializePage}
                                className="bg-[#5A2A45] text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-colors"
                            >
                                Initialize Defaults
                            </button>
                        </div>
                    )}
                    {categories.map((cat, idx) => (
                        <motion.div layout key={cat.id || idx} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-[#5A2A45]/5 hover:shadow-xl transition-all group">
                            <div className="aspect-[3/4] relative">
                                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform" onClick={() => openEditCategory(cat)}>
                                    <Edit2 size={16} className="text-[#5A2A45]" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-display text-2xl text-[#5A2A45]">{cat.title}</h3>
                                <p className="text-xs uppercase tracking-widest text-[#B77A8C] mb-2">{cat.subtitle}</p>
                                <p className="text-sm text-[#6E5A52] line-clamp-2">{cat.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* CONTENT: HERO ANIMATION */}
            {activeTab === 'hero' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {['strip1', 'strip2', 'strip3'].map((stripName, idx) => (
                        <div key={stripName} className="bg-white p-6 rounded-[2rem] border border-[#5A2A45]/10">
                            <h3 className="font-display text-xl text-[#5A2A45] mb-4 flex items-center justify-between">
                                Column {idx + 1}
                                <span className="text-xs bg-[#F9F7F2] px-2 py-1 rounded-full text-[#6E5A52]">{(heroContent[stripName] || []).length} images</span>
                            </h3>

                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                {(heroContent[stripName] || []).map((img, i) => (
                                    <div key={i} className="relative group rounded-xl overflow-hidden aspect-[3/4]">
                                        <img src={img} className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => handleRemoveHeroImage(stripName, i)}
                                            className="absolute top-2 right-2 bg-rose-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-[#F1EBDD]">
                                <label className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-[#5A2A45]/20 rounded-xl cursor-pointer hover:bg-[#5A2A45]/5 transition-colors text-[#5A2A45] font-bold text-xs uppercase tracking-widest">
                                    <Plus size={16} /> Add Image
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleAddHeroImage(stripName, e.target.files[0])}
                                    />
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* EDIT CATEGORY MODAL */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
                        >
                            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>

                            <h2 className="font-display text-3xl text-[#5A2A45] mb-6">Edit Category</h2>

                            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                                {/* Image Preview & Upload */}
                                <div className="flex gap-4 items-center">
                                    <div className="w-24 h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                        <img
                                            src={editForm.newImageFile ? URL.createObjectURL(editForm.newImageFile) : editForm.image}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <label className="flex-1 cursor-pointer">
                                        <div className="px-4 py-2 border border-[#E6D1CB] rounded-xl text-center hover:bg-[#F9F7F2] transition-colors">
                                            <span className="text-xs font-bold uppercase text-[#5A2A45]">Change Image</span>
                                        </div>
                                        <input type="file" className="hidden" onChange={(e) => setEditForm({ ...editForm, newImageFile: e.target.files[0] })} />
                                    </label>
                                </div>

                                <input
                                    value={editForm.title}
                                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                    placeholder="Title"
                                    className="w-full p-3 bg-[#F9F7F2] rounded-xl outline-none font-display text-xl text-[#5A2A45]"
                                />
                                <input
                                    value={editForm.subtitle}
                                    onChange={e => setEditForm({ ...editForm, subtitle: e.target.value })}
                                    placeholder="Subtitle"
                                    className="w-full p-3 bg-[#F9F7F2] rounded-xl outline-none text-xs uppercase tracking-widest text-[#B77A8C] font-bold"
                                />
                                <textarea
                                    value={editForm.description}
                                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                    placeholder="Description"
                                    rows="3"
                                    className="w-full p-3 bg-[#F9F7F2] rounded-xl outline-none text-sm text-[#6E5A52]"
                                />
                                <div className="flex items-center gap-2">
                                    <label className="text-xs uppercase font-bold text-[#5A2A45]">Accent:</label>
                                    <input
                                        type="text"
                                        value={editForm.accent}
                                        onChange={e => setEditForm({ ...editForm, accent: e.target.value })}
                                        className="flex-1 p-2 bg-[#F9F7F2] rounded-lg text-xs font-mono"
                                    />
                                    <div className={`w-8 h-8 rounded-full ${editForm.accent}`} style={{ backgroundColor: editForm.accent.startsWith('#') ? editForm.accent : undefined }} />
                                </div>
                            </div>

                            <button
                                onClick={handleCategorySave}
                                disabled={saving}
                                className="w-full mt-8 bg-[#5A2A45] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#4a2238] transition-colors"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManagePortfolio;
