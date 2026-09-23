import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    showToast(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
    showToast(
      wishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      wishlisted ? 'info' : 'success'
    );
  };

  // Compute wishlist button top offset to avoid overlapping badge/discount
  const wishlistTop = product.badge && product.discount ? 68 : (product.badge || product.discount) ? 40 : 12;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div
        className="relative overflow-hidden rounded-2xl bg-[#F7F7F5] aspect-[3/4]"
        onMouseEnter={() => {
          setHovered(true);
          if (product.images.length > 1) setImageIndex(1);
        }}
        onMouseLeave={() => {
          setHovered(false);
          setImageIndex(0);
        }}
      >
        {/* Product Image */}
        <motion.img
          key={imageIndex}
          src={product.images[imageIndex]}
          alt={product.name}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge — top-left */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={product.badge} />
          </div>
        )}

        {/* Discount — top-right */}
        {product.discount && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          </div>
        )}

        {/* Wishlist — right side, offset below discount if present */}
        <button
          onClick={handleWishlist}
          className={`absolute right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? 'bg-[#0B0B0B] text-white'
              : 'bg-white/90 text-[#0B0B0B] opacity-0 group-hover:opacity-100'
          }`}
          style={{ top: `${wishlistTop}px` }}
          aria-label="wishlist"
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-3 right-3 z-10"
            >
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#0B0B0B] text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#171717] transition-colors duration-200"
              >
                <ShoppingBag size={15} />
                Quick Add
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A1A1A1] mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-[#0B0B0B] leading-snug mb-1 group-hover:text-[#4F7FFF] transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-xs text-[#A1A1A1] mb-2 line-clamp-1">{product.shortDescription}</p>
        <Rating value={product.rating} count={product.reviewCount} size={12} />
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-bold text-[#0B0B0B]">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-[#A1A1A1] line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
