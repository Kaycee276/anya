"use client";
import { Zap, RefreshCw, CheckCircle, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "Initial Generation",
      description: "Anya reads your entire frontend codebase, infers data models and API needs, and generates a complete backend (schema, endpoints, DB guardrails).",
      icon: <Zap size={32} />
    },
    {
      title: "Incremental Updates",
      description: "On subsequent pushes, Anya computes the diff and adds, edits, or removes backend code and schema as needed. No full regeneration required.",
      icon: <RefreshCw size={32} />
    },
    {
      title: "Approval Flow",
      description: "Review and approve proposed backend changes before they go live, just like reviewing a pull request. You are always in control.",
      icon: <CheckCircle size={32} />
    },
    {
      title: "DB Guardrails",
      description: "Anya configures declarative rules for the validation engine, ensuring access control and preventing injection, without writing the enforcement mechanism itself.",
      icon: <Shield size={32} />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="features" className="w-full py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:w-2/3"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">A standing, autonomous backend engineer tied to your repo.</h2>
          <p className="text-gray-400 text-lg">Not a BaaS where you still design and wire everything. Not an in-IDE assistant that needs a human driving. Anya operates entirely at build time.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="bg-surface p-8 hover:bg-surface-hover transition-colors group">
              <div className="mb-6 text-primary group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
