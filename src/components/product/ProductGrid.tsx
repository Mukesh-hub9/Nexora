import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  subtitle,
  columns = 4,
}) => {
  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  return (
    <section className="w-full">
      {(title || subtitle) && (
        <div className="mb-10">
          {title && (
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0B0B] tracking-tight mb-2">
              {title}
            </h2>
          )}
          {subtitle && <p className="text-[#A1A1A1] text-sm lg:text-base">{subtitle}</p>}
        </div>
      )}
      <div className={`grid ${colClass} gap-4 lg:gap-6`}>
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
