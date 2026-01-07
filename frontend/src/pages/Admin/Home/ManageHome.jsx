import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Upload, Type, Image as ImageIcon, Sparkles, Layout, User, Quote, CheckCircle, Info, Send, Archive } from 'lucide-react';
import { getHomePage, updateHomePage, uploadImage } from '../../../services/api';

const ManageHome = () => {
    const [activeTab, setActiveTab] = useState('hero');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getHomePage();
            setPageData(res.data.data || res.data);
        } catch (error) {
            console.error("Failed to fetch home data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateField = (path, value) => {
        setPageData(prev => {
            const newData = { ...prev };
            const keys = path.split('.');
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const handleUploadImage = async (file, path, index = null) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await uploadImage(formData);
            const url = res.data.url;

            setPageData(prev => {
                const newData = { ...prev };
                const keys = path.split('.');
                let current = newData;
                for (let i = 0; i < keys.length - 1; i++) {
                    current = current[keys[i]];
                }

                const field = keys[keys.length - 1];
                if (index !== null) {
                    const list = [...current[field]];
                    list[index] = url;
                    current[field] = list;
                } else {
                    current[field] = url;
                }
                return newData;
            });
            return url;
        } catch (error) {
            console.error("Upload failed", error);
            alert("Image upload failed");
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateHomePage(pageData);
            alert("Home page updated successfully!");
        } catch (error) {
            console.error("Save failed", error);
            alert("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-[#5A2A45]">
            <Sparkles className="animate-spin mb-4 text-[#B77A8C]" size={40} />
            <span className="font-outfit uppercase tracking-widest text-sm font-bold opacity-40">Loading Home Manager...</span>
        </div>
    );

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto min-h-screen pb-40">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="font-display text-5xl text-[#5A2A45] mb-2 tracking-tight">Home Experience</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Structure your landing page narrative and visual flow.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-3 bg-[#5A2A45] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#4a2238] transition-all shadow-xl hover:shadow-2xl disabled:opacity-50"
                >
                    <Save size={18} />
                    {saving ? 'Synchronizing...' : 'Save All Changes'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-[#5A2A45]/5 pb-4 overflow-x-auto no-scrollbar">
                {[
                    { id: 'hero', label: 'Hero Slider', icon: Layout },
                    { id: 'expertise', label: 'Expertise & Mission', icon: Sparkles },
                    { id: 'checklist', label: 'Experience Checklist', icon: CheckCircle },
                    { id: 'gallery', label: 'Curated Gallery', icon: ImageIcon },
                    { id: 'split-screen', label: 'Split Narratives', icon: Info },
                    { id: 'collage', label: 'Footer Collage', icon: Archive },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`font-outfit text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all relative pb-4 flex items-center gap-2 ${activeTab === tab.id ? 'text-[#5A2A45]' : 'text-[#8F8A86] hover:text-[#5A2A45]'}`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div layoutId="homeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B77A8C]" />
                        )}
                    </button>
                ))}
            </div>

            <div className="pt-4">
                {/* 1. HERO SLIDER */}
                {activeTab === 'hero' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-8">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Typography & Branding</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Main Heading</label>
                                    <input
                                        value={pageData.hero.heading}
                                        onChange={(e) => handleUpdateField('hero.heading', e.target.value)}
                                        className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-2xl text-[#5A2A45]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Subheading (Italic)</label>
                                    <input
                                        value={pageData.hero.subheading}
                                        onChange={(e) => handleUpdateField('hero.subheading', e.target.value)}
                                        className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-2xl text-[#5A2A45] italic"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Overlay Separator Text</label>
                                    <input
                                        value={pageData.hero.overlay_text}
                                        onChange={(e) => handleUpdateField('hero.overlay_text', e.target.value)}
                                        className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none text-[#5A2A45] tracking-[0.4em] uppercase text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm">
                            <h3 className="font-display text-2xl text-[#5A2A45] mb-8">Slider Archives (4 Images)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {[0, 1, 2, 3].map((idx) => (
                                    <div key={idx} className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#FAF9F6] group">
                                        {pageData.hero.slides[idx] ? (
                                            <img src={pageData.hero.slides[idx]} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon size={40} /></div>
                                        )}
                                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                                            <Upload size={24} />
                                            <input type="file" className="hidden" onChange={(e) => handleUploadImage(e.target.files[0], 'hero.slides', idx)} />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. EXPERTISE */}
                {activeTab === 'expertise' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-8 h-fit">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Mission Narrative</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Overline</label>
                                    <input value={pageData.expertise.subheading} onChange={(e) => handleUpdateField('expertise.subheading', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Heading Line</label>
                                    <input value={pageData.expertise.heading} onChange={(e) => handleUpdateField('expertise.heading', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-2xl" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Description</label>
                                    <textarea value={pageData.expertise.text} onChange={(e) => handleUpdateField('expertise.text', e.target.value)} rows="5" className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none text-sm leading-relaxed" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-8">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Visual Assets</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Primary Portrait</label>
                                    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF9F6] relative group">
                                        {pageData.expertise.image1 ? <img src={pageData.expertise.image1} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon /></div>}
                                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"><Upload /><input type="file" className="hidden" onChange={(e) => handleUploadImage(e.target.files[0], 'expertise.image1')} /></label>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-12">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Accent Floating</label>
                                    <div className="aspect-square rounded-2xl overflow-hidden bg-[#FAF9F6] relative group">
                                        {pageData.expertise.image2 ? <img src={pageData.expertise.image2} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon /></div>}
                                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"><Upload /><input type="file" className="hidden" onChange={(e) => handleUploadImage(e.target.files[0], 'expertise.image2')} /></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. CHECKLIST */}
                {activeTab === 'checklist' && (
                    <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Features Checklist</h3>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Section Title</label>
                                <input value={pageData.checklist.heading} onChange={(e) => handleUpdateField('checklist.heading', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-2xl" />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Checklist Items</label>
                                {pageData.checklist.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <input
                                            value={item}
                                            onChange={(e) => {
                                                const newItems = [...pageData.checklist.items];
                                                newItems[idx] = e.target.value;
                                                handleUpdateField('checklist.items', newItems);
                                            }}
                                            className="grow p-4 bg-[#FAF9F6] rounded-xl outline-none text-xs tracking-widest uppercase font-bold text-[#5A2A45]"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Sidebar Visual</h3>
                            <div className="h-[60vh] rounded-[2rem] overflow-hidden bg-[#FAF9F6] relative group">
                                {pageData.checklist.image ? <img src={pageData.checklist.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon size={48} /></div>}
                                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"><Upload size={32} /><input type="file" className="hidden" onChange={(e) => handleUploadImage(e.target.files[0], 'checklist.image')} /></label>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. GALLERY */}
                {activeTab === 'gallery' && (
                    <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-10">
                        <div className="flex justify-between items-end">
                            <div className="space-y-2">
                                <h3 className="font-display text-2xl text-[#5A2A45]">Central Digital Gallery</h3>
                                <p className="text-xs text-[#8F8A86]">Manage the infinite-scrolling marquee items.</p>
                            </div>
                            <button
                                onClick={() => handleUpdateField('gallery.images', [...pageData.gallery.images, ""])}
                                className="px-6 py-2 bg-[#F1EBDD] text-[#5A2A45] rounded-full text-[10px] font-bold uppercase tracking-widest"
                            >
                                Add Image Slot
                            </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
                            {pageData.gallery.images.map((img, idx) => (
                                <div key={idx} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF9F6] group">
                                    {img ? <img src={img} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon /></div>}
                                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                                        <Upload />
                                        <input type="file" className="hidden" onChange={(e) => handleUploadImage(e.target.files[0], 'gallery.images', idx)} />
                                    </label>
                                    <button
                                        onClick={() => {
                                            const newImg = pageData.gallery.images.filter((_, i) => i !== idx);
                                            handleUpdateField('gallery.images', newImg);
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <CheckCircle size={12} className="rotate-45" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 5. SPLIT SCREEN */}
                {activeTab === 'split-screen' && (
                    <div className="space-y-8">
                        {/* Intro & Artist */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-6">
                                <h4 className="font-display text-2xl text-[#5A2A45] border-b pb-4">01. Overview Intro</h4>
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Heading (uses HTML for br)</label>
                                    <input value={pageData.splitScreen.intro.heading} onChange={(e) => handleUpdateField('splitScreen.intro.heading', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-xl" />
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Quote Text</label>
                                    <input value={pageData.splitScreen.intro.text} onChange={(e) => handleUpdateField('splitScreen.intro.text', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none" />
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Intro Feature Image</label>
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF9F6] relative group">
                                        {pageData.splitScreen.intro.image ? <img src={pageData.splitScreen.intro.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon /></div>}
                                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"><Upload /><input type="file" className="hidden" onChange={(e) => handleUploadImage(e.target.files[0], 'splitScreen.intro.image')} /></label>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-6">
                                <h4 className="font-display text-2xl text-[#5A2A45] border-b pb-4">02. Artist Profile</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4 col-span-1">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Section Title</label>
                                        <input value={pageData.splitScreen.artist.title} onChange={(e) => handleUpdateField('splitScreen.artist.title', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none" />
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Name</label>
                                        <input value={pageData.splitScreen.artist.name} onChange={(e) => handleUpdateField('splitScreen.artist.name', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none" />
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Role</label>
                                        <input value={pageData.splitScreen.artist.role} onChange={(e) => handleUpdateField('splitScreen.artist.role', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none" />
                                    </div>
                                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF9F6] relative group">
                                        {pageData.splitScreen.artist.portrait ? <img src={pageData.splitScreen.artist.portrait} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon /></div>}
                                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"><Upload /><input type="file" className="hidden" onChange={(e) => handleUploadImage(e.target.files[0], 'splitScreen.artist.portrait')} /></label>
                                    </div>
                                </div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Short Bio</label>
                                <textarea value={pageData.splitScreen.artist.bio} onChange={(e) => handleUpdateField('splitScreen.artist.bio', e.target.value)} rows="3" className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none text-sm" />
                            </div>
                        </div>

                        {/* Philosophy & Contact */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-6">
                                <h4 className="font-display text-2xl text-[#5A2A45] border-b pb-4">03. Philosophy</h4>
                                <textarea value={pageData.splitScreen.philosophy.quote} onChange={(e) => handleUpdateField('splitScreen.philosophy.quote', e.target.value)} rows="2" className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none italic font-display text-xl" />
                                <textarea value={pageData.splitScreen.philosophy.text} onChange={(e) => handleUpdateField('splitScreen.philosophy.text', e.target.value)} rows="4" className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none text-sm" />
                            </div>
                            <div className="bg-[#5A2A45] rounded-[2.5rem] p-10 shadow-sm space-y-6 text-white flex flex-col justify-center">
                                <h4 className="font-display text-2xl border-b border-white/10 pb-4">04. Final CTA</h4>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3 text-white">Main Heading</label>
                                    <input value={pageData.splitScreen.contact.heading} onChange={(e) => handleUpdateField('splitScreen.contact.heading', e.target.value)} className="w-full p-4 bg-white/5 rounded-xl outline-none font-display text-3xl text-[#F1EBDD]" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3 text-white">Floating Tagline</label>
                                    <input value={pageData.splitScreen.contact.subheading} onChange={(e) => handleUpdateField('splitScreen.contact.subheading', e.target.value)} className="w-full p-4 bg-white/5 rounded-xl outline-none text-[10px] uppercase tracking-widest font-bold" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 6. COLLAGE */}
                {activeTab === 'collage' && (
                    <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-10">
                        <div className="flex justify-between items-end">
                            <div className="space-y-2">
                                <h3 className="font-display text-2xl text-[#5A2A45]">Bottom Horizontal Collage</h3>
                                <p className="text-xs text-[#8F8A86]">These images scroll at the very bottom of the page.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
                                <div key={idx} className="relative aspect-[3/2] rounded-xl overflow-hidden bg-[#FAF9F6] group border border-[#5A2A45]/5">
                                    {pageData.collage.images[idx] ? <img src={pageData.collage.images[idx]} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon /></div>}
                                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                                        <Upload size={16} />
                                        <input type="file" className="hidden" onChange={(e) => handleUploadImage(e.target.files[0], 'collage.images', idx)} />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageHome;
