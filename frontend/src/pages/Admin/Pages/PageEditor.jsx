import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, Layout, Type, Image as ImageIcon, List, Plus } from 'lucide-react';

// Mock Config Data (In a real app, this comes from an API or Config file)
const PAGE_CONFIGS = {
    home: {
        title: "Home Page",
        description: "Manage the main landing page sections.",
        sections: [
            { id: 'hero', title: "Hero Slider", icon: ImageIcon, status: 'Active', fields: ['slider_images', 'overlay_text'] },
            { id: 'intro', title: "Welcome / Hello", icon: Type, status: 'Active', fields: ['heading', 'subtext', 'image'] },
            { id: 'artist', title: "The Artist", icon: Layout, status: 'Active', fields: ['artist_name', 'bio', 'portrait'] },
            { id: 'philosophy', title: "Philosophy", icon: List, status: 'Active', fields: ['quote', 'points'] },
            { id: 'curated', title: "Curated Moments (Split)", icon: ImageIcon, status: 'Active', fields: ['gallery_images'] },
        ]
    },
    about: {
        title: "About Page",
        description: "Edit your biography and studio details.",
        sections: [
            { id: 'hero', title: "Hero Section", icon: ImageIcon, status: 'Active' },
            { id: 'bio', title: "Biography Script", icon: Type, status: 'Active' },
            { id: 'why_us', title: "Why Choose Us", icon: List, status: 'Active' },
        ]
    },
    contact: {
        title: "Contact Page",
        description: "Update contact info and form settings.",
        sections: [
            { id: 'info', title: "Contact Info", icon: Type, status: 'Active' },
            { id: 'form', title: "Form Settings", icon: List, status: 'Active' },
        ]
    }
};

const PageEditor = () => {
    const { pageId } = useParams();
    const navigate = useNavigate();
    const config = PAGE_CONFIGS[pageId];

    // State for the currently selected section to edit
    const [activeSection, setActiveSection] = useState(null);

    // Mock Form State
    const [formData, setFormData] = useState({});

    if (!config) return <div className="p-10 text-center">Page not found</div>;

    const handleSectionClick = (section) => {
        setActiveSection(section);
        // Reset/Load form data mock
        setFormData({ title: section.title, content: "Existing content..." });
    };

    const handleBack = () => {
        if (activeSection) {
            setActiveSection(null);
        } else {
            navigate('/admin/pages');
        }
    };

    const handleSave = () => {
        // Simulate save
        const btn = document.getElementById('save-btn');
        if (btn) {
            btn.innerText = "Saved!";
            setTimeout(() => btn.innerText = "Save Changes", 2000);
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-[#6E5A52] hover:text-[#5A2A45] transition-colors mb-2 text-sm font-medium"
                    >
                        <ArrowLeft size={16} /> {activeSection ? `Back to ${config.title}` : 'Back to Pages'}
                    </button>
                    <h1 className="font-display text-3xl md:text-4xl text-[#5A2A45]">
                        {activeSection ? activeSection.title : config.title}
                    </h1>
                    <p className="text-[#6E5A52]/70 font-outfit font-light text-sm">
                        {activeSection ? `Editing content for ${activeSection.title}` : config.description}
                    </p>
                </div>
                {activeSection && (
                    <button
                        id="save-btn"
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#5A2A45] text-[#F1EBDD] rounded-full text-sm font-bold tracking-wide hover:bg-[#4a2238] transition-all shadow-lg active:scale-95"
                    >
                        <Save size={16} /> Save Changes
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
                        {config.sections.map((section) => (
                            <motion.button
                                key={section.id}
                                onClick={() => handleSectionClick(section)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-[#5A2A45]/5 text-left group hover:shadow-md transition-all flex flex-col h-40 justify-between relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <section.icon size={64} className="text-[#5A2A45]" />
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-[#F1EBDD] flex items-center justify-center text-[#5A2A45] mb-4">
                                    <section.icon size={20} />
                                </div>
                                <div>
                                    <h3 className="font-display text-lg text-[#5A2A45]">{section.title}</h3>
                                    <p className="text-xs text-[#6E5A52]/60 mt-1 uppercase tracking-wider">Click to Edit</p>
                                </div>
                            </motion.button>
                        ))}

                        {/* Add New Section Button (Visual Mock) */}
                        <button className="border-2 border-dashed border-[#5A2A45]/10 rounded-2xl flex flex-col items-center justify-center gap-3 text-[#5A2A45]/40 hover:text-[#5A2A45] hover:border-[#5A2A45]/30 transition-all h-40">
                            <Plus size={24} />
                            <span className="text-sm font-medium">Add Section</span>
                        </button>
                    </motion.div>
                ) : (
                    /* EDITING VIEW */
                    <motion.div
                        key="editor"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white rounded-2xl shadow-sm border border-[#5A2A45]/5 p-8 max-w-4xl"
                    >
                        {/* Dynamic Field Mockup */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]/70 mb-2">Section Heading</label>
                                <input
                                    type="text"
                                    defaultValue={activeSection.title}
                                    className="w-full text-lg p-4 bg-[#F8F6F4] border-b-2 border-transparent focus:border-[#5A2A45] outline-none rounded-t-lg transition-colors font-display text-[#5A2A45]"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]/70 mb-2">Primary Image</label>
                                    <div className="aspect-video bg-[#F1EBDD] rounded-xl flex flex-col items-center justify-center text-[#5A2A45]/50 border-2 border-dashed border-[#5A2A45]/10 hover:border-[#5A2A45]/30 cursor-pointer transition-colors group">
                                        <ImageIcon size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-medium">Click to Upload</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]/70 mb-2">Visibility</label>
                                    <div className="flex items-center gap-4 p-4 bg-[#F8F6F4] rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <span className="text-sm font-medium text-[#5A2A45]">Visible</span>
                                        </div>
                                        <button className="text-xs text-[#B77A8C] hover:text-[#5A2A45] underline">Change</button>
                                    </div>

                                    <div className="mt-6">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]/70 mb-2">Background Color</label>
                                        <div className="flex gap-2">
                                            {['#F1EBDD', '#5A2A45', '#FFFFFF', '#C9D0C3'].map(c => (
                                                <div key={c} className="w-8 h-8 rounded-full border border-black/10 cursor-pointer hover:scale-110 transition-transform shadow-sm" style={{ backgroundColor: c }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#5A2A45]/70 mb-2">Content / Description</label>
                                <textarea
                                    className="w-full h-40 p-4 bg-[#F8F6F4] rounded-lg outline-none focus:ring-1 focus:ring-[#5A2A45] resize-none"
                                    placeholder="Enter section content here..."
                                    defaultValue={`Content for ${activeSection.title}...`}
                                ></textarea>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PageEditor;
