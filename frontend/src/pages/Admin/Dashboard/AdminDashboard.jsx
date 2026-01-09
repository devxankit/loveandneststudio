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

    const { stats, ownerName } = data;

    const dashboardStats = [
        { title: 'Portfolio Assets', value: stats.portfolio, subtitle: 'Images', icon: Image, bgClass: 'bg-[#5A2A45]', textClass: 'text-[#B77A8C]' },
        { title: 'Journal Posts', value: stats.blogs, subtitle: 'Published', icon: FileText, bgClass: 'bg-[#B77A8C]', textClass: 'text-[#5A2A45]' },
        { title: 'Total Inquiries', value: stats.inquiries, subtitle: 'Messages', icon: MessageSquare, bgClass: 'bg-[#6E5A52]', textClass: 'text-[#F1EBDD]' },
        { title: 'Services Listed', value: stats.services, subtitle: 'Active Offerings', icon: ShoppingBag, bgClass: 'bg-[#E6D1CB]', textClass: 'text-[#5A2A45]' },
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

                {/* Admin Tip Card - Now taking more space or just being central */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-3 bg-[#5A2A45] text-[#F1EBDD] rounded-[2rem] shadow-xl overflow-hidden relative p-8 md:p-12 min-h-[300px] flex flex-col md:flex-row items-center justify-between group"
                >
                    <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-[#B77A8C] rounded-full blur-[120px] opacity-30 group-hover:opacity-40 transition-opacity" />

                    <div className="relative z-10 max-w-2xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
                            Admin Insight
                        </span>
                        <h3 className="font-display text-4xl md:text-5xl mb-6 leading-tight">Keep Portfolio <br /><span className="italic text-[#B77A8C]">Fresh & Updated</span></h3>
                        <p className="text-[#F1EBDD]/70 text-base md:text-lg leading-relaxed max-w-xl">
                            Regularly updating your portfolio with your latest work helps improve SEO and client trust. Recent studies show fresh content increases engagement by 40%.
                        </p>
                    </div>

                    <div className="relative z-10 mt-10 md:mt-0 flex-shrink-0">
                        <Link to="/admin/portfolio" className="inline-flex items-center gap-3 px-8 py-4 bg-[#F1EBDD] text-[#5A2A45] rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 shadow-lg group/btn">
                            Manage Portfolio <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
