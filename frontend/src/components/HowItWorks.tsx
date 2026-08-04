"use client";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect your repo",
      description:
        "Link your GitHub account and select your frontend repository. Anya supports Next.js, React, Vue, and more.",
    },
    {
      number: "02",
      title: "Anya analyzes & generates",
      description:
        "Anya reads your code, including comments, to infer your intent. It then generates the schema, endpoints, and guardrails.",
    },
    {
      number: "03",
      title: "Review the diff",
      description:
        "You get a PR-style diff of the proposed backend changes. Approve them to deploy, or reject and add more comments to your frontend.",
    },
    {
      number: "04",
      title: "Push and repeat",
      description:
        "As you build your frontend and push new commits, Anya incrementally updates your backend to match.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="how-it-works" className="w-full py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-gray-400 text-lg">
            From frontend code to deployed backend in minutes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-1/2 w-full h-[1px] bg-black z-0"></div>
              )}

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-surface flex items-center justify-center text-primary font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
