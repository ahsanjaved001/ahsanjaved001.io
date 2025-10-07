import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks';
import {
  personalInfo,
  calculateTotalExperienceYears,
} from '@/data/portfolioData';

const About: React.FC = () => {
  const containerRef = React.useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.1 });

  const highlights = [
    {
      icon: '🏗️',
      title: 'Architecture Design',
      description: 'Clean Architecture, DDD, and microservices patterns',
    },
    {
      icon: '🚀',
      title: 'CI/CD Pipelines',
      description: 'GitHub Actions, automated testing, and deployment',
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'AWS, scalable infrastructure, and containerization',
    },
    {
      icon: '🔧',
      title: 'Backend Systems',
      description: 'Node.js, NestJS, PostgreSQL, and API development',
    },
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      id="about"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="py-20 relative"
    >
      <div className="container-custom">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title">About Me</h2>
          <p className="text-xl text-tertiary max-w-3xl mx-auto leading-relaxed">
            Passionate about building robust, scalable backend systems that
            power modern applications. I specialize in creating efficient
            architectures that can handle growth while maintaining code quality
            and developer experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image/Visual */}
          <motion.div variants={itemVariants} className="relative">
            <div className="glass-effect rounded-2xl p-8 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-primary-500 flex items-center justify-center"
              >
                <span className="text-4xl font-bold text-white">AJ</span>
              </motion.div>

              <h3 className="text-2xl font-bold text-primary mb-4">
                {personalInfo.name}
              </h3>
              <p className="text-tertiary mb-6">
                Senior Backend Developer with {calculateTotalExperienceYears()}+
                years of experience in building scalable systems and leading
                technical initiatives.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {calculateTotalExperienceYears()}+
                  </div>
                  <div className="text-muted">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">50+</div>
                  <div className="text-muted">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">10+</div>
                  <div className="text-muted">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">
                    100%
                  </div>
                  <div className="text-muted">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Highlights */}
          <motion.div variants={itemVariants} className="space-y-6">
            {highlights.map(highlight => (
              <motion.div
                key={highlight.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  x: 10,
                  transition: { duration: 0.2 },
                }}
                className="card p-6 hover:bg-purple-500/10 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl"
                  >
                    {highlight.icon}
                  </motion.div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-2">
                      {highlight.title}
                    </h4>
                    <p className="text-tertiary">{highlight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Preview */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-primary mb-8">
            Core Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Node.js',
              'NestJS',
              'TypeScript',
              'PostgreSQL',
              'Docker',
              'GitHub Actions',
              'Microservices',
            ].map(skill => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="skill-chip"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
