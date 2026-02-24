import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { AiOutlineArrowLeft, AiOutlineLock, AiOutlineFingerprint, AiOutlineBell, AiOutlineShield, AiOutlineMobile } from 'react-icons/ai';
import Link from 'next/link';
import Swal from 'sweetalert2';

const securityOptions = [
  { id: 1, title: 'Change Password', description: 'Update your account password', icon: AiOutlineLock },
  { id: 2, title: 'Two-Factor Authentication', description: 'Add extra security layer', icon: AiOutlineShield, toggle: true },
  { id: 3, title: 'Biometric Login', description: 'Use fingerprint or face ID', icon: AiOutlineFingerprint, toggle: true },
  { id: 4, title: 'Device Management', description: 'Manage logged in devices', icon: AiOutlineMobile },
  { id: 5, title: 'Security Notifications', description: 'Get alerts for suspicious activity', icon: AiOutlineBell, toggle: true },
];

export default function Security() {
  const [toggles, setToggles] = useState({ 2: false, 3: false, 5: true });

  const handleToggle = (id) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChangePassword = () => {
    Swal.fire({
      title: 'Change Password',
      html: `
        <input type="password" id="current" class="swal2-input" placeholder="Current Password">
        <input type="password" id="new" class="swal2-input" placeholder="New Password">
        <input type="password" id="confirm" class="swal2-input" placeholder="Confirm New Password">
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#4f46e5',
      preConfirm: () => {
        return {
          current: document.getElementById('current').value,
          new: document.getElementById('new').value,
          confirm: document.getElementById('confirm').value,
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Password Updated!',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <ProtectedRoute>
      <Layout title="Security">
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
              <h2 className="text-2xl font-bold text-slate-800">Security</h2>
              <p className="text-slate-500">Manage your account security</p>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
              <AiOutlineShield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800">Your account is secure</h3>
              <p className="text-emerald-600 text-sm">Last security check: Today</p>
            </div>
          </div>

          {/* Security Options */}
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            {securityOptions.map((option) => (
              <div 
                key={option.id} 
                className="flex items-center gap-4 p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <option.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">{option.title}</h4>
                  <p className="text-sm text-slate-500">{option.description}</p>
                </div>
                {option.toggle ? (
                  <button 
                    onClick={() => handleToggle(option.id)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      toggles[option.id] ? 'bg-primary-600' : 'bg-slate-300'
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      toggles[option.id] ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                ) : (
                  <button 
                    onClick={option.id === 1 ? handleChangePassword : undefined}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Manage
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
