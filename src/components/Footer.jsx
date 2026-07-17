import { Youtube, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
             <Youtube className="text-white" size={18} />
          </div>
          <span className="text-lg font-bold">SkillUp</span>
        </div>
        
        <p className="text-slate-500 text-sm">
          © 2023 SkillUp Learning. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a href="#" className="text-slate-500 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
