import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { AiOutlinePlayCircle, AiOutlineForm, AiOutlineMobile, AiOutlineShareAlt, AiOutlineRight } from 'react-icons/ai';

const taskCategories = [
  {
    id: 1,
    title: 'Video Tasks',
    description: 'Watch videos to earn points',
    icon: AiOutlinePlayCircle,
    href: '/tasks/video',
    color: 'bg-indigo-700',
  },
  {
    id: 2,
    title: 'Survey Tasks',
    description: 'Complete surveys for rewards',
    icon: AiOutlineForm,
    href: '/tasks/survey',
    color: 'bg-green-500',
  },
  {
    id: 3,
    title: 'App Tasks',
    description: 'Download and try new apps',
    icon: AiOutlineMobile,
    href: '/tasks/app',
    color: 'bg-yellow-500',
  },
  {
    id: 4,
    title: 'Social Tasks',
    description: 'Share and engage for points',
    icon: AiOutlineShareAlt,
    href: '/tasks/social',
    color: 'bg-pink-500',
  },
];

export default function Tasks() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-white pb-20">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-800 to-indigo-600 rounded-b-3xl p-5 pt-8 pb-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Available Tasks</h1>
              <p className="text-indigo-200">Complete tasks to earn Zap Points</p>
            </div>
          </div>

          {/* Task Categories */}
          <div className="px-4 -mt-6">
            <div className="space-y-4">
              {taskCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={category.href}
                    className="flex items-center bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition-colors"
                  >
                    <div className={`w-14 h-14 ${category.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <category.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{category.title}</h3>
                      <p className="text-gray-500 text-sm">{category.description}</p>
                    </div>
                    <AiOutlineRight className="w-5 h-5 text-gray-400" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
