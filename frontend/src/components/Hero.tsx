"use client";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Hero() {
  const { data: session } = useSession();

  return (
    <section className="relative w-full pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center text-center px-6 overflow-hidden">
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
          {session ? (
            <Link href="/dashboard" className="bg-primary hover:bg-primary-hover text-background text-lg font-semibold py-4 px-8 transition-colors ">
              Go to Dashboard
            </Link>
          ) : (
            <button 
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              className="bg-primary hover:bg-primary-hover text-background text-lg font-semibold py-4 px-8 transition-colors "
            >
              Connect GitHub
            </button>
          )}
          <button className="bg-surface hover:bg-surface-hover text-white text-lg font-medium py-4 px-8 transition-colors">
            View Documentation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
