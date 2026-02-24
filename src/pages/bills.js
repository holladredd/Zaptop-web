import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import { AiOutlineBulb, AiOutlineArrowRight } from "react-icons/ai";
import { BsWifi, BsTv, BsCreditCard } from "react-icons/bs";
import Swal from "sweetalert2";

const billCategories = [
  {
    id: 1,
    title: "Electricity",
    description: "Pay power bills",
    Icon: AiOutlineBulb,
    color: "bg-amber-500",
    lightColor: "bg-amber-50 dark:bg-amber-900/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: 2,
    title: "Internet",
    description: "Broadband bills",
    Icon: BsWifi,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: 3,
    title: "Cable TV",
    description: "DSTV, GOTV, etc",
    Icon: BsTv,
    color: "bg-purple-500",
    lightColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    id: 4,
    title: "Credit Card",
    description: "Card payments",
    Icon: BsCreditCard,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
];

const recentBills = [
  {
    id: 1,
    title: "IKEDC",
    provider: "Electricity",
    date: "Due Today",
    amount: "5,000",
    Icon: AiOutlineBulb,
    color: "bg-amber-500",
    lightColor: "bg-amber-50 dark:bg-amber-900/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: 2,
    title: "Spectranet",
    provider: "Internet",
    date: "Due Tomorrow",
    amount: "12,000",
    Icon: BsWifi,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: 3,
    title: "DSTV Premium",
    provider: "Cable TV",
    date: "Due in 3 days",
    amount: "21,000",
    Icon: BsTv,
    color: "bg-purple-500",
    lightColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
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

export default function Bills() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handlePayBill = (bill) => {
    Swal.fire({
      title: `Pay ${bill.title}?`,
      text: `Amount: ₦${bill.amount}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      confirmButtonColor: "#4f46e5",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `You have paid ₦${bill.amount} for ${bill.title}`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <ProtectedRoute>
      <Layout title="Bills & Utilities">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Categories Grid */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              Bill Categories
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {billCategories.map((category) => (
                <motion.button
                  key={category.id}
                  variants={itemVariants}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-card dark:shadow-none dark:border dark:border-slate-700 hover:shadow-soft transition-all text-left ${
                    selectedCategory === category.id
                      ? "ring-2 ring-primary-500"
                      : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 ${category.lightColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <category.Icon
                      className={`w-6 h-6 ${category.textColor}`}
                    />
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
                    {category.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {category.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recent Bills */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Recent Bills
              </h3>
              <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentBills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border border-slate-100 dark:border-slate-700"
                >
                  <div
                    className={`w-12 h-12 ${bill.lightColor} rounded-xl flex items-center justify-center`}
                  >
                    <bill.Icon className={`w-6 h-6 ${bill.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 dark:text-white">
                      {bill.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {bill.provider} • {bill.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800 dark:text-white">
                      ₦{bill.amount}
                    </p>
                    <button
                      onClick={() => handlePayBill(bill)}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mt-1"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Pay Card */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Quick Pay</h3>
                <p className="text-primary-100 text-sm">
                  Pay multiple bills at once and save time
                </p>
              </div>
              <button className="bg-white text-primary-700 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
                Pay Multiple Bills
                <AiOutlineArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
