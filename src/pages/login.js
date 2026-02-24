import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineSun, AiOutlineMoon } from 'react-icons/ai';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors duration-300">
      {/* Dark Mode Toggle - Fixed */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
      >
        {darkMode ? <AiOutlineSun className="w-6 h-6" /> : <AiOutlineMoon className="w-6 h-6" />}
      </button>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-700 dark:to-indigo-900 items-center justify-center p-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl">
              <span className="text-yellow-300 text-2xl -mt-1 -mr-1">-</span>
              <span className="text-white text-4xl font-bold">Z</span>
              <span className="text-yellow-300 text-2xl -mb-1 -ml-1">-</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to ZapTop</h1>
          <p className="text-xl text-indigo-100 max-w-md">
            Earn points, pay bills, and manage your digital life in one place.
          </p>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl">
              <span className="text-yellow-300 text-lg -mt-0.5 -mr-0.5">-</span>
              <span className="text-white text-2xl font-bold">Z</span>
              <span className="text-yellow-300 text-lg -mb-0.5 -ml-0.5">-</span>
            </div>
            <span className="text-2xl font-bold text-slate-800 dark:text-white">ZapTop</span>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft dark:shadow-none dark:border dark:border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Sign In</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Welcome back! Please enter your details.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? <AiOutlineEyeInvisible className="w-5 h-5" /> : <AiOutlineEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500" />
                  Remember me
                </label>
                <Link href="#" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium">
                  Forgot password?
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
              >
                Sign In
              </motion.button>
            </form>

            <p className="mt-6 text-center text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
