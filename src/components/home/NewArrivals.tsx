import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NewArrivals: React.FC = () => {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-[#F7F7F5]"
          >
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85"
              alt="New Arrivals — NEXORA Collection"
              className="w-full h-full object-cover"
            />
            {/* Just Dropped pill overlay */}
            <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4F7FFF] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0B0B0B]">Just Dropped</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col justify-center lg:pl-8"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4F7FFF] mb-6 block">
              Just Dropped
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0B0B0B] tracking-tight leading-[1.05] mb-6">
              Meet the latest<br />from NEXORA.
            </h2>
            <p className="text-[#A1A1A1] leading-relaxed mb-10 max-w-md">
              Thoughtfully designed products made for the way you live, work and move. Every piece crafted with intention and a commitment to lasting quality.
            </p>

            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { label: 'Products', value: '50+' },
                { label: 'Countries', value: '12' },
                { label: 'Reviews', value: '4.8★' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-2xl font-black text-[#0B0B0B]">{value}</p>
                  <p className="text-xs text-[#A1A1A1] font-medium mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <Link
              to="/shop?filter=new"
              className="inline-flex items-center gap-2 bg-[#0B0B0B] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#171717] transition-colors duration-200 text-sm w-fit"
            >
              Shop New Arrivals
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
