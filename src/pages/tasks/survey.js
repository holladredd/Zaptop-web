import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { AiOutlineForm, AiOutlineCheckCircle, AiOutlineLeft } from 'react-icons/ai';
import Swal from 'sweetalert2';

const surveyTasks = [
  { id: 1, title: 'Quick Opinion Poll', description: 'Share your thoughts', points: 200, duration: '2 mins' },
  { id: 2, title: 'Product Research', description: 'Help improve our services', points: 500, duration: '5 mins' },
  { id: 3, title: 'User Experience', description: 'Rate your app experience', points: 300, duration: '3 mins' },
];

const ZapLogo = () => (
  <div className="flex items-center justify-center">
    <span className="text-yellow-300 text-xs -mt-1 -mr-0.5">-</span>
    <span className="text-white text-lg font-bold">Z</span>
    <span className="text-yellow-300 text-xs -mb-1 -ml-0.5">-</span>
  </div>
);

export default function SurveyTasks() {
  const [userPoints, setUserPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleComplete = async (task) => {
    await Swal.fire({
      title: 'Completing Survey...',
      timer: 1500,
      showConfirmButton: false,
      willOpen: () => Swal.showLoading(),
    });

    setUserPoints(prev => prev + task.points);
    setCompletedTasks(prev => [...prev, task.id]);

    Swal.fire({
      icon: 'success',
      title: 'Survey Completed!',
      text: `You earned ${task.points} points!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-white pb-20">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-b-3xl p-5 pt-8">
            <div className="flex items-center justify-between mb-4">
              <Link href="/tasks" className="text-white p-2 -ml-2">
                <AiOutlineLeft size={24} />
              </Link>
              <h1 className="text-xl font-bold text-white">Survey Tasks</h1>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                <ZapLogo />
                <span className="text-white font-bold">{userPoints}</span>
              </div>
            </div>
          </div>

          <div className="px-4 mt-4">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Available Surveys</h2>
            <div className="space-y-3">
              {surveyTasks.map((task) => {
                const isCompleted = completedTasks.includes(task.id);
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-gray-100 rounded-xl p-4 ${isCompleted ? 'opacity-70' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <AiOutlineForm className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-bold text-gray-900">{task.title}</h3>
                        <p className="text-gray-500 text-sm">{task.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+{task.points}</p>
                        <p className="text-xs text-gray-400">{task.duration}</p>
                      </div>
                    </div>

                    {!isCompleted ? (
                      <button
                        onClick={() => handleComplete(task)}
                        className="w-full mt-4 bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600 transition-colors"
                      >
                        Complete Survey
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 mt-4 text-green-600">
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
