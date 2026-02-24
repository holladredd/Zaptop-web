import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Splash() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-indigo-600 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex items-center mb-8"
      >
        <motion.span
          animate={{
            textShadow: [
              "0 0 20px rgba(255,255,255,0)",
              "0 0 30px rgba(255,255,255,0.3)",
              "0 0 20px rgba(255,255,255,0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white text-7xl font-extrabold tracking-wider"
        >
          Zap
        </motion.span>
        <span className="text-yellow-300 text-7xl font-extrabold tracking-wider">
          Top
        </span>
      </motion.div>

      <p className="text-indigo-200 mb-4">
        Redirecting in {countdown} seconds...
      </p>

      <Link
        href="/login"
        className="text-yellow-300 hover:text-yellow-200 font-medium underline"
      >
        Skip to Login
      </Link>
    </div>
  );
}
