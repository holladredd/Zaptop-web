import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { AiOutlineShareAlt, AiOutlineCheckCircle, AiOutlineLeft } from 'react-icons/ai';
import Swal from 'sweetalert2';

const socialTasks = [
  { id: 1, title: 'Refer Friends', description: 'Invite friends using your code', points: 500 },
  { id: 2, title: 'Share on Facebook', description: 'Share ZapTop on Facebook', points: 200 },
  { id: 3, title: 'Follow on Twitter', description: 'Follow our Twitter handle', points: 150 },
];

const ZapLogo = () => (
  <div className="flex items-center justify-center">
    <span className="text-yellow-300 text-xs -mt-1 -mr-0.5">-</span>
    <span className="text-white text-lg font-bold">Z</span>
    <span className="text-yellow-300 text-xs -mb-1 -ml-0.5">-</span>
  </div>
);

export default function SocialTasks() {
  const [userPoints, setUserPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleShare = async (task) => {
    await Swal.fire({
      title: 'Sharing...',
      timer: 1500,
      showConfirmButton: false,
      willOpen: () => Swal.showLoading(),
    });

    setUserPoints(prev => prev + task.points);
    setCompletedTasks(prev => [...prev, task.id]);

    Swal.fire({
      icon: 'success',
      title: 'Shared Successfully!',
      text: `You earned ${task.points} points!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-white pb-20">
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-b-3xl p-5 pt-8">
            <div className="flex items-center justify-between mb-4">
              <Link href="/tasks" className="text-white p-2 -ml-2">
                <AiOutlineLeft size={24} />
              </Link>
              <h1 className="text-xl font-bold text-white">Social Tasks</h1>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                <ZapLogo />
                <span className="text-white font-bold">{userPoints}</span>
              </div>
            </div>
          </div>

          <div className="px-4 mt-4">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Social Tasks</h2>
            <div className="space-y-3">
              {socialTasks.map((task) => {
                const isCompleted = completedTasks.includes(task.id);
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-gray-100 rounded-xl p-4 ${isCompleted ? 'opacity-70' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                        <AiOutlineShareAlt className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-bold text-gray-900">{task.title}</h3>
                        <p className="text-gray-500 text-sm">{task.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-pink-600">+{task.points}</p>
                      </div>
                    </div>

                    {!isCompleted ? (
                      <button
                        onClick={() => handleShare(task)}
                        className="w-full mt-4 bg-pink-500 text-white py-3 rounded-xl font-medium hover:bg-pink-600 transition-colors"
                      >
                        Share & Earn
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 mt-4 text-pink-600">
                        <AiOutlineCheckCircle className="w-5 h-5" />
                        <span className="font-medium">Completed</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
