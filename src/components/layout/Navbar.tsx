import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onSearchOpen: () => void;
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'Collections', href: '/shop?filter=collections' },
  { label: 'About', href: '/about' },
];

const Navbar: React.FC<NavbarProps> = ({ onSearchOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome || mobileOpen
            ? 'bg-white/95 backdrop-blur-xl border-b border-[#E5E5E3] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className={`text-xl font-black tracking-tight transition-colors duration-300 ${
                !scrolled && isHome && !mobileOpen ? 'text-white' : 'text-[#0B0B0B]'
              }`}
            >
              NEXORA
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:opacity-100 ${
                    !scrolled && isHome
                      ? 'text-white/80 hover:text-white'
                      : 'text-[#0B0B0B]/70 hover:text-[#0B0B0B]'
                  } ${location.pathname === link.href ? 'opacity-100 font-semibold' : 'opacity-80'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center gap-4">
              {[
                {
                  icon: Search,
                  label: 'search',
                  action: onSearchOpen,
                  badge: null,
                },
                {
                  icon: User,
                  label: 'account',
                  action: () => navigate(isAuthenticated ? '/account' : '/auth'),
                  badge: null,
                },
                {
                  icon: Heart,
                  label: 'wishlist',
                  action: () => navigate('/wishlist'),
                  badge: wishlistCount > 0 ? wishlistCount : null,
                },
                {
                  icon: ShoppingBag,
                  label: 'cart',
                  action: openCart,
                  badge: totalItems > 0 ? totalItems : null,
                },
              ].map(({ icon: Icon, label, action, badge }) => (
                <button
                  key={label}
                  onClick={action}
                  className={`relative p-2 rounded-full transition-colors duration-200 hover:bg-black/5 ${
                    !scrolled && isHome ? 'text-white' : 'text-[#0B0B0B]'
                  }`}
                  aria-label={label}
                >
                  <Icon size={20} strokeWidth={1.8} />
                  {badge !== null && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#4F7FFF] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Icons */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onSearchOpen}
                className={`p-2 transition-colors ${
                  !scrolled && isHome && !mobileOpen ? 'text-white' : 'text-[#0B0B0B]'
                }`}
                aria-label="search"
              >
                <Search size={20} strokeWidth={1.8} />
              </button>
              <button
                onClick={openCart}
                className={`relative p-2 transition-colors ${
                  !scrolled && isHome && !mobileOpen ? 'text-white' : 'text-[#0B0B0B]'
                }`}
                aria-label="cart"
              >
                <ShoppingBag size={20} strokeWidth={1.8} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#4F7FFF] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 transition-colors ${
                  !scrolled && isHome && !mobileOpen ? 'text-white' : 'text-[#0B0B0B]'
                }`}
                aria-label="menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-16 lg:hidden flex flex-col"
          >
            <nav className="flex flex-col px-6 py-8 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className="block py-4 text-2xl font-bold text-[#0B0B0B] border-b border-[#F0F0EE]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-6 flex gap-6 mt-auto pb-12">
              <Link to="/auth" className="flex items-center gap-2 text-sm font-medium text-[#A1A1A1]">
                <User size={16} />
                {user ? user.name : 'Sign In'}
              </Link>
              <Link to="/wishlist" className="flex items-center gap-2 text-sm font-medium text-[#A1A1A1]">
                <Heart size={16} />
                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
