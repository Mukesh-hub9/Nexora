import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { bestSellers } from '../../data/products';
import ProductGrid from '../product/ProductGrid';

const BestSellers: React.FC = () => {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3 block">
              Community Picks
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0B0B] tracking-tight">
              Customer Favorites
            </h2>
          </div>
          <Link
            to="/shop?filter=bestsellers"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#A1A1A1] hover:text-[#0B0B0B] transition-colors shrink-0"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <ProductGrid products={bestSellers} />
      </div>
    </section>
  );
};

export default BestSellers;
