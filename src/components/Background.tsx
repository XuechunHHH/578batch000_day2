import { motion } from 'framer-motion';

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030012]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,236,255,0.08),rgba(0,0,0,0.2))]" />
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[linear-gradient(0deg,transparent_0%,rgba(0,236,255,0.05)_100%)]" />
      </div>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-[#00fff2]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030012] via-transparent to-transparent" />
    </div>
  );
};