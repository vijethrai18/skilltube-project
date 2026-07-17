import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Award,
  ChevronDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const weeklyData = [
  { day: 'M', mins: 120 },
  { day: 'T', mins: 240 },
  { day: 'W', mins: 180 },
  { day: 'T', mins: 300 },
  { day: 'F', mins: 150 },
  { day: 'S', mins: 360 },
  { day: 'S', mins: 210 },
];

const skillData = [
  { name: 'Web Dev', value: 70, color: '#6366f1' },
  { name: 'Python', value: 45, color: '#3b82f6' },
  { name: 'DSA', value: 20, color: '#8b5cf6' },
  { name: 'ML', value: 10, color: '#10b981' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Generate heatmap data
const heatmapData = Array.from({ length: 52 }, (_, i) => 
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 4))
);

export default function Analytics() {
  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Insights</h1>
          <p className="text-slate-400">Track your growth and learning patterns.</p>
        </div>
        <button className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
          Download Report <ChevronDown size={16} />
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card flex items-center gap-5">
           <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center">
              <TrendingUp className="text-brand-primary" size={24} />
           </div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Average Daily Focus</p>
              <h3 className="text-2xl font-bold">3.2 Hours</h3>
           </div>
        </div>
        <div className="glass-card flex items-center gap-5">
           <div className="w-12 h-12 rounded-2xl bg-orange-400/20 flex items-center justify-center">
              <Zap className="text-orange-400" size={24} />
           </div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Focus Streak</p>
              <h3 className="text-2xl font-bold">12 Days</h3>
           </div>
        </div>
        <div className="glass-card flex items-center gap-5">
           <div className="w-12 h-12 rounded-2xl bg-purple-400/20 flex items-center justify-center">
              <Award className="text-purple-400" size={24} />
           </div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Skills Mastered</p>
              <h3 className="text-2xl font-bold">4 Tracks</h3>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Minutes */}
        <div className="glass-card">
          <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
            <Target size={20} className="text-brand-primary" />
            Learning Time (Minutes)
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                />
                <Bar 
                  dataKey="mins" 
                  fill="#6366f1" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                >
                  {weeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#ec4899' : '#6366f1'} opacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Completion */}
        <div className="glass-card flex flex-col">
          <h3 className="text-lg font-bold mb-8">Skill Completion %</h3>
          <div className="h-[250px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {skillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {skillData.map((skill) => (
              <div key={skill.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }} />
                <span className="text-xs text-slate-400">{skill.name} ({skill.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="glass-card overflow-x-auto">
        <h3 className="text-lg font-bold mb-6">Learning Heatmap</h3>
        <div className="flex gap-[3px] min-w-[800px]">
          {heatmapData.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dIndex) => {
                const colors = ['bg-white/5', 'bg-brand-primary/20', 'bg-brand-primary/50', 'bg-brand-primary'];
                return (
                  <div 
                    key={dIndex} 
                    className={`w-3 h-3 rounded-sm ${colors[day]} transition-colors hover:scale-125 cursor-pointer`}
                    title={`${day === 0 ? 'No activity' : day + ' hours'} on Day ${dIndex + 1}, Week ${wIndex + 1}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-3 mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
           <span>Less</span>
           <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-sm bg-white/5" />
              <div className="w-2.5 h-2.5 rounded-sm bg-brand-primary/20" />
              <div className="w-2.5 h-2.5 rounded-sm bg-brand-primary/50" />
              <div className="w-2.5 h-2.5 rounded-sm bg-brand-primary" />
           </div>
           <span>More</span>
        </div>
      </div>
    </div>
  );
}
