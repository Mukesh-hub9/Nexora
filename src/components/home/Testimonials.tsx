import React from 'react';
import { motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';

const reviews = [
  {
    name: 'Arjun Mehta',
    location: 'Mumbai, MH',
    rating: 5,
    product: 'NEXORA Urban Backpack',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fit=crop&crop=face',
    text: 'Minimal design, excellent quality and an incredibly smooth shopping experience. The Urban Backpack is exactly what I needed for daily commute — laptop fits perfectly, build is premium.',
    verified: true,
    date: 'Aug 2026',
  },
  {
    name: 'Priya Raghavan',
    location: 'Bengaluru, KA',
    rating: 5,
    product: 'NEXORA Smart Watch Pro',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&fit=crop&crop=face',
    text: 'NEXORA feels different from typical online stores. Everything feels thoughtfully designed — from the products to the packaging. The Smart Watch Pro is stunning in person.',
    verified: true,
    date: 'Aug 2026',
  },
  {
    name: 'Rahul Kapoor',
    location: 'New Delhi, DL',
    rating: 5,
    product: 'NEXORA Mechanical Keyboard',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&fit=crop&crop=face',
    text: 'The Mechanical Keyboard arrived in two days, perfect condition. The tactile feel is outstanding and the aluminium case feels absolutely solid. Definitely coming back for more.',
    verified: true,
    date: 'Sep 2026',
  },
  {
    name: 'Sneha Tiwari',
    location: 'Pune, MH',
    rating: 5,
    product: 'NEXORA Matte Travel Mug',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&fit=crop&crop=face',
    text: 'The Travel Mug genuinely keeps my coffee hot all morning — tested it for a week. The matte finish is gorgeous and the lid is truly leak-proof. Shipping was incredibly fast too.',
    verified: true,
    date: 'Jul 2026',
  },
  {
    name: 'Vikramaditya Roy',
    location: 'Kolkata, WB',
    rating: 5,
    product: 'NEXORA ANC Studio Headphones',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80&fit=crop&crop=face',
    text: 'The active noise cancellation is remarkably crisp. Deep bass without muddying the mids. Perfect for deep focus coding sessions and long flights.',
    verified: true,
    date: 'Sep 2026',
  },
  {
    name: 'Ananya Deshmukh',
    location: 'Hyderabad, TS',
    rating: 5,
    product: 'NEXORA Botanical Soy Candle',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80&fit=crop&crop=face',
    text: 'The cedarwood & amber scent fills the entire living room without feeling overpowering. The wooden wick crackle is such a cozy touch. 10/10 gift.',
    verified: true,
    date: 'Aug 2026',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3 block">
            Reviews
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0B0B] tracking-tight">
            Loved by the NEXORA Community
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="bg-[#F7F7F5] rounded-2xl p-6 flex flex-col gap-4 border border-[#ECECE9] hover:border-[#D1D5DB] transition-all hover:shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={13} className="fill-[#0B0B0B] text-[#0B0B0B]" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm text-[#0B0B0B] leading-relaxed flex-1">"{review.text}"</p>

              {/* Product purchased */}
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A1A1A1]">
                {review.product}
              </p>

              {/* Author row */}
              <div className="flex items-center gap-3 pt-1 border-t border-[#E5E5E3]">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-[#0B0B0B] truncate">{review.name}</p>
                    {review.verified && (
                      <BadgeCheck size={13} className="text-[#4F7FFF] shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-[#A1A1A1]">{review.location} · {review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
