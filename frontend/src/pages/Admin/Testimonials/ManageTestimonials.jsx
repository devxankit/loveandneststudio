import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, Trash2, Check, X } from 'lucide-react';

const TestimonialCard = ({ review, onDelete, onToggleVisibility }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`bg-white rounded-[2rem] p-8 shadow-sm border transition-all duration-300 relative overflow-hidden group
            ${review.isVisible ? 'border-[#5A2A45]/5 hover:shadow-lg' : 'border-dashed border-gray-300 opacity-60 hover:opacity-100'}
        `}
    >
        {/* Status Badge */}
        <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] uppercase tracking-widest font-bold
            ${review.isVisible ? 'bg-[#E6F4EA] text-emerald-700' : 'bg-gray-100 text-gray-500'}
        `}>
            {review.isVisible ? 'Published' : 'Hidden'}
        </div>

        <div className="flex items-start gap-5 mb-6">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-[#5A2A45] font-display text-xl font-bold shrink-0 border-2 border-white shadow-md">
                {review.initial}
            </div>
            <div>
                <h3 className="font-display text-lg text-[#5A2A45] leading-tight">{review.name}</h3>
                <p className="text-xs text-[#B77A8C] font-outfit uppercase tracking-wider font-medium">{review.role}</p>
                <div className="flex gap-0.5 mt-1.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "fill-[#B77A8C] text-[#B77A8C]" : "text-gray-200"} />
                    ))}
                </div>
            </div>
        </div>

        <div className="relative mb-8">
            <span className="absolute -top-4 -left-2 text-6xl text-[#5A2A45]/5 font-serif font-black leading-none">“</span>
            <p className="relative z-10 text-[#6E5A52] text-sm leading-relaxed italic">{review.content}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#F1EBDD]">
            <button
                onClick={() => onToggleVisibility(review.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors
                    ${review.isVisible
                        ? 'bg-[#F9F7F2] text-[#5A2A45] hover:bg-gray-200'
                        : 'bg-[#5A2A45] text-white hover:bg-[#4a2238]'}
                `}
            >
                {review.isVisible ? (
                    <>Hide <X size={14} /></>
                ) : (
                    <>Approve <Check size={14} /></>
                )}
            </button>
            <button
                onClick={() => onDelete(review.id)}
                className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Delete"
            >
                <Trash2 size={16} />
            </button>
        </div>
    </motion.div>
);

const ManageTestimonials = () => {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            initial: 'P',
            name: 'Priya Jha',
            role: 'Happy Mother',
            content: 'Thank you for the beautiful photos. Your work is wonderful and you are a very nice photographer—professional, kind, and talented. Thank you for making my son 1st birthday special.',
            rating: 5,
            isVisible: true
        },
        {
            id: 2,
            initial: 'R',
            name: 'Reshu Verma',
            role: 'Mentor',
            content: 'Anamika is a rare blend of precision, grace, and quiet strength... collaborating with her has been nothing short of inspiring.',
            rating: 5,
            isVisible: true
        },
        {
            id: 3,
            initial: 'S',
            name: 'Sneha Gupta',
            role: 'New Client',
            content: 'Absolutely loved the session! The studio was so warm and welcoming for our newborn.',
            rating: 4,
            isVisible: false // Pending approval
        }
    ]);

    const handleToggle = (id) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, isVisible: !r.isVisible } : r));
    };

    const handleDelete = (id) => {
        if (confirm("Remove this review?")) setReviews(reviews.filter(r => r.id !== id));
    };

    return (
        <div className="space-y-10 max-w-6xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="font-display text-4xl text-[#5A2A45] mb-2">Client Love</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Manage testimonials and reviews from your community.</p>
                </div>

                <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-sm border border-[#5A2A45]/5">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#5A2A45]">Average Rating</span>
                    <div className="flex items-center gap-1 text-[#B77A8C]">
                        <Star size={16} className="fill-current" />
                        <span className="font-display text-xl font-bold">4.9</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {reviews.map(review => (
                        <TestimonialCard
                            key={review.id}
                            review={review}
                            onToggleVisibility={handleToggle}
                            onDelete={handleDelete}
                        />
                    ))}
                </AnimatePresence>

                {/* Add New Placeholder (Optional) */}
                <button className="rounded-[2rem] border-2 border-dashed border-[#5A2A45]/10 flex flex-col items-center justify-center min-h-[300px] text-[#5A2A45]/40 hover:text-[#5A2A45] hover:border-[#5A2A45]/30 hover:bg-[#5A2A45]/5 transition-all group">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <MessageSquare size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Add Manual Review</span>
                </button>
            </div>
        </div>
    );
};

export default ManageTestimonials;
