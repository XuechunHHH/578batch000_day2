import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Background } from '../components/Background';
import { LoginCard } from '../components/LoginCard';
import { useAuthStore } from '../store/authStore';

export const Login = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <Background />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold text-cyan-500 flex flex-col items-center"
        >
          <motion.div
            animate={{
              textShadow: [
                "0 0 20px rgba(0,255,255,0.5)",
                "0 0 40px rgba(0,255,255,0.5)",
                "0 0 20px rgba(0,255,255,0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CryptoBoard
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-4"
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <LoginCard />
      </motion.div>
    </div>
  );
};