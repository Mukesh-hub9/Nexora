import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Truck, Star } from 'lucide-react';

const features = [
  {
    icon: Star,
    title: 'Premium Quality',
    desc: 'Products selected for quality, durability and everyday use. No compromises.',
  },
  {
    icon: Zap,
    title: 'Thoughtful Design',
    desc: 'Minimal designs created around real-world needs — beautiful and functional.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Reliable shipping with real-time tracking. Pan-India delivery in 2–5 days.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Shopping',
    desc: 'Safe payments, encrypted checkout, and easy returns — always.',
  },
];

const WhyNexora: React.FC = () => {
  return (
    <section className="bg-[#F7F7F5] py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3 block">
            Our Promise
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0B0B] tracking-tight">
            Why NEXORA?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="flex flex-col items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5E5E3] flex items-center justify-center shadow-sm">
                <Icon size={20} className="text-[#0B0B0B]" strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="font-bold text-[#0B0B0B] mb-2">{title}</h3>
                <p className="text-sm text-[#A1A1A1] leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyNexora;
