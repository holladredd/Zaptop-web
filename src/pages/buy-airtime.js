import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { AiOutlineArrowLeft, AiOutlinePhone } from 'react-icons/ai';
import Link from 'next/link';
import Swal from 'sweetalert2';

const networks = [
  { id: 'mtn', name: 'MTN', color: 'bg-yellow-400', textColor: 'text-yellow-700' },
  { id: 'airtel', name: 'Airtel', color: 'bg-red-500', textColor: 'text-white' },
  { id: 'glo', name: 'Glo', color: 'bg-green-500', textColor: 'text-white' },
  { id: '9mobile', name: '9mobile', color: 'bg-emerald-600', textColor: 'text-white' },
];

const amounts = [100, 200, 500, 1000, 2000, 5000];

export default function BuyAirtime() {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const finalAmount = selectedAmount || parseInt(customAmount) || 0;

  const handlePurchase = () => {
    Swal.fire({
      title: 'Confirm Purchase',
      text: `Buy ₦${finalAmount} airtime for ${phoneNumber}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Buy Now',
      confirmButtonColor: '#4f46e5',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Purchase Successful!',
          text: `₦${finalAmount} airtime purchased for ${phoneNumber}`,
          timer: 2000,
          showConfirmButton: false,
        });
        setSelectedNetwork(null);
        setSelectedAmount(null);
        setCustomAmount('');
        setPhoneNumber('');
      }
    });
  };

  return (
    <ProtectedRoute>
      <Layout title="Buy Airtime">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-card hover:shadow-soft transition-shadow">
              <AiOutlineArrowLeft className="w-6 h-6 text-slate-600" />
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Buy Airtime</h2>
              <p className="text-slate-500">Top up any phone number</p>
            </div>
          </div>

          {/* Network Selection */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Select Network</h3>
            <div className="grid grid-cols-4 gap-4">
              {networks.map((network) => (
                <button
                  key={network.id}
                  onClick={() => setSelectedNetwork(network.id)}
                  className={`p-4 rounded-xl font-bold transition-all ${
                    selectedNetwork === network.id 
                      ? 'ring-2 ring-primary-500 ring-offset-2' 
                      : 'hover:scale-105'
                  } ${network.color} ${network.textColor}`}
                >
                  {network.name}
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Phone Number</h3>
            <div className="relative">
              <AiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Amount Selection */}
          {selectedNetwork && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-card p-6"
            >
              <h3 className="font-semibold text-slate-800 mb-4">Select Amount</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                    className={`p-4 rounded-xl border-2 font-bold transition-all ${
                      selectedAmount === amount
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-slate-200 hover:border-primary-300'
                    }`}
                  >
                    ₦{amount}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₦</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  placeholder="Or enter custom amount"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </motion.div>
          )}

          {/* Purchase Button */}
          {finalAmount > 0 && phoneNumber && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handlePurchase}
              className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
            >
              Buy ₦{finalAmount} Airtime
            </motion.button>
          )}
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
