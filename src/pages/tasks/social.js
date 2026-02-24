import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import {
  AiOutlineShareAlt,
  AiOutlineCheckCircle,
  AiOutlineArrowLeft,
  AiOutlineCopy,
  AiOutlineTwitter,
  AiOutlineFacebook,
} from "react-icons/ai";
import Swal from "sweetalert2";

const socialTasks = [
  {
    id: 1,
    title: "Refer a Friend",
    description: "Invite friends using your unique referral code",
    points: 500,
    action: "Copy Link",
    icon: AiOutlineCopy,
  },
  {
    id: 2,
    title: "Share on Twitter",
    description: "Tweet about ZapTop to your followers",
    points: 200,
    action: "Share",
    icon: AiOutlineTwitter,
  },
  {
    id: 3,
    title: "Share on Facebook",
    description: "Post about ZapTop on your timeline",
    points: 200,
    action: "Share",
    icon: AiOutlineFacebook,
  },
  {
    id: 4,
    title: "Join Community",
    description: "Join our Telegram community group",
    points: 300,
    action: "Join",
    icon: AiOutlineShareAlt,
  },
];

const referralCode = "ZAPTOP-USER-123";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function SocialTasks() {
  const [userPoints, setUserPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleTask = async (task) => {
    if (task.id === 1) {
      await navigator.clipboard.writeText(
        `Join ZapTop with my code: ${referralCode}`,
      );
      Swal.fire({
        icon: "success",
        title: "Copied!",
        text: "Referral code copied to clipboard",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      await Swal.fire({
        title: "Opening...",
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => Swal.showLoading(),
      });
    }

    setUserPoints((prev) => prev + task.points);
    setCompletedTasks((prev) => [...prev, task.id]);

    if (task.id !== 1) {
      Swal.fire({
        icon: "success",
        title: "Task Completed!",
        text: `You earned ${task.points} points!`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <ProtectedRoute>
      <Layout title="Social Tasks">
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
                Social Tasks
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Share and engage to earn points
              </p>
            </div>
          </div>

          {/* Referral Code Card */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white"
          >
            <h3 className="text-lg font-semibold mb-2">Your Referral Code</h3>
            <p className="text-pink-100 text-sm mb-4">
              Share this code with friends and earn 500 points per referral
            </p>
            <div className="flex gap-3">
              <code className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 font-mono text-lg">
                {referralCode}
              </code>
              <button
                onClick={() => handleTask(socialTasks[0])}
                className="px-4 py-3 bg-white text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-colors"
              >
                <AiOutlineCopy className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Points Earned
              </p>
              <p className="text-2xl font-bold text-pink-600">+{userPoints}</p>
            </div>
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Tasks Done
              </p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {completedTasks.length}
              </p>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-4">
            {socialTasks.slice(1).map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <motion.div
                  key={task.id}
                  variants={itemVariants}
                  className={`bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6 hover:shadow-soft transition-all ${
                    isCompleted ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-pink-100 dark:bg-pink-900/20 rounded-xl flex items-center justify-center">
                      <task.icon className="w-7 h-7 text-pink-600 dark:text-pink-400" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 dark:text-white text-lg">
                        {task.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400">
                        {task.description}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-pink-600 dark:text-pink-400 font-bold mb-2">
                        +{task.points}
                      </p>
                      {!isCompleted ? (
                        <button
                          onClick={() => handleTask(task)}
                          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium"
                        >
                          {task.action}
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-emerald-600 font-medium text-sm">
                          <AiOutlineCheckCircle className="w-4 h-4" />
                          Done
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
