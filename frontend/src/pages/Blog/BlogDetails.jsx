import React from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../../components/seo/SEO';

const BlogDetails = () => {
    const { id } = useParams();

    return (
        <>
            <SEO
                title="Blog Post"
                description="Read our latest blog post about photography and parenting."
            />
            <div className="blog-details-page">
                <div className="blog-content">
                    <h1>Blog Post {id}</h1>
                    <p>Blog content will be displayed here...</p>
                </div>
            </div>
        </>
    );
};

export default BlogDetails;
