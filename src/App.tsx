import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SEO from './components/SEO';
import ScrollToTop from './components/ui/ScrollToTop';

const HomePage = lazy(() => import('./pages/sorsogon/HomePage'));
const ServicesPage = lazy(() => import('./pages/sorsogon/ServicesPage'));
const DirectoryPage = lazy(() => import('./pages/sorsogon/DirectoryPage'));
const LguDetailPage = lazy(() => import('./pages/sorsogon/LguDetailPage'));
const HotlinesPage = lazy(() => import('./pages/sorsogon/HotlinesPage'));
const DisasterPage = lazy(() => import('./pages/sorsogon/DisasterPage'));
const TourismPage = lazy(() => import('./pages/sorsogon/TourismPage'));
const AboutPage = lazy(() => import('./pages/sorsogon/AboutPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const RouteFallback = () => (
  <div className='flex min-h-[60vh] items-center justify-center'>
    <span className='sr-only'>Loading…</span>
    <div
      aria-hidden='true'
      className='h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-teal-800'
    />
  </div>
);

function App() {
  return (
    <Router>
      <NuqsAdapter>
        <div className='flex min-h-screen flex-col bg-white'>
          <SEO />
          <Navbar />
          <ScrollToTop />
          <main className='flex-1'>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/services' element={<ServicesPage />} />
                <Route path='/directory' element={<DirectoryPage />} />
                <Route path='/directory/:slug' element={<LguDetailPage />} />
                <Route path='/hotlines' element={<HotlinesPage />} />
                <Route path='/disaster' element={<DisasterPage />} />
                <Route path='/tourism' element={<TourismPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </NuqsAdapter>
    </Router>
  );
}

export default App;
