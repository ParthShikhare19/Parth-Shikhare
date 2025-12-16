import React, { useState } from "react";
import flask from "../assets/flask.png";
import django from "../assets/django.png";
import html from "../assets/html.png";
import css from "../assets/css.jpg";
import java from "../assets/java.png";
import python from "../assets/python.jpg";
import mysql from "../assets/mysql.png";
import c from "../assets/c.png";
import js from "../assets/js.png";
import react from "../assets/react.png";
import git from "../assets/git.png";
import tailwind from "../assets/tailwind.png";
import mongo from "../assets/mongo.png";
import node from "../assets/node.png";
import express from "../assets/express.png";
import fastapi from "../assets/FastAPI.png";
import postgresql from "../assets/PostgresSQL.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import InteractiveSkillCard from "./InteractiveSkillCard";

const skillsData = {
  Frontend: [
    { 
      id: 1, 
      name: "HTML 5", 
      image: html,
      description: "Semantic HTML5 markup, accessibility best practices, and modern web standards. Building structured, SEO-friendly web pages.",
      tags: ["Semantic", "Accessibility"],
      projects: ["Portfolio", "E-commerce"],
      experience: "3+ years"
    },
    { 
      id: 2, 
      name: "CSS 3", 
      image: css,
      description: "Advanced CSS3 features including Flexbox, Grid, animations, and transitions. Creating responsive, beautiful interfaces.",
      tags: ["Flexbox", "Grid", "Animations"],
      projects: ["Dashboard", "Landing Pages"],
      experience: "3+ years"
    },
    { 
      id: 3, 
      name: "JavaScript", 
      image: js,
      description: "Modern ES6+ JavaScript, async/await, promises, DOM manipulation, and functional programming concepts.",
      tags: ["ES6+", "Async", "DOM"],
      projects: ["Interactive Apps", "API Integration"],
      experience: "3+ years"
    },
    { 
      id: 11, 
      name: "React.JS", 
      image: react,
      description: "Building dynamic UIs with React Hooks, Context API, Redux for state management. Component lifecycle and performance optimization.",
      tags: ["Hooks", "Redux", "Components"],
      projects: ["SPA", "Admin Panel"],
      experience: "2+ years"
    },
    { 
      id: 12, 
      name: "Tailwind CSS", 
      image: tailwind,
      description: "Utility-first CSS framework for rapid UI development. Custom configurations, responsive design, and component styling.",
      tags: ["Utility", "Responsive"],
      projects: ["Modern Websites", "Mobile Apps"],
      experience: "2+ years"
    },
  ],
  Backend: [
    { 
      id: 7, 
      name: "Python", 
      image: python,
      description: "Backend development with Python, data structures, algorithms, and automation scripts. Clean, maintainable code.",
      tags: ["Algorithms", "Automation"],
      projects: ["REST APIs", "Data Processing"],
      experience: "3+ years"
    },
    { 
      id: 8, 
      name: "Django", 
      image: django,
      description: "Full-featured web framework for building secure, scalable web applications. ORM, authentication, and REST APIs.",
      tags: ["ORM", "REST", "Auth"],
      projects: ["Backend Services", "CMS"],
      experience: "2+ years"
    },
    { 
      id: 13, 
      name: "Node.JS", 
      image: node,
      description: "Server-side JavaScript runtime for building fast, scalable network applications. Event-driven, non-blocking I/O.",
      tags: ["Async", "Scalable"],
      projects: ["API Servers", "Real-time Apps"],
      experience: "2+ years"
    },
    { 
      id: 14, 
      name: "Express.JS", 
      image: express,
      description: "Minimalist web framework for Node.js. Building RESTful APIs, middleware, and server-side applications.",
      tags: ["REST", "Middleware"],
      projects: ["Backend APIs", "Microservices"],
      experience: "2+ years"
    },
    { 
      id: 15, 
      name: "Flask", 
      image: flask,
      description: "Lightweight Python web framework for quick API development. Flexible and easy to extend with extensions.",
      tags: ["Lightweight", "API"],
      projects: ["Microservices", "Prototypes"],
      experience: "2+ years"
    },
    { 
      id: 16, 
      name: "FastAPI", 
      image: fastapi,
      description: "Modern, fast Python web framework for building APIs with automatic interactive documentation and type hints.",
      tags: ["Async", "Fast", "Type Hints"],
      projects: ["REST APIs", "Microservices"],
      experience: "1+ year"
    },
  ],
  Database: [
    { 
      id: 6, 
      name: "MySQL", 
      image: mysql,
      description: "Relational database management, complex queries, indexing, and database optimization. ACID transactions.",
      tags: ["SQL", "Relational"],
      projects: ["E-commerce", "User Systems"],
      experience: "2+ years"
    },
    { 
      id: 9, 
      name: "MongoDB", 
      image: mongo,
      description: "NoSQL document database for flexible, scalable data storage. Aggregation pipelines and schema design.",
      tags: ["NoSQL", "Document"],
      projects: ["Real-time Apps", "Analytics"],
      experience: "2+ years"
    },
    { 
      id: 10, 
      name: "PostgreSQL", 
      image: postgresql,
      description: "Advanced open-source relational database with robust features, JSONB support, and full ACID compliance.",
      tags: ["SQL", "JSONB", "ACID"],
      projects: ["Enterprise Apps", "Data Analytics"],
      experience: "2+ years"
    },
  ],
  Languages: [
    { 
      id: 4, 
      name: "C Programming", 
      image: c,
      description: "System-level programming, memory management, pointers, and data structures. Foundation of computer science.",
      tags: ["System", "Memory"],
      projects: ["Algorithms", "Data Structures"],
      experience: "3+ years"
    },
    { 
      id: 5, 
      name: "Java", 
      image: java,
      description: "Object-oriented programming, design patterns, multithreading, and enterprise application development.",
      tags: ["OOP", "Enterprise"],
      projects: ["Desktop Apps", "Backend Systems"],
      experience: "2+ years"
    },
  ],
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="relative bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white py-24" id="skills" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-extrabold mb-4">
            My <span className="text-primary-600 dark:text-primary-500">Skillset</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-500 mx-auto rounded-full" />
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">Technologies I work with</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {Object.keys(skillsData).map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid - Interactive Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData[activeCategory].map((skill, index) => (
            <InteractiveSkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>
        
        {/* Hint for mobile users */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          💡 Hover or tap cards to reveal detailed information
        </motion.p>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-slate-600 dark:text-gray-400 text-lg mb-6 font-semibold">
            Additional expertise & practices
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-lg text-sm font-semibold text-slate-900 dark:text-white hover:border-primary-500 transition-colors">Agile Methodology</span>
            <span className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-lg text-sm font-semibold text-slate-900 dark:text-white hover:border-primary-500 transition-colors">RESTful APIs</span>
            <span className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-lg text-sm font-semibold text-slate-900 dark:text-white hover:border-primary-500 transition-colors">Docker</span>
            <span className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-lg text-sm font-semibold text-slate-900 dark:text-white hover:border-primary-500 transition-colors">CI/CD</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
