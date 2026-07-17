import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  BarChart2, 
  Trophy, 
  Settings, 
  LogOut,
  Youtube
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: GraduationCap, label: 'Skills', path: '/skills' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: Trophy, label: 'Achievements', path: '/achievements' },
];

export default function Sidebar() {
  return (
    <aside className="h-full glass border-r border-white/5 flex flex-col p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center">
          <Youtube className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight">SkillUp</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="pt-6 border-t border-white/5 space-y-2">
        <button className="nav-link w-full">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <button className="nav-link w-full text-red-400 hover:bg-red-400/10 hover:text-red-300">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
