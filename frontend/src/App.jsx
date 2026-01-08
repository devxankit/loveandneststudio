import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import AppRoutes from './routes/AppRoutes';

// Persistent Brand Texture (Global)
const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[100000] opacity-[0.035] animate-grain"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
  </div>
);

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app selection:bg-[#5A2A45] selection:text-[#F1EBDD] flex flex-col min-h-screen">
      {!isAdminRoute && <GrainOverlay />}
      {!isAdminRoute && <Navbar />}
      <main className="relative z-0 flex-grow min-h-screen">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
