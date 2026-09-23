import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-20 lg:pt-24 flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 rounded-full bg-[#F7F7F5] flex items-center justify-center">
          <ShoppingBag size={32} className="text-[#A1A1A1]" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[#0B0B0B] mb-2">Your cart is empty</p>
          <p className="text-[#A1A1A1] text-sm">Add something beautiful to get started.</p>
        </div>
        <Link
          to="/shop"
          className="bg-[#0B0B0B] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#171717] transition-colors text-sm"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#A1A1A1] mb-8">
          <Link to="/" className="hover:text-[#0B0B0B] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[#0B0B0B] font-medium">Cart</span>
        </nav>

        <h1 className="text-3xl lg:text-4xl font-black text-[#0B0B0B] tracking-tight mb-10">
          Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-5 pb-6 border-b border-[#F0F0EE]"
              >
                <Link to={`/product/${item.product.id}`} className="w-24 h-28 rounded-2xl overflow-hidden bg-[#F7F7F5] shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A1] mb-1">{item.product.category}</p>
                  <Link to={`/product/${item.product.id}`} className="font-semibold text-[#0B0B0B] hover:text-[#4F7FFF] transition-colors text-sm block mb-1">
                    {item.product.name}
                  </Link>
                  {(item.selectedSize || item.selectedColor) && (
                    <p className="text-xs text-[#A1A1A1] mb-3">
                      {item.selectedSize}{item.selectedColor && ` · ${item.selectedColor}`}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 bg-[#F7F7F5] rounded-xl p-1">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors">
                        <Minus size={13} />
                      </button>
                      <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors">
                        <Plus size={13} />
                      </button>
                    </div>
                    <span className="font-bold text-[#0B0B0B]">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => { removeItem(item.product.id); showToast('Item removed', 'info'); }}
                  className="self-start text-[#A1A1A1] hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
            <button onClick={() => { clearCart(); showToast('Cart cleared', 'info'); }} className="self-start text-xs text-[#A1A1A1] hover:text-red-500 transition-colors font-medium mt-2">
              Clear cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#F7F7F5] rounded-3xl p-6 sticky top-28">
              <h2 className="font-bold text-[#0B0B0B] text-lg mb-6">Order Summary</h2>
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A1A1A1]">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#A1A1A1]">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#A1A1A1]">Add ₹{(999 - subtotal).toLocaleString()} more for free shipping</p>
                )}
                <div className="border-t border-[#E5E5E3] pt-3 flex justify-between">
                  <span className="font-bold text-[#0B0B0B]">Total</span>
                  <span className="font-black text-[#0B0B0B] text-lg">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#0B0B0B] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#171717] transition-colors mb-3"
              >
                Checkout <ArrowRight size={16} />
              </button>
              <Link to="/shop" className="block text-center text-sm text-[#A1A1A1] hover:text-[#0B0B0B] transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
