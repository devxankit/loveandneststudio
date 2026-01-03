import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Mail, Phone, Calendar,
    MessageSquare, CheckCircle, Clock, XCircle,
    ChevronDown, Star
} from 'lucide-react';

const InquiryCard = ({ inquiry, onStatusChange }) => {
    const statusColors = {
        'new': 'bg-blue-100 text-blue-700 border-blue-200',
        'contacted': 'bg-amber-100 text-amber-700 border-amber-200',
        'booked': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        'closed': 'bg-gray-100 text-gray-500 border-gray-200'
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-[#5A2A45]/5 hover:shadow-lg transition-all duration-300 group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                        ${inquiry.status === 'booked'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-[#F9F7F2] text-[#5A2A45]'
                        }
                    `}>
                        {inquiry.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-display text-lg text-[#5A2A45] leading-tight">{inquiry.name}</h3>
                        <p className="text-xs text-[#B77A8C] uppercase tracking-wider font-bold mt-1">{inquiry.service}</p>
                    </div>
                </div>

                {/* Status Dropdown (Simple) */}
                <div className="relative group/status">
                    <button className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1 ${statusColors[inquiry.status]}`}>
                        {inquiry.status} <ChevronDown size={12} />
                    </button>

                    <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden hidden group-hover/status:block z-10 p-1">
                        {['new', 'contacted', 'booked', 'closed'].map(s => (
                            <button
                                key={s}
                                onClick={() => onStatusChange(inquiry.id, s)}
                                className={`w-full text-left px-3 py-2 text-xs font-medium uppercase tracking-wide rounded-lg hover:bg-gray-50 ${inquiry.status === s ? 'text-[#5A2A45] font-bold bg-[#F9F7F2]' : 'text-gray-500'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 text-sm text-[#6E5A52]">
                    <Mail size={14} className="text-[#5A2A45]/40" />
                    <a href={`mailto:${inquiry.email}`} className="hover:text-[#B77A8C] transition-colors">{inquiry.email}</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#6E5A52]">
                    <Phone size={14} className="text-[#5A2A45]/40" />
                    <a href={`tel:${inquiry.phone}`} className="hover:text-[#B77A8C] transition-colors">{inquiry.phone}</a>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#6E5A52]/60 mt-1">
                    <Clock size={12} /> Received {inquiry.date}
                </div>
            </div>

            {/* Message Preview */}
            <div className="bg-[#F9F7F2] p-4 rounded-xl relative mb-4">
                <MessageSquare size={16} className="absolute -top-2 -left-2 text-[#B77A8C] bg-white rounded-full p-0.5" />
                <p className="text-xs text-[#6E5A52] italic line-clamp-3">"{inquiry.message}"</p>
            </div>

            {/* Action Bar */}
            <div className="flex gap-2 pt-2 border-t border-gray-50">
                <a
                    href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 text-center rounded-lg bg-[#25D366]/10 text-[#25D366] text-xs font-bold uppercase tracking-widest hover:bg-[#25D366]/20 transition-colors"
                >
                    WhatsApp
                </a>
                <a
                    href={`mailto:${inquiry.email}`}
                    className="flex-1 py-2 text-center rounded-lg bg-[#5A2A45]/5 text-[#5A2A45] text-xs font-bold uppercase tracking-widest hover:bg-[#5A2A45]/10 transition-colors"
                >
                    Email Reply
                </a>
            </div>
        </motion.div>
    );
};

const ManageInquiries = () => {
    const [inquiries, setInquiries] = useState([
        {
            id: 1,
            name: "Priya Sharma",
            email: "priya.s@example.com",
            phone: "+91 98765 43210",
            service: "Newborn Photography",
            message: "Hi, I am due next month and would like to know your package details for a newborn shoot. Do you provide props?",
            date: "2 hours ago",
            status: "new"
        },
        {
            id: 2,
            name: "Amit Verma",
            email: "amit.v@example.com",
            phone: "+91 99887 76655",
            service: "Family Portrait",
            message: "Looking for a outdoor family session for our 5th anniversary. We are a family of 4.",
            date: "1 day ago",
            status: "contacted"
        },
        {
            id: 3,
            name: "Sneha Gupta",
            email: "sneha.g@example.com",
            phone: "+91 88776 65544",
            service: "Maternity",
            message: "Interested in the luxury maternity package. Is makeup included?",
            date: "3 days ago",
            status: "booked"
        }
    ]);

    const [filter, setFilter] = useState('all');

    const handleStatusChange = (id, newStatus) => {
        setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    };

    const filteredInquiries = filter === 'all'
        ? inquiries
        : inquiries.filter(i => i.status === filter);

    const stats = {
        new: inquiries.filter(i => i.status === 'new').length,
        pending: inquiries.filter(i => i.status === 'contacted').length,
        booked: inquiries.filter(i => i.status === 'booked').length
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto min-h-screen">

            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                    <h1 className="font-display text-4xl text-[#5A2A45] mb-2">Lead Pipeline</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Manage and convert your potential clients.</p>
                </div>

                <div className="flex gap-3">
                    <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-blue-700 font-bold text-lg">{stats.new}</span>
                        <span className="text-blue-500 text-xs uppercase tracking-wider">New</span>
                    </div>
                    <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 flex items-center gap-2">
                        <span className="text-amber-700 font-bold text-lg">{stats.pending}</span>
                        <span className="text-amber-500 text-xs uppercase tracking-wider">Active</span>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm border border-gray-100 w-fit mb-6">
                {['all', 'new', 'contacted', 'booked', 'closed'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all
                            ${filter === f
                                ? 'bg-[#5A2A45] text-white shadow-md'
                                : 'text-gray-400 hover:text-[#5A2A45] hover:bg-gray-50'}
                        `}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Kanban / Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredInquiries.map(inquiry => (
                        <InquiryCard
                            key={inquiry.id}
                            inquiry={inquiry}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </AnimatePresence>

                {filteredInquiries.length === 0 && (
                    <div className="col-span-full py-20 text-center text-gray-400">
                        <p>No inquiries found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageInquiries;
