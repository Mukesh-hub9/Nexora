import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PromoBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] py-24 lg:py-32">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#4F7FFF]/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4F7FFF] mb-6 block">
            Limited Time
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.0] mb-6">
            UPGRADE YOUR<br />EVERYDAY.
          </h2>
          <p className="text-[#A1A1A1] text-base lg:text-lg mb-10 max-w-lg mx-auto">
            Premium essentials. Thoughtfully designed.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-[#0B0B0B] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-sm"
          >
            Explore Collection
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;
