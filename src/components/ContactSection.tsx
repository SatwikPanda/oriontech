"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset success status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="py-32 px-6 bg-white text-black">
      <div className="max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-medium mb-6">
              Let&#39;s create something
              <br />
              extraordinary together.
            </h2>
            <p className="text-black/60 text-xl max-w-xl">
              Ready to transform your digital presence? Get in touch with us and
              let&#39;s bring your vision to life with cutting-edge technology
              and design.
            </p>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-black/5 border border-black/10 focus:border-black/20 transition-colors outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-black/5 border border-black/10 focus:border-black/20 transition-colors outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-black/5 border border-black/10 focus:border-black/20 transition-colors outline-none resize-none"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className={`relative w-full py-4 ${
                  status === "loading" ? "bg-black/70" : "bg-black"
                } text-white rounded-lg font-medium overflow-hidden group`}
                whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
                whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                disabled={status === "loading"}
              >
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                />
                <motion.div className="relative z-10 flex items-center justify-center gap-2">
                  <span>
                    {status === "loading"
                      ? "Sending..."
                      : status === "success"
                      ? "Message Sent!"
                      : status === "error"
                      ? "Error! Try Again"
                      : "Send Message"}
                  </span>
                  {status === "idle" && (
                    <motion.div
                      initial={{ x: 0, opacity: 0.5 }}
                      whileHover={{
                        x: [0, 5, 0],
                        opacity: 1,
                        transition: {
                          x: {
                            repeat: Infinity,
                            duration: 1,
                            ease: "easeInOut",
                          },
                        },
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              </motion.button>

              {/* Success/Error Messages */}
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-sm text-center"
                >
                  Thank you for your message! We&#39;ll get back to you soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm text-center"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
