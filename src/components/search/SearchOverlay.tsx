import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Clock, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import type { Product } from '../../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const recentSearches = ['Smart Watch', 'Backpack', 'Wireless Charger'];
const popularSearches = ['AirPods Case', 'Sneakers', 'Desk Organiser', 'Keyboard', 'Travel Mug'];

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.includes(q)) ||
        p.shortDescription.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 6));
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] bg-white/98 backdrop-blur-xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center gap-4 px-6 lg:px-16 py-5 border-b border-[#F0F0EE]">
            <Search size={22} className="text-[#A1A1A1] shrink-0" strokeWidth={1.8} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search NEXORA..."
              className="flex-1 text-xl lg:text-2xl font-medium text-[#0B0B0B] placeholder-[#D4D4D4] bg-transparent border-none outline-none"
            />
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center hover:bg-[#EBEBEB] transition-colors ml-2"
              aria-label="close search"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 lg:px-16 py-8">
            {query.trim().length < 2 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl">
                {/* Recent */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={14} className="text-[#A1A1A1]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1]">
                      Recent
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="flex items-center gap-3 py-2 text-sm font-medium text-[#0B0B0B] hover:text-[#4F7FFF] transition-colors text-left group"
                      >
                        <span className="flex-1">{term}</span>
                        <ArrowUpRight
                          size={14}
                          className="text-[#A1A1A1] opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={14} className="text-[#A1A1A1]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1]">
                      Trending
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 rounded-full border border-[#E5E5E3] text-sm font-medium text-[#0B0B0B] hover:border-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-white transition-all duration-200"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#A1A1A1] mb-6">
                  {results.length} result{results.length !== 1 && 's'} for "{query}"
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F7F7F5] transition-colors group"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F0F0EE] shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A1A1A1]">
                          {product.category}
                        </p>
                        <p className="text-sm font-semibold text-[#0B0B0B] group-hover:text-[#4F7FFF] transition-colors leading-snug truncate">
                          {product.name}
                        </p>
                        <p className="text-sm font-bold text-[#0B0B0B] mt-0.5">
                          ₹{product.price.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center mt-20">
                <p className="text-lg font-medium text-[#A1A1A1]">No results for "{query}"</p>
                <p className="text-sm text-[#C4C4C4] mt-1">Try a different term.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
