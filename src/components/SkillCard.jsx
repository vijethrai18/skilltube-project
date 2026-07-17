import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProgressBar from './ProgressBar';

export default function SkillCard({ skill, onContinue }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card glass-card-hover flex flex-col h-full group"
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skill.color} p-3.5 mb-6 group-hover:scale-110 transition-transform`}>
        <skill.icon className="text-white w-full h-full" />
      </div>

      <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
      <p className="text-slate-400 text-sm mb-6 flex-1 italic line-clamp-2">
        "{skill.description}"
      </p>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-slate-400 font-medium">Progress</span>
          <span className="text-white font-bold">{skill.progress}%</span>
        </div>
        
        <ProgressBar progress={skill.progress} color={`bg-gradient-to-r ${skill.color}`} />

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-500">{skill.count || '20+ Videos'}</span>
          <button 
            onClick={() => onContinue(skill.id)}
            className="flex items-center gap-2 text-brand-primary font-semibold hover:text-white transition-colors"
          >
            {skill.progress > 0 ? 'Continue' : 'Start Path'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
