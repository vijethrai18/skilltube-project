import { motion } from 'framer-motion';
import { 
  Play, 
  Flame, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  BookOpen,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 4 },
  { name: 'Wed', hours: 3.5 },
  { name: 'Thu', hours: 5 },
  { name: 'Fri', hours: 2 },
  { name: 'Sat', hours: 6 },
  { name: 'Sun', hours: 4.5 },
];

const stats = [
  { label: 'Videos Completed', value: '42', icon: Play, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Learning Streak', value: '12 Days', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { label: 'Weekly Hours', value: '27.5h', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { label: 'Total Progress', value: '68%', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
];

const sessions = [
  { title: 'Advanced React Patterns', skill: 'Web Development', time: '2 hours ago', icon: '⚛️' },
  { title: 'Binary Search Trees', skill: 'DSA with C++', time: 'Yesterday', icon: '🌲' },
  { title: 'Python List Comprehensions', skill: 'Python Dev', time: '2 days ago', icon: '🐍' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Good morning, Vikas! 👋</h1>
          <p className="text-slate-400">Here's what's happening with your learning today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
            <Calendar size={18} className="text-brand-primary" />
            <span className="text-sm font-medium">October 24, 2023</span>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card hover:bg-white/10 transition-colors cursor-default"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg">+12%</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2 glass-card">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold">Learning Activity</h3>
              <p className="text-sm text-slate-400">Your study hours for the past 7 days</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-lg text-sm px-3 py-1 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#6366f1' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Sessions</h3>
            <button className="text-xs text-brand-primary font-bold hover:underline">View All</button>
          </div>
          
          <div className="space-y-6">
            {sessions.map((session, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                  {session.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white leading-tight">{session.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{session.skill} • {session.time}</p>
                </div>
                <button className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                  <ChevronRight size={18} className="text-slate-500" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border border-brand-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen size={20} className="text-brand-primary" />
              <span className="font-bold text-sm">Learning Tip</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "Research shows that studying for 25 minutes followed by a 5-minute break improves retention by 40%."
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Learning */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <button className="text-sm text-brand-primary font-bold hover:underline flex items-center gap-1">
            Explore More <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="glass-card relative group overflow-hidden">
               <div className="aspect-video mb-4 rounded-xl overflow-hidden relative">
                  <img src={`https://picsum.photos/seed/${item+20}/400/225`} alt="Video Thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Play className="text-brand-dark ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold">12:45</span>
               </div>
               <h4 className="font-bold text-sm line-clamp-2">Mastering System Design: Scalability and High Availability</h4>
               <p className="text-xs text-slate-500 mt-2">Hitesh Choudhary • 1.2M views</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
