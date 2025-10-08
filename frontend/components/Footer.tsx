import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioService } from '@/services/portfolioService';
import { PersonalInfo } from '@/types';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <footer className="border-t border-theme py-8 mt-20">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
          </div>
        </div>
      </footer>
    );
  }

  if (!personalInfo) {
    return (
      <footer className="border-t border-theme py-8 mt-20">
        <div className="container-custom">
          <div className="text-center text-red-500">
            Failed to load personal information
          </div>
        </div>
      </footer>
    );
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="border-t border-theme py-8 mt-20"
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-primary-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AJ</span>
            </div>
            <span className="text-primary font-semibold">
              {personalInfo.name}
            </span>
          </div>

          <div className="flex items-center space-x-6 text-tertiary">
            <motion.a
              whileHover={{ scale: 1.1, color: '#a855f7' }}
              href={`mailto:${personalInfo.contact.email}`}
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Email
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, color: '#a855f7' }}
              href={personalInfo.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              LinkedIn
            </motion.a>
            {personalInfo.contact.github && (
              <motion.a
                whileHover={{ scale: 1.1, color: '#a855f7' }}
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                GitHub
              </motion.a>
            )}
            {personalInfo.contact.upwork && (
              <motion.a
                whileHover={{ scale: 1.1, color: '#a855f7' }}
                href={personalInfo.contact.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Upwork
              </motion.a>
            )}
          </div>

          <div className="text-tertiary text-sm">
            © {currentYear} {personalInfo.name}. Built with React & Tailwind
            CSS.
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-theme text-center">
          <p className="text-muted text-sm">
            Crafted with ❤️ using modern web technologies
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
