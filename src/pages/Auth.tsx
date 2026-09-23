import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const inputClass =
  'w-full px-4 py-3.5 rounded-xl border border-[#E5E5E3] text-sm text-[#0B0B0B] placeholder-[#A1A1A1] focus:outline-none focus:border-[#0B0B0B] transition-colors bg-white';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const { login, signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
        showToast('Welcome back to NEXORA!');
      } else {
        if (form.password !== form.confirm) {
          showToast('Passwords do not match', 'error');
          setLoading(false);
          return;
        }
        await signup(form.name, form.email, form.password);
        showToast('Account created! Welcome to NEXORA.');
      }
      navigate('/');
    } catch {
      showToast('Something went wrong. Please try again.', 'error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — Image */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85"
          alt="NEXORA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/20 flex flex-col justify-end p-16">
          <Link to="/" className="text-3xl font-black text-white tracking-tight mb-4">NEXORA</Link>
          <p className="text-white/70 text-lg max-w-xs leading-relaxed">
            "Discover What's Next." Premium essentials for the modern lifestyle.
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex flex-col justify-center px-6 py-16 lg:px-16 bg-white">
        <Link to="/" className="text-xl font-black text-[#0B0B0B] mb-10 lg:hidden">NEXORA</Link>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm mx-auto lg:mx-0"
          >
            <h1 className="text-3xl font-black text-[#0B0B0B] tracking-tight mb-2">
              {mode === 'login' ? 'Welcome back.' : 'Create your account.'}
            </h1>
            <p className="text-sm text-[#A1A1A1] mb-8">
              {mode === 'login'
                ? "Sign in to access your NEXORA account."
                : "Join NEXORA for exclusive access and early drops."}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1A1] mb-1.5">Full Name</label>
                  <input
                    required
                    className={inputClass}
                    placeholder="Arjun Mehta"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1A1] mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  className={inputClass}
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1A1] mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className={`${inputClass} pr-12`}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#0B0B0B] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1A1] mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    required
                    className={inputClass}
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  />
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-[#A1A1A1] hover:text-[#0B0B0B] transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0B0B0B] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#171717] transition-colors disabled:opacity-60 mt-2"
              >
                {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[#F0F0EE]" />
              <span className="text-xs text-[#A1A1A1] font-medium">or continue with</span>
              <div className="flex-1 h-px bg-[#F0F0EE]" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {['Google', 'Apple'].map((provider) => (
                <button
                  key={provider}
                  className="border border-[#E5E5E3] rounded-xl py-3 text-sm font-medium text-[#0B0B0B] hover:border-[#0B0B0B] hover:bg-[#F7F7F5] transition-all duration-200"
                >
                  {provider}
                </button>
              ))}
            </div>

            <p className="text-sm text-[#A1A1A1] text-center">
              {mode === 'login' ? "New to NEXORA? " : "Already have an account? "}
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-[#0B0B0B] font-semibold hover:text-[#4F7FFF] transition-colors"
              >
                {mode === 'login' ? 'Create an account' : 'Sign in'}
              </button>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
