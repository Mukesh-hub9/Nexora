import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1483721310020-03333e577078?w=1920&q=85"
          alt="NEXORA — Curated Essentials Collection 2026"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 max-w-[1440px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-6">
            New Collection · 2026
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6 max-w-3xl">
            DISCOVER<br />WHAT'S<br />NEXT.
          </h1>
          <p className="text-base lg:text-lg text-white/70 mb-10 max-w-md leading-relaxed">
            Curated essentials designed for the modern lifestyle.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-[#0B0B0B] font-semibold px-7 py-3.5 rounded-full hover:bg-white/90 transition-all duration-200 text-sm"
            >
              Shop Collection
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/shop?filter=new"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-7 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition-all duration-200 text-sm backdrop-blur-sm"
            >
              Explore New Arrivals
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
