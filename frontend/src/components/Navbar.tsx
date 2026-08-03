"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 grid grid-cols-3 items-center">
        {/* Left: Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300 justify-start">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
          <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex md:hidden items-center justify-start">
          <button 
            className="text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Middle: Name */}
        <div className="flex items-center justify-center">
          <Link href="/" className="font-bold text-xl tracking-tight">Anya</Link>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-4 justify-end">
          <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden lg:block">
            Sign In
          </Link>
          <button className="bg-primary hover:bg-primary-hover text-background text-xs font-semibold py-2 px-4 transition-colors">
            Connect GitHub
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-gray-800 py-4 px-6 flex flex-col gap-4 shadow-xl"
          >
            <Link 
              href="#features" 
              className="text-gray-300 hover:text-white transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-gray-300 hover:text-white transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link 
              href="#faq" 
              className="text-gray-300 hover:text-white transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="/login" 
              className="text-gray-300 hover:text-white transition-colors py-2 font-medium lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
