import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageSquare, Camera, X, Link2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const inputClass =
  'w-full px-4 py-3.5 rounded-xl border border-[#E5E5E3] text-sm text-[#0B0B0B] placeholder-[#A1A1A1] focus:outline-none focus:border-[#0B0B0B] transition-colors bg-white';

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
    showToast("Message sent! We'll get back to you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3 block">Contact</span>
            <h1 className="text-4xl lg:text-6xl font-black text-[#0B0B0B] tracking-tight mb-6">Let's talk.</h1>
            <p className="text-[#A1A1A1] leading-relaxed mb-12 max-w-md">
              Have a question, feedback, or just want to say hello? We'd love to hear from you. Our team typically responds within 24 hours.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F7F5] flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#0B0B0B]" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-semibold text-[#0B0B0B] text-sm mb-0.5">Email Us</p>
                  <a href="mailto:hello@nexora.co" className="text-sm text-[#4F7FFF] hover:underline">hello@nexora.co</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F7F5] flex items-center justify-center shrink-0">
                  <MessageSquare size={18} className="text-[#0B0B0B]" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-semibold text-[#0B0B0B] text-sm mb-0.5">Customer Support</p>
                  <p className="text-sm text-[#A1A1A1]">Mon–Sat, 9am–7pm IST</p>
                  <a href="mailto:support@nexora.co" className="text-sm text-[#4F7FFF] hover:underline">support@nexora.co</a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-10">
              {[
                { icon: Camera, href: '#', label: 'Instagram' },
                { icon: X, href: '#', label: 'X' },
                { icon: Link2, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-[#E5E5E3] flex items-center justify-center text-[#A1A1A1] hover:text-[#0B0B0B] hover:border-[#0B0B0B] transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#F7F7F5] rounded-3xl p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <ArrowRight size={28} className="text-green-500" />
                </div>
                <p className="font-bold text-[#0B0B0B] text-xl">Message sent!</p>
                <p className="text-sm text-[#A1A1A1]">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1A1] mb-1.5">Name</label>
                    <input required className={inputClass} placeholder="Arjun Mehta" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1A1] mb-1.5">Email</label>
                    <input type="email" required className={inputClass} placeholder="you@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1A1] mb-1.5">Subject</label>
                  <input required className={inputClass} placeholder="Order query, product feedback..." />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1A1] mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0B0B0B] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#171717] transition-colors disabled:opacity-60"
                >
                  {loading ? 'Sending...' : <><span>Send Message</span><ArrowRight size={16} /></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
