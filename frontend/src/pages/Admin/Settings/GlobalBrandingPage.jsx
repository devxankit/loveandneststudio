import React, { useState, useEffect } from 'react';
import { Upload, Save, Command, Trash2 } from 'lucide-react';
import axios from 'axios';

const BrandingPage = () => {
    const [settings, setSettings] = useState({
        navbarLogo: '',
        footerLogo: '',
        siteTitle: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [uploading, setUploading] = useState({ navbar: false, footer: false });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/settings');
            setSettings(res.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching settings:', error);
            setIsLoading(false);
        }
    };

    const handleUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading({ ...uploading, [type]: true });

        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSettings(prev => ({ ...prev, [type]: res.data.url }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Image upload failed');
        } finally {
            setUploading({ ...uploading, [type]: false });
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await axios.put('http://localhost:5000/api/settings', settings);
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Failed to save settings');
        } finally {
            setIsSaving(false);
        }
    };

    const handleRemove = (type) => {
        if (window.confirm('Are you sure you want to remove this logo?')) {
            setSettings(prev => ({ ...prev, [type]: '' }));
        }
    };

    if (isLoading) return <div className="p-10 text-center">Loading settings...</div>;

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="font-display text-4xl text-[#5A2A45] mb-2">Brand Identity</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Manage your studio's logos and global branding assets.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-[#5A2A45] text-[#F1EBDD] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-all shadow-lg flex items-center gap-2 disabled:opacity-70"
                >
                    {isSaving ? 'Saving...' : (
                        <>
                            <Save size={16} /> Save Changes
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Navbar Logo */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#5A2A45]/5">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F1EBDD]">
                        <div className="p-2 bg-[#F9F7F2] rounded-lg text-[#5A2A45]">
                            <Command size={20} />
                        </div>
                        <h3 className="font-display text-xl text-[#5A2A45]">Header Logo</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="aspect-video bg-[#F9F7F2] rounded-xl flex items-center justify-center border-2 border-dashed border-[#5A2A45]/10 relative group overflow-hidden">
                            {settings.navbarLogo ? (
                                <img src={settings.navbarLogo} alt="Navbar Logo" className="max-w-[80%] max-h-[80%] object-contain" />
                            ) : (
                                <div className="text-center text-[#5A2A45]/40 p-4">
                                    <p className="font-display text-lg mb-1">No Logo Uploaded</p>
                                    <p className="text-xs font-outfit">Upload a PNG file with transparent background</p>
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <label className="cursor-pointer bg-white text-[#5A2A45] px-6 py-2 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#F1EBDD] transition-colors shadow-lg">
                                    Change Logo
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'navbarLogo')} />
                                </label>
                                {settings.navbarLogo && (
                                    <button
                                        onClick={() => handleRemove('navbarLogo')}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                        title="Remove Logo"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>

                            {uploading.navbar && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5A2A45]"></div>
                                </div>
                            )}
                        </div>


                    </div>
                </div>

                {/* Footer Logo */}
                <div className="bg-[#5A2A45] rounded-[2rem] p-8 shadow-lg text-[#F1EBDD]">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F1EBDD]/10">
                        <div className="p-2 bg-white/10 rounded-lg text-[#F1EBDD]">
                            <Command size={20} />
                        </div>
                        <h3 className="font-display text-xl text-[#F1EBDD]">Footer Logo</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="aspect-video bg-black/20 rounded-xl flex items-center justify-center border-2 border-dashed border-[#F1EBDD]/20 relative group overflow-hidden">
                            {settings.footerLogo ? (
                                <img src={settings.footerLogo} alt="Footer Logo" className="max-w-[80%] max-h-[80%] object-contain" />
                            ) : (
                                <div className="text-center text-[#F1EBDD]/40 p-4">
                                    <p className="font-display text-lg mb-1">No Logo Uploaded</p>
                                    <p className="text-xs font-outfit">Upload a white/light version for dark backgrounds</p>
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <label className="cursor-pointer bg-white text-[#5A2A45] px-6 py-2 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#F1EBDD] transition-colors shadow-lg">
                                    Change Logo
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'footerLogo')} />
                                </label>
                                {settings.footerLogo && (
                                    <button
                                        onClick={() => handleRemove('footerLogo')}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                        title="Remove Logo"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>

                            {uploading.footer && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F1EBDD]"></div>
                                </div>
                            )}
                        </div>


                    </div>
                </div>
            </div>


        </div>
    );
};

export default BrandingPage;
