import React from "react";
import AboutImage from "../assets/Main-Image.jpg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiAward, FiCode, FiUsers } from "react-icons/fi";
import AnimatedStatCard from "./AnimatedStatCard";

const About = () => {
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    { icon: <FiCode size={32} />, value: "2+", label: "Years Experience", color: "from-primary-400 to-primary-600" },
    { icon: <FiAward size={32} />, value: "15+", label: "Projects Completed", color: "from-accent-400 to-accent-600" },
    { icon: <FiUsers size={32} />, value: "5+", label: "Technologies", color: "from-blue-400 to-blue-600" },
  ];

  const skills = [
    { title: "Frontend Development", description: "React, JavaScript, Tailwind CSS" },
    { title: "Backend Development", description: "Node.js, Express, Django, Flask" },
    { title: "Database Management", description: "MongoDB, MySQL" },
    { title: "Version Control", description: "Git, GitHub" },
  ];

  return (
    <div
      className="relative overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-24"
      id="about"
      ref={aboutRef}
    >
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 dark:bg-primary-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-extrabold mb-4">
            About <span className="text-primary-600 dark:text-primary-500">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: aboutInView ? 1 : 0,
              x: aboutInView ? 0 : -50,
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur-2xl opacity-30 animate-pulse-slow" />
            <img
              src={AboutImage}
              alt="Parth Shikhare"
              className="relative w-full h-auto rounded-2xl object-cover shadow-2xl border-2 border-white/10"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: aboutInView ? 1 : 0,
              x: aboutInView ? 0 : 50,
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
              Full Stack Developer & Creative Thinker
            </h3>
            <p className="text-lg text-slate-700 dark:text-gray-300 mb-6 leading-relaxed">
              Hi, I'm Parth — a passionate developer with a keen interest in creating elegant, 
              user-friendly web experiences. I specialize in both frontend and backend technologies, 
              continuously learning and evolving in the world of software development.
            </p>
            <p className="text-lg text-slate-700 dark:text-gray-300 mb-6 leading-relaxed">
              My focus is on delivering seamless user experiences and creating scalable, 
              high-performance applications that solve real-world problems. I love turning 
              complex challenges into simple, beautiful solutions.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 20 }}
                  transition={{ 
                    delay: 0.6 + index * 0.05,
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { type: "spring", stiffness: 500, damping: 15, duration: 0.2 }
                  }}
                  className="bg-slate-100 dark:bg-slate-800 backdrop-blur-sm p-5 rounded-xl hover:bg-primary-600 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-700 transition-all duration-200 cursor-pointer group shadow-md hover:shadow-xl"
                >
                  <h4 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-white transition-colors mb-2">
                    {skill.title}
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-gray-300 group-hover:text-white transition-colors">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Statistics Section with Counter Animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 50 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {stats.map((stat, index) => (
            <AnimatedStatCard 
              key={stat.label} 
              stat={stat} 
              index={index} 
              inView={aboutInView}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
