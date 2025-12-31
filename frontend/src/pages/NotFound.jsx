import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist."
      />
      <div className="min-h-[80vh] flex items-center justify-center p-8 bg-gray-50">
        <div className="text-center max-w-[500px] w-full bg-white p-12 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-6">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">Sorry, the page you're looking for seems to have wandered off into a different session.</p>
          <Link to="/" className="inline-block">
            <Button variant="primary" size="large" className="px-10 rounded-2xl">Go Home</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
