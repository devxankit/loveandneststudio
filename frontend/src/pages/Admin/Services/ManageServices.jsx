import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Tag, Plus, Trash2, Edit2,
    Check, X, Image as ImageIcon,
    MoreVertical, DollarSign, List,
    Archive
} from 'lucide-react';

const ServiceCard = ({ service, onEdit, onDelete, onToggleVisibility }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -5 }}
        className={`bg-white rounded-[2rem] overflow-hidden shadow-sm border transition-all duration-300 group
            ${service.isActive ? 'border-[#5A2A45]/5 hover:shadow-xl' : 'border-dashed border-gray-300 opacity-60 bg-gray-50'}
        `}
    >
        {/* Card Image */}
        <div className="h-48 relative overflow-hidden bg-gray-100">
            {service.image ? (
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon size={32} />
                </div>
            )}

            {/* Status Badge */}
            <div className="absolute top-4 right-4 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md
                    ${service.isActive
                        ? 'bg-white/90 text-[#5A2A45] shadow-sm'
                        : 'bg-gray-200/90 text-gray-500'}
                 `}>
                    {service.isActive ? 'Active' : 'Archived'}
                </span>
            </div>
        </div>

        {/* Content */}
        <div className="p-6">
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-display text-xl text-[#5A2A45] leading-tight">{service.title}</h3>
                <button className="text-gray-400 hover:text-[#5A2A45] transition-colors">
                    <MoreVertical size={16} />
                </button>
            </div>

            <p className="text-xs text-[#6E5A52]/70 line-clamp-2 mb-6 h-8">{service.description}</p>

            {/* Features Preview */}
            <div className="space-y-2 mb-6">
                {service.features.slice(0, 2).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#6E5A52]">
                        <Check size={10} className="text-[#B77A8C]" />
                        <span>{feature}</span>
                    </div>
                ))}
                {service.features.length > 2 && (
                    <span className="text-[10px] text-[#B77A8C] ml-5">+ {service.features.length - 2} more features</span>
                )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#F1EBDD]">
                <div className="flex items-center gap-1 text-[#5A2A45] font-bold text-sm">
                    {service.price ? (
                        <>
                            <span className="text-xs text-[#B77A8C] font-normal uppercase mr-1">Starts</span>
                            ₹{service.price.toLocaleString()}
                        </>
                    ) : (
                        <span className="text-xs text-[#B77A8C] uppercase">Custom Pricing</span>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onToggleVisibility(service.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#5A2A45] transition-colors"
                        title={service.isActive ? "Archive" : "Activate"}
                    >
                        {service.isActive ? <Archive size={16} /> : <Check size={16} />}
                    </button>
                    <button
                        onClick={() => onEdit(service)}
                        className="p-2 rounded-lg hover:bg-[#F1EBDD] text-[#5A2A45] transition-colors"
                        title="Edit"
                    >
                        <Edit2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);

const ManageServices = () => {
    // Initial Data based on frontend Services.jsx
    const [services, setServices] = useState([
        {
            id: 1,
            title: "Maternity Photography",
            description: "Soft, soulful portraits that celebrate motherhood, love, and the beautiful bond between parents and baby.",
            image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            price: 15000,
            features: ["1 Hour Session", "15 Edited Images", "Access to Client Closet", "Family Portraits Included"],
            isActive: true
        },
        {
            id: 2,
            title: "Newborn Photography",
            description: "Gentle, cozy newborn sessions designed with safety and comfort at the heart.",
            image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            price: 25000,
            features: ["2-3 Hour Session", "20 Edited Images", "Orangic Props & Wraps", "Advanced Retouching"],
            isActive: true
        },
        {
            id: 3,
            title: "Baby Milestone",
            description: "3 Months • 6 Months • 9 Months • 1 Year. Capturing every beautiful milestone.",
            image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            price: 12000,
            features: ["45 Min Session", "10 Edited Images", "2 Setup Changes"],
            isActive: true
        },
        {
            id: 4,
            title: "Seasonal Mini Sessions",
            description: "Quick, festive sessions for Christmas, Diwali, or Mother's Day.",
            image: null,
            price: 8000,
            features: ["20 Min Session", "5 Digital Images"],
            isActive: false
        }
    ]);

    const handleToggle = (id) => {
        setServices(services.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
    };

    const handleDelete = (id) => {
        if (confirm("Delete this package?")) setServices(services.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto min-h-screen">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="font-display text-4xl text-[#5A2A45] mb-2">Service Packages</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Structure your offerings and pricing.</p>
                </div>

                <button className="flex items-center gap-2 bg-[#5A2A45] text-[#F1EBDD] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group">
                    <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                    <span>Create Package</span>
                </button>
            </div>

            {/* Active Services Grid */}
            <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#B77A8C] mb-4">Active Offerings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {services.filter(s => s.isActive).map(service => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                onToggleVisibility={handleToggle}
                                onDelete={handleDelete}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Archived/Draft Services */}
            <div className="pt-10 border-t border-[#5A2A45]/5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                    <Archive size={14} /> Archived / Drafts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                    <AnimatePresence>
                        {services.filter(s => !s.isActive).map(service => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                onToggleVisibility={handleToggle}
                                onDelete={handleDelete}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ManageServices;
