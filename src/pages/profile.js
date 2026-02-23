import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import { AiOutlineEdit, AiOutlineSecurityScan, AiOutlineQuestionCircle, AiOutlineLogout, AiOutlineWallet } from 'react-icons/ai';

const quickActions = [
  { title: 'Edit Profile', icon: AiOutlineEdit, href: '/edit-profile' },
  { title: 'Security', icon: AiOutlineSecurityScan, href: '/security' },
  { title: 'Support', icon: AiOutlineQuestionCircle, href: '/support' },
];

const ZapLogo = () => (
  <div className="flex items-center justify-center">
    <span className="text-yellow-400 text-sm -mt-1 -mr-0.5">-</span>
    <span className="text-indigo-700 text-xl font-bold">Z</span>
    <span className="text-yellow-400 text-sm -mb-1 -ml-0.5">-</span>
  </div>
);

export default function Profile() {
  const { currentUser, logout } = useAuth();

  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-gray-50 pb-20">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-800 to-indigo-600 rounded-b-3xl p-5 pt-12 pb-8">
            <div className="flex flex-col items-center">
              <Image
                src={currentUser?.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg'}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full border-4 border-white/30 mb-4"
              />
              <h1 className="text-2xl font-bold text-white">{currentUser?.name || 'John Doe'}</h1>
              <p className="text-indigo-200">{currentUser?.email || 'johndoe@example.com'}</p>
            </div>
          </div>

          <div className="px-4 -mt-4">
            {/* Points Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-2xl p-6 shadow-lg mb-6 text-center"
            >
              <p className="text-gray-500 mb-2">Zap Points</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <ZapLogo />
                <span className="text-3xl font-bold text-gray-900">{currentUser?.points || 1250}</span>
              </div>
              <button className="flex items-center justify-center gap-2 bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium w-full hover:bg-indigo-800 transition-colors">
                <AiOutlineWallet className="w-5 h-5" />
                Top Up Zap
              </button>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="bg-white rounded-xl p-4 shadow-lg flex flex-col items-center hover:shadow-xl transition-shadow"
                >
                  <action.icon className="w-6 h-6 text-indigo-700 mb-2" />
                  <span className="text-xs font-medium text-gray-900 text-center">{action.title}</span>
                </Link>
              ))}
            </div>

            {/* Settings */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-500 text-sm uppercase">Settings</h3>
              </div>
              {['Notifications', 'Privacy', 'Language'].map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{item}</span>
                  <AiOutlineEdit className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </motion.div>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 p-4 rounded-xl font-medium hover:bg-red-100 transition-colors"
            >
              <AiOutlineLogout className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
