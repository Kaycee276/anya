"use client";
import { motion } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      question: "Is this just another BaaS like Firebase or Supabase?",
      answer: "No. Firebase and Supabase give you primitives (database, auth, storage), but you still have to design the schema and wire everything up. Anya actually writes the backend code and maintains it for you based on your frontend."
    },
    {
      question: "Does the AI run in production?",
      answer: "No. Anya operates entirely at build time. Once generated, your backend runs as normal, deterministic server code. This ensures live requests are fast, predictable, and debuggable."
    },
    {
      question: "What if Anya makes a mistake?",
      answer: "Every change Anya proposes is logged and presented to you as a diff. You must review and approve the changes before they go live. If it's wrong, you can reject it and add a comment in your frontend code to guide it."
    },
    {
      question: "How does it know what I want?",
      answer: "Anya infers a lot from your frontend code structure and API calls. For specific intent, you can leave comments in your frontend code (e.g., marking a field as required or sensitive), which Anya reads as explicit instructions."
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
    <section id="faq" className="w-full py-24 bg-surface/30">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Frequently Asked Questions
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVariants} className="bg-background p-6">
              <h3 className="text-lg font-semibold mb-3 text-white">{faq.question}</h3>
              <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
