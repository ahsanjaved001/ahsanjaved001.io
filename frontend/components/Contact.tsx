import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks';
import { copyToClipboard, isValidEmail } from '@/utils';
import { messageService } from '@/services/messageService';
import { personalInfo } from '@/data/portfolioData';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = React.useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.1 });

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: personalInfo.contact.email,
      href: `mailto:${personalInfo.contact.email}`,
      action: () => {
        window.location.href = `mailto:${personalInfo.contact.email}`;
        toast.success('Email client opened');
      },
    },
    {
      icon: '📱',
      label: 'Phone',
      value: personalInfo.contact.phone,
      href: `tel:${personalInfo.contact.phone}`,
      action: () => {
        window.location.href = `tel:${personalInfo.contact.phone}`;
        toast.success('Phone dialer opened');
      },
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/ahsanjvd001',
      href: personalInfo.contact.linkedin,
      action: () => window.open(personalInfo.contact.linkedin, '_blank'),
    },
    {
      icon: '🚀',
      label: 'Upwork',
      value: 'upwork.com/freelancers/ahsanjaved001',
      href: personalInfo.contact.upwork,
      action: () => window.open(personalInfo.contact.upwork, '_blank'),
    },
    {
      icon: '📍',
      label: 'Location',
      value: personalInfo.location,
      href: '#',
      action: () => {
        copyToClipboard(personalInfo.location);
        toast.success('Location copied to clipboard');
      },
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Validate name (2-100 characters)
    if (
      !formData.name ||
      formData.name.trim().length < 2 ||
      formData.name.trim().length > 100
    ) {
      toast.error('Name must be between 2 and 100 characters');
      return;
    }

    // Validate subject (5-200 characters)
    if (
      formData.subject &&
      (formData.subject.trim().length < 5 ||
        formData.subject.trim().length > 200)
    ) {
      toast.error('Subject must be between 5 and 200 characters');
      return;
    }

    // Validate message (10-2000 characters)
    if (
      !formData.message ||
      formData.message.trim().length < 10 ||
      formData.message.trim().length > 2000
    ) {
      toast.error('Message must be between 10 and 2000 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      await messageService.sendMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Contact from Portfolio',
        message: formData.message,
      });

      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
      id="contact"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="py-20 relative"
    >
      <div className="container-custom">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-xl text-tertiary max-w-3xl mx-auto leading-relaxed">
            Ready to discuss your next project? Let's connect and build
            something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Let's Connect
              </h3>
              <p className="text-tertiary mb-8">
                I'm always interested in new opportunities and exciting
                projects. Whether you have a question or just want to say hi,
                I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-4">
              {personalInfo ? (
                contactInfo.map(contact => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className="card p-4 cursor-pointer group block no-underline"
                    onClick={e => {
                      if (contact.label === 'Location') {
                        e.preventDefault();
                        contact.action();
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl"
                      >
                        {contact.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary group-hover:text-purple-300 transition-colors duration-300">
                          {contact.label}
                        </h4>
                        <p className="text-tertiary group-hover:text-secondary transition-colors duration-300">
                          {contact.value}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="text-muted group-hover:text-purple-400 transition-colors duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.a>
                ))
              ) : (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="card p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gray-300 rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                          <div className="h-3 bg-gray-300 rounded w-32"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="pt-6">
              <h4 className="text-lg font-semibold text-primary mb-4">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/in/ahsanjvd001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card hover:bg-blue-500/20 flex items-center justify-center text-primary hover:text-blue-400 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/ahsanjaved001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card hover:bg-gray-500/20 flex items-center justify-center text-primary hover:text-gray-400 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.upwork.com/freelancers/ahsanjaved001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card hover:bg-green-500/20 flex items-center justify-center text-primary hover:text-green-400 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703 0 1.491-1.211 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.284 5.284 5.284 2.913 0 5.283-2.37 5.283-5.284v-1.205c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-card border border-theme text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-card border border-theme text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-theme text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-theme text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
