import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AiOutlineHome, 
  AiOutlineFileText, 
  AiOutlineHistory, 
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineMoon,
  AiOutlineSun
} from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const ZapLogo = ({ isDark }) => (
  <div className="flex items-center justify-center">
    <span className="text-yellow-400 text-xs -mt-1 -mr-0.5">-</span>
    <span className={`${isDark ? 'text-white' : 'text-indigo-700'} text-lg font-bold`}>Z</span>
    <span className="text-yellow-400 text-xs -mb-1 -ml-0.5">-</span>
  </div>
);

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: AiOutlineHome },
  { name: 'Bills & Utilities', href: '/bills', icon: AiOutlineFileText },
  { name: 'Tasks', href: '/tasks', icon: null, isSpecial: true },
  { name: 'History', href: '/history', icon: AiOutlineHistory },
  { name: 'Profile', href: '/profile', icon: AiOutlineUser },
];

export default function Layout({ children, title }) {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href) => router.pathname === href;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 fixed h-full transition-colors duration-300">
        {/* Logo */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg">
              <span className="text-yellow-300 text-xs -mt-0.5 -mr-0.5">-</span>
              <span className="text-white text-sm font-bold">Z</span>
              <span className="text-yellow-300 text-xs -mb-0.5 -ml-0.5">-</span>
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white">ZapTop</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive(item.href)
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              {item.isSpecial ? (
                <ZapLogo isDark={darkMode} />
              ) : (
                <item.icon className="w-5 h-5" />
              )}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Dark Mode Toggle & User Section */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              {darkMode ? <AiOutlineSun className="w-5 h-5" /> : <AiOutlineMoon className="w-5 h-5" />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}>
              <span className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${darkMode ? 'left-6' : 'left-1'}`} />
            </div>
          </button>

          {/* User */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/30">
            <img 
              src={currentUser?.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg'} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{currentUser?.name || 'John Doe'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser?.points || 1250} points</p>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <AiOutlineLogout className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <div className="flex items-center justify-between p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg">
              <span className="text-yellow-300 text-xs -mt-0.5 -mr-0.5">-</span>
              <span className="text-white text-sm font-bold">Z</span>
              <span className="text-yellow-300 text-xs -mb-0.5 -ml-0.5">-</span>
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-white">ZapTop</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              {darkMode ? <AiOutlineSun className="w-5 h-5" /> : <AiOutlineMoon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <AiOutlineMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-800 z-50 shadow-2xl"
            >
              <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-white">Menu</span>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <AiOutlineClose className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="p-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive(item.href)
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    {item.isSpecial ? <ZapLogo isDark={darkMode} /> : <item.icon className="w-5 h-5" />}
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
                <button
                  onClick={() => { toggleDarkMode(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl"
                >
                  {darkMode ? <AiOutlineSun className="w-5 h-5" /> : <AiOutlineMoon className="w-5 h-5" />}
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button 
                  onClick={() => { setSidebarOpen(false); logout(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                >
                  <AiOutlineLogout className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        {/* Page Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 hidden lg:flex items-center justify-between transition-colors duration-300">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{title}</h1>
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              {darkMode ? <AiOutlineSun className="w-5 h-5" /> : <AiOutlineMoon className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
              <ZapLogo isDark={darkMode} />
              <span className="font-bold text-indigo-700 dark:text-indigo-400">{currentUser?.points || 1250}</span>
              <span className="text-sm text-indigo-600 dark:text-indigo-300">points</span>
            </div>
          </div>
        </header>

        {/* Mobile Title */}
        <div className="lg:hidden px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
          <h1 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h1>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
