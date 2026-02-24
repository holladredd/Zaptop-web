import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import { 
  AiOutlineEdit, 
  AiOutlineSecurityScan, 
  AiOutlineQuestionCircle,
  AiOutlineLogout,
  AiOutlineWallet,
  AiOutlineGlobal,
  AiOutlineRight
} from 'react-icons/ai';
import Swal from 'sweetalert2';

const menuItems = [
  { title: 'Edit Profile', description: 'Update your personal information', icon: AiOutlineEdit, href: '/edit-profile', color: 'bg-blue-500' },
  { title: 'Security', description: 'Password, 2FA, and security settings', icon: AiOutlineSecurityScan, href: '/security', color: 'bg-emerald-500' },
  { title: 'Support', description: 'Get help and contact us', icon: AiOutlineQuestionCircle, href: '/support', color: 'bg-purple-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Profile() {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      confirmButtonColor: '#4f46e5',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <ProtectedRoute>
      <Layout title="Profile">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 max-w-4xl mx-auto"
        >
          {/* Profile Header Card */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative">
                <img 
                  src={currentUser?.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg'} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 dark:border-indigo-900"
                />
                <Link 
                  href="/edit-profile"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors"
                >
                  <AiOutlineEdit className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{currentUser?.name || 'John Doe'}</h2>
                <p className="text-slate-500 dark:text-slate-400">{currentUser?.email || 'johndoe@example.com'}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-medium">
                    {currentUser?.points || 1250} points
                  </span>
                  <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
                    Verified
                  </span>
                </div>
              </div>
              <Link 
                href="/edit-profile"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Edit Profile
              </Link>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6 text-center">
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{currentUser?.points || 1250}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Total Points</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6 text-center">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">48</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Tasks Done</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6 text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">12</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Bills Paid</p>
            </div>
          </motion.div>

          {/* Menu Items */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-semibold text-slate-800 dark:text-white">Settings</h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                >
                  <div className={`w-12 h-12 ${item.color.replace('bg-', 'bg-opacity-10 bg-')} dark:bg-opacity-20 rounded-xl flex items-center justify-center`}>
                    <item.icon className={`w-6 h-6 ${item.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                  </div>
                  <AiOutlineRight className="w-5 h-5 text-slate-400" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Language Preference */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Preferences</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AiOutlineGlobal className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <span className="text-slate-700 dark:text-slate-300">Language</span>
              </div>
              <span className="text-slate-500 dark:text-slate-400">English</span>
            </div>
          </motion.div>

          {/* Logout Button */}
          <motion.button
            variants={itemVariants}
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <AiOutlineLogout className="w-5 h-5" />
            Logout
          </motion.button>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
