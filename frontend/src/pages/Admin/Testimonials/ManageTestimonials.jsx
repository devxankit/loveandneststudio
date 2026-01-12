import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, Trash2, Check, X, Plus, Upload, Loader, Image as ImageIcon, Save, Play } from 'lucide-react';
import {
    getTestimonials, createTestimonial, deleteTestimonial, updateTestimonial,
    getPage, updatePageSectionJSON, uploadImage
} from '../../../services/api';

const HeroImageManager = ({ images = [], onUpdate, onSave, isSaving }) => {
    const [uploadingIndex, setUploadingIndex] = useState(null);

    // Ensure we always have exactly 15 slots
    const slots = Array(15).fill(null).map((_, i) => images[i] || null);

    const handleReplace = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingIndex(index);
        try {
            const formData = new FormData();
            formData.append('image', file);
            const res = await uploadImage(formData);

            const newImages = [...slots];
            newImages[index] = res.data.url;

            // Do not filter out nulls to maintain slot positions
            onUpdate(newImages);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload image");
        } finally {
            setUploadingIndex(null);
        }
    };

    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#5A2A45]/5 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="font-display text-2xl text-[#5A2A45]">Hero Animation Gallery</h2>
                    <p className="text-[#6E5A52] text-sm font-outfit font-light">
                        Manage the 15 specific images used in the "Wall of Love" animation.
                        Click on any slot to replace that specific image.
                    </p>
                </div>
                <button
                    onClick={onSave}
                    disabled={isSaving}
                    className="bg-[#5A2A45] text-[#F1EBDD] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-all shadow-lg flex items-center gap-2 disabled:opacity-70 shrink-0"
                >
                    {isSaving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {slots.map((url, index) => (
                    <div key={index} className="space-y-2">
                        <p className="text-xs font-bold uppercase text-[#5A2A45]/50 text-center">Position {index + 1}</p>
                        <div className="aspect-[3/4] relative group rounded-xl overflow-hidden shadow-sm bg-[#F9F7F2] border-2 border-dashed border-[#5A2A45]/10">
                            {url ? (
                                <img src={url} alt={`Pos ${index + 1}`} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#5A2A45]/20">
                                    <ImageIcon size={24} />
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="cursor-pointer bg-white text-[#5A2A45] p-2 rounded-full hover:bg-[#F1EBDD] transition-colors shadow-lg transform hover:scale-105 active:scale-95">
                                    {uploadingIndex === index ? (
                                        <Loader size={16} className="animate-spin" />
                                    ) : (
                                        <Upload size={16} />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleReplace(e, index)}
                                        disabled={uploadingIndex !== null}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TestimonialModal = ({ isOpen, onClose, onSave, review }) => {
    const [formData, setFormData] = useState({
        clientName: '',
        content: '',
        role: 'Client',
        rating: 5,
        image: null
    });
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (review) {
            setFormData({
                clientName: review.clientName,
                content: review.content,
                role: review.serviceType || 'Client', // Map serviceType back to role
                rating: review.rating,
                image: review.image // Keep existing URL
            });
            setPreview(review.image);
        } else {
            setFormData({ clientName: '', content: '', role: 'Client', rating: 5, image: null });
            setPreview(null);
        }
    }, [review, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const data = new FormData();
        data.append('clientName', formData.clientName);
        data.append('content', formData.content);
        data.append('serviceType', formData.role);
        data.append('rating', formData.rating);
        if (formData.image instanceof File) {
            data.append('image', formData.image);
        }

        try {
            await onSave(data, review?._id);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display text-2xl text-[#5A2A45]">{review ? 'Edit Review' : 'Add Testimonial'}</h2>
                    <button onClick={onClose}><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        placeholder="Client Name"
                        className="w-full p-3 bg-[#F9F7F2] rounded-xl outline-none"
                        value={formData.clientName}
                        onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Service / Role (e.g. Newborn Session)"
                        className="w-full p-3 bg-[#F9F7F2] rounded-xl outline-none"
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                    />
                    <textarea
                        placeholder="Review Content"
                        className="w-full p-3 bg-[#F9F7F2] rounded-xl outline-none min-h-[100px]"
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                        required
                    />
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-bold text-[#5A2A45]">Rating:</label>
                        <select
                            value={formData.rating}
                            onChange={e => setFormData({ ...formData, rating: e.target.value })}
                            className="bg-[#F9F7F2] p-2 rounded-lg"
                        >
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className="flex items-center gap-4">
                        {preview && <img src={preview} alt="Preview" className="w-12 h-12 rounded-full object-cover" />}
                        <input type="file" onChange={e => {
                            if (e.target.files[0]) {
                                setFormData({ ...formData, image: e.target.files[0] });
                                setPreview(URL.createObjectURL(e.target.files[0]));
                            }
                        }} />
                    </div>

                    <button type="submit" disabled={saving} className="w-full py-3 bg-[#5A2A45] text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#4a2238] disabled:opacity-50">
                        {saving ? 'Saving...' : (review ? 'Update Review' : 'Add Review')}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const TestimonialCard = ({ review, onDelete, onEdit }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#5A2A45]/5 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
    >
        <div className="flex items-start gap-5 mb-6">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-[#5A2A45] font-display text-xl font-bold shrink-0 border-2 border-white shadow-md overflow-hidden">
                {review.image ? (
                    <img src={review.image} alt={review.clientName} className="w-full h-full object-cover" />
                ) : (
                    review.clientName.charAt(0)
                )}
            </div>
            <div>
                <h3 className="font-display text-lg text-[#5A2A45] leading-tight">{review.clientName}</h3>
                <p className="text-xs text-[#B77A8C] font-outfit uppercase tracking-wider font-medium">{review.serviceType || 'Client'}</p>
                <div className="flex gap-0.5 mt-1.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "fill-[#B77A8C] text-[#B77A8C]" : "text-gray-200"} />
                    ))}
                </div>
            </div>
        </div>

        <div className="relative mb-8">
            <span className="absolute -top-4 -left-2 text-6xl text-[#5A2A45]/5 font-serif font-black leading-none">“</span>
            <p className="relative z-10 text-[#6E5A52] text-sm leading-relaxed italic line-clamp-4">{review.content}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#F1EBDD]">
            <button
                onClick={() => onEdit(review)}
                className="p-2 text-[#5A2A45] hover:bg-[#5A2A45]/5 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold uppercase"
                title="Edit"
            >
                Edit
            </button>
            <button
                onClick={() => onDelete(review._id)}
                className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold uppercase"
                title="Delete"
            >
                <Trash2 size={16} /> Delete
            </button>
        </div>
    </motion.div>
);

const ManageTestimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [heroImages, setHeroImages] = useState([]);
    const [pageContent, setPageContent] = useState(null);
    const [savingGallery, setSavingGallery] = useState(false);
    const [youtubeLinks, setYoutubeLinks] = useState(['', '', '']);
    const [savingYoutube, setSavingYoutube] = useState(false);

    const fetchData = async () => {
        try {
            const [reviewsRes, pageRes] = await Promise.all([
                getTestimonials(),
                getPage('testimonials')
            ]);
            setReviews(reviewsRes.data);
            setPageContent(pageRes.data);

            // Extract hero images from page content
            const heroSection = pageRes.data.sections.find(s => s.id === 'hero');
            if (heroSection && heroSection.content && heroSection.content.images) {
                setHeroImages(heroSection.content.images);
            }

            // Extract Youtube Links from CTA section
            const ctaSection = pageRes.data.sections.find(s => s.id === 'cta');
            if (ctaSection && ctaSection.content && ctaSection.content.videos) {
                // Ensure we always have 3 slots
                const loadedVideos = ctaSection.content.videos;
                const paddedVideos = [...loadedVideos];
                while (paddedVideos.length < 3) paddedVideos.push('');
                setYoutubeLinks(paddedVideos.slice(0, 3));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Remove this review?")) {
            await deleteTestimonial(id);
            setReviews(reviews.filter(r => r._id !== id));
        }
    };

    const handleSaveReview = async (formData, id) => {
        if (id) {
            if (typeof updateTestimonial === 'function') {
                await updateTestimonial(id, formData);
            }
        } else {
            await createTestimonial(formData);
        }
        setIsModalOpen(false);
        setEditingReview(null);
        fetchData(); // Refresh all data
    };

    const handleUpdateHeroImages = (newImages) => {
        setHeroImages(newImages); // Optimistic / Local update only
    };

    const handleSaveHeroGallery = async () => {
        setSavingGallery(true);
        try {
            const heroContent = pageContent.sections.find(s => s.id === 'hero')?.content || {};
            await updatePageSectionJSON('testimonials', 'hero', { ...heroContent, images: heroImages });
            alert("Hero Gallery Saved Successfully!");
        } catch (error) {
            console.error("Failed to update hero images", error);
            alert("Failed to save changes to hero gallery.");
        } finally {
            setSavingGallery(false);
        }
    };

    const openEdit = (review) => {
        setEditingReview(review);
        setIsModalOpen(true);
    }

    const openNew = () => {
        setEditingReview(null);
        setIsModalOpen(true);
    }

    // Calculate dynamic rating
    const avgRating = reviews.length
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : '0.0';

    if (loading) return <div className="h-screen flex items-center justify-center text-[#5A2A45]"><Loader className="animate-spin mr-2" /> Loading Reviews...</div>;

    return (
        <div className="space-y-10 max-w-6xl mx-auto min-h-screen pb-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="font-display text-4xl text-[#5A2A45] mb-2">Client Love</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Manage testimonials and reviews from your community.</p>
                </div>

                <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-sm border border-[#5A2A45]/5">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Average Rating</span>
                    <div className="flex items-center gap-1 text-[#B77A8C]">
                        <Star size={16} className="fill-current" />
                        <span className="font-display text-xl font-bold">{avgRating}</span>
                    </div>
                </div>
            </div>

            {/* Hero Gallery Manager */}
            <HeroImageManager
                images={heroImages}
                onUpdate={handleUpdateHeroImages}
                onSave={handleSaveHeroGallery}
                isSaving={savingGallery}
            />

            {/* YouTube Videos Manager */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#5A2A45]/5 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h2 className="font-display text-2xl text-[#5A2A45]">YouTube Highlights</h2>
                        <p className="text-[#6E5A52] text-sm font-outfit font-light">
                            Add up to 3 YouTube video links to display above the footer.
                        </p>
                    </div>
                    <button
                        onClick={async () => {
                            setSavingYoutube(true);
                            try {
                                const ctaContent = pageContent.sections.find(s => s.id === 'cta')?.content || {};
                                await updatePageSectionJSON('testimonials', 'cta', { ...ctaContent, videos: youtubeLinks });
                                alert("YouTube Links Saved Successfully!");
                            } catch (error) {
                                console.error("Failed to save youtube links", error);
                                alert("Failed to save.");
                            } finally {
                                setSavingYoutube(false);
                            }
                        }}
                        disabled={savingYoutube}
                        className="bg-[#5A2A45] text-[#F1EBDD] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-all shadow-lg flex items-center gap-2 disabled:opacity-70 shrink-0"
                    >
                        {savingYoutube ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                        Save Links
                    </button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {youtubeLinks.map((link, i) => (
                        <div key={i} className="space-y-2">
                            <label className="text-xs font-bold uppercase text-[#5A2A45]/50">Video {i + 1} URL</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={link}
                                    onChange={(e) => {
                                        const newLinks = [...youtubeLinks];
                                        newLinks[i] = e.target.value;
                                        setYoutubeLinks(newLinks);
                                    }}
                                    className="w-full p-4 bg-[#F9F7F2] rounded-xl outline-none font-outfit text-sm text-[#5A2A45] border border-transparent focus:border-[#5A2A45]/20"
                                />
                                <div className="absolute top-1/2 right-4 -translate-y-1/2 text-[#5A2A45]/40">
                                    <Play size={16} />
                                </div>
                            </div>
                            {link && (
                                <div className="aspect-video bg-black/5 rounded-lg overflow-hidden relative">
                                    {/* Simple preview logic */}
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${link.split('v=')[1]?.split('&')[0] || link.split('/').pop()}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {reviews.map(review => (
                        <TestimonialCard
                            key={review._id}
                            review={review}
                            onDelete={handleDelete}
                            onEdit={openEdit}
                        />
                    ))}
                </AnimatePresence>

                {/* Add New Button */}
                <button
                    onClick={openNew}
                    className="rounded-[2rem] border-2 border-dashed border-[#5A2A45]/10 flex flex-col items-center justify-center min-h-[300px] text-[#5A2A45]/40 hover:text-[#5A2A45] hover:border-[#5A2A45]/30 hover:bg-[#5A2A45]/5 transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <MessageSquare size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Add Manual Review</span>
                </button>
            </div>

            <TestimonialModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveReview}
                review={editingReview}
            />
        </div>
    );
};

export default ManageTestimonials;
