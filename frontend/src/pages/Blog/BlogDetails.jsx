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

            {/* --- Editorial Header (Clean Magazine Style) --- */}
            <header className="relative pt-32 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Meta Info */}
                    <div className="flex items-center justify-center gap-4 text-[#B77A8C] font-outfit text-xs uppercase tracking-[0.2em] font-bold mb-6">
                        <span>{new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span className="w-1 h-1 rounded-full bg-[#E8CBB6]"></span>
                        <span>{readTime}</span>
                        {/* Categories */}
                        {post.tags && post.tags.length > 0 && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-[#E8CBB6]"></span>
                                <span>{post.tags[0]}</span>
                            </>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-[#5A2A45] leading-[1.1] mb-8 max-w-5xl mx-auto">
                        {post.title}
                    </h1>

                    {/* Author & Divider */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-16 h-[1px] bg-[#E8CBB6]"></div>
                        <p className="font-outfit text-[#8F8A86] text-xs uppercase tracking-widest">
                            Words by <span className="text-[#5A2A45] font-bold">Anamika</span>
                        </p>
                    </div>
                </motion.div>
            </header>



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
                            {/* Rich Text Content Render */}
                            <div className="prose prose-lg md:prose-xl max-w-none
                                prose-headings:font-display prose-headings:text-[#5A2A45] prose-headings:font-normal
                                prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:italic
                                prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:text-[#5A2A45] prose-h3:mb-4 prose-h3:mt-12
                                prose-p:font-outfit prose-p:text-[#8F8A86] prose-p:font-light prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                                prose-a:text-[#B77A8C] prose-a:underline hover:prose-a:text-[#5A2A45]
                                prose-blockquote:border-l-4 prose-blockquote:border-[#E8CBB6] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#5A2A45]
                                prose-strong:text-[#5A2A45] prose-strong:font-semibold
                                prose-li:text-[#8F8A86] prose-li:font-outfit prose-li:text-lg
                            ">
                                <style>{`
                                    @keyframes fadeUpReveal {
                                        from { opacity: 0; transform: translateY(30px); }
                                        to { opacity: 1; transform: translateY(0); }
                                    }
                                    
                                    /* Staggered Reveal Animation */
                                    .dynamic-content > * {
                                        opacity: 0;
                                        animation: fadeUpReveal 0.8s ease-out forwards;
                                    }
                                    .dynamic-content > *:nth-child(1) { animation-delay: 0.1s; }
                                    .dynamic-content > *:nth-child(2) { animation-delay: 0.2s; }
                                    .dynamic-content > *:nth-child(3) { animation-delay: 0.3s; }
                                    .dynamic-content > *:nth-child(4) { animation-delay: 0.4s; }
                                    .dynamic-content > *:nth-child(5) { animation-delay: 0.5s; }
                                    .dynamic-content > *:nth-child(6) { animation-delay: 0.6s; }
                                    .dynamic-content > *:nth-child(n+7) { animation-delay: 0.7s; }

                                    /* --- Editorial Styling Updates (Exact Match) --- */

                                    /* 1. Intro Paragraph */
                                    /* Matches: text-xl md:text-2xl text-[#5A2A45]/80 leading-relaxed md:leading-loose */
                                    .dynamic-content > p:first-of-type {
                                        font-family: 'Outfit', sans-serif;
                                        font-size: 1.25rem; /* text-xl */
                                        line-height: 1.625; /* leading-relaxed */
                                        color: rgba(90, 42, 69, 0.8); /* #5A2A45 with 80% opacity */
                                        margin-bottom: 2.5rem;
                                    }
                                    @media (min-width: 768px) {
                                        .dynamic-content > p:first-of-type {
                                            font-size: 1.5rem; /* text-2xl */
                                            line-height: 2; /* leading-loose */
                                        }
                                    }

                                    /* 2. Drop Cap */
                                    /* Matches: float-left text-7xl md:text-8xl font-display text-[#B77A8C] mr-4 mt-[-20px] leading-[0.8] */
                                    .dynamic-content > p:first-of-type::first-letter {
                                        float: left;
                                        font-family: 'Playfair Display', serif;
                                        font-size: 4.5rem; /* text-7xl */
                                        line-height: 0.8;
                                        color: #B77A8C;
                                        margin-right: 1rem; /* mr-4 */
                                        margin-top: -10px; /* Slight adjustment for CSS float vs flex */
                                        margin-bottom: -5px;
                                    }
                                    @media (min-width: 768px) {
                                        .dynamic-content > p:first-of-type::first-letter {
                                            font-size: 6rem; /* text-8xl */
                                            margin-top: -15px; 
                                        }
                                    }

                                    /* 3. Headers Adjustment */
                                    .dynamic-content h2 {
                                        font-family: 'Playfair Display', serif;
                                        font-size: 2rem;
                                        margin-top: 4rem;
                                        margin-bottom: 1.5rem;
                                        color: #5A2A45;
                                        font-style: italic;
                                    }
                                    @media (min-width: 768px) {
                                        .dynamic-content h2 { font-size: 2.25rem; }
                                    }

                                    .dynamic-content h3 {
                                        font-family: 'Playfair Display', serif;
                                        font-size: 1.5rem;
                                        margin-top: 3rem;
                                        margin-bottom: 1rem;
                                        color: #5A2A45;
                                    }
                                    @media (min-width: 768px) {
                                        .dynamic-content h3 { font-size: 1.875rem; }
                                    }

                                    /* 4. Body Text & Spacing */
                                    .dynamic-content p {
                                        font-family: 'Outfit', sans-serif;
                                        font-size: 1.125rem;
                                        line-height: 1.8;
                                        color: #8F8A86;
                                        margin-bottom: 1.5rem;
                                        font-weight: 300;
                                    }

                                    /* 5. Blockquotes */
                                    .dynamic-content blockquote {
                                        border-left: 4px solid #E8CBB6;
                                        padding-left: 1.5rem;
                                        margin: 2.5rem 0;
                                        font-family: 'Playfair Display', serif;
                                        font-style: italic;
                                        font-size: 1.25rem;
                                        color: #5A2A45;
                                        background: rgba(249, 247, 242, 0.5); /* subtle background */
                                        padding: 2rem;
                                        border-radius: 0 1rem 1rem 0;
                                    }

                                    /* 6. Lists */
                                    .dynamic-content ul, .dynamic-content ol {
                                        margin-bottom: 2rem;
                                        padding-left: 1.5rem;
                                    }
                                    .dynamic-content li {
                                        font-family: 'Outfit', sans-serif;
                                        font-size: 1.125rem;
                                        color: #8F8A86;
                                        margin-bottom: 0.75rem;
                                        padding-left: 0.5rem;
                                        position: relative;
                                    }
                                    .dynamic-content ul li::marker {
                                        color: #B77A8C;
                                    }
                                    .dynamic-content ol li::marker {
                                        color: #5A2A45;
                                        font-family: 'outfit';
                                        font-weight: bold;
                                    }

                                    /* 7. Inline Elements */
                                    .dynamic-content strong {
                                        color: #5A2A45;
                                        font-weight: 600;
                                    }
                                    .dynamic-content a {
                                        color: #B77A8C;
                                        text-decoration: underline;
                                        text-underline-offset: 4px;
                                        transition: color 0.3s ease;
                                    }
                                    .dynamic-content a:hover {
                                        color: #5A2A45;
                                    }
                                `}</style>
                                <div className="dynamic-content" dangerouslySetInnerHTML={{
                                    __html: post.content.replace(
                                        /<img\s+([^>]+)>/g,
                                        '<div class="group relative block w-full my-12 max-w-4xl mx-auto"><div class="bg-white p-2 rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.1)] relative z-0 overflow-hidden after:content-[\'\'] after:absolute after:inset-0 after:bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.6)_50%,transparent_70%)] after:skew-x-[-20deg] after:-left-[150%] after:pointer-events-none group-hover:after:animate-[sheen-hover_1.5s_cubic-bezier(0.4,0,0.2,1)_forwards]"><img $1 class="w-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105" /></div></div>'
                                    )
                                }} />
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


                    </div>

                </div>
            </article>
        </>
    );
};

export default BlogDetails;
