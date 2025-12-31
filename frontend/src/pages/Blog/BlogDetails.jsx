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
            <div className="py-24 px-8 max-w-[800px] mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Blog Post {id}</h1>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                </div>
                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                    <p className="text-xl italic text-gray-400">Blog content will be displayed here...</p>
                </div>
            </div>
        </>
    );
};

export default BlogDetails;
