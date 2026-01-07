import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, Layout, Type, Image as ImageIcon, List, Loader } from 'lucide-react';
import { getPage, updatePageSection } from '../../../services/api';

const PageEditor = () => {
    const { pageId } = useParams(); // Using this as 'slug'
    const navigate = useNavigate();

    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [file, setFile] = useState(null); // For image uploads
    const [fileTargetKey, setFileTargetKey] = useState('image');

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const response = await getPage(pageId);
                setPageData(response.data);
            } catch (error) {
                console.error("Failed to fetch page:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [pageId]);

    const handleSectionClick = (section) => {
        setActiveSection(section);
        // Deep copy content to form state
        setEditForm({ ...section.content });
        setFile(null);
        setFileTargetKey('image');
    };

    const handleBack = () => {
        if (activeSection) {
            setActiveSection(null);
            setEditForm({});
        } else {
            navigate('/admin/pages');
        }
    };

    const handleInputChange = (key, value) => {
        setEditForm(prev => ({ ...prev, [key]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSave = async () => {
        if (!activeSection) return;
        setSaving(true);
        const formData = new FormData();

        // Append all text fields as a JSON string
        formData.append('content', JSON.stringify(editForm));

        if (file) {
            formData.append('image', file); // 'image' is the fieldname expected by multer
            formData.append('targetKey', fileTargetKey); // Tell backend which key to update
        }

        try {
            await updatePageSection(pageId, activeSection.id, formData);

            // Refresh local data
            const response = await getPage(pageId);
            setPageData(response.data);

            // Show success (you might want a toast here)
            alert('Section Updated Successfully!');
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || error.message || 'Unknown Error';
            alert(`Failed to save changes: ${msg}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="h-full flex items-center justify-center text-[#5A2A45]"><Loader className="animate-spin mr-2" /> Loading Page...</div>;
    if (!pageData) return <div className="p-10 text-center">Page not found via API ({pageId})</div>;

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            {/* Header */}
            <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-[#6E5A52] hover:text-[#5A2A45] transition-colors mb-2 text-sm font-medium"
                    >
                        <ArrowLeft size={16} /> {activeSection ? `Back to ${pageData.title}` : 'Back to Pages'}
                    </button>
                    <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-[#5A2A45]">
                        {activeSection ? `${activeSection.title || activeSection.id}` : pageData.title}
                    </h1>
                    <p className="text-[#6E5A52]/70 font-outfit font-light text-xs md:text-sm">
                        {activeSection ? 'Edit content fields below' : 'Manage page sections'}
                    </p>
                </div>
                {activeSection && (
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#5A2A45] text-[#F1EBDD] rounded-full text-sm font-bold tracking-wide hover:bg-[#4a2238] transition-all shadow-lg active:scale-95 disabled:opacity-50"
                    >
                        {saving ? <Loader className="animate-spin" size={16} /> : <Save size={16} />}
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                )}
            </div>

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
                {!activeSection ? (
                    /* SECTIONS GRID VIEW */
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {pageData.sections.map((section) => (
                            <motion.button
                                key={section.id}
                                onClick={() => handleSectionClick(section)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-[#5A2A45]/5 text-left group hover:shadow-md transition-all flex flex-col h-40 justify-between relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Layout size={64} className="text-[#5A2A45]" />
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-[#F1EBDD] flex items-center justify-center text-[#5A2A45] mb-4">
                                    <Type size={20} />
                                </div>
                                <div>
                                    <h3 className="font-display text-lg text-[#5A2A45]">{section.title || section.id}</h3>
                                    <p className="text-xs text-[#6E5A52]/60 mt-1 uppercase tracking-wider">Click to Edit</p>
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>
                ) : (
                    /* EDITING VIEW (DYNAMIC FIELDS) */
                    <motion.div
                        key="editor"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white rounded-2xl shadow-sm border border-[#5A2A45]/5 p-8 max-w-4xl"
                    >
                        <div className="space-y-6">
                            {/* Dynamically render inputs based on content keys */}
                            {/* Dynamically render inputs based on content keys */}
                            {Object.keys(editForm).map((key) => {
                                const value = editForm[key];
                                const isImageKey = key === 'image' || key === 'portrait' || key.toLowerCase().includes('img') || key.toLowerCase().includes('image');
                                const isGallery = (key === 'slides' || key === 'images') && Array.isArray(value);

                                if (isGallery) {
                                    return (
                                        <div key={key} className="p-4 bg-[#F8F6F4] rounded-xl border border-[#5A2A45]/5">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]/70 mb-4">
                                                Manage Gallery ({value.length})
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                {value.map((slide, idx) => (
                                                    <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-[#5A2A45]/10">
                                                        <img src={slide} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => {
                                                                const newSlides = value.filter((_, i) => i !== idx);
                                                                handleInputChange(key, newSlides);
                                                            }}
                                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            title="Remove Slide"
                                                        >
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="file"
                                                    onChange={(e) => {
                                                        if (e.target.files[0]) {
                                                            setFile(e.target.files[0]);
                                                            setFileTargetKey(key); // Target 'slides'
                                                        }
                                                    }}
                                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#5A2A45] file:text-[#F1EBDD] hover:file:bg-[#4a2238]"
                                                />
                                                {file && fileTargetKey === key && <span className="text-xs text-[#5A2A45] font-medium">Ready to Upload</span>}
                                            </div>
                                        </div>
                                    );
                                }

                                if (isImageKey) {
                                    return (
                                        <div key={key} className="p-4 bg-[#F8F6F4] rounded-xl border border-[#5A2A45]/5">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]/70 mb-2">
                                                {key.replace(/_/g, ' ')}
                                            </label>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                                {value ? (
                                                    <div className="w-full sm:w-24 h-40 sm:h-24 rounded-lg overflow-hidden border border-[#5A2A45]/10 shrink-0">
                                                        <img src={value} alt={key} className="w-full h-full object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className="w-full sm:w-24 h-24 rounded-lg bg-gray-100 border border-dashed border-[#5A2A45]/20 shrink-0 flex items-center justify-center text-center p-2">
                                                        <span className="text-[10px] text-[#5A2A45]/50 leading-tight">No Custom Image (Default Visible)</span>
                                                    </div>
                                                )}
                                                <div className="flex-1 w-full">
                                                    <input
                                                        type="file"
                                                        onChange={(e) => {
                                                            if (e.target.files[0]) {
                                                                setFile(e.target.files[0]);
                                                                setFileTargetKey(key); // Target specific key
                                                            }
                                                        }}
                                                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F1EBDD] file:text-[#5A2A45] hover:file:bg-[#E8CBB6]"
                                                    />
                                                    {file && fileTargetKey === key && <p className="text-xs text-[#5A2A45] mt-2 font-medium">New image selected. Click Save to apply.</p>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={key}>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]/70 mb-2">
                                            {key.replace(/_/g, ' ')}
                                        </label>
                                        <textarea
                                            value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value || ''}
                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                            className="w-full min-h-[50px] p-4 bg-[#F8F6F4] rounded-lg outline-none focus:ring-1 focus:ring-[#5A2A45] resize-y font-outfit"
                                        />
                                    </div>
                                );
                            })}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PageEditor;
