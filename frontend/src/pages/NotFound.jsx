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
      <div className="not-found-page">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you're looking for doesn't exist.</p>
          <Link to="/">
            <Button variant="primary" size="large">Go Home</Button>
          </Link>
        </div>
      </div>

      <style>{`
        .not-found-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .not-found-content {
          text-align: center;
        }

        .not-found-content h1 {
          font-size: 8rem;
          font-weight: 700;
          background: linear-gradient(135deg, hsl(340, 80%, 60%), hsl(280, 70%, 50%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .not-found-content h2 {
          font-size: 2.5rem;
          color: hsl(0, 0%, 30%);
          margin-bottom: 1rem;
        }

        .not-found-content p {
          font-size: 1.2rem;
          color: hsl(0, 0%, 50%);
          margin-bottom: 2rem;
        }
      `}</style>
    </>
  );
};

export default NotFound;
