import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData.name, formData.email, formData.phone, formData.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-indigo-600 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-indigo-200 mb-8">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <AiOutlineUser className="absolute left-0 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Full Name"
              className="w-full bg-transparent border-b border-indigo-300 text-white placeholder-indigo-300 py-3 pl-8 focus:outline-none focus:border-yellow-300"
              required
            />
          </div>

          <div className="relative">
            <AiOutlineMail className="absolute left-0 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Email"
              className="w-full bg-transparent border-b border-indigo-300 text-white placeholder-indigo-300 py-3 pl-8 focus:outline-none focus:border-yellow-300"
              required
            />
          </div>

          <div className="relative">
            <AiOutlinePhone className="absolute left-0 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Phone Number"
              className="w-full bg-transparent border-b border-indigo-300 text-white placeholder-indigo-300 py-3 pl-8 focus:outline-none focus:border-yellow-300"
              required
            />
          </div>

          <div className="relative">
            <AiOutlineLock className="absolute left-0 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
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
            Sign Up
          </motion.button>
        </form>

        <p className="mt-6 text-center text-white">
          Already have an account?{' '}
          <Link href="/login" className="text-yellow-300 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
