import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="bg-[#0B0B0B] py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4F7FFF] mb-4 block">
              Newsletter
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
              Stay in the loop.
            </h2>
            <p className="text-[#A1A1A1] mb-10 text-sm lg:text-base">
              Get first access to new collections, exclusive drops and NEXORA updates.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <CheckCircle size={40} className="text-green-500" />
                <p className="text-white font-semibold">You're in. Welcome to NEXORA.</p>
                <p className="text-[#A1A1A1] text-sm">We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-white/8 border border-white/12 text-white placeholder-[#A1A1A1] px-5 py-3.5 rounded-full text-sm outline-none focus:border-white/30 focus:bg-white/12 transition-all duration-200"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-[#0B0B0B] font-semibold px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors flex items-center gap-2 text-sm disabled:opacity-60 shrink-0"
                >
                  {loading ? 'Subscribing...' : <>Subscribe <ArrowRight size={14} /></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
