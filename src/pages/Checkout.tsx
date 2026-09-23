import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, CreditCard, Smartphone, Building2, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

type Step = 'information' | 'shipping' | 'payment' | 'confirmation';

const steps: { id: Step; label: string }[] = [
  { id: 'information', label: 'Information' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirmation', label: 'Confirmation' },
];

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-[#E5E5E3] text-sm text-[#0B0B0B] placeholder-[#A1A1A1] focus:outline-none focus:border-[#0B0B0B] transition-colors bg-white';
const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-[#A1A1A1] mb-1.5';

const Checkout: React.FC = () => {
  const [step, setStep] = useState<Step>('information');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card');
  const [loading, setLoading] = useState(false);
  const { items, subtotal, clearCart } = useCart();

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;
  const stepIndex = steps.findIndex((s) => s.id === step);

  const advance = async () => {
    if (step === 'payment') {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));
      setLoading(false);
      clearCart();
      setStep('confirmation');
    } else {
      const order: Step[] = ['information', 'shipping', 'payment', 'confirmation'];
      setStep(order[order.indexOf(step) + 1]);
    }
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-white pt-20 lg:pt-24 flex flex-col items-center justify-center gap-6 px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-[#0B0B0B] tracking-tight">Order Confirmed!</h1>
          <p className="text-[#A1A1A1] max-w-sm">
            Thank you for your order. We'll send a confirmation to your email and dispatch it within 24 hours.
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1]">
            Order #NXR-{Math.floor(Math.random() * 90000) + 10000}
          </p>
          <div className="flex gap-3 mt-4">
            <Link to="/shop" className="bg-[#0B0B0B] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#171717] transition-colors text-sm">
              Continue Shopping
            </Link>
            <Link to="/" className="border border-[#E5E5E3] text-[#0B0B0B] font-semibold px-8 py-3.5 rounded-full hover:border-[#0B0B0B] transition-colors text-sm">
              Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] pt-20 lg:pt-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10">
        {/* Logo */}
        <Link to="/" className="block text-xl font-black text-[#0B0B0B] tracking-tight mb-8">NEXORA</Link>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-10">
          {steps.slice(0, 3).map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={`flex items-center gap-2 text-xs font-semibold ${stepIndex >= i ? 'text-[#0B0B0B]' : 'text-[#A1A1A1]'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border ${stepIndex > i ? 'bg-[#0B0B0B] border-[#0B0B0B] text-white' : stepIndex === i ? 'border-[#0B0B0B] text-[#0B0B0B]' : 'border-[#D4D4D4] text-[#A1A1A1]'}`}>
                  {stepIndex > i ? <CheckCircle size={12} /> : i + 1}
                </div>
                <span className="hidden sm:block">{s.label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-px ${stepIndex > i ? 'bg-[#0B0B0B]' : 'bg-[#E5E5E3]'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 lg:p-8"
              >
                {step === 'information' && (
                  <>
                    <h2 className="font-bold text-[#0B0B0B] text-xl mb-6">Contact Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div><label className={labelClass}>Full Name</label><input className={inputClass} placeholder="Arjun Mehta" /></div>
                      <div><label className={labelClass}>Email</label><input type="email" className={inputClass} placeholder="arjun@email.com" /></div>
                    </div>
                    <div className="mb-6"><label className={labelClass}>Phone</label><input type="tel" className={inputClass} placeholder="+91 98765 43210" /></div>
                    <h2 className="font-bold text-[#0B0B0B] text-xl mb-6">Shipping Address</h2>
                    <div className="flex flex-col gap-4">
                      <div><label className={labelClass}>Address Line</label><input className={inputClass} placeholder="123, MG Road, Apt 4B" /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className={labelClass}>City</label><input className={inputClass} placeholder="Mumbai" /></div>
                        <div><label className={labelClass}>State</label><input className={inputClass} placeholder="Maharashtra" /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className={labelClass}>PIN Code</label><input className={inputClass} placeholder="400001" /></div>
                        <div><label className={labelClass}>Country</label><input className={inputClass} value="India" readOnly /></div>
                      </div>
                    </div>
                  </>
                )}

                {step === 'shipping' && (
                  <>
                    <h2 className="font-bold text-[#0B0B0B] text-xl mb-6">Shipping Method</h2>
                    {[
                      { id: 'standard', label: 'Standard Delivery', desc: '3–5 business days', price: subtotal >= 999 ? 'Free' : '₹99' },
                      { id: 'express', label: 'Express Delivery', desc: '1–2 business days', price: '₹199' },
                    ].map((opt) => (
                      <label key={opt.id} className="flex items-center justify-between p-4 rounded-2xl border border-[#E5E5E3] hover:border-[#0B0B0B] transition-colors cursor-pointer mb-3">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="shipping" defaultChecked={opt.id === 'standard'} className="accent-[#0B0B0B]" />
                          <div>
                            <p className="font-semibold text-sm text-[#0B0B0B]">{opt.label}</p>
                            <p className="text-xs text-[#A1A1A1]">{opt.desc}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-bold ${opt.price === 'Free' ? 'text-green-600' : 'text-[#0B0B0B]'}`}>{opt.price}</span>
                      </label>
                    ))}
                  </>
                )}

                {step === 'payment' && (
                  <>
                    <h2 className="font-bold text-[#0B0B0B] text-xl mb-6">Payment Method</h2>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        { id: 'card', icon: CreditCard, label: 'Card' },
                        { id: 'upi', icon: Smartphone, label: 'UPI' },
                        { id: 'netbanking', icon: Building2, label: 'Net Banking' },
                        { id: 'cod', icon: Truck, label: 'Cash on Delivery' },
                      ].map(({ id, icon: Icon, label }) => (
                        <button
                          key={id}
                          onClick={() => setPaymentMethod(id as typeof paymentMethod)}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${paymentMethod === id ? 'border-[#0B0B0B] bg-[#0B0B0B] text-white' : 'border-[#E5E5E3] text-[#0B0B0B] hover:border-[#0B0B0B]'}`}
                        >
                          <Icon size={16} /> {label}
                        </button>
                      ))}
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="flex flex-col gap-4">
                        <div><label className={labelClass}>Card Number</label><input className={inputClass} placeholder="1234 5678 9012 3456" /></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div><label className={labelClass}>Expiry</label><input className={inputClass} placeholder="MM / YY" /></div>
                          <div><label className={labelClass}>CVV</label><input className={inputClass} placeholder="•••" /></div>
                        </div>
                        <div><label className={labelClass}>Name on Card</label><input className={inputClass} placeholder="Arjun Mehta" /></div>
                      </div>
                    )}
                    {paymentMethod === 'upi' && (
                      <div><label className={labelClass}>UPI ID</label><input className={inputClass} placeholder="yourname@upi" /></div>
                    )}
                    {paymentMethod === 'cod' && (
                      <p className="text-sm text-[#A1A1A1] bg-[#F7F7F5] rounded-xl p-4">Pay with cash when your order is delivered. Available for orders under ₹5,000.</p>
                    )}
                  </>
                )}

                <button
                  onClick={advance}
                  disabled={loading}
                  className="mt-8 w-full bg-[#0B0B0B] text-white font-semibold py-4 rounded-2xl hover:bg-[#171717] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? 'Processing...' : step === 'payment' ? 'Place Order →' : 'Continue →'}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 sticky top-28">
              <h2 className="font-bold text-[#0B0B0B] mb-5">Order Summary</h2>
              <div className="flex flex-col gap-4 mb-5 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F7F7F5]">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#A1A1A1] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#0B0B0B] truncate">{item.product.name}</p>
                      <p className="text-xs text-[#A1A1A1]">{item.selectedSize || item.product.category}</p>
                    </div>
                    <span className="text-xs font-bold text-[#0B0B0B] shrink-0">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#F0F0EE] pt-4 flex flex-col gap-2">
                <div className="flex justify-between text-sm"><span className="text-[#A1A1A1]">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#A1A1A1]">Shipping</span><span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                <div className="flex justify-between font-bold text-[#0B0B0B] pt-2 border-t border-[#F0F0EE]"><span>Total</span><span className="text-lg">₹{total.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
