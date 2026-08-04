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
      className="w-full bg-background pt-20 overflow-hidden flex flex-col"
    >
      <div className="max-w-6xl w-full mx-auto px-6 ">
        <div className="flex gap-8 text-sm text-gray-500 font-medium">
          <Link href="/docs" className="hover:text-gray-300 transition-colors">
            Documentation
          </Link>
          <Link
            href="/pro"
            className="hover:text-gray-300 transition-colors opacity-30 hover:opacity-100"
          >
            Pro
          </Link>
        </div>
      </div>

      <div className="w-full flex justify-center items-end mt-auto pointer-events-none mb-8">
        <span className="text-[28vw] font-black leading-none tracking-tighter text-surface select-none -mb-4 md:-mb-8">
          ANYA
        </span>
      </div>

      <div className="text-right text-sm text-gray-500 font-medium mb-3 px-6">
        Made with love by{" "}
        <span className="hover:text-gray-300 transition-colors hover:underline">
          <a
            href="https://izuaba.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kaycee
          </a>
        </span>
      </div>
    </motion.footer>
  );
}
