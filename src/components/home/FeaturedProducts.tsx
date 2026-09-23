import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { featuredProducts } from '../../data/products';
import ProductGrid from '../product/ProductGrid';

const FeaturedProducts: React.FC = () => {
  return (
    <section className="bg-[#F7F7F5] py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3 block">
              Featured
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0B0B] tracking-tight mb-2">
              Trending Now
            </h2>
            <p className="text-[#A1A1A1] text-sm">Designed for today. Ready for what's next.</p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#A1A1A1] hover:text-[#0B0B0B] transition-colors shrink-0"
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
