import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import ErrorBoundary from '@/components/ErrorBoundary';
import { lazy, Suspense } from 'react';

// Lazy load components that might make backend calls
const Certifications = lazy(() => import('@/components/Certifications'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

// Loading component for Suspense fallback
const ComponentLoader = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Header />
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Suspense fallback={<ComponentLoader />}>
              <ErrorBoundary>
                <Certifications />
              </ErrorBoundary>
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
              <ErrorBoundary>
                <Contact />
              </ErrorBoundary>
            </Suspense>
          </main>
          <Suspense fallback={<ComponentLoader />}>
            <Footer />
          </Suspense>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: 'custom-toast',
              style: {
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#1f2937',
                border: '1px solid rgba(229, 231, 235, 0.8)',
                backdropFilter: 'blur(12px)',
                borderRadius: '12px',
                padding: '16px',
                boxShadow:
                  '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                fontSize: '14px',
                fontWeight: '500',
                maxWidth: '400px',
                fontFamily: 'Inter, system-ui, sans-serif',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
                className: 'custom-toast-success',
                style: {
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#1f2937',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow:
                    '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  fontSize: '14px',
                  fontWeight: '500',
                  maxWidth: '400px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
                className: 'custom-toast-error',
                style: {
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#1f2937',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow:
                    '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  fontSize: '14px',
                  fontWeight: '500',
                  maxWidth: '400px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                },
              },
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
