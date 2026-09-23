import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import Rating from '../components/ui/Rating';
import Badge from '../components/ui/Badge';
import ProductGrid from '../components/product/ProductGrid';

const getProductReviews = (product: { name: string; category: string }) => [
  {
    name: 'Arjun M.',
    rating: 5,
    text: `Absolutely love the ${product.name}. The build quality and attention to detail are top-tier. Arrived in pristine minimal packaging.`,
    date: 'Sep 2026',
    verified: true,
    helpful: 24,
  },
  {
    name: 'Priya R.',
    rating: 5,
    text: `Exactly what I was looking for in ${product.category.toLowerCase()}. Minimalist aesthetics paired with genuine durability. Highly recommended.`,
    date: 'Aug 2026',
    verified: true,
    helpful: 18,
  },
  {
    name: 'Karan S.',
    rating: 4,
    text: `Great product overall! Solid feel, sleek profile, and fast shipping. Will definitely be buying more from NEXORA.`,
    date: 'Aug 2026',
    verified: true,
    helpful: 9,
  },
  {
    name: 'Sneha T.',
    rating: 5,
    text: `Exceeded my expectations. The finish is flawless and it has already become an indispensable part of my daily routine.`,
    date: 'Jul 2026',
    verified: true,
    helpful: 14,
  },
];

const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#F0F0EE] py-4">
      <button
        className="flex items-center justify-between w-full text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-[#0B0B0B] text-sm">{title}</span>
        {open ? <ChevronUp size={16} className="text-[#A1A1A1]" /> : <ChevronDown size={16} className="text-[#A1A1A1]" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-3 text-sm text-[#A1A1A1] leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = product ? isWishlisted(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <p className="text-xl font-bold text-[#0B0B0B]">Product not found</p>
        <Link to="/shop" className="text-sm text-[#4F7FFF] hover:underline">← Back to Shop</Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const productReviews = getProductReviews(product);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    showToast(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#A1A1A1] mb-8">
          <Link to="/" className="hover:text-[#0B0B0B] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-[#0B0B0B] transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${product.categorySlug}`} className="hover:text-[#0B0B0B] transition-colors">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#0B0B0B] font-medium truncate max-w-[120px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-[#0B0B0B]' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 relative overflow-hidden rounded-3xl bg-[#F7F7F5] aspect-[4/5]">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant={product.badge} />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl lg:text-4xl font-black text-[#0B0B0B] tracking-tight mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <Rating value={product.rating} count={product.reviewCount} size={15} />
              <span className="text-sm text-[#A1A1A1]">{product.rating} / 5</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black text-[#0B0B0B]">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-lg text-[#A1A1A1] line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
              {product.discount && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            <p className="text-[#A1A1A1] text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3">Color</p>
                <div className="flex gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-[#0B0B0B] scale-110' : 'border-white shadow-md'
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3">Size / Variant</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-[#0B0B0B] bg-[#0B0B0B] text-white'
                          : 'border-[#E5E5E3] text-[#0B0B0B] hover:border-[#0B0B0B]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-3">Quantity</p>
              <div className="flex items-center gap-3 bg-[#F7F7F5] rounded-xl p-1 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="font-bold text-[#0B0B0B] w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#0B0B0B] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#171717] transition-colors"
              >
                <ShoppingBag size={18} strokeWidth={1.8} />
                Add to Cart
              </button>
              <button
                onClick={() => { toggle(product); showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', wishlisted ? 'info' : 'success'); }}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all ${
                  wishlisted ? 'bg-[#0B0B0B] text-white border-[#0B0B0B]' : 'border-[#E5E5E3] text-[#0B0B0B] hover:border-[#0B0B0B]'
                }`}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
            <button
              onClick={handleBuyNow}
              className="w-full border-2 border-[#0B0B0B] text-[#0B0B0B] font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#0B0B0B] hover:text-white transition-all duration-200 mb-8"
            >
              <Zap size={18} />
              Buy Now
            </button>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4 py-6 border-t border-[#F0F0EE]">
              {[
                { icon: Truck, text: 'Free shipping over ₹999' },
                { icon: ShieldCheck, text: 'Secure checkout' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-[#A1A1A1]">
                  <Icon size={14} strokeWidth={1.6} />
                  {text}
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="mt-4">
              <AccordionItem title="Product Details">
                <p>{product.description}</p>
              </AccordionItem>
              {product.specifications && (
                <AccordionItem title="Specifications">
                  <div className="flex flex-col gap-2">
                    {product.specifications.map(({ label, value }) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-[#0B0B0B] font-medium">{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              )}
              <AccordionItem title="Shipping & Returns">
                <p>
                  Free standard shipping on orders over ₹999. Delivery within 2–5 business days across India.
                  Easy 30-day returns — no questions asked for undamaged items.
                </p>
              </AccordionItem>
              <AccordionItem title={`Reviews (${productReviews.length})`}>
                <div className="flex flex-col gap-5 mt-2">
                  {productReviews.map((r) => (
                    <div key={r.name} className="border-b border-[#F0F0EE] pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#0B0B0B] text-sm">{r.name}</span>
                          {r.verified && (
                            <span className="text-[10px] font-bold text-[#4F7FFF] bg-[#4F7FFF]/10 px-1.5 py-0.5 rounded">
                              Verified
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#A1A1A1]">{r.date}</span>
                      </div>
                      <Rating value={r.rating} size={12} showCount={false} />
                      <p className="mt-2 text-[#0B0B0B] text-sm leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20 lg:mt-28">
            <ProductGrid
              products={related}
              title="You may also like"
              subtitle="More from this category."
              columns={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
