import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';
const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: '10 Tips for Preparing for Your Newborn Photoshoot',
            excerpt: 'Make the most of your newborn session with these helpful preparation tips...',
            date: '2024-01-15',
            image: '/placeholder-blog-1.jpg'
        },
        {
            id: 2,
            title: 'What to Wear for Maternity Photos',
            excerpt: 'Choose the perfect outfit to showcase your beautiful baby bump...',
            date: '2024-01-10',
            image: '/placeholder-blog-2.jpg'
        },
        {
            id: 3,
            title: 'Capturing Baby Milestones: A Complete Guide',
            excerpt: 'Learn when and how to document your baby\'s important milestones...',
            date: '2024-01-05',
            image: '/placeholder-blog-3.jpg'
        }
    ];

    return (
        <>
            <SEO
                title="Blog"
                description="Photography tips, parenting advice, and behind-the-scenes insights from Love & Nest Studio."
                keywords="photography blog, newborn tips, maternity advice, photo session tips"
            />
            <div className="w-full py-20 px-8">
                <section className="text-center mb-16">
                    <SectionTitle
                        title="Our Blog"
                        subtitle="Tips, stories, and inspiration"
                    />
                </section>

                <section className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogPosts.map(post => (
                            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] group">
                                <div className="h-[240px] overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-8">
                                    <p className="text-primary font-outfit text-sm font-semibold uppercase tracking-widest mb-3">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                                    <p className="text-gray-500 mb-6 leading-relaxed line-clamp-2 italic">{post.excerpt}</p>
                                    <Link to={`/blog/${post.id}`} className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all">
                                        Read More <span className="ml-1 text-lg">→</span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Blog;
