import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCalendar, FiAward } from "react-icons/fi";
import dbit from "../assets/DBIT.jpeg";
import jgm from "../assets/jgm.png";
import svv from "../assets/svv.jpg";

const educationData = [
  {
    logo: dbit,
    duration: "2023 - 2027",
    title: "Don Bosco Institute of Technology",
    subtitle: "B.E. in Information Technology",
    details: ["CGPA: 9.00 (Avg. till 3rd sem)"],
    color: "from-primary-400 to-primary-600"
  },
  {
    logo: jgm,
    duration: "2021 - 2023",
    title: "J. G. M College of Science",
    subtitle: "HSC (12th)",
    details: ["Result: 69.00%"],
    color: "from-accent-400 to-accent-600"
  },
  {
    logo: svv,
    duration: "2010 - 2020",
    title: "Swami Vivekanand Vidyamandir School",
    subtitle: "SSC (10th)",
    details: ["Scored 89.90% overall"],
    color: "from-blue-400 to-blue-600"
  },
];

const Education = () => {
  const { ref: eduRef, inView: eduInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      id="education"
      ref={eduRef}
      className="relative bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-24 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 dark:bg-primary-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: eduInView ? 1 : 0, y: eduInView ? 0 : -20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-extrabold mb-4">
            Educational <span className="text-primary-600 dark:text-primary-500">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 text-lg">My academic background</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 opacity-30 hidden md:block" />

          <div className="space-y-16">
            {educationData.map((edu, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  animate={{
                    opacity: eduInView ? 1 : 0,
                    x: eduInView ? 0 : isLeft ? -100 : 100,
                  }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={`flex flex-col md:flex-row items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Content Card */}
                    <motion.div
                      className="w-full md:w-5/12"
                      whileHover={{ scale: 1.03, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-300 dark:border-white/10">
                        {/* Duration Badge */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${edu.color} flex items-center justify-center`}>
                            <FiCalendar size={20} className="text-white" />
                          </div>
                          <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">{edu.duration}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold mb-2 text-primary-600 dark:text-primary-400">
                          {edu.title}
                        </h3>

                        {/* Subtitle */}
                        <div className="flex items-center gap-2 mb-4">
                          <FiAward className="text-primary-600 dark:text-accent-400" />
                          <p className="font-semibold text-slate-700 dark:text-gray-300">{edu.subtitle}</p>
                        </div>

                        {/* Details */}
                        <ul className="space-y-2">
                          {edu.details.map((item, idx) => (
                            <li key={idx} className="text-slate-600 dark:text-gray-400 flex items-start gap-2">
                              <span className="text-primary-600 dark:text-primary-400 mt-1">▸</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Center Logo */}
                    <motion.div
                      className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative z-10"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{
                        scale: eduInView ? 1 : 0,
                        rotate: eduInView ? 0 : -180,
                      }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${edu.color} rounded-full blur-xl opacity-50 animate-pulse`} />
                      <div className="relative w-full h-full rounded-full bg-white p-1 shadow-2xl">
                        <img
                          src={edu.logo}
                          alt={`${edu.title} logo`}
                          className="w-full h-full object-contain rounded-full"
                        />
                      </div>
                    </motion.div>

                    {/* Spacer for alignment */}
                    <div className="hidden md:block w-5/12" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
