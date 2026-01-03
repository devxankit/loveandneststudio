import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Lock, Bell, Globe, Mail, Shield, Smartphone } from 'lucide-react';

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

const Toggle = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between group cursor-pointer" onClick={() => onChange(!checked)}>
        <span className="text-[#6E5A52] font-outfit text-sm font-medium">{label}</span>
        <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-[#5A2A45]' : 'bg-gray-200'}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
        </div>
    </div>
);

const InputField = ({ label, type = "text", placeholder, value, icon: Icon }) => (
    <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-[#5A2A45]">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A2A45]/40" size={16} />}
            <input
                type={type}
                className={`w-full bg-[#F9F7F2] border-none rounded-xl ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 text-[#5A2A45] focus:ring-1 focus:ring-[#B77A8C] placeholder-[#5A2A45]/30 transition-all`}
                placeholder={placeholder}
                defaultValue={value}
            />
        </div>
    </div>
);

const AdminSettings = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        browser: false,
        newInquiry: true,
        weeklyReport: false,
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate save
        setTimeout(() => setIsSaving(false), 1500);
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Navigation/Summary (Optional - kept simple for now) */}
                <div className="hidden lg:block space-y-4">
                    <div className="bg-[#5A2A45] text-[#F1EBDD] rounded-2xl p-6 text-center">
                        <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-[#5A2A45] font-display text-3xl font-bold mb-4 shadow-lg border-4 border-[#B77A8C]/30">
                            A
                        </div>
                        <h3 className="font-display text-xl mb-1">Anamika</h3>
                        <p className="text-xs uppercase tracking-widest opacity-70 mb-4">Super Admin</p>
                        <div className="text-left bg-white/10 rounded-xl p-4 text-xs space-y-2">
                            <div className="flex justify-between">
                                <span className="opacity-70">Role</span>
                                <span className="font-bold">Owner</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-70">Joined</span>
                                <span className="font-bold">Jan 2024</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Forms */}
                <div className="lg:col-span-2">

                    {/* 1. Account Settings */}
                    <SettingsSection title="Account Profile" icon={User}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Full Name" value="Anamika" icon={User} />
                            <InputField label="Email Address" value="anamika@loveandnest.com" icon={Mail} />
                        </div>
                        <InputField label="Phone Number" value="+91 98765 43210" icon={Smartphone} />
                    </SettingsSection>

                    {/* 2. Security */}
                    <SettingsSection title="Security" icon={Shield}>
                        <InputField label="Current Password" type="password" placeholder="••••••••" icon={Lock} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="New Password" type="password" placeholder="New password" icon={Lock} />
                            <InputField label="Confirm Password" type="password" placeholder="Confirm new password" icon={Lock} />
                        </div>
                    </SettingsSection>

                    {/* 3. Site Configuration */}
                    <SettingsSection title="Website General" icon={Globe}>
                        <InputField label="Site Title" value="Love & Nest Studio" />
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#5A2A45]">SEO Meta Description</label>
                            <textarea
                                className="w-full bg-[#F9F7F2] border-none rounded-xl px-4 py-3 text-[#5A2A45] focus:ring-1 focus:ring-[#B77A8C] transition-all text-sm resize-none"
                                rows="3"
                                defaultValue="Professional photography services specializing in maternity, newborn, and family portraits in Dehradun."
                            />
                        </div>
                    </SettingsSection>

                    {/* 4. Notifications */}
                    <SettingsSection title="Notifications" icon={Bell}>
                        <div className="space-y-4">
                            <Toggle
                                label="Email Notifications for New Inquiries"
                                checked={notifications.newInquiry}
                                onChange={(v) => setNotifications({ ...notifications, newInquiry: v })}
                            />
                            <div className="h-[1px] bg-[#F1EBDD]" />
                            <Toggle
                                label="Review Approval Reminders"
                                checked={notifications.email}
                                onChange={(v) => setNotifications({ ...notifications, email: v })}
                            />
                            <div className="h-[1px] bg-[#F1EBDD]" />
                            <Toggle
                                label="Weekly Performance Report"
                                checked={notifications.weeklyReport}
                                onChange={(v) => setNotifications({ ...notifications, weeklyReport: v })}
                            />
                        </div>
                    </SettingsSection>

                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
