"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full bg-surface mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-400">Anya</span>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-500">
          <Link href="#" className="hover:text-gray-300 transition-colors">Documentation</Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          {/* Premium features hidden away in the footer */}
          <Link href="/pro" className="hover:text-gray-300 transition-colors opacity-30 hover:opacity-100">Pro</Link>
        </div>
      </div>
    </motion.footer>
  );
}
