import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { AiOutlinePlayCircle, AiOutlineCheckCircle, AiOutlineLeft } from 'react-icons/ai';
import Swal from 'sweetalert2';

const videoTasks = [
  { id: 1, title: 'Watch Product Ad', description: '30 seconds advertisement', points: 100, duration: '30s' },
  { id: 2, title: 'Gaming Trailer', description: 'Watch new game trailer', points: 150, duration: '1m' },
  { id: 3, title: 'App Tutorial', description: 'Learn new app features', points: 200, duration: '2m' },
  { id: 4, title: 'Premium Video', description: 'Watch premium content', points: 300, duration: '3m' },
];

const ZapLogo = () => (
  <div className="flex items-center justify-center">
    <span className="text-yellow-300 text-xs -mt-1 -mr-0.5">-</span>
    <span className="text-white text-lg font-bold">Z</span>
    <span className="text-yellow-300 text-xs -mb-1 -ml-0.5">-</span>
  </div>
);

export default function VideoTasks() {
  const [userPoints, setUserPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleWatch = async (task) => {
    await Swal.fire({
      title: 'Watching Video...',
      html: `Please watch the video to earn ${task.points} points`,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      willOpen: () => Swal.showLoading(),
    });

    setUserPoints(prev => prev + task.points);
    setCompletedTasks(prev => [...prev, task.id]);

    Swal.fire({
      icon: 'success',
      title: 'Task Completed!',
      text: `You earned ${task.points} points!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-white pb-20">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-800 to-indigo-600 rounded-b-3xl p-5 pt-8">
            <div className="flex items-center justify-between mb-4">
              <Link href="/tasks" className="text-white p-2 -ml-2">
                <AiOutlineLeft size={24} />
              </Link>
              <h1 className="text-xl font-bold text-white">Video Tasks</h1>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                <ZapLogo />
                <span className="text-white font-bold">{userPoints}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-4 mt-4">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-gray-100 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-indigo-700">{completedTasks.length}</p>
                <p className="text-gray-500 text-sm">Completed</p>
              </div>
              <div className="flex-1 bg-gray-100 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-indigo-700">{videoTasks.length - completedTasks.length}</p>
                <p className="text-gray-500 text-sm">Available</p>
              </div>
            </div>

            {/* Tasks */}
            <h2 className="font-bold text-lg text-gray-900 mb-4">Available Videos</h2>
            <div className="space-y-3">
              {videoTasks.map((task) => {
                const isCompleted = completedTasks.includes(task.id);
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-gray-100 rounded-xl p-4 ${isCompleted ? 'opacity-70' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <AiOutlinePlayCircle className={`w-6 h-6 ${isCompleted ? 'text-gray-400' : 'text-indigo-700'}`} />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-bold text-gray-900">{task.title}</h3>
                        <p className="text-gray-500 text-sm">{task.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-indigo-700">+{task.points}</p>
                        <p className="text-xs text-gray-400">{task.duration}</p>
                      </div>
                    </div>

                    {!isCompleted ? (
                      <button
                        onClick={() => handleWatch(task)}
                        className="w-full mt-4 bg-indigo-700 text-white py-3 rounded-xl font-medium hover:bg-indigo-800 transition-colors"
                      >
                        Watch & Earn
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 mt-4 text-green-500">
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
