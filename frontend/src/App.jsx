import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
