import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Lock, Globe, Mail, Shield, Smartphone, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../../../services/api';

const SettingsSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-[1.5rem] p-6 md:p-8 shadow-sm border border-[#5A2A45]/5 mb-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F1EBDD]">
            <div className="p-2 bg-[#F9F7F2] rounded-lg text-[#5A2A45]">
                <Icon size={20} />
            </div>
            <h3 className="font-display text-xl text-[#5A2A45]">{title}</h3>
        </div>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

const InputField = ({ label, type = "text", placeholder, value, onChange, icon: Icon, name }) => (
    <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-[#5A2A45]">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A2A45]/40" size={16} />}
            <input
                type={type}
                name={name}
                className={`w-full bg-[#F9F7F2] border-none rounded-xl ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 text-[#5A2A45] focus:ring-1 focus:ring-[#B77A8C] placeholder-[#5A2A45]/30 transition-all`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    </div>
);

const AdminSettings = () => {
    // Combined State
    const [formData, setFormData] = useState({
        // Global Settings (Site Owner Data)
        ownerName: '',
        contactPhone: '',
        siteTitle: '',
        seoDescription: '',

        // Admin Auth Data
        email: localStorage.getItem('adminEmail') || '',
        newPassword: '',
        confirmPassword: ''
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    // Fetch Initial Data
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch Global Settings
                const settingsRes = await api.get('/settings');

                // Merge fetched settings into state
                setFormData(prev => ({
                    ...prev,
                    ownerName: settingsRes.data.ownerName || '',
                    contactPhone: settingsRes.data.contactPhone || '',
                    siteTitle: settingsRes.data.siteTitle || '',
                    seoDescription: settingsRes.data.seoDescription || ''
                }));

                // Note: We currently rely on localStorage for the email to avoid intricate auth profile fetching logic 
                // if the specific GET /profile endpoint isn't strictly standard. 
                // However, if your authController has a 'getMe' or 'profile' GET endpoint, un-comment below:
                /*
                const authRes = await api.get('/auth/profile');
                setFormData(prev => ({ ...prev, email: authRes.data.email }));
                */

            } catch (error) {
                console.error("Error fetching settings:", error);
                setStatus({ type: 'error', message: "Failed to load settings from server." });
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setStatus({ type: 'error', message: 'Passwords do not match!' });
            return;
        }

        setIsSaving(true);
        setStatus({ type: '', message: '' });

        try {
            // 1. Update Global Settings (Owner Info & Site Info)
            const settingsData = {
                ownerName: formData.ownerName,
                contactPhone: formData.contactPhone,
                siteTitle: formData.siteTitle,
                seoDescription: formData.seoDescription
            };
            await api.put('/settings', settingsData);

            // 2. Update Admin Auth (Email & Password)
            const authData = { email: formData.email };
            if (formData.newPassword) {
                authData.password = formData.newPassword;
            }
            const authRes = await api.put('/auth/profile', authData);

            // Update local storage if email/token changed
            if (authRes.data.token) {
                localStorage.setItem('adminEmail', authRes.data.email);
                localStorage.setItem('adminToken', authRes.data.token);
            }

            setStatus({ type: 'success', message: 'Settings updated successfully!' });
            setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));

        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: err.response?.data?.message || 'Error updating settings' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-[#5A2A45]">Loading settings...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto min-h-screen pb-20">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="font-display text-4xl text-[#5A2A45] mb-2">Settings</h1>
                    <p className="text-[#6E5A52] font-outfit font-light">Customize your admin experience and profile.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-[#5A2A45] text-[#F1EBDD] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#4a2238] transition-all shadow-lg flex items-center gap-2 disabled:opacity-70"
                >
                    {isSaving ? 'Saving...' : (
                        <>
                            <Save size={16} /> Save Changes
                        </>
                    )}
                </button>
            </div>

            {status.message && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${status.type === 'success'
                    ? 'bg-green-50 text-green-600 border-green-100'
                    : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                    {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    {status.message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Summary */}
                <div className="hidden lg:block space-y-4">
                    <div className="bg-[#5A2A45] text-[#F1EBDD] rounded-2xl p-6 text-center">
                        <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-[#5A2A45] font-display text-3xl font-bold mb-4 shadow-lg border-4 border-[#B77A8C]/30 uppercase">
                            {formData.ownerName ? formData.ownerName.charAt(0) : 'A'}
                        </div>
                        <h3 className="font-display text-xl mb-1">{formData.ownerName || 'Admin'}</h3>
                        <p className="text-xs uppercase tracking-widest opacity-70 mb-4">Super Admin</p>
                        <div className="text-left bg-white/10 rounded-xl p-4 text-xs space-y-2">
                            <div className="flex justify-between">
                                <span className="opacity-70">Role</span>
                                <span className="font-bold">Owner</span>
                            </div>
                            <div className="flex justify-between overflow-hidden">
                                <span className="opacity-70">Email</span>
                                <span className="font-bold truncate ml-2" title={formData.email}>{formData.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Forms */}
                <div className="lg:col-span-2">

                    {/* 1. Account Settings */}
                    <SettingsSection title="Account Profile" icon={User}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Full Name (Owner)"
                                name="ownerName"
                                value={formData.ownerName}
                                onChange={handleInputChange}
                                icon={User}
                                placeholder="e.g. Anamika"
                            />
                            <InputField
                                label="Email Address (Login)"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                icon={Mail}
                            />
                        </div>
                        <InputField
                            label="Phone Number"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleInputChange}
                            icon={Smartphone}
                            placeholder="+91 ..."
                        />
                    </SettingsSection>

                    {/* 2. Security */}
                    <SettingsSection title="Security" icon={Shield}>
                        <p className="text-xs text-[#6E5A52]/60 -mt-2 mb-4 italic">Leave blank if you don't want to change password.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="New Password"
                                name="newPassword"
                                type="password"
                                placeholder="New password"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                icon={Lock}
                            />
                            <InputField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                icon={Lock}
                            />
                        </div>
                    </SettingsSection>

                    {/* 3. Site Configuration */}
                    <SettingsSection title="Website General" icon={Globe}>
                        <InputField
                            label="Site Title"
                            name="siteTitle"
                            value={formData.siteTitle}
                            onChange={handleInputChange}
                            placeholder="Love & Nest Studio"
                        />
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#5A2A45]">SEO Meta Description</label>
                            <textarea
                                name="seoDescription"
                                className="w-full bg-[#F9F7F2] border-none rounded-xl px-4 py-3 text-[#5A2A45] focus:ring-1 focus:ring-[#B77A8C] transition-all text-sm resize-none focus:outline-none"
                                rows="3"
                                value={formData.seoDescription}
                                onChange={handleInputChange}
                                placeholder="A brief description of your site..."
                            />
                        </div>
                    </SettingsSection>

                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
