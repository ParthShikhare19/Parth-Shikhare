import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiMail, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (formData) => {
    const errors = {};
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const message = formData.get('message');

    if (!name || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!message || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    return errors;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_123456",
        "template_123456",
        form.current,
        "3D-pyZPI6cgPry8e6"
      )
      .then(
        (result) => {
          setSuccessMessage("success");
          form.current.reset();
          setTimeout(() => setSuccessMessage(""), 5000);
        },
        (error) => {
          setSuccessMessage("error");
          setTimeout(() => setSuccessMessage(""), 5000);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const contactInfo = [
    {
      icon: <FiMail size={24} />,
      title: "Email",
      value: "parthshikhare21@gmail.com",
      link: "mailto:parthshikhare21@gmail.com"
    },
    {
      icon: <FiMapPin size={24} />,
      title: "Location",
      value: "Mumbai, India",
      link: null
    }
  ];

  const socialLinks = [
    { icon: <FaGithub size={24} />, url: "https://github.com/ParthShikhare19", label: "GitHub" },
    { icon: <FaLinkedin size={24} />, url: "https://www.linkedin.com/in/parth-shikhare-854567302/", label: "LinkedIn" },
    { icon: <FaTwitter size={24} />, url: "https://x.com/_parthaaaa_", label: "Twitter" },
    { icon: <FaInstagram size={24} />, url: "https://www.instagram.com/parthshikhare_19/", label: "Instagram" },
  ];

  return (
    <div
      className="relative bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white py-24 overflow-hidden"
      id="contact"
    >
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-extrabold mb-4">
            Get In <span className="text-primary-600 dark:text-primary-500">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 text-lg">Let's build something amazing together</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-500">
              Let's Talk About Your Project
            </h3>
            <p className="text-slate-700 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              I'm open to collaborating on tech projects, exploring partnership opportunities, 
              and discussing innovative ideas in app and web development.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl flex items-center gap-4 cursor-pointer group border border-slate-300 dark:border-slate-700 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-gray-400">{info.title}</p>
                    {info.link ? (
                      <a href={info.link} className="text-slate-900 dark:text-white font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-slate-900 dark:text-white font-medium">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-slate-700 dark:text-gray-400 mb-4 font-medium">Connect with me</p>
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
                    className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-700 dark:text-white hover:bg-primary-500 hover:text-white border border-slate-300 dark:border-slate-700 transition-all duration-300 shadow-md"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-300 dark:border-slate-700"
          >
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">Your Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="John Doe"
                  className={`w-full p-4 rounded-xl bg-white dark:bg-white/5 border ${
                    formErrors.name ? 'border-red-500' : 'border-slate-300 dark:border-white/20'
                  } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all`}
                />
                {formErrors.name && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1 flex items-center gap-1">
                    <FiAlertCircle size={14} /> {formErrors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">Your Email</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="john@example.com"
                  className={`w-full p-4 rounded-xl bg-white dark:bg-white/5 border ${
                    formErrors.email ? 'border-red-500' : 'border-slate-300 dark:border-white/20'
                  } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all`}
                />
                {formErrors.email && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1 flex items-center gap-1">
                    <FiAlertCircle size={14} /> {formErrors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">Your Message</label>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell me about your project..."
                  className={`w-full p-4 rounded-xl bg-white dark:bg-white/5 border ${
                    formErrors.message ? 'border-red-500' : 'border-slate-300 dark:border-white/20'
                  } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all resize-none`}
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1 flex items-center gap-1">
                    <FiAlertCircle size={14} /> {formErrors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-xl shadow-primary-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <FiSend size={20} />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Success/Error Messages */}
              {successMessage === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-xl"
                >
                  <FiCheckCircle size={20} />
                  <span>Message sent successfully!</span>
                </motion.div>
              )}
              {successMessage === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl"
                >
                  <FiAlertCircle size={20} />
                  <span>Failed to send. Please try again.</span>
                </motion.div>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
