import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver, useScrollPosition } from '@/hooks';
import { portfolioService } from '@/services/portfolioService';
import { PersonalInfo } from '@/types';

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const scrollPosition = useScrollPosition();

  const stats = [
    { label: 'Backend APIs', value: 'Node.js', icon: '⚡' },
    { label: 'GitHub Actions', value: 'CI/CD', icon: '🚀' },
    { label: 'Architecture', value: 'DDD', icon: '🏗️' },
    { label: 'Containers', value: 'Docker', icon: '🐳' },
    { label: 'Databases', value: 'PostgreSQL', icon: '🗄️' },
    { label: 'Deployment', value: 'Cloud', icon: '☁️' },
  ];

  const containerRef = React.useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.1 });

  const fullText = personalInfo
    ? `${personalInfo.title} — Architecture, CI/CD & Scalable Systems`
    : '';

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const data = await portfolioService.getPersonalInfo();
        setPersonalInfo(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching personal info:', error);
        setIsLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  useEffect(() => {
    if (!isVisible || isTypingComplete || !fullText) return;

    const timer = setTimeout(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsTypingComplete(true);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentIndex, isVisible, isTypingComplete, fullText]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </section>
    );
  }

  if (!personalInfo) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Failed to load personal information
          </h1>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={containerRef}
      id="hero"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="min-h-screen flex items-center justify-center pt-16 pb-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center px-2">
          {/* Left Column - Text Content */}
          <motion.div
            variants={itemVariants}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Hi, I'm{' '}
                <span className="gradient-text">
                  {personalInfo?.name || 'Loading...'}
                </span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="text-xl md:text-2xl font-semibold text-secondary min-h-[2.5rem]"
              >
                {typedText}
                {!isTypingComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-purple-400"
                  >
                    |
                  </motion.span>
                )}
              </motion.div>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-tertiary leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {personalInfo?.description || 'Loading...'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${personalInfo?.contact?.email || ''}`}
                className="btn-primary"
              >
                Email me
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo?.contact?.linkedin || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${personalInfo?.contact?.phone || ''}`}
                className="btn-secondary"
              >
                Call
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo?.contact?.upwork || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Upwork
              </motion.a>
            </motion.div>

            {/* Quick Info */}
            <motion.div
              variants={itemVariants}
              className="space-y-2 text-muted text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <span>📍</span>
                <span>{personalInfo?.location || 'Loading...'}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <span>💼</span>
                <span>
                  Currently: {personalInfo?.currentRole || 'Loading...'}
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <span>🎯</span>
                <span>
                  Specializing in backend architecture, microservices, and
                  DevOps practices
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Cards */}
          <motion.div variants={itemVariants} className="relative">
            <div className="glass-effect rounded-2xl p-6">
              <motion.div
                variants={statVariants}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map(stat => (
                  <motion.div
                    key={stat.value}
                    variants={statVariants}
                    whileHover={{
                      scale: 1.05,
                      rotate: [0, -2, 2, 0],
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group cursor-pointer"
                  >
                    <div className="card p-4 h-24 flex flex-col justify-center items-center text-center space-y-2 hover:bg-purple-500/10 transition-all duration-300">
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-primary text-sm">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-primary-500 rounded-full opacity-60"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full opacity-60"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollPosition > 50 ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-tertiary"
        >
          <span className="text-sm">Scroll to explore</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
