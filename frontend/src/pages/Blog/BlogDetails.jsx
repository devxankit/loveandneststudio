import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import { getPost } from '../../services/api';
import LazyImage from '../../components/common/LazyImage';
import { Loader, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Clock } from 'lucide-react';

// Fallback image
import maternityHero from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225737.png';

const BlogDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // Scroll Animation Hooks
    const { scrollY, scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax & Fade for Hero
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
    const contentY = useTransform(scrollY, [0, 500], [0, -50]);

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

    // Calculate generic read time if not provided
    const readTime = post.readTime || Math.max(1, Math.ceil((post.content?.split(/\s+/).length || 0) / 200)) + " min read";

    return (
        <>
            <SEO
                title={`${post.title} | Love & Nest Studio`}
                description={post.excerpt || "Read our latest story."}
            />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-[#B77A8C] origin-left z-[60]"
                style={{ scaleX }}
            />

            <article className="min-h-screen bg-[#FAF9F6] overflow-x-hidden">

                {/* 1. Cinematic Hero Section with Parallax */}
                <div className="relative h-[65vh] md:h-[85vh] w-full overflow-hidden">
                    <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full">
                        <LazyImage
                            src={post.coverImage || maternityHero}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                    </motion.div>

                    {/* Navigation - Absolute Top Left */}
                    <div className="absolute top-0 left-0 w-full p-6 md:p-12 z-30">
                        <Link to="/blog" className="inline-flex items-center gap-2 group">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-[#5A2A45] text-white transition-all duration-300">
                                <ArrowLeft size={18} />
                            </div>
                            <span className="text-white/90 font-outfit uppercase text-[10px] md:text-xs tracking-widest font-bold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                Back
                            </span>
                        </Link>
                    </div>

                    {/* Hero Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                        className="absolute bottom-0 left-0 w-full p-6 md:p-20 z-20 pb-24 md:pb-32"
                    >
                        <div className="max-w-6xl mx-auto">
                            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6 font-outfit text-xs uppercase tracking-widest">
                                <span className="flex items-center gap-2">
                                    <Clock size={14} className="text-[#E8CBB6]" />
                                    {readTime}
                                </span>
                                <span className="w-1 h-1 bg-[#E8CBB6] rounded-full"></span>
                                <span>{new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                {post.tags && post.tags.length > 0 && (
                                    <>
                                        <span className="w-1 h-1 bg-[#E8CBB6] rounded-full"></span>
                                        <span className="bg-[#B77A8C]/80 text-white px-3 py-1 rounded-full backdrop-blur-sm shadow-sm border border-white/10">{post.tags[0]}</span>
                                    </>
                                )}
                            </div>

                            <motion.h1
                                className="font-display text-4xl md:text-7xl lg:text-[5.5rem] leading-[1.1] md:leading-[1] text-white tracking-tight drop-shadow-lg"
                            >
                                {post.title}
                            </motion.h1>
                        </div>
                    </motion.div>
                </div>

                {/* 2. Editorial Content Body - Smooth Fade Up */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                    className="relative z-10 px-4 md:px-6 -mt-16 md:-mt-24 mb-20"
                >
                    <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-2xl shadow-[#5A2A45]/5 border border-[#5A2A45]/5 mx-auto max-w-5xl overflow-hidden">

                        {/* Decorative Background Blur */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E8CBB6]/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <div className="mb-14 md:mb-16 max-w-3xl mx-auto text-center">
                                <span className="inline-block w-20 h-1 bg-[#B77A8C] mb-8 rounded-full opacity-60"></span>
                                <p className="font-display text-2xl md:text-3xl text-[#5A2A45] leading-relaxed italic">
                                    "{post.excerpt}"
                                </p>
                            </div>
                        )}

                        {/* Main Content */}
                        <div className="prose prose-lg md:prose-xl max-w-none
                            prose-headings:font-display prose-headings:text-[#5A2A45] prose-headings:font-normal
                            prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:tracking-tight
                            prose-h3:text-2xl md:prose-h3:text-2xl prose-h3:text-[#B77A8C] prose-h3:mb-4
                            prose-p:font-outfit prose-p:text-[#6E5A52] prose-p:font-light prose-p:leading-loose prose-p:mb-6
                            prose-a:text-[#B77A8C] prose-a:font-medium prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-[#5A2A45] prose-a:transition-colors
                            prose-blockquote:border-l-4 prose-blockquote:border-[#E8CBB6] prose-blockquote:bg-[#FAF9F6] prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic
                            prose-strong:text-[#5A2A45] prose-strong:font-semibold
                            prose-img:rounded-[2rem] prose-img:shadow-xl prose-img:my-12 prose-img:w-full prose-img:border prose-img:border-[#5A2A45]/5
                            prose-ul:marker:text-[#B77A8C] prose-li:pl-2
                            selection:bg-[#E8CBB6]/40 selection:text-[#5A2A45]
                            ">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>

                        {/* Footer / Share */}
                        <div className="mt-24 pt-12 border-t border-[#5A2A45]/10 ">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                <div className="text-center md:text-left w-full">
                                    <h4 className="font-display text-2xl text-[#5A2A45] mb-2">Did you enjoy this story?</h4>
                                    <p className="font-outfit text-[#8F8A86] font-light">Share it with a friend who might need it.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* 3. Next/Back Navigation Section */}
                <section className="py-20 md:py-32 px-6 bg-[#FCFBF8]">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="font-outfit uppercase tracking-[0.2em] text-[#B77A8C] text-xs font-bold mb-6">More from the Journal</p>
                            <h3 className="font-display text-4xl md:text-6xl text-[#5A2A45] mb-12">Continue Reading</h3>
                            <Link
                                to="/blog"
                                className="inline-block bg-[#5A2A45] text-white px-12 py-5 rounded-full font-outfit uppercase tracking-widest text-xs font-bold hover:bg-[#6E5A52] transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-300"
                            >
                                View All Stories
                            </Link>
                        </motion.div>
                    </div>
                </section>

            </article>
        </>
    );
};

export default BlogDetails;
