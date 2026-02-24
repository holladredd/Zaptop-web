import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { AiOutlinePlayCircle, AiOutlineCheckCircle, AiOutlineArrowLeft, AiOutlineClock } from 'react-icons/ai';
import Swal from 'sweetalert2';

const videoTasks = [
  { id: 1, title: 'Product Advertisement', description: 'Watch a 30-second product ad', points: 100, duration: '30s', thumbnail: 'bg-blue-500' },
  { id: 2, title: 'Gaming Trailer', description: 'New game release trailer', points: 150, duration: '1m', thumbnail: 'bg-purple-500' },
  { id: 3, title: 'App Tutorial', description: 'Learn how to use new features', points: 200, duration: '2m', thumbnail: 'bg-emerald-500' },
  { id: 4, title: 'Tech Review', description: 'Latest gadget review', points: 250, duration: '3m', thumbnail: 'bg-amber-500' },
  { id: 5, title: 'Movie Trailer', description: 'Upcoming blockbuster preview', points: 300, duration: '2m', thumbnail: 'bg-red-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function VideoTasks() {
  const [userPoints, setUserPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleWatch = async (task) => {
    await Swal.fire({
      title: 'Playing Video...',
      html: `<div class="flex items-center justify-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>`,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2000,
      timerProgressBar: true,
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
      <Layout title="Video Tasks">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header with Back Button */}
          <div className="flex items-center gap-4">
            <Link 
              href="/tasks"
              className="p-2 bg-white rounded-xl shadow-card hover:shadow-soft transition-shadow"
            >
              <AiOutlineArrowLeft className="w-6 h-6 text-slate-600" />
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Video Tasks</h2>
              <p className="text-slate-500">Watch videos and earn points</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white rounded-xl shadow-card p-4">
              <p className="text-sm text-slate-500 mb-1">Earned Today</p>
              <p className="text-2xl font-bold text-emerald-600">+{userPoints} pts</p>
            </div>
            <div className="flex-1 bg-white rounded-xl shadow-card p-4">
              <p className="text-sm text-slate-500 mb-1">Completed</p>
              <p className="text-2xl font-bold text-primary-600">{completedTasks.length}/{videoTasks.length}</p>
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <motion.div
                  key={task.id}
                  variants={itemVariants}
                  className={`bg-white rounded-xl shadow-card overflow-hidden hover:shadow-soft transition-all ${
                    isCompleted ? 'opacity-75' : ''
                  }`}
                >
                  {/* Thumbnail */}
                  <div className={`h-40 ${task.thumbnail} relative flex items-center justify-center`}>
                    <AiOutlinePlayCircle className="w-16 h-16 text-white/80" />
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-sm px-2 py-1 rounded-lg flex items-center gap-1">
                      <AiOutlineClock className="w-4 h-4" />
                      {task.duration}
                    </div>
                    {isCompleted && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="bg-emerald-500 text-white p-3 rounded-full">
                          <AiOutlineCheckCircle className="w-8 h-8" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-800 mb-1">{task.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-bold">+{task.points} points</span>
                      {!isCompleted ? (
                        <button
                          onClick={() => handleWatch(task)}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                        >
                          Watch Now
                        </button>
                      ) : (
                        <span className="text-emerald-600 font-medium text-sm flex items-center gap-1">
                          <AiOutlineCheckCircle className="w-4 h-4" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
