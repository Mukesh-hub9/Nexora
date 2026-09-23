import React from 'react';
import { motion } from 'framer-motion';

const values = [
  {
    title: 'Brand Story',
    body: 'NEXORA was founded in 2024 with a single conviction: that everyday products can be beautiful without compromise. We curate and design essentials that bridge the gap between technology, fashion, and modern living.',
  },
  {
    title: 'Design Philosophy',
    body: 'We believe in ruthless simplicity. Every NEXORA product begins with the question — what can we remove? We strip back until only the essential remains, then perfect that. The result is design that feels inevitable.',
  },
  {
    title: 'Our Commitment to Quality',
    body: 'Every product in the NEXORA lineup is rigorously tested for durability, comfort, and performance. We partner only with manufacturers who share our obsession for precision and craft.',
  },
  {
    title: 'Sustainability',
    body: 'We are committed to responsible sourcing, minimal packaging, and building products designed to last — not to be replaced. Less waste, more intention.',
  },
  {
    title: 'Future Vision',
    body: 'NEXORA is more than a store. We are building an ecosystem of premium essentials for the next generation — people who expect their products to be as thoughtful as their lives.',
  },
  {
    title: 'Customer-First Experience',
    body: 'From transparent 30-day returns and real-time package tracking to 24/7 dedicated support, we hold our service standards to the same high bar as our hardware engineering.',
  },
];

const team = [
  {
    name: 'Karan Verma',
    role: 'Founder & Creative Director',
    bio: 'Former product designer at leading tech & industrial design firms. Obsessed with the intersection of minimal aesthetic and tactile utility.',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&fit=crop&crop=face',
  },
  {
    name: 'Aisha Nair',
    role: 'Head of Product & Materials',
    bio: 'Material scientist turned product lead. Aisha vets every raw supplier, alloy, and textile before it earns the NEXORA badge.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fit=crop&crop=face',
  },
  {
    name: 'Dev Sharma',
    role: 'Lead System Engineer',
    bio: 'Full-stack software architect who built the NEXORA checkout and inventory platform with zero-latency speed and global security.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=face',
  },
  {
    name: 'Meera Iyer',
    role: 'Brand & Community Director',
    bio: 'Brand strategist with a decade of luxury retail experience. Meera shapes every narrative and community experience that connects NEXORA with creators.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&fit=crop&crop=face',
  },
];

const milestones = [
  { year: '2024 Q1', title: 'Brand Launch', description: 'NEXORA launched in Mumbai with our initial 4-piece tech essentials capsule.' },
  { year: '2024 Q4', title: '10,000+ Orders', description: 'Surpassed 10k orders across 15 Indian metropolitan cities with a 4.9★ rating.' },
  { year: '2025 Q2', title: 'Sustainable Line', description: 'Transitioned 100% of packaging to FSC-certified biodegradable materials.' },
  { year: '2026', title: 'Global Delivery', description: 'Expanded direct express courier delivery across 12 countries worldwide.' },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-0">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=85"
          alt="NEXORA Design Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 flex items-end">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pb-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-4 block">Our Story</span>
              <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.0]">
                Designed for<br />what&apos;s next.
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-xl lg:text-2xl text-[#0B0B0B] font-medium leading-relaxed mb-6">
            NEXORA brings together thoughtful design, modern technology and everyday essentials to create products that fit naturally into contemporary life.
          </p>
          <p className="text-[#737373] text-base leading-relaxed">
            We are a design-first brand obsessed with making the ordinary extraordinary. Based in India and shipping worldwide, we believe premium should not be a luxury — it should be a standard.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#0B0B0B] py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '2024', label: 'Founded' },
              { value: '36+', label: 'Curated Products' },
              { value: '12', label: 'Countries Shipped' },
              { value: '4.8★', label: 'Avg Customer Rating' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl lg:text-5xl font-black text-white mb-2">{value}</p>
                <p className="text-[#A1A1A1] text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 lg:py-28">
        <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3 block">What We Stand For</span>
        <h2 className="text-3xl lg:text-4xl font-black text-[#0B0B0B] tracking-tight mb-16">Our values.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map(({ title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-[#F7F7F5] rounded-3xl p-8 border border-[#ECECE9]"
            >
              <h3 className="font-bold text-[#0B0B0B] text-lg mb-3">{title}</h3>
              <p className="text-[#737373] text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="bg-[#F7F7F5] py-20 lg:py-28 border-y border-[#ECECE9]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3 block">Milestones</span>
          <h2 className="text-3xl lg:text-4xl font-black text-[#0B0B0B] tracking-tight mb-16">The Journey So Far.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-[#E5E5E3] flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-black uppercase text-[#4F7FFF] tracking-wider mb-2 block">{m.year}</span>
                  <h4 className="text-lg font-bold text-[#0B0B0B] mb-2">{m.title}</h4>
                  <p className="text-sm text-[#737373] leading-relaxed">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3 block">The People</span>
          <h2 className="text-3xl lg:text-4xl font-black text-[#0B0B0B] tracking-tight mb-16">Meet the team.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(({ name, role, bio, avatar }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-4"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#F7F7F5]">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-[#0B0B0B] text-base">{name}</p>
                  <p className="text-xs font-semibold text-[#4F7FFF] uppercase tracking-wider mb-2">{role}</p>
                  <p className="text-sm text-[#737373] leading-relaxed">{bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial image */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pb-20 lg:pb-28">
        <div className="rounded-3xl overflow-hidden aspect-[21/9] bg-[#F7F7F5]">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85"
            alt="NEXORA Studio - Mumbai"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-center text-xs text-[#A1A1A1] mt-4 tracking-wider uppercase">
          NEXORA HQ · Mumbai, India
        </p>
      </div>
    </div>
  );
};

export default About;
