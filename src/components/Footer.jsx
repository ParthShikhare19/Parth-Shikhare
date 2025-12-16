import React from "react";
import { FaInstagram, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: <FaInstagram size={22} />, url: "https://www.instagram.com/parthshikhare_19/", label: "Instagram" },
    { icon: <FaTwitter size={22} />, url: "https://x.com/_parthaaaa_", label: "Twitter" },
    { icon: <FaLinkedin size={22} />, url: "https://www.linkedin.com/in/parth-shikhare-854567302/", label: "LinkedIn" },
    { icon: <FaGithub size={22} />, url: "https://github.com/ParthShikhare19", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white py-12 border-t border-slate-300 dark:border-slate-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="text-2xl font-bold text-gradient mb-4">Parth.dev</h3>
            <p className="text-gray-400 leading-relaxed">
              Building innovative web solutions with modern technologies. 
              Let's create something amazing together.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  whileHover={{ x: 5 }}
                  className="block text-gray-400 hover:text-primary-400 transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary-600 dark:text-primary-400">Connect With Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-500 dark:hover:bg-primary-500 transition-all duration-300 text-slate-700 dark:text-white hover:text-white"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Parth Shikhare. All rights reserved.
          </p>
          <motion.p 
            className="text-sm text-gray-400 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            Made with <FiHeart className="text-red-500 animate-pulse" /> and React
          </motion.p>
        </motion.div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-primary-500/10 to-transparent blur-3xl" />
    </footer>
  );
};

export default Footer;
