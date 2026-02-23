import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import { AiOutlineWifi, AiOutlinePhone } from 'react-icons/ai';
import { BsLightningCharge } from 'react-icons/bs';

const transactions = [
  { id: 1, title: 'MTN Airtime', phone: '08012345678', date: 'Today, 10:23 AM', amount: '500' },
  { id: 2, title: 'Airtel Data', phone: '08087654321', date: 'Yesterday, 4:30 PM', amount: '1000' },
];

const ZapLogo = () => (
  <div className="flex items-center justify-center">
    <span className="text-yellow-300 text-xs -mt-1 -mr-0.5">-</span>
    <span className="text-white text-lg font-bold">Z</span>
    <span className="text-yellow-300 text-xs -mb-1 -ml-0.5">-</span>
  </div>
);

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-gray-50 pb-20">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-800 to-indigo-600 rounded-b-3xl p-5 pt-8 pb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src={currentUser?.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg'}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white/50"
                />
                <div>
                  <p className="text-indigo-200 text-sm">Welcome back</p>
                  <p className="text-white font-bold text-lg">{currentUser?.name || 'John Doe'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl">
                <ZapLogo />
                <span className="text-white font-bold">{currentUser?.points || 1250}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 -mt-6">
            {/* Action Buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-2xl p-4 shadow-lg mb-6"
            >
              <Link 
                href="/tasks"
                className="block w-full bg-gradient-to-r from-indigo-700 to-indigo-600 rounded-xl p-4 mb-4 flex items-center justify-center gap-3"
              >
                <ZapLogo />
                <span className="text-white font-bold text-lg">Earn Zap Points</span>
              </Link>

              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/buy-data"
                  className="flex items-center justify-center gap-2 bg-gray-100 rounded-xl p-3 hover:bg-gray-200 transition-colors"
                >
                  <AiOutlineWifi className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">Buy Data</span>
                </Link>
                <Link 
                  href="/buy-airtime"
                  className="flex items-center justify-center gap-2 bg-gray-100 rounded-xl p-3 hover:bg-gray-200 transition-colors"
                >
                  <AiOutlinePhone className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">Buy Airtime</span>
                </Link>
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg text-gray-900">Recent Transactions</h2>
                <Link href="/history" className="text-indigo-700 text-sm font-medium">
                  See All
                </Link>
              </div>

              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <BsLightningCharge className="w-5 h-5 text-indigo-700" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-gray-900">{tx.title}</p>
                      <p className="text-xs text-gray-500">{tx.phone}</p>
                      <p className="text-xs text-gray-400">{tx.date}</p>
                    </div>
                    <span className="font-bold text-gray-900">₦{tx.amount}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
