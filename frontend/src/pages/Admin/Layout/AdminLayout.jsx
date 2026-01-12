import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Image,
    PenTool,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    FolderOpen,
    Users,
    Camera,
    Sparkles,
    FileText,
    ChevronDown,

    ChevronRight,
    Command
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, path, isActive, subItems, isSidebarCollapsed }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const hasActiveChild = subItems?.some(sub => location.pathname.startsWith(sub.path));

    useEffect(() => {
        if (hasActiveChild) setIsExpanded(true);
    }, [hasActiveChild]);

    const handleParentClick = (e) => {
        if (subItems) {
            e.preventDefault();
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div className="mx-2 mb-1">
            <Link
                to={path}
                onClick={handleParentClick}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative
                    ${isActive || (subItems && hasActiveChild)
                        ? 'bg-[#F1EBDD] text-[#5A2A45] shadow-lg'
                        : 'text-[#F1EBDD]/70 hover:bg-white/10 hover:text-white'
                    }`}
                title={isSidebarCollapsed ? label : ''} // Tooltip for mini sidebar
            >
                <Icon size={20} strokeWidth={(isActive || hasActiveChild) ? 2.5 : 2} className={(isActive || hasActiveChild) ? 'text-[#5A2A45]' : 'text-[#B77A8C] group-hover:text-white transition-colors'} />

                <span className={`font-medium tracking-wide text-sm whitespace-nowrap flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:opacity-0 lg:w-0 overflow-hidden' : ''}`}>
                    {label}
                </span>

                {subItems && !isSidebarCollapsed && (
                    <div className={(isActive || hasActiveChild) ? 'text-[#5A2A45]' : 'text-[#B77A8C]'}>
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                )}

                {(isActive || hasActiveChild) && (
                    <div className="absolute inset-0 bg-[#F1EBDD] rounded-xl z-[-1]" />
                )}
            </Link>

            {/* Sub Items */}
            <AnimatePresence>
                {subItems && isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden ml-4 mt-1 space-y-1 border-l border-white/10 pl-2"
                    >
                        {subItems.map((sub, idx) => (
                            <Link
                                key={idx}
                                to={sub.path}
                                className={`block px-4 py-2 text-xs font-medium rounded-lg transition-colors
                                    ${location.pathname === sub.path
                                        ? 'text-white bg-white/10'
                                        : 'text-[#F1EBDD]/50 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {sub.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
    const location = useLocation();
    const navigate = useNavigate();

    // Auth Check
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        const token = localStorage.getItem('token');
        if (!isAdmin || !token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    // Auto-collapse sidebar on mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        {
            icon: FileText,
            label: 'Pages',
            path: '/admin/pages',
            subItems: [
                { label: 'Home Page', path: '/admin/pages/home' },
                { label: 'About Page', path: '/admin/pages/about' },
                { label: 'Contact Page', path: '/admin/pages/contact' },
            ]
        },
        {
            icon: Image,
            label: 'Portfolio',
            path: '/admin/portfolio',
            subItems: [
                { label: 'Main Layout', path: '/admin/portfolio' },
                { label: 'Newborn', path: '/admin/portfolio/newborn' },
                { label: 'Maternity', path: '/admin/portfolio/maternity' },
                { label: 'Baby', path: '/admin/portfolio/baby' },
                { label: 'Family', path: '/admin/portfolio/family' },
                { label: 'Cake Smash', path: '/admin/portfolio/cakesmash' },
                { label: 'Hospital', path: '/admin/portfolio/hospital' },
                { label: 'Toddler', path: '/admin/portfolio/toddler' },
                { label: 'Pre Birthday', path: '/admin/portfolio/pre-birthday' },
                { label: 'Birthday', path: '/admin/portfolio/birthday' },
            ]
        },
        { icon: Sparkles, label: 'Services', path: '/admin/services' },
        { icon: PenTool, label: 'Blog', path: '/admin/blog' },
        { icon: MessageSquare, label: 'Testimonials', path: '/admin/testimonials' },
        { icon: Command, label: 'Logo & Branding', path: '/admin/branding' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const handleLogout = () => {
        if (confirm("Are you sure you want to log out?")) {
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('token');
            localStorage.removeItem('adminEmail');
            navigate('/admin/login');
        }
    };

    return (
        <div className="flex h-screen bg-[#F8F6F4] overflow-hidden font-outfit">

            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && window.innerWidth < 1024 && (
                <div
                    className="fixed inset-0 bg-black/50 z-20"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`bg-[#5A2A45] text-[#F1EBDD] flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.1)] z-30 fixed lg:relative h-full transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
                style={{
                    width: isSidebarOpen ? 260 : 80,
                    // On mobile, if closed, we hide via translate, but we don't want width to affect layout if it was relative. 
                    // Since it is fixed on mobile, width doesn't push content.
                    // On desktop (lg), if closed, it is width 80.
                }}
            >
                {/* Brand Header */}
                <div className="h-20 flex items-center justify-center relative border-b border-white/10 px-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-[#B77A8C] flex items-center justify-center text-white font-display font-bold text-lg shrink-0">
                            L
                        </div>
                        <div className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${!isSidebarOpen && 'lg:opacity-0 lg:w-0'}`}>
                            <h1 className="font-display text-xl tracking-wider text-[#F1EBDD]">Love & Nest</h1>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#B77A8C]">Studio Admin</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 py-8 space-y-1 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.path}
                            {...item}
                            isActive={location.pathname.startsWith(item.path)}
                            isSidebarCollapsed={!isSidebarOpen} // Pass state to hide labels if needed
                        />
                    ))}
                </nav>

                {/* Footer User Profile */}
                <div className="p-4 border-t border-white/10 bg-[#4a2238]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B77A8C] to-[#5A2A45] border-2 border-[#F1EBDD]/20 flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
                            <span className="font-display mt-0.5">A</span>
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ${!isSidebarOpen && 'lg:opacity-0 lg:w-0'}`}>
                            <p className="text-sm font-bold truncate text-[#F1EBDD]">Anamika</p>
                            <p className="text-[10px] text-[#B77A8C] tracking-wider uppercase">Super Admin</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors text-[#F1EBDD]/60 hover:text-white"
                            title="Logout"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden flex flex-col relative w-full">
                {/* Header Navbar */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#5A2A45]/5 flex items-center justify-between px-6 lg:px-10 z-10 sticky top-0 shadow-sm">

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 -ml-2 text-[#5A2A45]"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4">
                        <h2 className="text-[#5A2A45] font-display text-2xl capitalize leading-none">
                            {location.pathname.split('/')[2] || 'Dashboard'}
                        </h2>
                        <span className="text-[10px] text-[#6E5A52]/50 font-medium bg-[#F1EBDD] px-2 py-0.5 rounded-full w-fit">
                            Admin Control Panel
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            target="_blank"
                            className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5A2A45]/70 hover:text-[#5A2A45] transition-colors border border-[#5A2A45]/20 px-5 py-2.5 rounded-full hover:bg-[#5A2A45]/5"
                        >
                            <span>Live Website</span>
                            <span className="text-lg leading-none">↗</span>
                        </Link>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 lg:p-10 relative scroll-smooth">
                    <Outlet />

                    {/* Content Background Texture */}
                    <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-[-1]"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
