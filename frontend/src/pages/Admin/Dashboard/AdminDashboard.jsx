import React from 'react';
import { motion } from 'framer-motion';
import { Image, FileText, Users, ShoppingBag, Clock, ArrowRight, TrendingUp } from 'lucide-react';

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
            <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${bgClass} bg-opacity-10 ${textClass}`}>
                <TrendingUp size={12} />
                <span>+12% vs last mo</span>
            </div>
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
    // Mock Data
    const stats = [
        { title: 'Portfolio Assets', value: '124', subtitle: 'Items', icon: Image, bgClass: 'bg-indigo-500', textClass: 'text-indigo-600' },
        { title: 'Journal Posts', value: '18', subtitle: 'Published', icon: FileText, bgClass: 'bg-rose-500', textClass: 'text-rose-600' },
        { title: 'Active Inquiries', value: '5', subtitle: 'Pending', icon: Users, bgClass: 'bg-emerald-500', textClass: 'text-emerald-600' },
        { title: 'Services Listed', value: '7', subtitle: 'Packages', icon: ShoppingBag, bgClass: 'bg-amber-500', textClass: 'text-amber-600' },
    ];

    const upcomingSessions = [
        { name: 'Sharma Family', type: 'Newborn Session', date: 'Oct 24, 2026', time: '10:00 AM', status: 'Confirmed' },
        { name: 'Priya & Rahul', type: 'Maternity', date: 'Oct 26, 2026', time: '02:00 PM', status: 'Pending' },
        { name: 'Baby Vihaan', type: 'Cake Smash', date: 'Oct 28, 2026', time: '11:00 AM', status: 'Confirmed' },
    ];

    return (
        <div className="space-y-8 lg:space-y-12 max-w-[1600px] mx-auto">

            {/* Start Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
                <div>
                    <h1 className="font-display text-4xl lg:text-5xl text-[#5A2A45] mb-2">Welcome Back, Anamika.</h1>
                    <p className="text-[#6E5A52] font-outfit text-lg font-light">Here is what’s happening in your studio today.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-[#5A2A45] font-bold text-xl">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    <p className="text-[#B77A8C] text-sm uppercase tracking-widest">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <DashboardCard key={index} {...stat} delay={index * 0.1} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Sessions List */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-[#5A2A45]/5 overflow-hidden flex flex-col"
                >
                    <div className="p-8 border-b border-[#5A2A45]/5 flex justify-between items-center bg-[#FAFAF9]">
                        <div>
                            <h3 className="font-display text-2xl text-[#5A2A45]">Upcoming Sessions</h3>
                            <p className="text-xs text-[#6E5A52]/60 uppercase tracking-widest mt-1">Next 7 Days</p>
                        </div>
                        <button className="text-xs font-bold uppercase tracking-widest text-[#B77A8C] hover:text-[#5A2A45] border border-[#B77A8C]/20 px-4 py-2 rounded-full hover:bg-[#B77A8C]/10 transition-colors">
                            View Calendar
                        </button>
                    </div>

                    <div className="p-6 flex-1">
                        <div className="space-y-4">
                            {upcomingSessions.map((session, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.01 }}
                                    className="flex items-center justify-between p-5 bg-[#F9F7F2] rounded-2xl hover:bg-[#F1EBDD] transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#5A2A45] font-display font-medium text-xl shadow-sm group-hover:scale-110 transition-transform">
                                            {session.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#5A2A45] text-lg">{session.name}</h4>
                                            <p className="text-xs text-[#6E5A52] uppercase tracking-wide font-medium">{session.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-2 text-sm text-[#5A2A45] font-medium mb-1">
                                            <Clock size={14} className="text-[#B77A8C]" />
                                            <span>{session.time}</span>
                                        </div>
                                        <p className="text-xs text-[#6E5A52]/60">{session.date}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 bg-[#FAFAF9] text-center border-t border-[#5A2A45]/5">
                        <button className="text-xs font-bold uppercase tracking-[0.2em] text-[#5A2A45]/40 hover:text-[#5A2A45] transition-colors flex items-center justify-center gap-2 mx-auto">
                            View All Sessions <ArrowRight size={12} />
                        </button>
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
                                Pro Tip
                            </span>
                            <h3 className="font-display text-3xl mb-4 leading-tight">Update your <br /><span className="italic text-[#B77A8C]">Maternity Guide</span></h3>
                            <p className="text-[#F1EBDD]/60 text-sm leading-relaxed">
                                Clients are looking for "Best Time for Maternity Shoot". Consider adding a new blog post about styling.
                            </p>
                        </div>

                        <button className="relative z-10 w-full py-4 bg-[#F1EBDD] text-[#5A2A45] rounded-xl font-bold uppercase tracking-widest mt-8 hover:bg-white transition-colors flex items-center justify-center gap-2 group/btn">
                            Create Post <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
