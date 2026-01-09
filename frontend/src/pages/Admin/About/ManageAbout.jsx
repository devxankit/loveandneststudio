import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Upload, Type, Image as ImageIcon, Heart, User, Sparkles, Quote, X, CheckCircle, HelpCircle } from 'lucide-react';
import { getAboutPage, updateAboutPage, uploadImage } from '../../../services/api';

// Fallback images for seeding/display
import about1 from '../../../assets/images/about/01-1.jpg';
import about2 from '../../../assets/images/about/02-01.jpg';

const ManageAbout = () => {
    const [activeTab, setActiveTab] = useState('bio');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pageData, setPageData] = useState({
        hero: { images: [] },
        bio: {
            intro: '',
            photographer: { heading: '', text: '' },
            philosophy: { heading: '', text: '' },
            approach: { heading: '', text: '' },
            style: { heading: '', text: '', quote: '' },
            footerQuote: '',
            thankYouText: ''
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getAboutPage();
            setPageData(res.data.data || res.data);
        } catch (error) {
            console.error("Failed to fetch about data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateField = (section, field, value, subfield = null) => {
        setPageData(prev => {
            const newData = { ...prev };
            if (subfield) {
                newData[section][field][subfield] = value;
            } else {
                newData[section][field] = value;
            }
            return newData;
        });
    };

    const handleUploadImage = async (file, index = null) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await uploadImage(formData);
            const url = res.data.url;

            if (index !== null) {
                // Update specific image in hero gallery
                const updatedImages = [...pageData.hero.images];
                updatedImages[index] = url;
                setPageData(prev => ({
                    ...prev,
                    hero: { ...prev.hero, images: updatedImages }
                }));
            }
            return url;
        } catch (error) {
            console.error("Upload failed", error);
            alert("Image upload failed");
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateAboutPage(pageData);
            alert("About page updated successfully!");
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
            <span className="font-outfit uppercase tracking-widest text-sm font-bold opacity-40">Loading About Manager...</span>
        </div>
    );

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto min-h-screen pb-40">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="font-display text-5xl text-[#5A2A45] mb-2 tracking-tight">About Experience</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Tell your story and manage the floating gallery archives.</p>
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
                    { id: 'bio', label: 'Biography & Narrative', icon: User },
                    { id: 'hero-gallery', label: 'Floating Hero Images', icon: ImageIcon },
                    { id: 'philosophy', label: 'Philosophy & Style', icon: Sparkles },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`font-outfit text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all relative pb-4 flex items-center gap-2 ${activeTab === tab.id ? 'text-[#5A2A45]' : 'text-[#8F8A86] hover:text-[#5A2A45]'}`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div layoutId="aboutTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B77A8C]" />
                        )}
                    </button>
                ))}
            </div>

            <div className="pt-4">
                {/* 1. BIO & NARRATIVE */}
                {activeTab === 'bio' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-8 h-fit">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-[#F1EBDD] rounded-2xl text-[#5A2A45]"><Type size={20} /></div>
                                <h3 className="font-display text-2xl text-[#5A2A45]">Introduction Paragraph</h3>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Main Pitch Text</label>
                                <textarea
                                    value={pageData.bio.intro}
                                    onChange={(e) => handleUpdateField('bio', 'intro', e.target.value)}
                                    rows="4"
                                    className="w-full p-4 bg-[#FAF9F6] rounded-2xl outline-none text-sm text-[#5A2A45] leading-relaxed border border-transparent focus:border-[#B77A8C]/20"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-8">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-[#F1EBDD] rounded-2xl text-[#5A2A45]"><User size={20} /></div>
                                <h3 className="font-display text-2xl text-[#5A2A45]">The Photographer</h3>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Section Heading</label>
                                    <input
                                        value={pageData.bio.photographer.heading}
                                        onChange={(e) => handleUpdateField('bio', 'photographer', e.target.value, 'heading')}
                                        className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-xl text-[#5A2A45]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Biography Content</label>
                                    <textarea
                                        value={pageData.bio.photographer.text}
                                        onChange={(e) => handleUpdateField('bio', 'photographer', e.target.value, 'text')}
                                        rows="6"
                                        className="w-full p-4 bg-[#FAF9F6] rounded-2xl outline-none text-sm text-[#5A2A45] leading-relaxed border border-transparent focus:border-[#B77A8C]/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. HERO GALLERY */}
                {activeTab === 'hero-gallery' && (
                    <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                            <div>
                                <h3 className="font-display text-3xl text-[#5A2A45] mb-2">Floating Hero Archives</h3>
                                <p className="text-xs text-[#8F8A86] font-outfit">The About page hero shows 21 floating images. You can replace each frame below.</p>
                            </div>
                            <div className="px-4 py-2 bg-[#FAF9F6] rounded-full text-[#B77A8C] text-[10px] font-bold uppercase tracking-widest">
                                {pageData.hero.images.length} / 21 Slots Filled
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {Array.from({ length: 21 }).map((_, idx) => {
                                const currentImg = pageData.hero.images[idx];
                                return (
                                    <div key={idx} className="relative group aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF9F6] border border-[#5A2A45]/5">
                                        {currentImg ? (
                                            <img src={currentImg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center opacity-30">
                                                <ImageIcon size={24} className="text-[#5A2A45]" />
                                            </div>
                                        )}
                                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                                            <Upload size={20} />
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleUploadImage(e.target.files[0], idx)}
                                            />
                                        </label>
                                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 rounded-md text-[8px] font-bold text-[#5A2A45] shadow-sm">
                                            Frame {idx + 1}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 3. PHILOSOPHY & STYLE */}
                {activeTab === 'philosophy' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-6">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Philosophy Details</label>
                                <input
                                    value={pageData.bio.philosophy.heading}
                                    onChange={(e) => handleUpdateField('bio', 'philosophy', e.target.value, 'heading')}
                                    className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-xl text-[#5A2A45]"
                                />
                                <textarea
                                    value={pageData.bio.philosophy.text}
                                    onChange={(e) => handleUpdateField('bio', 'philosophy', e.target.value, 'text')}
                                    rows="4"
                                    className="w-full p-4 bg-[#FAF9F6] rounded-2xl outline-none text-sm text-[#5A2A45] leading-relaxed"
                                />
                            </div>
                            <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-6">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Our Approach Details</label>
                                <input
                                    value={pageData.bio.approach.heading}
                                    onChange={(e) => handleUpdateField('bio', 'approach', e.target.value, 'heading')}
                                    className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-xl text-[#5A2A45]"
                                />
                                <textarea
                                    value={pageData.bio.approach.text}
                                    onChange={(e) => handleUpdateField('bio', 'approach', e.target.value, 'text')}
                                    rows="4"
                                    className="w-full p-4 bg-[#FAF9F6] rounded-2xl outline-none text-sm text-[#5A2A45] leading-relaxed"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-[#F1EBDD] rounded-2xl text-[#5A2A45]"><Sparkles size={20} /></div>
                                <h3 className="font-display text-2xl text-[#5A2A45]">Style & Experience Selection</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Heading</label>
                                        <input
                                            value={pageData.bio.style.heading}
                                            onChange={(e) => handleUpdateField('bio', 'style', e.target.value, 'heading')}
                                            className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-xl text-[#5A2A45]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Narrative</label>
                                        <textarea
                                            value={pageData.bio.style.text}
                                            onChange={(e) => handleUpdateField('bio', 'style', e.target.value, 'text')}
                                            rows="4"
                                            className="w-full p-4 bg-[#FAF9F6] rounded-2xl outline-none text-sm text-[#5A2A45] leading-relaxed"
                                        />
                                    </div>
                                </div>
                                <div className="bg-[#FAF9F6] p-8 rounded-[2rem] border border-[#5A2A45]/5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Quote size={16} className="text-[#B77A8C]" />
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Accent Quote Card</label>
                                    </div>
                                    <textarea
                                        value={pageData.bio.style.quote}
                                        onChange={(e) => handleUpdateField('bio', 'style', e.target.value, 'quote')}
                                        rows="6"
                                        className="w-full bg-transparent outline-none italic text-sm text-[#5A2A45] leading-relaxed"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-4">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Bottom Feature Quote</label>
                                <textarea
                                    value={pageData.bio.footerQuote}
                                    onChange={(e) => handleUpdateField('bio', 'footerQuote', e.target.value)}
                                    rows="2"
                                    className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-lg italic text-[#5A2A45] text-center"
                                />
                            </div>
                            <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-4">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86]">Signature / Thank You Text</label>
                                <input
                                    value={pageData.bio.thankYouText}
                                    onChange={(e) => handleUpdateField('bio', 'thankYouText', e.target.value)}
                                    className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-3xl text-[#B77A8C] text-center"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAbout;
