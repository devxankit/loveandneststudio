import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Upload, Type, Image as ImageIcon, Sparkles, Layout, Instagram, Phone, Mail, MapPin, Share2, Archive } from 'lucide-react';
import { getContactPage, updateContactPage, uploadImage } from '../../../services/api';

const ManageContact = () => {
    const [activeTab, setActiveTab] = useState('hero');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pageData, setPageData] = useState({
        hero: { subheading: '', heading: '', text: '' },
        info: { email: '', phone: '', whatsapp: '', location: '' },
        visuals: { entranceImage: '', entranceLabel: '', verticalImage: '' },
        socials: { instagram: '', facebook: '', threads: '', pinterest: '', youtube: '' },
        collage: { images: [] },
        meta: { title: '', description: '' }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getContactPage();
            setPageData(res.data.data || res.data);
        } catch (error) {
            console.error("Failed to fetch contact data", error);
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
            await updateContactPage(pageData);
            alert("Contact page updated successfully!");
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
            <span className="font-outfit uppercase tracking-widest text-sm font-bold opacity-40">Loading Contact Manager...</span>
        </div>
    );

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto min-h-screen pb-40">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="font-display text-5xl text-[#5A2A45] mb-2 tracking-tight">Contact Settings</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Manage your inquiry narratives, contact details, and social presence.</p>
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
                    { id: 'hero', label: 'Hero Narrative', icon: Layout },
                    { id: 'info', label: 'Contact Details', icon: Mail },
                    { id: 'visuals', label: 'Studio Visuals', icon: ImageIcon },
                    { id: 'socials', label: 'Social Echo', icon: Share2 },
                    { id: 'collage', label: 'Bottom Collage', icon: Archive },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`font-outfit text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all relative pb-4 flex items-center gap-2 ${activeTab === tab.id ? 'text-[#5A2A45]' : 'text-[#8F8A86] hover:text-[#5A2A45]'}`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div layoutId="contactTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B77A8C]" />
                        )}
                    </button>
                ))}
            </div>

            <div className="pt-4">
                {/* 1. HERO */}
                {activeTab === 'hero' && (
                    <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-8">
                        <h3 className="font-display text-2xl text-[#5A2A45]">Inquiry Hero Section</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Tagline (Overline)</label>
                                <input
                                    value={pageData.hero.subheading}
                                    onChange={(e) => handleUpdateField('hero.subheading', e.target.value)}
                                    className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Main Heading (HTML Support)</label>
                                <input
                                    value={pageData.hero.heading}
                                    onChange={(e) => handleUpdateField('hero.heading', e.target.value)}
                                    className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none font-display text-3xl"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Narrative Text</label>
                                <textarea
                                    value={pageData.hero.text}
                                    onChange={(e) => handleUpdateField('hero.text', e.target.value)}
                                    rows="4"
                                    className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none text-sm leading-relaxed"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. INFO */}
                {activeTab === 'info' && (
                    <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-8">
                        <h3 className="font-display text-2xl text-[#5A2A45]">Core Communication</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3 flex items-center gap-2"><Mail size={12} /> Email Address</label>
                                    <input value={pageData.info.email} onChange={(e) => handleUpdateField('info.email', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3 flex items-center gap-2"><Phone size={12} /> Phone Number</label>
                                    <input value={pageData.info.phone} onChange={(e) => handleUpdateField('info.phone', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3 flex items-center gap-2"><span className="text-green-600 font-bold">WA</span> WhatsApp Number</label>
                                    <input value={pageData.info.whatsapp || ''} onChange={(e) => handleUpdateField('info.whatsapp', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none" placeholder="+91..." />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3 flex items-center gap-2"><MapPin size={12} /> Studio Location</label>
                                    <input value={pageData.info.location} onChange={(e) => handleUpdateField('info.location', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none" />
                                </div>
                            </div>
                            <div className="bg-[#FAF9F6] rounded-[2rem] p-8 flex flex-col justify-center border border-[#5A2A45]/5">
                                <h4 className="font-display text-xl text-[#5A2A45] mb-4">SEO Metadata</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-2">Meta Title</label>
                                        <input value={pageData.meta.title} onChange={(e) => handleUpdateField('meta.title', e.target.value)} className="w-full p-3 bg-white rounded-lg outline-none text-xs" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-2">Meta Description</label>
                                        <textarea value={pageData.meta.description} onChange={(e) => handleUpdateField('meta.description', e.target.value)} rows="3" className="w-full p-3 bg-white rounded-lg outline-none text-xs" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. VISUALS */}
                {activeTab === 'visuals' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-8">
                            <h3 className="font-display text-2xl text-[#5A2A45]">Entrance Visual</h3>
                            <div className="space-y-6">
                                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#FAF9F6] relative group max-w-sm mx-auto shadow-xl">
                                    {pageData.visuals.entranceImage ? <img src={pageData.visuals.entranceImage} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon size={48} /></div>}
                                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"><Upload size={32} /><input type="file" className="hidden" onChange={(e) => handleUploadImage(e.target.files[0], 'visuals.entranceImage')} /></label>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3">Entrance Caption</label>
                                    <input value={pageData.visuals.entranceLabel} onChange={(e) => handleUpdateField('visuals.entranceLabel', e.target.value)} className="w-full p-4 bg-[#FAF9F6] rounded-xl outline-none text-center font-bold text-[#5A2A45] uppercase tracking-widest text-[10px]" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-8 lowercase">
                            <h3 className="font-display text-2xl text-[#5A2A45] normal-case">Cinematic Portrait</h3>
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-[#FAF9F6] relative group shadow-xl">
                                {pageData.visuals.verticalImage ? <img src={pageData.visuals.verticalImage} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon size={48} /></div>}
                                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-3xl"><Upload size={32} /><input type="file" className="hidden" onChange={(e) => handleUploadImage(e.target.files[0], 'visuals.verticalImage')} /></label>
                            </div>
                            <p className="text-xs text-[#8F8A86] normal-case italic text-center">This image dominates the right side of the hero section with a cinematic grayscale effect.</p>
                        </div>
                    </div>
                )}

                {/* 4. SOCIALS */}
                {activeTab === 'socials' && (
                    <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-10">
                        <h3 className="font-display text-2xl text-[#5A2A45]">Social Echo Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { id: 'instagram', label: 'Instagram Profile', icon: Instagram },
                                { id: 'facebook', label: 'Facebook Page', icon: Share2 },
                                { id: 'threads', label: 'Threads Account', icon: Sparkles },
                                { id: 'pinterest', label: 'Pinterest Board', icon: Archive },
                                { id: 'youtube', label: 'YouTube Channel', icon: Share2 },
                            ].map((social) => (
                                <div key={social.id} className="p-6 bg-[#FAF9F6] rounded-2xl border border-[#5A2A45]/5">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] mb-3 flex items-center gap-2"><social.icon size={14} /> {social.label}</label>
                                    <input
                                        value={pageData.socials[social.id]}
                                        onChange={(e) => handleUpdateField(`socials.${social.id}`, e.target.value)}
                                        className="w-full p-3 bg-white border border-[#5A2A45]/5 rounded-xl outline-none text-xs"
                                        placeholder="https://..."
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 5. COLLAGE */}
                {activeTab === 'collage' && (
                    <div className="bg-white rounded-[2.5rem] p-10 border border-[#5A2A45]/5 shadow-sm space-y-10">
                        <div className="flex justify-between items-end border-b border-[#5A2A45]/5 pb-6">
                            <div className="space-y-2">
                                <h3 className="font-display text-2xl text-[#5A2A45]">Family Collage Preview</h3>
                                <p className="text-xs text-[#8F8A86]">The two floating images in the "Join Our Family" section.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-3xl mx-auto">
                            {[0, 1].map((idx) => (
                                <div key={idx} className="space-y-4">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8F8A86] text-center">Preview Image {idx + 1}</label>
                                    <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-[#FAF9F6] group shadow-2xl transition-transform hover:scale-[1.02]">
                                        {pageData.collage.images[idx] ? <img src={pageData.collage.images[idx]} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon size={40} /></div>}
                                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                                            <Upload size={24} />
                                            <input type="file" className="hidden" onChange={(e) => handleUploadImage(e.target.files[0], 'collage.images', idx)} />
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageContact;
