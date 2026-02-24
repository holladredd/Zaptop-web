import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMoon,
  AiOutlineSun,
} from "react-icons/ai";
import { useTheme } from "@/context/ThemeContext";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData.name, formData.email, formData.phone, formData.password);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Dark Mode Toggle - Fixed */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
      >
        {darkMode ? (
          <AiOutlineSun className="w-6 h-6" />
        ) : (
          <AiOutlineMoon className="w-6 h-6" />
        )}
      </button>
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-700 dark:to-indigo-900 items-center justify-center p-12">
        {" "}
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
          <h1 className="text-4xl font-bold mb-4">Join ZapTop</h1>
          <p className="text-xl text-primary-100 max-w-md">
            Start earning points and managing your bills today.
          </p>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md py-8"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl">
              <span className="text-yellow-300 text-lg -mt-0.5 -mr-0.5">-</span>
              <span className="text-white text-2xl font-bold">Z</span>
              <span className="text-yellow-300 text-lg -mb-0.5 -ml-0.5">-</span>
            </div>
            <span className="text-2xl font-bold text-slate-800 dark:text-white">
              ZapTop
            </span>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft dark:shadow-none dark:border dark:border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Fill in your details to get started.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <AiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <AiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="08012345678"
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Create a password"
                    className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="w-5 h-5" />
                    ) : (
                      <AiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary-600 text-white font-semibold py-3 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
              >
                Create Account
              </motion.button>
            </form>

            <p className="mt-6 text-center text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
