import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks';
import { portfolioService } from '@/services/portfolioService';
import { Certification } from '@/types';
import toast from 'react-hot-toast';

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = React.useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.1 });

  useEffect(() => {
    // Fetch certifications immediately when component mounts
    const fetchCertifications = async () => {
      try {
        setLoading(true);

        const data = await portfolioService.getCertificationsFromBackend();

        // Sort certifications by issue date (newest first)
        const sortedData = data.sort(
          (a, b) =>
            new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
        );

        setCertifications(sortedData);
      } catch (error) {
        toast.error('Failed to load certifications');
        console.error('Error fetching certifications:', error);
        // Set empty array on error to prevent UI issues
        setCertifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []); // Empty dependency array means this runs once on mount

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  if (loading) {
    return (
      <motion.section
        ref={containerRef}
        id="certifications"
        className="py-20 relative"
      >
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-tertiary">Loading certifications...</p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={containerRef}
      id="certifications"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="py-20 relative"
    >
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Certifications</h2>
          <p className="text-xl text-tertiary max-w-3xl mx-auto leading-relaxed">
            Professional certifications that validate my expertise in modern
            backend development and cloud technologies.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        {certifications.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="card p-6 text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-purple-500/20 to-primary-500/20 border-2 border-purple-500/30 flex items-center justify-center"
                >
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </motion.div>

                <h4 className="font-bold text-primary mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {cert.title}
                </h4>

                <p className="text-purple-400 text-sm font-medium mb-1">
                  {cert.issuer}
                </p>

                <p className="text-muted text-xs mb-4">{cert.issueDate}</p>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300"
                >
                  View Credential →
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-center py-12"
          >
            <div className="card p-8 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-primary-500/20 border-2 border-purple-500/30 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                No Certifications Available
              </h3>
              <p className="text-tertiary">
                Certifications are currently being loaded or are temporarily
                unavailable.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Certifications;
