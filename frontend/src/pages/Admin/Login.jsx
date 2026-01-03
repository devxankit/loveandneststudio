import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            if (credentials.username === 'admin' && credentials.password === 'admin') {
                localStorage.setItem('isAdmin', 'true');
                navigate('/admin/dashboard');
            } else {
                alert('Invalid credentials (try admin/admin)');
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#F1EBDD] flex items-center justify-center relative overflow-hidden font-outfit">
            {/* Artistic Background Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#B77A8C]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#5A2A45]/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 mix-blend-multiply"></div>
            </div>

            <div
                className="bg-white/70 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(90,42,69,0.15)] w-full max-w-md border border-white/60 relative z-10"
            >
                <div className="text-center mb-10">
                    <div
                        className="w-16 h-16 bg-[#5A2A45] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500"
                    >
                        <Lock size={28} />
                    </div>
                    <h2 className="font-display text-3xl text-[#5A2A45] mb-2">Studio Access</h2>
                    <p className="text-[#6E5A52]/70 text-sm tracking-wide">Enter your credentials to manage the exquisite.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="group">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A2A45]/40 group-focus-within:text-[#B77A8C] transition-colors" size={18} />
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                className="w-full bg-white/50 border border-[#E6D1CB] rounded-xl pl-12 pr-4 py-4 text-[#5A2A45] placeholder-[#5A2A45]/30 focus:outline-none focus:border-[#B77A8C] focus:bg-white focus:shadow-lg transition-all duration-300"
                                placeholder="Username"
                            />
                        </div>
                    </div>
                    <div className="group">
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A2A45]/40 group-focus-within:text-[#B77A8C] transition-colors" size={18} />
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                className="w-full bg-white/50 border border-[#E6D1CB] rounded-xl pl-12 pr-4 py-4 text-[#5A2A45] placeholder-[#5A2A45]/30 focus:outline-none focus:border-[#B77A8C] focus:bg-white focus:shadow-lg transition-all duration-300"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#5A2A45] text-[#F1EBDD] py-4 rounded-xl font-bold uppercase tracking-[0.15em] hover:bg-[#4a2238] transition-all shadow-xl shadow-[#5A2A45]/20 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Authenticating...' : (
                            <>
                                Enter Dashboard <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-[#5A2A45]/30 uppercase tracking-widest">Love & Nest Studio © 2026</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
