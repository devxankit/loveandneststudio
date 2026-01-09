import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, FileText, Users, ShoppingBag, Clock, ArrowRight, TrendingUp, MessageSquare } from 'lucide-react';
import api from '../../../services/api';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, value, subtitle, icon: Icon, bgClass, textClass, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white p-6 lg:p-8 rounded-[2rem] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.03)] border border-[#5A2A45]/5 hover:shadow-[0_20px_40px_-5px_rgba(90,42,69,0.08)] transition-all duration-300 group relative overflow-hidden"
    >
        {/* Hover Gradient Bloom */}
        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${bgClass.replace('bg-', 'bg-')}`}></div>

        <div className="flex justify-between items-start mb-6 relative z-10">
            <div className={`p-4 rounded-2xl ${bgClass} bg-opacity-10 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <Icon size={24} className={textClass} strokeWidth={2.5} />
            </div>
            {/* <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${bgClass} bg-opacity-10 ${textClass}`}>
                <TrendingUp size={12} />
                <span>Live</span>
            </div> */}
        </div>

        <div className="relative z-10">
            <h3 className="text-[#6E5A52]/60 text-xs font-bold uppercase tracking-[0.1em] mb-2">{title}</h3>
            <div className="flex items-baseline gap-3">
                <h2 className="text-[#5A2A45] text-4xl lg:text-5xl font-display font-medium leading-none">{value}</h2>
                <span className="text-[#6E5A52]/40 text-xs font-medium">{subtitle}</span>
            </div>
        </div>
    </motion.div>
);

const AdminDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await api.get('/dashboard');
                setData(res.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-[#5A2A45]">Loading Dashboard...</div>;
    if (!data) return <div className="min-h-screen flex items-center justify-center text-red-500">Error loading data.</div>;

    const { stats, recentInquiries, ownerName } = data;

    const dashboardStats = [
        { title: 'Portfolio Assets', value: stats.portfolio, subtitle: 'Images', icon: Image, bgClass: 'bg-indigo-500', textClass: 'text-indigo-600' },
        { title: 'Journal Posts', value: stats.blogs, subtitle: 'Published', icon: FileText, bgClass: 'bg-rose-500', textClass: 'text-rose-600' },
        { title: 'Total Inquiries', value: stats.inquiries, subtitle: 'Messages', icon: MessageSquare, bgClass: 'bg-emerald-500', textClass: 'text-emerald-600' },
        { title: 'Services Listed', value: stats.services, subtitle: 'Active Offerings', icon: ShoppingBag, bgClass: 'bg-amber-500', textClass: 'text-amber-600' },
    ];

    return (
        <div className="space-y-8 lg:space-y-12 max-w-[1600px] mx-auto pb-20">

            {/* Start Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
                <div>
                    <h1 className="font-display text-4xl lg:text-5xl text-[#5A2A45] mb-2">Welcome Back, {ownerName}.</h1>
                    <p className="text-[#6E5A52] font-outfit text-lg font-light">Here is what’s happening in your studio today.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-[#5A2A45] font-bold text-xl">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    <p className="text-[#B77A8C] text-sm uppercase tracking-widest">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => (
                    <DashboardCard key={index} {...stat} delay={index * 0.1} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Inquiries List (Previously Upcoming Sessions) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-[#5A2A45]/5 overflow-hidden flex flex-col"
                >
                    <div className="p-8 border-b border-[#5A2A45]/5 flex justify-between items-center bg-[#FAFAF9]">
                        <div>
                            <h3 className="font-display text-2xl text-[#5A2A45]">Recent Inquiries</h3>
                            <p className="text-xs text-[#6E5A52]/60 uppercase tracking-widest mt-1">Latest messages from clients</p>
                        </div>
                        <Link to="/admin/inquiries" className="text-xs font-bold uppercase tracking-widest text-[#B77A8C] hover:text-[#5A2A45] border border-[#B77A8C]/20 px-4 py-2 rounded-full hover:bg-[#B77A8C]/10 transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="p-6 flex-1">
                        <div className="space-y-4">
                            {recentInquiries && recentInquiries.length > 0 ? (
                                recentInquiries.map((inquiry, i) => (
                                    <motion.div
                                        key={inquiry._id}
                                        whileHover={{ scale: 1.01 }}
                                        className="flex items-center justify-between p-5 bg-[#F9F7F2] rounded-2xl hover:bg-[#F1EBDD] transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#5A2A45] font-display font-medium text-xl shadow-sm group-hover:scale-110 transition-transform uppercase">
                                                {inquiry.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#5A2A45] text-lg">{inquiry.name}</h4>
                                                <p className="text-xs text-[#6E5A52] uppercase tracking-wide font-medium">{inquiry.serviceType || 'General Inquiry'}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center justify-end gap-2 text-sm text-[#5A2A45] font-medium mb-1">
                                                <Clock size={14} className="text-[#B77A8C]" />
                                                <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-xs text-[#6E5A52]/60 truncate max-w-[150px]">{inquiry.email}</p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-400">No inquiries found.</div>
                            )}
                        </div>
                    </div>
                    <div className="p-4 bg-[#FAFAF9] text-center border-t border-[#5A2A45]/5">
                        <Link to="/admin/inquiries" className="text-xs font-bold uppercase tracking-[0.2em] text-[#5A2A45]/40 hover:text-[#5A2A45] transition-colors flex items-center justify-center gap-2 mx-auto">
                            View All Messages <ArrowRight size={12} />
                        </Link>
                    </div>
                </motion.div>

                {/* Quick Action / Highlight Card */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-[#5A2A45] text-[#F1EBDD] rounded-[2rem] shadow-xl overflow-hidden relative p-8 min-h-[300px] flex flex-col justify-between group"
                    >
                        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#B77A8C] rounded-full blur-[80px] opacity-30 group-hover:opacity-40 transition-opacity" />

                        <div className="relative z-10">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest mb-4">
                                Admin Tip
                            </span>
                            <h3 className="font-display text-3xl mb-4 leading-tight">Keep Portfolio <br /><span className="italic text-[#B77A8C]">Fresh & Updated</span></h3>
                            <p className="text-[#F1EBDD]/60 text-sm leading-relaxed">
                                Regularly updating your portfolio with your latest work helps improve SEO and client trust.
                            </p>
                        </div>

                        <Link to="/admin/portfolio" className="relative z-10 w-full py-4 bg-[#F1EBDD] text-[#5A2A45] rounded-xl font-bold uppercase tracking-widest mt-8 hover:bg-white transition-colors flex items-center justify-center gap-2 group/btn">
                            Manage Portfolio <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
