import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Animated counter component
function useCounter(end, duration = 1500, start = 0) {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    if (end === start) return;
    
    let startTime;
    let animationFrame;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * (end - start) + start));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);
  
  return count;
}

export default function AnimatedStatCard({ stat, index, inView }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Extract number from stat.value (e.g., "2+" -> 2, "15+" -> 15)
  const numValue = parseInt(stat.value);
  const suffix = stat.value.replace(numValue.toString(), '');
  
  // Start counting when in view and hasn't animated yet
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);
  
  const displayCount = useCounter(hasAnimated ? numValue : 0, 1500);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
      transition={{ 
        delay: 0.6 + index * 0.1,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl text-center group hover:shadow-2xl hover:shadow-primary-500/20 hover:border-primary-500/50 border border-slate-300 dark:border-slate-700 transition-all duration-300"
    >
      <motion.div 
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 mb-4"
        whileHover={{ 
          scale: 1.1, 
          rotate: 360,
          transition: { duration: 0.6 }
        }}
      >
        <div className="text-white">{stat.icon}</div>
      </motion.div>
      <motion.h3 
        className="text-4xl font-bold mb-2 text-primary-600 dark:text-primary-400"
        key={displayCount}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {displayCount}{suffix}
      </motion.h3>
      <p className="text-slate-600 dark:text-gray-400 font-medium">{stat.label}</p>
      <motion.div
        className="mt-3 h-1 bg-primary-500/0 group-hover:bg-primary-500 rounded-full transition-all duration-300"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
      />
    </motion.div>
  );
}
