import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-indigo-600 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back!</h1>
        <p className="text-indigo-200 mb-8">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <AiOutlineMail className="absolute left-0 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-transparent border-b border-indigo-300 text-white placeholder-indigo-300 py-3 pl-8 focus:outline-none focus:border-yellow-300"
              required
            />
          </div>

          <div className="relative">
            <AiOutlineLock className="absolute left-0 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent border-b border-indigo-300 text-white placeholder-indigo-300 py-3 pl-8 pr-10 focus:outline-none focus:border-yellow-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-indigo-300"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-yellow-300 text-indigo-800 font-bold py-4 rounded-xl mt-6 hover:bg-yellow-400 transition-colors"
          >
            Sign In
          </motion.button>
        </form>

        <p className="mt-6 text-center text-white">
          Don't have an account?{' '}
          <Link href="/register" className="text-yellow-300 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
