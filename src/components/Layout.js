import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  AiOutlineHome, 
  AiOutlineFileText, 
  AiOutlineHistory, 
  AiOutlineUser 
} from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';

const ZapLogo = ({ isActive }) => (
  <div className="flex items-center justify-center">
    <span className="text-yellow-300 text-xs -mt-1 -mr-0.5">-</span>
    <span className={`${isActive ? 'text-white' : 'text-indigo-700'} text-lg font-bold`}>Z</span>
    <span className="text-yellow-300 text-xs -mb-1 -ml-0.5">-</span>
  </div>
);

export default function Layout({ children }) {
  const router = useRouter();
  const { currentUser } = useAuth();

  const navItems = [
    { name: 'Home', href: '/dashboard', icon: AiOutlineHome },
    { name: 'Bills', href: '/bills', icon: AiOutlineFileText },
    { name: 'Tasks', href: '/tasks', icon: null, isSpecial: true },
    { name: 'History', href: '/history', icon: AiOutlineHistory },
    { name: 'Profile', href: '/profile', icon: AiOutlineUser },
  ];

  const isActive = (href) => router.pathname === href;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Bottom Navigation */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50"
      >
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg ${
                isActive(item.href) ? 'text-indigo-700' : 'text-gray-400'
              }`}
            >
              {item.isSpecial ? (
                <div className={`w-12 h-12 rounded-full flex items-center justify-center -mt-6 border-4 border-gray-50 shadow-lg ${
                  isActive(item.href) ? 'bg-indigo-700' : 'bg-white'
                }`}>
                  <ZapLogo isActive={isActive(item.href)} />
                </div>
              ) : (
                <>
                  <item.icon size={24} />
                  <span className="text-xs mt-1">{item.name}</span>
                </>
              )}
            </Link>
          ))}
        </div>
      </motion.nav>
    </div>
  );
}
