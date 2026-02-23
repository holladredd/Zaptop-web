import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { AiOutlineBulb, AiOutlineWifi, AiOutlineTv, AiOutlineCreditCard } from 'react-icons/ai';

const billCategories = [
  { title: 'Electricity', description: 'Pay power bills', icon: AiOutlineBulb, color: 'bg-yellow-500' },
  { title: 'Internet', description: 'Broadband bills', icon: AiOutlineWifi, color: 'bg-blue-500' },
  { title: 'Cable TV', description: 'DSTV, GOTV, etc', icon: AiOutlineTv, color: 'bg-red-500' },
  { title: 'Credit Card', description: 'Card payments', icon: AiOutlineCreditCard, color: 'bg-green-500' },
];

const recentBills = [
  { title: 'IKEDC', date: 'Due Today', amount: '5,000', icon: AiOutlineBulb, color: 'bg-yellow-500' },
  { title: 'Spectranet', date: 'Due Tomorrow', amount: '12,000', icon: AiOutlineWifi, color: 'bg-blue-500' },
];

export default function Bills() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-gray-50 pb-20">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-800 to-indigo-600 rounded-b-3xl p-5 pt-8 pb-12">
            <h1 className="text-2xl font-bold text-white">Bills & Utilities</h1>
          </div>

          <div className="px-4 -mt-6">
            {/* Categories */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {billCategories.map((category, index) => (
                <motion.button
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-4 shadow-lg text-left hover:shadow-xl transition-shadow"
                >
                  <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mb-3`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{category.title}</h3>
                  <p className="text-xs text-gray-500">{category.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Recent Bills */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Recent Bills</h2>
              <div className="space-y-3">
                {recentBills.map((bill, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <div className={`w-11 h-11 ${bill.color} rounded-xl flex items-center justify-center`}>
                      <bill.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-gray-900">{bill.title}</p>
                      <p className="text-sm text-gray-500">{bill.date}</p>
                    </div>
                    <span className="font-bold text-gray-900">₦{bill.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
