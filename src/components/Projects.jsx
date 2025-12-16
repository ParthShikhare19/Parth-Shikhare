import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiCode } from "react-icons/fi";
import employeeMSImage from "../assets/VBM.jpeg";
import flask from "../assets/flask.webp";
import budgetImg from "../assets/pennyplanner.jpg";
import nexus from "../assets/Dash.png";
import speed from "../assets/speed.png";
import weather from "../assets/weather.png";

const projects = [
  {
    id: 1,
    name: "Virtual Bank Management",
    description: "Simulates core banking functions like passbook, fund transfers and more.",
    image: employeeMSImage,
    github: "https://github.com/ParthShikhare19/Virtual_Bank_Management_System",
    category: "Full Stack",
    tags: ["Banking", "Transactions", "Database"],
  },
  {
    id: 2,
    name: "Taskify",
    description: "To-do app that helps users organize and track daily tasks with ease.",
    image: flask,
    github: "https://github.com/ParthShikhare19/Taskify",
    category: "Web App",
    tags: ["Productivity", "Flask", "CRUD"],
  },
  {
    id: 3,
    name: "Pennyplanner",
    description: "Budget manager for tracking expenses and analyzing spending habits.",
    image: budgetImg,
    github: "https://github.com/ParthShikhare19/PennyPlanner",
    category: "Web App",
    tags: ["Finance", "Analytics", "Management"],
  },
  {
    id: 4,
    name: "Nexus Grid",
    description: "Monitors and streamlines IT infrastructure in real time.",
    image: nexus,
    github: "https://github.com/Ai-Chetan/NexusGrid",
    category: "Full Stack",
    tags: ["Monitoring", "Dashboard", "Real-time"],
  },
  {
    id: 5,
    name: "SpeedoType",
    description: "Typing speed tester with real-time WPM and accuracy tracking.",
    image: speed,
    github: "https://github.com/ParthShikhare19/SpeedoType",
    category: "Web App",
    tags: ["Game", "Speed Test", "Interactive"],
  },
  {
    id: 6,
    name: "Weather App",
    description: "Displays real-time weather using API data for multiple cities.",
    image: weather,
    github: "https://github.com/ParthShikhare19/Weather-App",
    category: "Web App",
    tags: ["API", "Weather", "Real-time"],
  },
];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);
  
  const categories = ["All", "Full Stack", "Web App"];
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div
      id="projects"
      className="relative bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-24 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 dark:bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl" />

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
            Featured <span className="text-primary-600 dark:text-primary-500">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-500 mx-auto rounded-full" />
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">Explore my recent work</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filter === category
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/50'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -15,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300 border border-slate-300 dark:border-slate-700 hover:border-primary-500/50"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Overlay Icons */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/80 backdrop-blur-sm"
                    initial={{ y: 20 }}
                    animate={{ 
                      y: hoveredId === project.id ? 0 : 20,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
                    >
                      <FiGithub size={24} />
                    </motion.a>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      <FiExternalLink size={24} />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FiCode className="text-primary-600 dark:text-primary-400" />
                    <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">{project.category}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:scale-105 transition-transform">
                    {project.name}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-primary-500/30 text-primary-700 dark:text-primary-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Accent Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/50 rounded-2xl transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="https://github.com/ParthShikhare19"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all duration-300 border border-slate-300 dark:border-slate-700 shadow-lg"
          >
            <FiGithub size={20} />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
