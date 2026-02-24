import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import {
  AiOutlineArrowLeft,
  AiOutlineCamera,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import Link from "next/link";
import Swal from "sweetalert2";

export default function EditProfile() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser?.name || "John Doe",
    email: currentUser?.email || "johndoe@example.com",
    phone: currentUser?.phone || "08012345678",
  });

  const handleSave = () => {
    Swal.fire({
      icon: "success",
      title: "Profile Updated!",
      text: "Your changes have been saved successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <ProtectedRoute>
      <Layout title="Edit Profile">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link
              href="/profile"
              className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 hover:shadow-soft transition-shadow"
            >
              <AiOutlineArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Edit Profile
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Update your personal information
              </p>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-8 text-center">
            <div className="relative inline-block">
              <img
                src={
                  currentUser?.profilePicture ||
                  "https://randomuser.me/api/portraits/men/32.jpg"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary-100 dark:border-primary-900"
              />
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors shadow-lg">
                <AiOutlineCamera className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-4">
              Tap the camera to change photo
            </p>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-slate-700 p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <AiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <AiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <Link
              href="/profile"
              className="flex-1 py-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              onClick={handleSave}
              className="flex-1 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
