import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineFilter,
  AiOutlineDownload,
} from "react-icons/ai";

const transactions = [
  {
    id: 1,
    type: "debit",
    title: "MTN Airtime Purchase",
    category: "Airtime",
    amount: "₦500",
    date: "Today, 10:23 AM",
    status: "Completed",
  },
  {
    id: 2,
    type: "credit",
    title: "Video Task Reward",
    category: "Task",
    amount: "+100 pts",
    date: "Today, 9:15 AM",
    status: "Completed",
  },
  {
    id: 3,
    type: "debit",
    title: "Airtel Data Purchase",
    category: "Data",
    amount: "₦1,000",
    date: "Yesterday, 4:30 PM",
    status: "Completed",
  },
  {
    id: 4,
    type: "credit",
    title: "Survey Task Reward",
    category: "Task",
    amount: "+200 pts",
    date: "Yesterday, 2:00 PM",
    status: "Completed",
  },
  {
    id: 5,
    type: "debit",
    title: "IKEDC Electricity",
    category: "Bills",
    amount: "₦5,000",
    date: "Jan 15, 2024",
    status: "Completed",
  },
  {
    id: 6,
    type: "credit",
    title: "Referral Bonus",
    category: "Bonus",
    amount: "+500 pts",
    date: "Jan 14, 2024",
    status: "Completed",
  },
];

const filters = ["All", "Airtime", "Data", "Bills", "Tasks", "Bonus"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function History() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTransactions =
    activeFilter === "All"
      ? transactions
      : transactions.filter((t) => t.category === activeFilter);

  return (
    <ProtectedRoute>
      <Layout title="Transaction History">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Total Spent
              </p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                ₦24,500
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Points Earned
              </p>
              <p className="text-2xl font-bold text-emerald-600">+3,450</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Transactions
              </p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                156
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-primary-600 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                {filter}
              </button>
            ))}
            <button className="ml-auto flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
              <AiOutlineFilter className="w-5 h-5" />
              More Filters
            </button>
          </div>

          {/* Transactions List */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 dark:text-white">
                Recent Transactions
              </h3>
              <button className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 text-sm font-medium">
                <AiOutlineDownload className="w-4 h-4" />
                Export
              </button>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-slate-100 dark:divide-slate-700"
            >
              {filteredTransactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "credit"
                        ? "bg-emerald-100 dark:bg-emerald-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <AiOutlineArrowDown className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AiOutlineArrowUp className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800 dark:text-white">
                      {transaction.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.type === "credit"
                          ? "text-emerald-600"
                          : "text-slate-800 dark:text-white"
                      }`}
                    >
                      {transaction.amount}
                    </p>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {transaction.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
