import { Bell, ChevronRight } from 'lucide-react';

export default function ReminderCard({ title, time, type }) {
  return (
    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2 py-0.5 bg-white/5 rounded-md">
          {type}
        </span>
        <span className="text-xs font-bold text-brand-secondary">{time}</span>
      </div>
      <h4 className="font-bold text-sm mb-3 group-hover:text-white transition-colors">{title}</h4>
      <div className="flex justify-end">
        <button className="text-xs font-bold text-slate-400 group-hover:text-brand-primary transition-colors flex items-center gap-1">
          Snooze <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
