"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Docs() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 pt-32 pb-24 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert prose-orange max-w-none"
        >
          
            <h2 className="text-2xl font-bold mb-4 text-white mt-0">Welcome to Anya</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Anya is an autonomous backend engineer that lives in your GitHub repository. It introduces a new paradigm: <strong>Backend-as-an-Agent</strong>.
            </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Concept</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            We&apos;ve all seen BaaS (Backend-as-a-Service) platforms like Firebase or Supabase. They give you the primitives, but you still have to design the schema, write the validation rules, and wire everything up. Anya takes a different approach:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-surface/30 p-6">
              <h3 className="text-xl font-semibold text-white mb-3 mt-0">1. Connect your repo</h3>
              <p className="text-gray-400 text-sm m-0">Anya reads your entire frontend codebase and infers your data models and API needs based on your components and fetch calls.</p>
            </div>
            <div className="bg-surface/30 p-6">
              <h3 className="text-xl font-semibold text-white mb-3 mt-0">2. Automatic Generation</h3>
              <p className="text-gray-400 text-sm m-0">It automatically generates a complete, deterministic backend—including the database schema, API endpoints, and security guardrails.</p>
            </div>
            <div className="bg-surface/30 p-6">
              <h3 className="text-xl font-semibold text-white mb-3 mt-0">3. Incremental Updates</h3>
              <p className="text-gray-400 text-sm m-0">As you push new commits to your frontend, Anya computes the diff and proposes backend updates to match.</p>
            </div>
            <div className="bg-surface/30 p-6">
              <h3 className="text-xl font-semibold text-white mb-3 mt-0">4. PR-Style Approval</h3>
              <p className="text-gray-400 text-sm m-0">You are always in control. Anya presents the proposed backend changes as a diff for you to review and approve before they go live.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Current State</h2>
          <ul className="space-y-4 text-gray-400 list-disc pl-6">
            <li><strong className="text-white">Frontend:</strong> The marketing site and dashboard are built using Next.js, Tailwind CSS v4, and Framer Motion for animations.</li>
            <li><strong className="text-white">Authentication:</strong> GitHub OAuth is integrated using Auth.js. Users can log in and view their dashboard.</li>
            <li><strong className="text-white">Backend:</strong> The NestJS backend is initialized and contains the foundational logic for webhook processing and generation caps.</li>
          </ul>

          
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
