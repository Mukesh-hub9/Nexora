import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, X, Search } from 'lucide-react';
import { products, categories } from '../data/products';
import type { FilterState, SortOption } from '../types';
import ProductGrid from '../components/product/ProductGrid';

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: searchParams.get('category') ? [searchParams.get('category')!] : [],
    priceRange: [0, 10000],
    minRating: 0,
    inStockOnly: false,
    sortBy: 'featured',
  });

  const filtered = useMemo(() => {
    let result = [...products];

    // Preset filter
    const preset = searchParams.get('filter');
    if (preset === 'new') result = result.filter((p) => p.isNewArrival);
    else if (preset === 'bestsellers') result = result.filter((p) => p.isBestSeller);

    // Category
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.categorySlug));
    }

    // Price
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Rating
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // In stock
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.filter((p) => p.isNewArrival).concat(result.filter((p) => !p.isNewArrival));
        break;
      case 'best-selling':
        result = result.filter((p) => p.isBestSeller).concat(result.filter((p) => !p.isBestSeller));
        break;
    }

    return result;
  }, [filters, searchQuery, searchParams]);

  const toggleCategory = (slug: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(slug)
        ? prev.categories.filter((c) => c !== slug)
        : [...prev.categories, slug],
    }));
  };

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      {/* Header */}
      <div className="bg-[#F7F7F5] py-10 lg:py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#A1A1A1] mb-5">
            <Link to="/" className="hover:text-[#0B0B0B] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#0B0B0B] font-medium">Shop</span>
          </nav>
          <h1 className="text-3xl lg:text-5xl font-black text-[#0B0B0B] tracking-tight mb-2">
            Shop NEXORA
          </h1>
          <p className="text-[#A1A1A1]">Explore our curated collection.</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1A1]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E5E3] text-sm text-[#0B0B0B] placeholder-[#A1A1A1] focus:outline-none focus:border-[#0B0B0B] transition-colors bg-[#F7F7F5]"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as SortOption }))}
              className="px-4 py-2.5 rounded-xl border border-[#E5E5E3] text-sm text-[#0B0B0B] bg-[#F7F7F5] focus:outline-none focus:border-[#0B0B0B] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="best-selling">Best Selling</option>
            </select>

            {/* Filter toggle */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5E5E3] text-sm font-medium text-[#0B0B0B] hover:border-[#0B0B0B] transition-colors bg-[#F7F7F5]"
            >
              <SlidersHorizontal size={15} />
              Filters
              {(filters.categories.length > 0 || filters.minRating > 0) && (
                <span className="w-4 h-4 bg-[#4F7FFF] text-white text-[10px] rounded-full flex items-center justify-center">
                  {filters.categories.length + (filters.minRating > 0 ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mb-8 p-6 bg-[#F7F7F5] rounded-2xl border border-[#E5E5E3]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Category */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3">Category</p>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(cat.slug)}
                        onChange={() => toggleCategory(cat.slug)}
                        className="accent-[#0B0B0B] w-3.5 h-3.5"
                      />
                      <span className="text-sm text-[#0B0B0B] group-hover:text-[#4F7FFF] transition-colors">
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3">
                  Max Price: ₹{filters.priceRange[1].toLocaleString()}
                </p>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={500}
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, priceRange: [0, Number(e.target.value)] }))
                  }
                  className="w-full accent-[#0B0B0B]"
                />
                <div className="flex justify-between text-xs text-[#A1A1A1] mt-1">
                  <span>₹0</span>
                  <span>₹10,000</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3">Min Rating</p>
                <div className="flex flex-col gap-2">
                  {[4.5, 4.0, 3.5, 0].map((r) => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={filters.minRating === r}
                        onChange={() => setFilters((prev) => ({ ...prev, minRating: r }))}
                        className="accent-[#0B0B0B]"
                      />
                      <span className="text-sm text-[#0B0B0B]">
                        {r === 0 ? 'All' : `${r}+ ★`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3">
                  Availability
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
                    className="accent-[#0B0B0B] w-3.5 h-3.5"
                  />
                  <span className="text-sm text-[#0B0B0B]">In Stock Only</span>
                </label>
                <button
                  onClick={() =>
                    setFilters({
                      categories: [],
                      priceRange: [0, 10000],
                      minRating: 0,
                      inStockOnly: false,
                      sortBy: 'featured',
                    })
                  }
                  className="mt-6 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                >
                  <X size={12} /> Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-sm text-[#A1A1A1] mb-6">
          {filtered.length} product{filtered.length !== 1 && 's'} found
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="text-center py-24">
            <p className="text-lg font-semibold text-[#0B0B0B] mb-2">No products found</p>
            <p className="text-sm text-[#A1A1A1]">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
