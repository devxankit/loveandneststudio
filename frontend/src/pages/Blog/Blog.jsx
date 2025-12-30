import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';
import './Blog.css';

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
            <div className="blog-page">
                <section className="blog-header">
                    <SectionTitle
                        title="Our Blog"
                        subtitle="Tips, stories, and inspiration"
                    />
                </section>

                <section className="blog-posts">
                    <div className="posts-grid">
                        {blogPosts.map(post => (
                            <article key={post.id} className="blog-card">
                                <div className="blog-card-image">
                                    <img src={post.image} alt={post.title} loading="lazy" />
                                </div>
                                <div className="blog-card-content">
                                    <p className="blog-date">{new Date(post.date).toLocaleDateString()}</p>
                                    <h3>{post.title}</h3>
                                    <p className="blog-excerpt">{post.excerpt}</p>
                                    <Link to={`/blog/${post.id}`} className="read-more">
                                        Read More →
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
