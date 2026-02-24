import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { AiOutlineArrowLeft, AiOutlineMessage, AiOutlineMail, AiOutlinePhone, AiOutlineQuestionCircle, AiOutlineBook } from 'react-icons/ai';
import Link from 'next/link';
import Swal from 'sweetalert2';

const supportOptions = [
  { id: 1, title: 'Live Chat', description: 'Chat with our support team', icon: AiOutlineMessage, color: 'bg-primary-500' },
  { id: 2, title: 'Email Support', description: 'Send us an email', icon: AiOutlineMail, color: 'bg-emerald-500' },
  { id: 3, title: 'Phone Support', description: 'Call our helpline', icon: AiOutlinePhone, color: 'bg-amber-500' },
  { id: 4, title: 'FAQs', description: 'Find answers to common questions', icon: AiOutlineQuestionCircle, color: 'bg-purple-500' },
  { id: 5, title: 'Knowledge Base', description: 'Browse helpful articles', icon: AiOutlineBook, color: 'bg-blue-500' },
];

export default function Support() {
  const handleContact = (option) => {
    if (option.id === 2) {
      window.location.href = 'mailto:support@zaptop.com';
    } else if (option.id === 3) {
      Swal.fire({
        title: 'Phone Support',
        text: 'Call us at: +234 800 123 4567',
        icon: 'info',
        confirmButtonText: 'Call Now',
        confirmButtonColor: '#4f46e5',
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: option.title,
        text: `${option.title} is coming soon!`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <ProtectedRoute>
      <Layout title="Support">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/profile" className="p-2 bg-white rounded-xl shadow-card hover:shadow-soft transition-shadow">
              <AiOutlineArrowLeft className="w-6 h-6 text-slate-600" />
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Support Center</h2>
              <p className="text-slate-500">How can we help you?</p>
            </div>
          </div>

          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">24/7 Customer Support</h3>
            <p className="text-primary-100">Our team is always here to help you with any questions or issues.</p>
          </div>

          {/* Support Options */}
          <div className="grid gap-4">
            {supportOptions.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleContact(option)}
                className="flex items-center gap-4 bg-white rounded-xl shadow-card p-4 hover:shadow-soft transition-all text-left"
              >
                <div className={`w-14 h-14 ${option.color} rounded-xl flex items-center justify-center`}>
                  <option.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 text-lg">{option.title}</h4>
                  <p className="text-slate-500">{option.description}</p>
                </div>
                <AiOutlineArrowLeft className="w-5 h-5 text-slate-400 rotate-180" />
              </motion.button>
            ))}
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-card p-6 text-center">
            <h4 className="font-semibold text-slate-800 mb-4">Direct Contact</h4>
            <p className="text-slate-500 mb-2">support@zaptop.com</p>
            <p className="text-slate-500">+234 800 123 4567</p>
          </div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
