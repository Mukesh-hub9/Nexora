import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F0EE]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-[#0B0B0B]" strokeWidth={1.8} />
                <span className="font-bold text-[#0B0B0B]">
                  Cart {totalItems > 0 && `(${totalItems})`}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full bg-[#F7F7F5] flex items-center justify-center hover:bg-[#EBEBEB] transition-colors"
                aria-label="close cart"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#F7F7F5] flex items-center justify-center">
                    <ShoppingBag size={24} className="text-[#A1A1A1]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B0B0B] mb-1">Your cart is empty</p>
                    <p className="text-sm text-[#A1A1A1]">Add something beautiful.</p>
                  </div>
                  <button
                    onClick={() => { closeCart(); navigate('/shop'); }}
                    className="mt-2 bg-[#0B0B0B] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#171717] transition-colors"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4"
                      >
                        {/* Image */}
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={closeCart}
                          className="w-20 h-24 rounded-xl overflow-hidden bg-[#F7F7F5] shrink-0"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A1A1A1] mb-0.5">
                            {item.product.category}
                          </p>
                          <Link
                            to={`/product/${item.product.id}`}
                            onClick={closeCart}
                            className="text-sm font-semibold text-[#0B0B0B] hover:text-[#4F7FFF] transition-colors leading-snug block truncate"
                          >
                            {item.product.name}
                          </Link>
                          {(item.selectedColor || item.selectedSize) && (
                            <p className="text-xs text-[#A1A1A1] mt-0.5">
                              {item.selectedSize} {item.selectedColor && `· ${item.selectedColor}`}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-3">
                            {/* Qty */}
                            <div className="flex items-center gap-2 bg-[#F7F7F5] rounded-lg p-1">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-white transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-white transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-[#0B0B0B]">
                              ₹{(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="self-start mt-1 text-[#A1A1A1] hover:text-red-500 transition-colors"
                          aria-label="remove"
                        >
                          <Trash2 size={15} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#F0F0EE]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#A1A1A1]">Subtotal</span>
                  <span className="text-sm font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#A1A1A1]">Shipping</span>
                  <span className="text-sm font-semibold text-green-600">
                    {subtotal >= 999 ? 'Free' : '₹99'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#F0F0EE] mt-3 mb-5">
                  <span className="font-bold text-[#0B0B0B]">Total</span>
                  <span className="font-bold text-[#0B0B0B] text-lg">
                    ₹{(subtotal + (subtotal >= 999 ? 0 : 99)).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#0B0B0B] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#171717] transition-colors mb-3"
                >
                  Checkout
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={handleViewCart}
                  className="w-full border border-[#E5E5E3] text-[#0B0B0B] font-semibold py-3 rounded-xl hover:bg-[#F7F7F5] transition-colors text-sm"
                >
                  View Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
