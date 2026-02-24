import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";

import Swal from "sweetalert2";
import {
  AiOutlineArrowLeft,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineForm,
  AiOutlineStar,
} from "react-icons/ai";

const surveyTasks = [
  {
    id: 1,
    title: "Product Feedback",
    description: "Share your thoughts on our app",
    points: 200,
    duration: "3 mins",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Market Research",
    description: "Help us understand your needs",
    points: 500,
    duration: "8 mins",
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "User Experience",
    description: "Rate your experience with features",
    points: 300,
    duration: "5 mins",
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "Premium Survey",
    description: "Detailed feedback for bonus points",
    points: 1000,
    duration: "15 mins",
    difficulty: "Hard",
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

// Component defined as a function
function SurveyTasks() {
  const [userPoints, setUserPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleComplete = async (task) => {
    await Swal.fire({
      title: "Loading Survey...",
      html: '<div class="flex items-center justify-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>',
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 1500,
    });

    setUserPoints((prev) => prev + task.points);
    setCompletedTasks((prev) => [...prev, task.id]);

    Swal.fire({
      icon: "success",
      title: "Survey Completed!",
      text: `You earned ${task.points} points!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20";
      case "Medium":
        return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20";
      case "Hard":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
      default:
        return "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700";
    }
  };

  return (
    <ProtectedRoute>
      <Layout title="Survey Tasks">
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
                Survey Tasks
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Share your opinion and earn rewards
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Points Earned
              </p>
              <p className="text-2xl font-bold text-emerald-600">
                +{userPoints}
              </p>
            </div>
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Surveys Done
              </p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {completedTasks.length}
              </p>
            </div>
          </div>

          {/* Survey List */}
          <div className="space-y-4">
            {surveyTasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <motion.div
                  key={task.id}
                  variants={itemVariants}
                  className={`bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6 hover:shadow-soft transition-all ${
                    isCompleted ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <AiOutlineForm className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-slate-800 dark:text-white text-lg">
                          {task.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}
                        >
                          {task.difficulty}
                        </span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 mb-3">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-400 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                          <AiOutlineClockCircle className="w-4 h-4" />
                          {task.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <AiOutlineStar className="w-4 h-4" />
                          {task.points} points
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {!isCompleted ? (
                        <button
                          onClick={() => handleComplete(task)}
                          className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                        >
                          Start Survey
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-emerald-600 font-medium px-6 py-3">
                          <AiOutlineCheckCircle className="w-5 h-5" />
                          Completed
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

// Explicit default export
export default SurveyTasks;
