'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login işlemleri buraya gelecek
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
      <Navbar />
      <div className="pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20"
        >
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent"
          >
            Hoş Geldiniz
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <motion.input
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(var(--primary-500), 0.2)" }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border outline-none transition-all duration-200 bg-white/50"
                placeholder="ornek@email.com"
                required
              />
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
              <motion.input
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(var(--primary-500), 0.2)" }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all duration-200 bg-white/50"
                placeholder="••••••••"
                required
              />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#ff6b00" }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              type="submit"
              className="w-full bg-primary-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-primary-500/30 transition-all duration-200 text-lg"
            >
              Giriş Yap
            </motion.button>
          </form>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Hesabınız yok mu?{' '}
              <Link href="/register" className="text-primary-500 hover:text-primary-600 font-semibold hover:underline transition-all duration-200">
                Kayıt Ol
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}