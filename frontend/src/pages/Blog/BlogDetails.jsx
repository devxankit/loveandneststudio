import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import { getPost } from '../../services/api';
import LazyImage from '../../components/common/LazyImage';
import { Loader, ArrowLeft } from 'lucide-react';

const BlogDetails = () => {
    const { id } = useParams(); // 'id' matches the route param for slug
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

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
    }, [id]);

    if (loading) return <div className="h-screen flex items-center justify-center text-[#5A2A45]"><Loader className="animate-spin mr-2" /> Loading Story...</div>;

    if (!post) return <div className="h-screen flex flex-col items-center justify-center text-[#5A2A45]"><p>Story not found.</p><Link to="/blog" className="mt-4 underline">Back to Journal</Link></div>;

    return (
        <>
            <SEO
                title={`${post.title} | Love & Nest Studio`}
                description={post.excerpt || "Read our latest story."}
            />

            <article className="min-h-screen bg-[#FAF9F6]">
                {/* Hero Header */}
                <div className="relative h-[60vh] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 z-10" />
                    <LazyImage
                        src={post.coverImage || ""}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="max-w-4xl mx-auto text-white">
                            <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-xs font-bold uppercase tracking-widest transition-colors">
                                <ArrowLeft size={16} /> Back to Journal
                            </Link>
                            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-4">{post.title}</h1>
                            <div className="flex items-center gap-4 text-sm font-outfit text-white/90">
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                {post.tags && post.tags.length > 0 && (
                                    <>
                                        <span className="w-1 h-1 bg-white rounded-full"></span>
                                        <span className="uppercase tracking-wide font-medium">{post.tags[0]}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
                    <div className="prose prose-lg prose-headings:font-display prose-headings:text-[#5A2A45] prose-p:font-outfit prose-p:text-[#6E5A52] prose-p:font-light prose-a:text-[#B77A8C] max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    <div className="mt-16 pt-8 border-t border-[#5A2A45]/10 flex justify-between items-center text-[#5A2A45]">
                        <span className="font-display text-xl">Share this story</span>
                        {/* Placeholder for social share */}
                        <div className="flex gap-4">
                            {/* Icons would go here */}
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

export default BlogDetails;
