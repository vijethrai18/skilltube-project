import { motion } from 'framer-motion';
import { 
  Bell, 
  Flame, 
  Trophy, 
  Star, 
  Target, 
  Lightbulb,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';

const achievements = [
  { id: 1, title: 'Early Bird', desc: 'Complete 5 lessons before 8 AM', icon: '☀️', unlocked: true, date: '2 days ago' },
  { id: 2, title: 'Code Warrior', desc: 'Maintain a 7-day learning streak', icon: '⚔️', unlocked: true, date: 'Yesterday' },
  { id: 3, title: 'Deep Diver', desc: 'Watch a video longer than 60 mins', icon: '🤿', unlocked: false, progress: 80 },
  { id: 4, title: 'Polyglot', desc: 'Start 3 different skill tracks', icon: '🌍', unlocked: true, date: 'Oct 20, 2023' },
  { id: 5, title: 'Speed Demon', desc: 'Finish a track in less than a week', icon: '⚡', unlocked: false, progress: 45 },
  { id: 6, title: 'Mentor', desc: 'Help 5 students in the comments', icon: '🤝', unlocked: false, progress: 0 },
];

const reminders = [
  { id: 1, title: 'Daily React Practice', time: '10:00 AM', type: 'Learning' },
  { id: 2, title: 'Python Project Submission', time: '04:00 PM', type: 'Project' },
  { id: 3, title: 'Review System Design', time: '08:00 PM', type: 'Review' },
];

export default function Achievements() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-10">
      <header>
        <h1 className="text-3xl font-bold mb-2">Achievements & Goals</h1>
        <p className="text-slate-400">Your milestones and upcoming reminders.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Streak & Motivation */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass rounded-3xl p-8 bg-gradient-to-br from-brand-primary/20 via-brand-secondary/10 to-transparent border border-white/10 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-brand-primary/5">
             <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-orange-500/30 flex items-center justify-center p-2">
                   <div className="w-full h-full rounded-full border-4 border-orange-500 flex items-center justify-center bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                      <Flame className="text-orange-500" size={48} fill="currentColor" />
                   </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-white text-brand-dark font-bold px-3 py-1 rounded-full text-sm">
                   12
                </div>
             </div>
             
             <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl font-bold mb-2">You're on Fire! 🔥</h2>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  You've maintained your learning streak for 12 consecutive days. <br />
                  Only 3 days left to unlock the <strong>"Fortnight Master"</strong> badge!
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                   <button className="btn-primary">View Leaderboard</button>
                   <button className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all">Set New Goal</button>
                </div>
             </div>
          </div>

          <div>
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                   <Trophy size={24} className="text-yellow-500" />
                   Milestones
                </h3>
                <span className="text-sm text-slate-400">Total: 1,240 XP</span>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((item) => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    className={`glass-card p-5 border flex items-start gap-4 ${item.unlocked ? 'border-brand-primary/30' : 'border-white/5 opacity-80'}`}
                  >
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${item.unlocked ? 'bg-brand-primary/10' : 'bg-white/5'}`}>
                        {item.unlocked ? item.icon : <Lock size={20} className="text-slate-500" />}
                     </div>
                     <div className="flex-1">
                        <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-500 mb-3">{item.desc}</p>
                        {item.unlocked ? (
                          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider flex items-center gap-1">
                             <CheckCircle2 size={12} /> Earned {item.date}
                          </span>
                        ) : (
                          <div className="space-y-1">
                             <div className="flex justify-between text-[10px] font-bold mb-1">
                                <span className="text-slate-600">IN PROGRESS</span>
                                <span>{item.progress}%</span>
                             </div>
                             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-600 rounded-full" style={{ width: `${item.progress}%` }} />
                             </div>
                          </div>
                        )}
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>

        {/* Reminders & Support */}
        <div className="space-y-8">
           <div className="glass-card">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-bold flex items-center gap-2">
                    <Bell size={20} className="text-brand-accent" />
                    Daily Reminders
                 </h3>
                 <button className="text-slate-500 hover:text-white transition-colors">
                    <Star size={18} />
                 </button>
              </div>

              <div className="space-y-4">
                 {reminders.map((rem) => (
                   <div key={rem.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2 py-0.5 bg-white/5 rounded-md">{rem.type}</span>
                         <span className="text-xs font-bold text-brand-secondary">{rem.time}</span>
                      </div>
                      <h4 className="font-bold text-sm mb-3">{rem.title}</h4>
                      <div className="flex justify-end">
                         <button className="text-xs font-bold text-slate-400 group-hover:text-brand-primary transition-colors flex items-center gap-1">
                            Snooze <ChevronRight size={14} />
                         </button>
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-3 border border-dashed border-white/10 rounded-2xl text-slate-500 text-sm font-medium hover:bg-white/5 transition-all">
                    + Add Reminder
                 </button>
              </div>
           </div>

           <div className="glass-card bg-gradient-to-br from-indigo-600 to-brand-primary p-0 overflow-hidden relative group">
              <div className="p-6 relative z-10">
                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                    <Lightbulb className="text-white" size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Need a Mentor?</h3>
                 <p className="text-indigo-100/80 text-sm leading-relaxed mb-6">
                    Connect with industry experts for personalized guidance on your learning path.
                 </p>
                 <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl active:scale-95 transition-transform">
                    Explore Mentorship
                 </button>
              </div>
              {/* Decorative circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
           </div>
        </div>
      </div>
    </div>
  );
}
