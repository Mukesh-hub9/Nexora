import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, X, Link2, Play } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0B0B] text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-8">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-black tracking-tight mb-3">NEXORA</div>
            <p className="text-[#A1A1A1] text-sm leading-relaxed max-w-xs">
              Discover What's Next. Premium essentials crafted for the modern lifestyle.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: Camera, href: '#', label: 'Instagram' },
                { icon: X, href: '#', label: 'X (Twitter)' },
                { icon: Link2, href: '#', label: 'LinkedIn' },
                { icon: Play, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#A1A1A1] hover:text-white hover:border-white/30 transition-colors duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              heading: 'Shop',
              links: [
                { label: 'All Products', href: '/shop' },
                { label: 'New Arrivals', href: '/shop?filter=new' },
                { label: 'Best Sellers', href: '/shop?filter=bestsellers' },
                { label: 'Collections', href: '/shop?filter=collections' },
              ],
            },
            {
              heading: 'Company',
              links: [
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Careers', href: '#' },
                { label: 'Journal', href: '#' },
              ],
            },
            {
              heading: 'Support',
              links: [
                { label: 'FAQ', href: '#' },
                { label: 'Shipping', href: '#' },
                { label: 'Returns', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms', href: '#' },
              ],
            },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <div className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-5">
                {heading}
              </div>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A1A1A1] text-xs">
            © 2026 NEXORA. All rights reserved.
          </p>
          <p className="text-[#A1A1A1] text-xs">
            Designed with precision. Built for what's next.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
