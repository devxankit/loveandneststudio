import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Lock, Globe, Mail, Shield, Smartphone, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

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
    const [profile, setProfile] = useState({
        fullName: 'Anamika', // Static for now as only email/pass are in DB
        email: localStorage.getItem('adminEmail') || '',
        phone: '+91 98765 43210',
        newPassword: '',
        confirmPassword: '',
        siteTitle: 'Love & Nest Studio',
        seoDescription: 'Professional photography services specializing in maternity, newborn, and family portraits in Dehradun.'
    });

    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const API_URL = 'http://localhost:5000/api/auth';

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
            setStatus({ type: 'error', message: 'Passwords do not match!' });
            return;
        }

        setIsSaving(true);
        setStatus({ type: '', message: '' });

        try {
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const dataToUpdate = {
                email: profile.email
            };

            if (profile.newPassword) {
                dataToUpdate.password = profile.newPassword;
            }

            const { data } = await axios.put(`${API_URL}/profile`, dataToUpdate, config);

            // Update local storage if email changed
            localStorage.setItem('adminEmail', data.email);
            localStorage.setItem('adminToken', data.token);

            setStatus({ type: 'success', message: 'Profile updated successfully!' });
            setProfile(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Error updating settings' });
        } finally {
            setIsSaving(false);
        }
    };

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
                        <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-[#5A2A45] font-display text-3xl font-bold mb-4 shadow-lg border-4 border-[#B77A8C]/30">
                            {profile.fullName.charAt(0)}
                        </div>
                        <h3 className="font-display text-xl mb-1">{profile.fullName}</h3>
                        <p className="text-xs uppercase tracking-widest opacity-70 mb-4">Super Admin</p>
                        <div className="text-left bg-white/10 rounded-xl p-4 text-xs space-y-2">
                            <div className="flex justify-between">
                                <span className="opacity-70">Role</span>
                                <span className="font-bold">Owner</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-70">Email</span>
                                <span className="font-bold truncate ml-2" title={profile.email}>{profile.email}</span>
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
                                label="Full Name"
                                name="fullName"
                                value={profile.fullName}
                                onChange={handleInputChange}
                                icon={User}
                            />
                            <InputField
                                label="Email Address"
                                name="email"
                                value={profile.email}
                                onChange={handleInputChange}
                                icon={Mail}
                            />
                        </div>
                        <InputField
                            label="Phone Number"
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                            icon={Smartphone}
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
                                value={profile.newPassword}
                                onChange={handleInputChange}
                                icon={Lock}
                            />
                            <InputField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm new password"
                                value={profile.confirmPassword}
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
                            value={profile.siteTitle}
                            onChange={handleInputChange}
                        />
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#5A2A45]">SEO Meta Description</label>
                            <textarea
                                name="seoDescription"
                                className="w-full bg-[#F9F7F2] border-none rounded-xl px-4 py-3 text-[#5A2A45] focus:ring-1 focus:ring-[#B77A8C] transition-all text-sm resize-none"
                                rows="3"
                                value={profile.seoDescription}
                                onChange={handleInputChange}
                            />
                        </div>
                    </SettingsSection>

                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
