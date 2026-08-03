"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full py-24 md:py-32 flex flex-col items-center text-center px-6 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: "url('/backend-development-and-programming-programmer-coding-and-testing-program-code-creating-apps.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 leading-tight"
        >
          Your frontend repo <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">
            is your backend.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          Connect your GitHub repository. Anya reads your frontend code, infers your data models, and automatically generates and maintains a complete, deterministic backend. No backend code required.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button className="bg-primary hover:bg-primary-hover text-background text-lg font-semibold py-4 px-8 transition-colors shadow-[0_0_20px_rgba(255,102,0,0.3)] hover:shadow-[0_0_30px_rgba(255,102,0,0.5)]">
            Connect GitHub
          </button>
          <button className="bg-surface hover:bg-surface-hover text-white text-lg font-medium py-4 px-8 transition-colors">
            View Documentation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
