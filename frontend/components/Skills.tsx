import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks';
import { skills, skillCategories } from '@/data/portfolioData';

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const containerRef = React.useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.1 });

  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter(skill => skill.category === selectedCategory);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'from-green-500 to-emerald-500';
      case 'advanced':
        return 'from-blue-500 to-cyan-500';
      case 'intermediate':
        return 'from-yellow-500 to-orange-500';
      case 'beginner':
        return 'from-gray-500 to-slate-500';
      default:
        return 'from-purple-500 to-primary-500';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05,
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
      id="skills"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="py-20 relative"
    >
      <div className="container-custom">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="text-xl text-tertiary max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit for building modern, scalable backend
            systems and delivering exceptional developer experiences.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-3 justify-center mb-12 px-2"
        >
          {skillCategories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-primary-500 text-white'
                  : 'bg-card text-tertiary hover:bg-card-hover hover:text-primary'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-2"
        >
          <AnimatePresence>
            {filteredSkills.map(skill => (
              <motion.div
                key={skill.id}
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer"
              >
                <div className="card p-4 text-center hover:bg-purple-500/10 transition-all duration-300">
                  <div className="mb-3">
                    <div
                      className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${getLevelColor(skill.level)} flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {skill.name.charAt(0)}
                    </div>
                  </div>

                  <h4 className="font-semibold text-primary mb-1 group-hover:text-purple-300 transition-colors duration-300">
                    {skill.name}
                  </h4>

                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[1, 2, 3, 4].map(level => (
                      <div
                        key={level}
                        className={`w-2 h-2 rounded-full ${
                          level <=
                          (skill.level === 'expert'
                            ? 4
                            : skill.level === 'advanced'
                              ? 3
                              : skill.level === 'intermediate'
                                ? 2
                                : 1)
                            ? 'bg-purple-400'
                            : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs text-muted capitalize">
                    {skill.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="card p-6 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="text-xl font-bold text-primary mb-2">
              Expert Level
            </h4>
            <p className="text-tertiary">
              Deep expertise in core backend technologies and architecture
              patterns
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="text-3xl mb-3">🚀</div>
            <h4 className="text-xl font-bold text-primary mb-2">
              Rapid Delivery
            </h4>
            <p className="text-tertiary">
              Proven track record of delivering high-quality solutions on time
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="text-3xl mb-3">🔧</div>
            <h4 className="text-xl font-bold text-primary mb-2">
              Continuous Learning
            </h4>
            <p className="text-tertiary">
              Always exploring new technologies and best practices
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;
