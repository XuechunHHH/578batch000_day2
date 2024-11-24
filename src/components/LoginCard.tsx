import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const LoginCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup, loginAsGuest, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await signup(username, password);
      }
    } catch (err) {
      // Error is handled in the store
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-cyan-500/20 shadow-2xl"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-cyan-500">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-cyan-500/50" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/30 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
              placeholder="Username"
              required
              minLength={3}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-cyan-500/50" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/30 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
              placeholder="Password"
              required
              minLength={6}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLogin ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-cyan-500/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black/40 text-cyan-500/50">or</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => loginAsGuest()}
          className="w-full py-3 bg-transparent border border-cyan-500/50 hover:border-cyan-500 text-cyan-500 font-semibold rounded-lg transition-colors"
        >
          Continue as Guest
        </button>
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            clearError();
          }}
          className="w-full text-cyan-500/70 hover:text-cyan-500 transition-colors text-sm"
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </button>
      </form>
    </motion.div>
  );
};