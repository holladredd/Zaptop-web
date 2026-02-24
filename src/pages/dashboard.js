import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import { 
  AiOutlineWifi, 
  AiOutlinePhone, 
  AiOutlinePlayCircle,
  AiOutlineFileText
} from 'react-icons/ai';
import { BsLightningCharge } from 'react-icons/bs';

const quickActions = [
  { 
    title: 'Buy Data', 
    description: 'Purchase mobile data',
    icon: AiOutlineWifi, 
    href: '/buy-data',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  { 
    title: 'Buy Airtime', 
    description: 'Top up your phone',
    icon: AiOutlinePhone, 
    href: '/buy-airtime',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    textColor: 'text-emerald-600 dark:text-emerald-400'
  },
  { 
    title: 'Complete Tasks', 
    description: 'Earn more points',
    icon: AiOutlinePlayCircle, 
    href: '/tasks',
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    textColor: 'text-indigo-600 dark:text-indigo-400'
  },
  { 
    title: 'Pay Bills', 
    description: 'Utilities & services',
    icon: AiOutlineFileText, 
    href: '/bills',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400'
  },
];

const recentActivity = [
  { type: 'debit', title: 'MTN Airtime Purchase', amount: '₦500', date: 'Today, 10:23 AM', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
  { type: 'credit', title: 'Video Task Completed', amount: '+100 pts', date: 'Today, 9:15 AM', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { type: 'debit', title: 'Airtel Data Purchase', amount: '₦1,000', date: 'Yesterday, 4:30 PM', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
  { type: 'credit', title: 'Survey Task Completed', amount: '+200 pts', date: 'Yesterday, 2:00 PM', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <ProtectedRoute>
      <Layout title="Dashboard">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Welcome Banner */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800 rounded-2xl p-6 lg:p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="text-indigo-100 text-sm mb-1">Welcome back,</p>
                <h2 className="text-2xl lg:text-3xl font-bold">{currentUser?.name || 'John Doe'}</h2>
                <p className="text-indigo-100 mt-2">Here's what's happening with your account today.</p>
              </div>
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">{currentUser?.points || 1250}</p>
                  <p className="text-indigo-100 text-sm">Available Points</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold">₦12.5k</p>
                  <p className="text-indigo-100 text-sm">Total Spent</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Grid */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div key={action.title} variants={itemVariants} custom={index}>
                  <Link 
                    href={action.href}
                    className="group block bg-white dark:bg-slate-800 rounded-xl p-4 lg:p-6 shadow-card dark:shadow-none dark:border dark:border-slate-700 hover:shadow-soft transition-all hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 ${action.lightColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className={`w-6 h-6 ${action.textColor}`} />
                    </div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-1">{action.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{action.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Activity List */}
            <motion.div variants={itemVariants} className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Activity</h3>
                <Link href="/history" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <div className={`w-11 h-11 ${activity.bg} rounded-xl flex items-center justify-center`}>
                      <BsLightningCharge className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-slate-800 dark:text-white">{activity.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{activity.date}</p>
                    </div>
                    <span className={`font-semibold ${activity.color}`}>{activity.amount}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">This Month</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Tasks Completed</span>
                    <span className="font-bold text-slate-800 dark:text-white">24</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-indigo-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Points Earned</span>
                    <span className="font-bold text-slate-800 dark:text-white">2,450</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-emerald-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Bills Paid</span>
                    <span className="font-bold text-slate-800 dark:text-white">8</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-blue-500 rounded-full" />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                <Link 
                  href="/tasks" 
                  className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                >
                  <span className="flex items-center justify-center">
                    <span className="text-yellow-500 text-xs -mt-0.5 -mr-0.5">-</span>
                    <span className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">Z</span>
                    <span className="text-yellow-500 text-xs -mb-0.5 -ml-0.5">-</span>
                  </span>
                  Earn More Points
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
