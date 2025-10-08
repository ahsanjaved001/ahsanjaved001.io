import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks';
import { portfolioService } from '@/services/portfolioService';
import { Experience as ExperienceType } from '@/types';

// Helper function to highlight key metrics and technologies
const highlightKeyInfo = (text: string): string => {
  return text
    .replace(/(\d+%|\d+\+)/gi, '<span class="metric-highlight">$1</span>')
    .replace(
      /(Shopify Plus|Shopify Functions|Checkout Extensions|Payment Gateways)/gi,
      '<span class="tech-highlight">$1</span>'
    );
};

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = React.useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.1 });

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await portfolioService.getExperiences();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

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
        id="experience"
        className="py-20 relative"
      >
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-tertiary">Loading experience...</p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={containerRef}
      id="experience"
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
          <h2 className="section-title">Experience</h2>
          <p className="text-xl text-tertiary max-w-3xl mx-auto leading-relaxed">
            A journey through building scalable systems and leading technical
            initiatives across different companies and technologies.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Company Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8 justify-center"
          >
            {experiences.map((exp, index) => (
              <motion.button
                key={exp.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-purple-600 to-primary-500 text-white'
                    : 'bg-card text-tertiary hover:bg-card-hover hover:text-primary'
                }`}
              >
                {exp.company}
              </motion.button>
            ))}
          </motion.div>

          {/* Experience Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="card p-8"
            >
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-primary">
                        {experiences[activeTab].title}
                      </h3>
                      {!experiences[activeTab].endDate && (
                        <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-medium border border-green-500/30">
                          Current
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg text-purple-400 font-semibold mb-2">
                      {experiences[activeTab].company}
                    </h4>
                  </div>
                  <div className="text-tertiary text-sm">
                    <div className="mb-1">
                      {experiences[activeTab].location}
                    </div>
                    <div>
                      {new Date(
                        experiences[activeTab].startDate
                      ).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}{' '}
                      -{' '}
                      {experiences[activeTab].endDate
                        ? new Date(
                            experiences[activeTab].endDate
                          ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                          })
                        : 'Present'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h5 className="text-lg font-semibold text-primary mb-4">
                  Key Achievements
                </h5>
                <ul className="space-y-3">
                  {experiences[activeTab].description.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 text-secondary"
                    >
                      <span className="text-purple-400 mt-1 text-sm">•</span>
                      <div
                        className="leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: highlightKeyInfo(
                            item.replace(
                              /`([^`]+)`/g,
                              '<code class="bg-purple-500/20 px-2 py-1 rounded text-purple-300 font-mono text-sm">$1</code>'
                            )
                          ),
                        }}
                      />
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-primary mb-4">
                  Technologies Used
                </h5>
                <div className="flex flex-wrap gap-2">
                  {experiences[activeTab].technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="skill-chip"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
