import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { AiOutlinePlayCircle, AiOutlineForm, AiOutlineMobile, AiOutlineShareAlt, AiOutlineArrowRight } from 'react-icons/ai';

const taskCategories = [
  {
    id: 1,
    title: 'Video Tasks',
    description: 'Watch videos to earn points',
    icon: AiOutlinePlayCircle,
    href: '/tasks/video',
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    points: '100-300 pts',
  },
  {
    id: 2,
    title: 'Survey Tasks',
    description: 'Complete surveys for rewards',
    icon: AiOutlineForm,
    href: '/tasks/survey',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    points: '200-500 pts',
  },
  {
    id: 3,
    title: 'App Tasks',
    description: 'Download and try new apps',
    icon: AiOutlineMobile,
    href: '/tasks/app',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    points: '600-1500 pts',
  },
  {
    id: 4,
    title: 'Social Tasks',
    description: 'Share and engage for points',
    icon: AiOutlineShareAlt,
    href: '/tasks/social',
    color: 'bg-pink-500',
    lightColor: 'bg-pink-50',
    points: '150-500 pts',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Tasks() {
  return (
    <ProtectedRoute>
      <Layout title="Tasks">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Available Tasks</h2>
              <p className="text-slate-500 mt-1">Choose a category to start earning points</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
              <span className="flex items-center justify-center">
                <span className="text-yellow-500 text-xs -mt-0.5 -mr-0.5">-</span>
                <span className="text-primary-600 text-sm font-bold">Z</span>
                <span className="text-yellow-500 text-xs -mb-0.5 -ml-0.5">-</span>
              </span>
              <span className="font-bold text-primary-700">1,250 points available</span>
            </div>
          </div>

          {/* Task Categories Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {taskCategories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link 
                  href={category.href}
                  className="group flex items-center gap-4 bg-white rounded-xl p-6 shadow-card hover:shadow-soft transition-all hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 ${category.lightColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <category.icon className={`w-8 h-8 ${category.color.replace('bg-', 'text-').replace('500', '600')}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 group-hover:text-primary-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">{category.description}</p>
                    <p className="text-sm font-medium text-primary-600 mt-2">{category.points}</p>
                  </div>
                  <div className={`w-10 h-10 ${category.lightColor} rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors`}>
                    <AiOutlineArrowRight className={`w-5 h-5 ${category.color.replace('bg-', 'text-').replace('500', '600')} group-hover:text-white transition-colors`} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Info Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-xl p-6 border border-primary-100"
          >
            <h3 className="font-semibold text-primary-800 mb-2">💡 Pro Tip</h3>
            <p className="text-primary-700 text-sm">
              Complete tasks daily to maximize your earnings. Video tasks are quick and easy, 
              while app tasks offer the highest rewards!
            </p>
          </motion.div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
