'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kayıt işlemleri buraya gelecek
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
      <Navbar />
      <div className="pt-8 md:pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 mx-4 my-4 md:my-0"
        >
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent"
          >
            Aramıza Katıl
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
              <motion.input
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(var(--primary-500), 0.2)" }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border outline-none transition-all duration-200 bg-white/50"
                placeholder="John Doe"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <motion.input
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(var(--primary-500), 0.2)" }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border outline-none transition-all duration-200 bg-white/50"
                placeholder="ornek@email.com"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
              <motion.input
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(var(--primary-500), 0.2)" }}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all duration-200 bg-white/50"
                placeholder="••••••••"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Şifre Tekrar</label>
              <motion.input
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(var(--primary-500), 0.2)" }}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all duration-200 bg-white/50"
                placeholder="••••••••"
                required
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#ff6b00" }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              type="submit"
              className="w-full bg-primary-500 text-white py-3 md:py-4 rounded-xl font-semibold shadow-lg shadow-primary-500/30 transition-all duration-200 text-base md:text-lg mt-4 md:mt-6"
            >
              Kayıt Ol
            </motion.button>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 md:mt-8 text-center"
          >
            <p className="text-gray-600 text-sm md:text-base">
              Zaten hesabınız var mı?{' '}
              <Link 
                href="/login" 
                className="text-primary-500 hover:text-primary-600 font-semibold hover:underline transition-all duration-200"
              >
                Giriş Yap
              </Link>
            </p>
          </motion.div>

          {/* Mobile-specific bottom padding */}
          <div className="h-4 md:h-0" />
        </motion.div>
      </div>
    </div>
  );
}