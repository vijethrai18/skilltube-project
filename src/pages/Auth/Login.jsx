import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Github, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-slate-400">Continue your learning journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="email" 
              placeholder="name@example.com"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-brand-primary outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 focus:border-brand-primary outline-none transition-colors"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm px-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-brand-primary h-4 w-4 rounded" />
            <span className="text-slate-400">Remember me</span>
          </label>
          <a href="#" className="text-brand-primary hover:underline">Forgot password?</a>
        </div>

        <button type="submit" className="btn-primary w-full py-4 text-lg">
          Sign In
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-brand-dark px-2 text-slate-500 font-medium">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
          <Chrome size={20} className="text-brand-primary" />
          <span>Google</span>
        </button>
        <button className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
          <Github size={20} />
          <span>GitHub</span>
        </button>
      </div>

      <p className="text-center mt-8 text-slate-400">
        Don't have an account? <Link to="/signup" className="text-brand-primary font-semibold hover:underline">Sign up</Link>
      </p>
    </motion.div>
  );
}
