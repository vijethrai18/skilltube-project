import { Bell, Search, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 glass sticky top-0 z-40 border-b border-white/5 flex items-center justify-between px-4 md:px-8">
      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5 w-64 lg:w-96">
        <Search className="text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search courses, skills..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-500"
        />
      </div>

      {/* Mobile Logo / Placeholder */}
      <div className="lg:hidden flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
          <span className="text-sm font-bold">S</span>
        </div>
        <span className="font-bold">SkillUp</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
          <Bell size={20} className="text-slate-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-accent rounded-full border-2 border-brand-dark"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">Vikas Kumar</p>
            <p className="text-xs text-slate-400">Pro Student</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-brand-primary p-0.5">
            <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
               <User size={24} className="text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
