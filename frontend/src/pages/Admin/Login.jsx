import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const InputField = ({ icon: Icon, type, name, value, onChange, placeholder, required = true, autoComplete }) => (
    <div className="group space-y-2 relative isolate">
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A2A45]/40 group-focus-within:text-[#B77A8C] transition-colors duration-300 pointer-events-none z-30">
                <Icon size={18} />
            </div>
            <input
                type={type}
                name={name}
                value={value || ''}
                onChange={onChange}
                className="w-full bg-white/60 border-2 border-[#E6D1CB]/30 rounded-2xl pl-12 pr-4 py-4 text-[#5A2A45] placeholder-[#5A2A45]/30 outline-none focus:border-[#B77A8C] focus:bg-white focus:shadow-[0_0_20px_rgba(183,122,140,0.1)] transition-all duration-300 font-medium relative z-20"
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
            />
        </div>
    </div>
);

const AdminLogin = () => {
    const [view, setView] = useState('login'); // login, forgot, verify, reset
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [forgotEmail, setForgotEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/auth/login', credentials);
            localStorage.setItem('token', data.token);
            localStorage.setItem('adminEmail', data.email);
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/forgot-password', { email: forgotEmail });
            setMessage('OTP sent to your email');
            setView('verify');
        } catch (err) {
            setError(err.response?.data?.message || 'Error sending OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/verify-otp', { email: forgotEmail, otp });
            setMessage('OTP verified! Choose a new password.');
            setView('reset');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/reset-password', {
                email: forgotEmail,
                otp,
                newPassword
            });
            setMessage('Password reset successful! Please login.');
            setView('login');
            setCredentials({ ...credentials, password: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F1EBDD] flex items-center justify-center relative overflow-hidden font-outfit p-4">
            {/* Background Elements - Fixed pointer events */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#B77A8C]/15 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#5A2A45]/15 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 mix-blend-multiply"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/80 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(90,42,69,0.2)] w-full max-w-md border border-white/60 relative z-10"
            >
                {/* Decorative element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-[#B77A8C]/30 to-transparent rounded-full mt-4" />

                <div className="text-center mb-10">
                    <motion.div
                        initial={{ rotate: -15, scale: 0.8 }}
                        animate={{ rotate: 3, scale: 1 }}
                        className="w-20 h-20 bg-[#5A2A45] text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#5A2A45]/30 relative"
                    >
                        <div className="absolute inset-0 bg-white/10 rounded-[2rem] animate-pulse" />
                        {view === 'login' ? <Lock size={32} /> :
                            view === 'forgot' ? <Mail size={32} /> :
                                view === 'verify' ? <ShieldCheck size={32} /> :
                                    <KeyRound size={32} />}
                    </motion.div>

                    <h2 className="font-display text-4xl text-[#5A2A45] mb-3 font-bold tracking-tight">
                        {view === 'login' ? 'Studio Access' :
                            view === 'forgot' ? 'Forgot Access' :
                                view === 'verify' ? 'Verify Identity' :
                                    'Secure New Key'}
                    </h2>
                    <p className="text-[#6E5A52]/80 text-sm font-medium tracking-wide max-w-[280px] mx-auto leading-relaxed">
                        {view === 'login' ? 'Please sign in to the Love & Nest professional dashboard.' :
                            view === 'forgot' ? 'We will send a secure verification code to your email.' :
                                view === 'verify' ? 'A 6-digit code has been dispatched to your inbox.' :
                                    'Your safety is our priority. Set a strong new password.'}
                    </p>
                </div>

                <div className="relative mb-6">
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                key="error-alert"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="mb-4 p-4 bg-red-50/90 border-l-4 border-red-500 text-red-700 rounded-xl text-xs flex items-center gap-3 font-semibold"
                            >
                                <AlertCircle size={16} /> {error}
                            </motion.div>
                        )}
                        {message && (
                            <motion.div
                                key="success-alert"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="mb-4 p-4 bg-green-50/90 border-l-4 border-green-500 text-green-700 rounded-xl text-xs flex items-center gap-3 font-semibold"
                            >
                                <CheckCircle2 size={16} /> {message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                    {view === 'login' && (
                        <motion.form
                            key="login"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onSubmit={handleLogin}
                            className="space-y-6"
                        >
                            <InputField
                                icon={Mail}
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={credentials.email}
                                autoComplete="email"
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            />
                            <div className="space-y-3">
                                <InputField
                                    icon={Lock}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={credentials.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                />
                                <div className="text-right px-1">
                                    <button
                                        type="button"
                                        onClick={() => setView('forgot')}
                                        className="text-xs font-bold text-[#B77A8C] hover:text-[#5A2A45] transition-all duration-300 hover:tracking-wider uppercase"
                                    >
                                        Recover Password
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#5A2A45] text-[#F1EBDD] py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#4a2238] transition-all duration-500 shadow-2xl shadow-[#5A2A45]/30 hover:shadow-[#5A2A45]/50 flex items-center justify-center gap-3 disabled:opacity-70 group"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Authorize & Enter
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}

                    {view === 'forgot' && (
                        <motion.form
                            key="forgot"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onSubmit={handleForgotPassword}
                            className="space-y-6"
                        >
                            <InputField
                                icon={Mail}
                                type="email"
                                name="email"
                                placeholder="Registered Email"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                            />
                            <div className="flex flex-col gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#5A2A45] text-[#F1EBDD] py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#4a2238] transition-all duration-500 shadow-2xl shadow-[#5A2A45]/30 flex items-center justify-center gap-3 disabled:opacity-70"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : 'Request Security Code'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setView('login')}
                                    className="text-xs font-black text-[#5A2A45]/40 hover:text-[#5A2A45] transition-all text-center uppercase tracking-widest"
                                >
                                    Cancel & Return
                                </button>
                            </div>
                        </motion.form>
                    )}

                    {view === 'verify' && (
                        <motion.form
                            key="verify"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onSubmit={handleVerifyOtp}
                            className="space-y-6"
                        >
                            <InputField
                                icon={ShieldCheck}
                                type="text"
                                name="otp"
                                placeholder="6-Digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <div className="flex flex-col gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#5A2A45] text-[#F1EBDD] py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#4a2238] transition-all shadow-2xl shadow-[#5A2A45]/30 flex items-center justify-center gap-3 disabled:opacity-70"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : 'Validate Code'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setView('forgot')}
                                    className="text-xs font-black text-[#5A2A45]/40 hover:text-[#5A2A45] transition-all text-center uppercase tracking-widest"
                                >
                                    Try Different Email
                                </button>
                            </div>
                        </motion.form>
                    )}

                    {view === 'reset' && (
                        <motion.form
                            key="reset"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onSubmit={handleResetPassword}
                            className="space-y-6"
                        >
                            <InputField
                                icon={Lock}
                                type="password"
                                name="newPassword"
                                placeholder="Create New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#5A2A45] text-[#F1EBDD] py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#4a2238] transition-all shadow-2xl shadow-[#5A2A45]/30 flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : 'Reinstate Password'}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="mt-12 text-center select-none">
                    <p className="text-[9px] text-[#5A2A45]/40 uppercase tracking-[0.3em] font-bold">Encrypted Studio Link 2.0</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
