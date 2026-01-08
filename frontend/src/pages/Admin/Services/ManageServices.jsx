import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    Tag, Plus, Trash2, Edit2,
    Check, X, Image as ImageIcon,
    MoreVertical, DollarSign, List,
    Archive, Save, Upload, Type, Eye
} from 'lucide-react';

// --- Utility Components ---
const InputField = ({ label, value, onChange, placeholder, type = "text", className = "" }) => (
    <div className={`space-y-1 ${className}`}>
        <label className="text-xs font-bold uppercase tracking-widest text-[#B77A8C]">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-[#f8f6f4] border border-[#d6d3d0] rounded-lg px-4 py-3 text-[#5A2A45] placeholder-[#B77A8C]/40 focus:outline-none focus:border-[#5A2A45] transition-colors"
        />
    </div>
);

const TextArea = ({ label, value, onChange, placeholder, rows = 4 }) => (
    <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-widest text-[#B77A8C]">{label}</label>
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="w-full bg-[#f8f6f4] border border-[#d6d3d0] rounded-lg px-4 py-3 text-[#5A2A45] placeholder-[#B77A8C]/40 focus:outline-none focus:border-[#5A2A45] transition-colors resize-none"
        />
    </div>
);

const ImageUploader = ({ label, currentImage, onUpload, onRemove, uploading }) => (
    <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-[#B77A8C]">{label}</label>
        <div className="relative group w-full h-48 bg-[#f8f6f4] border-2 border-dashed border-[#d6d3d0] rounded-xl overflow-hidden flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#5A2A45] transition-colors">
            {currentImage ? (
                <>
                    <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-2 bg-white text-red-500 rounded-full hover:bg-red-50">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </>
            ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <Upload size={24} className="text-[#B77A8C] mb-2" />
                    <span className="text-xs text-[#6E5A52] font-medium">{uploading ? 'Uploading...' : 'Click to Upload'}</span>
                    <input type="file" className="hidden" onChange={onUpload} accept="image/*" disabled={uploading} />
                </label>
            )}
        </div>
    </div>
);

// --- Main Page Component ---
const ManageServices = () => {
    // State
    const [pageData, setPageData] = useState({
        hero: { title: '', subtitle: '' },
        serviceList: [],
        meta: {}
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [modalTab, setModalTab] = useState('basic'); // 'basic' | 'content' | 'gallery'
    const [uploading, setUploading] = useState(false);

    // Initial Fetch
    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/services');
            if (res.data) setPageData(res.data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSavePage = async (updatedData = pageData) => {
        setSaving(true);
        try {
            await axios.put('http://localhost:5000/api/services', updatedData);
            setPageData(updatedData);
            // Optional: Show toast
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setSaving(false);
        }
    };

    // --- Modal Handlers ---
    const openCreateModal = () => {
        setEditingService({
            id: '',
            title: '',
            subtitle: '',
            description: '',
            details: '',
            coverImage: '',
            galleryImages: [],
            price: 0,
            features: [],
            isActive: true
        });
        setModalTab('basic');
        setIsModalOpen(true);
    };

    const openEditModal = (service) => {
        setEditingService({ ...service });
        setModalTab('basic');
        setIsModalOpen(true);
    };

    const generateId = (title) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    };

    const handleFileUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData);
            if (field === 'coverImage') {
                setEditingService(prev => ({ ...prev, coverImage: res.data.url }));
            } else if (field === 'galleryImages') {
                setEditingService(prev => ({ ...prev, galleryImages: [...prev.galleryImages, res.data.url] }));
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Ensure backend is running and configured.");
        } finally {
            setUploading(false);
        }
    };

    const handleModalSave = () => {
        // Ensure ID
        const finalService = {
            ...editingService,
            id: editingService.id || generateId(editingService.title)
        };

        // We replace the entire list to be safe about state
        let updatedList = [...pageData.serviceList];

        // Check if we are editing an existing item (by logic of existing match)
        // Since we didn't track "original ID" perfectly, we'll try to find by ID
        const existingIndex = updatedList.findIndex(s => s.id === finalService.id);

        // However, if ID changed, we might have a problem.
        // Simplified Logic: 
        // If we opened via 'Edit', we should replace the one we opened.
        // But since state is simple, let's just use ID matching.
        // If ID exists, overwrite. If not, push.
        // This means renaming ID = creating new. That's acceptable for now.
        // To be cleaner: Remove logic based on *original* ID would require tracking it.
        // Let's rely on cleaning up duplicates if they happen or assuming user manages IDs carefully.

        // Actually, let's remove the *old* one if we are editing.
        // But we don't know the old ID if it changed.
        // Let's assume ID is IMMUTABLE in the UI for Edit, or we just trust the overwrite.
        // I will make ID read-only if it's not empty initially? No, flexibility is good.

        if (existingIndex >= 0) {
            updatedList[existingIndex] = finalService;
        } else {
            updatedList.push(finalService);
        }

        const newPageData = { ...pageData, serviceList: updatedList };
        handleSavePage(newPageData);
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        const newList = pageData.serviceList.filter(s => s.id !== id);
        handleSavePage({ ...pageData, serviceList: newList });
    };

    // --- Render ---
    if (loading) return <div className="p-10 text-[#5A2A45]">Loading Admin Panel...</div>;

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto min-h-screen pb-20">

            {/* Header Area & Hero Editor */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#5A2A45]/5">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="font-display text-3xl text-[#5A2A45] mb-2">Services Page</h1>
                        <p className="text-[#6E5A52] font-outfit font-light">Manage your service offerings and page content</p>
                    </div>
                    <button
                        onClick={() => handleSavePage()}
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#F1EBDD] text-[#5A2A45] px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#E8CBB6] transition-colors"
                    >
                        {saving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        label="Hero Title"
                        value={pageData.hero.title}
                        onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, title: e.target.value } })}
                    />
                    <InputField
                        label="Hero Subtitle"
                        value={pageData.hero.subtitle}
                        onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, subtitle: e.target.value } })}
                    />
                </div>
            </div>

            {/* Services List */}
            <div>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="font-display text-xl text-[#5A2A45]">All Packages</h2>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 bg-[#5A2A45] text-[#F1EBDD] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        <Plus size={16} /> Add Package
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {pageData.serviceList && pageData.serviceList.map(service => (
                            <motion.div
                                key={service.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`bg-white rounded-[2rem] overflow-hidden shadow-sm border transition-all duration-300 group ${!service.isActive && 'opacity-60 grayscale'}`}
                            >
                                <div className="h-48 relative overflow-hidden bg-gray-100">
                                    {service.coverImage ? (
                                        <img src={service.coverImage} alt={service.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50"><ImageIcon size={24} /></div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#5A2A45]">
                                        {service.isActive ? 'Active' : 'Draft'}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-display text-xl text-[#5A2A45] mb-2">{service.title}</h3>
                                    <p className="text-xs text-[#6E5A52]/70 line-clamp-2 h-8 mb-4">{service.description}</p>
                                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                                        <button onClick={() => openEditModal(service)} className="flex-1 py-2 text-xs font-bold uppercase tracking-widest bg-[#F1EBDD] text-[#5A2A45] rounded-lg hover:bg-[#E8CBB6]">Edit</button>
                                        <button onClick={() => handleDelete(service.id)} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {pageData.serviceList.length === 0 && (
                        <div className="col-span-3 text-center py-10 text-gray-400">No services found. Add one to get started!</div>
                    )}
                </div>
            </div>

            {/* --- Edit Modal --- */}
            {isModalOpen && editingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
                    >
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#FAFAF9]">
                            <div>
                                <h3 className="font-display text-2xl text-[#5A2A45]">
                                    {editingService.id ? (editingService.title ? 'Edit Service' : 'New Service') : 'New Service'}
                                </h3>
                                <p className="text-xs text-[#6E5A52] uppercase tracking-widest">
                                    {editingService.title || 'Untitled'}
                                </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500"><X size={20} /></button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100 px-6">
                            {['basic', 'content', 'gallery'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setModalTab(tab)}
                                    className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${modalTab === tab ? 'border-[#5A2A45] text-[#5A2A45]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 overflow-y-auto flex-1 bg-[#fff]">
                            {modalTab === 'basic' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <InputField
                                            label="Service Title"
                                            value={editingService.title}
                                            onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                                            placeholder="e.g. Newborn Session"
                                        />
                                        <InputField
                                            label="Unique ID (Slug)"
                                            value={editingService.id}
                                            onChange={(e) => setEditingService({ ...editingService, id: e.target.value })}
                                            placeholder="auto-generated-slug"
                                        />
                                    </div>
                                    <TextArea
                                        label="Short Description (Card)"
                                        value={editingService.description}
                                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                        placeholder="Brief summary for the listing card..."
                                        rows={2}
                                    />
                                    <div className="grid grid-cols-2 gap-6">
                                        <InputField
                                            label="Starting Price"
                                            type="number"
                                            value={editingService.price}
                                            onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                                        />
                                        <div className="flex items-center gap-4 pt-6">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${editingService.isActive ? 'bg-[#5A2A45] border-[#5A2A45]' : 'border-gray-300'}`}>
                                                    {editingService.isActive && <Check size={12} className="text-white" />}
                                                </div>
                                                <input type="checkbox" className="hidden" checked={editingService.isActive} onChange={(e) => setEditingService({ ...editingService, isActive: e.target.checked })} />
                                                <span className="text-sm text-[#5A2A45] font-medium">Active / Visible</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {modalTab === 'content' && (
                                <div className="space-y-6">
                                    <InputField
                                        label="Page Subtitle"
                                        value={editingService.subtitle}
                                        onChange={(e) => setEditingService({ ...editingService, subtitle: e.target.value })}
                                        placeholder="Detailed subtitle for the sub-page"
                                    />
                                    <TextArea
                                        label="Full Details & Info"
                                        value={editingService.details}
                                        onChange={(e) => setEditingService({ ...editingService, details: e.target.value })}
                                        placeholder="Detailed description, process, what's included..."
                                        rows={12}
                                    />
                                </div>
                            )}

                            {modalTab === 'gallery' && (
                                <div className="space-y-8">
                                    {/* Cover Image */}
                                    <div>
                                        <h4 className="text-sm font-bold text-[#5A2A45] mb-4">Cover Image</h4>
                                        <div className="w-48">
                                            <ImageUploader
                                                label="Upload"
                                                currentImage={editingService.coverImage}
                                                onUpload={(e) => handleFileUpload(e, 'coverImage')}
                                                onRemove={() => setEditingService({ ...editingService, coverImage: '' })}
                                                uploading={uploading}
                                            />
                                        </div>
                                    </div>

                                    {/* Gallery Grid */}
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="text-sm font-bold text-[#5A2A45]">Gallery Images</h4>
                                            <label className="cursor-pointer flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B77A8C] hover:text-[#5A2A45] transition-colors">
                                                <Plus size={16} /> Add Image
                                                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'galleryImages')} accept="image/*" disabled={uploading} />
                                            </label>
                                        </div>

                                        {/* Gallery List */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {editingService.galleryImages && editingService.galleryImages.map((img, idx) => (
                                                <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square border border-gray-200">
                                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => setEditingService({
                                                            ...editingService,
                                                            galleryImages: editingService.galleryImages.filter((_, i) => i !== idx)
                                                        })}
                                                        className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                            {uploading && (
                                                <div className="flex items-center justify-center bg-gray-50 rounded-xl aspect-square border border-dashed border-gray-300">
                                                    <span className="text-xs text-gray-400 animate-pulse">Uploading...</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-100 bg-[#FAFAF9] flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleModalSave}
                                className="px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest bg-[#5A2A45] text-white hover:bg-[#4a2238] shadow-lg"
                            >
                                Save Service
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ManageServices;
