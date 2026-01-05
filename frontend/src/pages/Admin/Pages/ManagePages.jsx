import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Edit3, Eye, CheckCircle, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPages } from '../../../services/api';

const ManagePages = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await getPages();
                setPages(response.data);
            } catch (error) {
                console.error("Failed to load pages", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPages();
    }, []);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center text-[#5A2A45]">
                <Loader className="animate-spin mr-2" /> Loading Pages...
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="font-display text-4xl text-[#5A2A45] mb-2">Manage Pages</h1>
                <p className="text-[#6E5A52]/70 font-outfit font-light">
                    Edit content for your main website pages.
                </p>
            </div>

            {/* Pages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((page) => (
                    <motion.div
                        key={page._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-[#5A2A45]/5 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-xl bg-[#F1EBDD] flex items-center justify-center text-[#5A2A45]">
                                <FileText size={24} strokeWidth={1.5} />
                            </div>
                            <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-100 flex items-center gap-1.5">
                                <CheckCircle size={10} /> Published
                            </span>
                        </div>

                        <h3 className="font-display text-xl text-[#5A2A45] mb-2">{page.title}</h3>
                        <p className="text-sm text-[#6E5A52]/60 mb-6 font-outfit">
                            Last edited: {new Date(page.updatedAt).toLocaleDateString()}
                        </p>

                        <div className="flex items-center gap-3">
                            {/* Uses pageSlug for routing */}
                            <Link to={`/admin/pages/${page.pageSlug}`} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5A2A45] text-[#F1EBDD] rounded-lg text-sm font-medium hover:bg-[#4a2238] transition-colors">
                                <Edit3 size={14} /> Edit Content
                            </Link>
                            {/* Assuming path matches slug usually */}
                            <Link to={`/${page.pageSlug === 'home' ? '' : page.pageSlug}`} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#5A2A45]/10 text-[#5A2A45] hover:bg-[#5A2A45]/5 transition-colors" title="View Live Page">
                                <Eye size={16} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManagePages;
