import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import { getPost } from '../../services/api';
import LazyImage from '../../components/common/LazyImage';
import { ArrowLeft } from 'lucide-react';

// Fallback image
import maternityHero from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225737.png';

// --- Visual Components ---

// Grain Texture for Film Look
const GrainOverlay = () => (
    <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-50 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
    </div>
);

const SectionFade = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

const BlogDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // Scroll Animation Hooks
    const { scrollYProgress } = useScroll();

    // Progress Bar Scale
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Hero Parallax Ops
    const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.4], [1.1, 1]);
    const textY = useTransform(scrollYProgress, [0, 0.4], [0, 100]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await getPost(id);
                setPost(data);
            } catch (error) {
                console.error("Failed to load post", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-[#FAF9F6] text-[#5A2A45]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
            >
                <div className="w-16 h-16 border-4 border-[#E8CBB6] border-t-[#5A2A45] rounded-full animate-spin mb-4"></div>
                <span className="font-outfit uppercase tracking-[0.2em] text-sm text-[#8F8A86]">Loading Story...</span>
            </motion.div>
        </div>
    );

    if (!post) return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#FAF9F6] text-[#5A2A45]">
            <h2 className="font-display text-4xl mb-6">Story Not Found</h2>
            <Link to="/blog" className="px-8 py-3 bg-[#5A2A45] text-white rounded-full font-outfit uppercase tracking-widest text-xs hover:bg-[#6E5A52] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Back to Journal
            </Link>
        </div>
    );

    // Calculate generic read time
    const readTime = Math.max(1, Math.ceil((post.content?.split(/\s+/).length || 0) / 200)) + " min read";

    return (
        <>
            <SEO
                title={`${post.title} | Love & Nest Studio`}
                description={post.excerpt || "Read our latest story."}
            />

            <GrainOverlay />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#B77A8C] origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* --- 1. Immersive Cinematic Hero --- */}
            <div className="relative h-screen w-full overflow-hidden bg-[#1a1a1a]">
                <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10"></div>
                    <LazyImage
                        src={post.coverImage || maternityHero}
                        alt={post.title}
                        className="w-full h-full object-cover object-center"
                    />
                </motion.div>

                {/* Back Nav */}
                <div className="absolute top-0 left-0 w-full p-6 md:p-12 z-30">
                    <Link to="/blog" className="inline-flex items-center gap-2 group text-white/80 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                        <span className="font-outfit uppercase text-xs tracking-widest font-bold">Back to Journal</span>
                    </Link>
                </div>

                {/* Hero Text */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end pb-32 md:pb-24 px-6 md:px-20 max-w-[1600px] mx-auto w-full">
                    <motion.div style={{ y: textY }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="mb-6 flex flex-wrap gap-4 text-[#E8CBB6] font-outfit text-xs uppercase tracking-widest font-bold">
                                <span>{new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                <span className="text-white/40">•</span>
                                <span>{readTime}</span>
                                {post.tags && post.tags.length > 0 && (
                                    <>
                                        <span className="text-white/40">•</span>
                                        <span>{post.tags[0]}</span>
                                    </>
                                )}
                            </div>

                            <h1 className="font-display text-5xl md:text-8xl lg:text-8xl text-white leading-[0.95] mb-8 max-w-5xl shadow-black drop-shadow-lg">
                                {post.title}
                            </h1>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-t border-white/20 pt-8 max-w-4xl">
                                <p className="text-white/80 font-outfit text-sm md:text-lg leading-relaxed max-w-xl font-light italic">
                                    "{post.excerpt}"
                                </p>
                                <div className="text-right">
                                    <p className="text-white text-xs font-bold uppercase tracking-widest mb-1">Written By</p>
                                    <p className="text-[#E8CBB6] font-display text-xl">{post.author || 'Love & Nest Studio'}</p>
                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
                </div>
            </div>


            {/* --- 2. Main Editorial Layout --- */}
            <article className="bg-[#FAF9F6] relative z-10 px-6 md:px-12 py-24 md:py-32 overflow-hidden">
                {/* Decorative Big Background Letter */}
                <div className="absolute top-[5%] right-[-5%] text-[40vw] font-display text-[#5A2A45]/5 leading-none pointer-events-none select-none">
                    {post.title.charAt(0)}
                </div>

                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">

                    {/* Left Column: Sticky Sidebar */}
                    <div className="hidden lg:block lg:col-span-3 relative">
                        <div className="sticky top-32">
                            <span className="block w-8 h-[2px] bg-[#B77A8C] mb-6"></span>
                            <span className="block font-outfit text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-6">Story Details</span>

                            <div className="space-y-4 mb-12">
                                <div className="text-sm text-[#8F8A86] font-outfit">
                                    <span className="block text-[10px] uppercase text-[#B77A8C] mb-1">Published</span>
                                    {new Date(post.createdAt || Date.now()).toLocaleDateString()}
                                </div>
                                <div className="text-sm text-[#8F8A86] font-outfit">
                                    <span className="block text-[10px] uppercase text-[#B77A8C] mb-1">Category</span>
                                    {post.tags ? post.tags.join(', ') : 'Photography'}
                                </div>
                            </div>

                            <div className="p-6 bg-white border border-[#E8CBB6]/40 rounded-sm shadow-sm">
                                <p className="font-serif italic text-[#5A2A45] text-lg mb-4">"Ready to capture your own beautiful moments?"</p>
                                <Link to="/contact" className="text-xs font-outfit font-bold uppercase tracking-widest text-[#B77A8C] hover:text-[#5A2A45] transition-colors border-b border-[#B77A8C]">Book Session</Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Column */}
                    <div className="lg:col-span-8 lg:col-start-5 space-y-16">

                        <SectionFade>
                            {/* Rich Text Content Render */}
                            <div className="prose prose-lg md:prose-xl max-w-none
                                prose-headings:font-display prose-headings:text-[#5A2A45] prose-headings:font-normal
                                prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:italic
                                prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:text-[#5A2A45] prose-h3:mb-4 prose-h3:mt-12
                                prose-p:font-outfit prose-p:text-[#8F8A86] prose-p:font-light prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                                prose-a:text-[#B77A8C] prose-a:underline hover:prose-a:text-[#5A2A45]
                                prose-blockquote:border-l-4 prose-blockquote:border-[#E8CBB6] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#5A2A45]
                                prose-strong:text-[#5A2A45] prose-strong:font-semibold
                                prose-img:rounded-md prose-img:shadow-xl prose-img:my-10 prose-img:w-full
                                prose-li:text-[#8F8A86] prose-li:font-outfit prose-li:text-lg
                            ">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>
                        </SectionFade>

                        <div className="w-full h-[1px] bg-[#E8CBB6]/30 my-8"></div>

                        {/* Call to Action - Static Style */}
                        <SectionFade>
                            <div className="bg-[#5A2A45] text-white p-12 md:p-16 text-center rounded-sm shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                                <div className="relative z-10">
                                    <h3 className="font-display text-3xl md:text-5xl mb-6">Preserve your story.</h3>
                                    <p className="font-outfit text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                                        Every chapter of your life deserves to be remembered with grace and beauty. Let us help you tell your story.
                                    </p>
                                    <Link to="/contact">
                                        <button className="px-10 py-5 bg-white text-[#5A2A45] font-outfit uppercase tracking-widest text-sm hover:bg-[#E8CBB6] transition-colors rounded-full shadow-lg">
                                            Start a Conversation
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </SectionFade>

                        <div className="flex justify-center pt-16">
                            <Link to="/blog" className="group flex items-center gap-3 text-[#B77A8C] hover:text-[#5A2A45] transition-colors">
                                <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                                <span className="font-outfit text-xs font-bold uppercase tracking-widest">Back to Journal</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </article>
        </>
    );
};

export default BlogDetails;
