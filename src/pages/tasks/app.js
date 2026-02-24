import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import {
  AiOutlineMobile,
  AiOutlineCheckCircle,
  AiOutlineArrowLeft,
  AiOutlineDownload,
  AiOutlineStar,
} from "react-icons/ai";
import Swal from "sweetalert2";

const appTasks = [
  {
    id: 1,
    title: "Game Master Pro",
    description: "Download and reach level 5 in this exciting strategy game",
    points: 1000,
    size: "45MB",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Finance Tracker",
    description: "Manage your expenses with this intuitive finance app",
    points: 800,
    size: "28MB",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Fitness Coach",
    description: "Track workouts and get personalized fitness plans",
    points: 600,
    size: "35MB",
    rating: 4.3,
  },
  {
    id: 4,
    title: "Shopping Rewards",
    description: "Shop and earn cashback rewards",
    points: 1500,
    size: "22MB",
    rating: 4.6,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function AppTasks() {
  const [userPoints, setUserPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleDownload = async (task) => {
    await Swal.fire({
      title: "Downloading App...",
      html: '<div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-amber-500 h-2 rounded-full" style="width: 0%"></div></div>',
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2000,
      timerProgressBar: true,
    });

    setUserPoints((prev) => prev + task.points);
    setCompletedTasks((prev) => [...prev, task.id]);

    Swal.fire({
      icon: "success",
      title: "App Installed!",
      text: `You earned ${task.points} points!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <ProtectedRoute>
      <Layout title="App Tasks">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link
              href="/tasks"
              className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 hover:shadow-soft transition-shadow"
            >
              <AiOutlineArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                App Tasks
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Download apps and complete tasks
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Points Earned
              </p>
              <p className="text-2xl font-bold text-amber-600">+{userPoints}</p>
            </div>
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Apps Installed
              </p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {completedTasks.length}
              </p>
            </div>
          </div>

          {/* App List */}
          <div className="grid md:grid-cols-2 gap-6">
            {appTasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <motion.div
                  key={task.id}
                  variants={itemVariants}
                  className={`bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6 hover:shadow-soft transition-all ${
                    isCompleted ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <AiOutlineMobile className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-white text-lg">
                            {task.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                            <span className="flex items-center gap-1">
                              <AiOutlineStar className="w-4 h-4 text-amber-500" />
                              {task.rating}
                            </span>
                            <span>{task.size}</span>
                          </div>
                        </div>
                        <span className="text-amber-600 dark:text-amber-400 font-bold">
                          +{task.points}
                        </span>
                      </div>

                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                        {task.description}
                      </p>

                      {!isCompleted ? (
                        <button
                          onClick={() => handleDownload(task)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-medium"
                        >
                          <AiOutlineDownload className="w-5 h-5" />
                          Download & Install
                        </button>
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium py-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                          <AiOutlineCheckCircle className="w-5 h-5" />
                          Installed & Completed
                        </div>
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
