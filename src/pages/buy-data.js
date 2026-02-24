import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  AiOutlineArrowLeft,
  AiOutlinePhone,
  AiOutlineCheck,
} from "react-icons/ai";
import Link from "next/link";
import Swal from "sweetalert2";

const networks = [
  {
    id: "mtn",
    name: "MTN",
    color: "bg-yellow-400",
    textColor: "text-yellow-800",
  },
  {
    id: "airtel",
    name: "Airtel",
    color: "bg-red-500",
    textColor: "text-white",
  },
  { id: "glo", name: "Glo", color: "bg-green-500", textColor: "text-white" },
  {
    id: "9mobile",
    name: "9mobile",
    color: "bg-emerald-600",
    textColor: "text-white",
  },
];

const dataPlans = [
  { id: 1, name: "1GB", validity: "1 Day", price: 300 },
  { id: 2, name: "2GB", validity: "7 Days", price: 500 },
  { id: 3, name: "5GB", validity: "30 Days", price: 1500 },
  { id: 4, name: "10GB", validity: "30 Days", price: 2500 },
  { id: 5, name: "15GB", validity: "30 Days", price: 3500 },
  { id: 6, name: "20GB", validity: "30 Days", price: 4500 },
];

export default function BuyData() {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePurchase = () => {
    Swal.fire({
      title: "Confirm Purchase",
      text: `Buy ${selectedPlan.name} for ₦${selectedPlan.price}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Buy Now",
      confirmButtonColor: "#4f46e5",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Purchase Successful!",
          text: `${selectedPlan.name} data purchased for ${phoneNumber}`,
          timer: 2000,
          showConfirmButton: false,
        });
        setSelectedNetwork(null);
        setSelectedPlan(null);
        setPhoneNumber("");
      }
    });
  };

  return (
    <ProtectedRoute>
      <Layout title="Buy Data">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 hover:shadow-soft transition-shadow"
            >
              <AiOutlineArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Buy Data
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Purchase mobile data bundles
              </p>
            </div>
          </div>

          {/* Network Selection */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
              Select Network
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {networks.map((network) => (
                <button
                  key={network.id}
                  onClick={() => setSelectedNetwork(network.id)}
                  className={`p-4 rounded-xl font-bold transition-all ${
                    selectedNetwork === network.id
                      ? "ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-slate-800"
                      : "hover:scale-105"
                  } ${network.color} ${network.textColor}`}
                >
                  {network.name}
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
              Phone Number
            </h3>
            <div className="relative">
              <AiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Data Plans */}
          {selectedNetwork && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6"
            >
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
                Select Data Plan
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dataPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedPlan?.id === plan.id
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30"
                        : "border-slate-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-500"
                    }`}
                  >
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">
                      {plan.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {plan.validity}
                    </p>
                    <p className="text-lg font-bold text-primary-600 dark:text-primary-400 mt-2">
                      ₦{plan.price}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Purchase Button */}
          {selectedPlan && phoneNumber && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handlePurchase}
              className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
            >
              Buy {selectedPlan.name} for ₦{selectedPlan.price}
            </motion.button>
          )}
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
