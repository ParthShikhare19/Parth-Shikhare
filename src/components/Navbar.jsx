import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'About', 'Education', 'Skills', 'Projects', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 20,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? darkMode 
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : darkMode 
            ? 'bg-slate-900/80 backdrop-blur-sm py-4'
            : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl font-extrabold tracking-tight"
        >
          <span className={`${darkMode ? 'text-primary-400' : 'text-primary-500'}`}>
            Parth.dev
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-base font-medium">
          {navLinks.map((text, index) => (
            <motion.a
              key={text}
              href={`#${text.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative group ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
            >
              {text}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Connect Button */}
          <motion.a
            href="https://www.linkedin.com/in/parth-shikhare-854567302/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 20px rgba(59, 130, 246, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Connect
          </motion.a>

          {/* Theme Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              darkMode ? 'bg-dark-800 text-yellow-400' : 'bg-gray-200 text-gray-800'
            } hover:shadow-lg transition-all duration-300`}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full ${
              darkMode ? 'bg-dark-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${darkMode ? 'glass-dark' : 'glass'} mt-4 mx-4 rounded-2xl overflow-hidden`}
          >
            <div className="flex flex-col space-y-4 p-6">
              {navLinks.map((text, index) => (
                <motion.a
                  key={text}
                  href={`#${text.toLowerCase()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} hover:text-primary-500 transition-colors`}
                >
                  {text}
                </motion.a>
              ))}
              <motion.a
                href="https://www.linkedin.com/in/parth-shikhare-854567302/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold px-6 py-3 rounded-full text-center shadow-lg"
              >
                Connect on LinkedIn
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
