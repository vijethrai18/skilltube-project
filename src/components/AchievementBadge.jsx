import { CheckCircle2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AchievementBadge({ title, desc, icon, unlocked, date, progress }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`glass-card p-5 border flex items-start gap-4 ${unlocked ? 'border-brand-primary/30 shadow-lg shadow-brand-primary/5' : 'border-white/5 opacity-80'}`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${unlocked ? 'bg-brand-primary/10' : 'bg-white/5'}`}>
        {unlocked ? icon : <Lock size={20} className="text-slate-500" />}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-sm mb-1">{title}</h4>
        <p className="text-xs text-slate-500 mb-3 line-clamp-1">{desc}</p>
        
        {unlocked ? (
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 size={12} /> Earned {date}
          </span>
        ) : (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold mb-1">
              <span className="text-slate-600 uppercase">Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-slate-600 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
