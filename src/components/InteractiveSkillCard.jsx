import { motion } from 'framer-motion';
import { useState } from 'react';

export default function InteractiveSkillCard({ skill, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
      }}
      className="relative h-64 cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.34, 1.56, 0.64, 1]
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-slate-300 dark:border-primary-500/30 flex flex-col items-center justify-center gap-4 shadow-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-20 h-20 flex items-center justify-center">
            {skill.image ? (
              <img src={skill.image} alt={skill.name} className="w-full h-full object-contain" />
            ) : (
              <span className="text-6xl">{skill.icon}</span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{skill.name}</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {skill.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-slate-200 dark:bg-primary-500/20 text-slate-700 dark:text-primary-300 rounded-full text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 animate-pulse">
            Click to explore →
          </p>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl border-2 border-primary-400"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-3">{skill.name}</h3>
            <p className="text-sm text-gray-100 leading-relaxed">
              {skill.description}
            </p>
          </div>
          
          {skill.projects && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-200 mb-2">Used in:</p>
              <div className="flex flex-wrap gap-2">
                {skill.projects.map((project, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white/20 text-white rounded-lg text-xs"
                  >
                    {project}
                  </span>
                ))}
              </div>
            </div>
          )}

          {skill.experience && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <p className="text-xs text-gray-200">
                <span className="font-semibold">Experience:</span> {skill.experience}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
