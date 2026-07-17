import { Play, Clock } from 'lucide-react';

export default function VideoCard({ title, thumbnail, duration, author, views }) {
  return (
    <div className="glass-card p-0 overflow-hidden group cursor-pointer hover:border-brand-primary/50 transition-colors">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
            <Play className="text-white fill-white ml-1" size={20} />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold">
          {duration}
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-sm line-clamp-2 mb-2 group-hover:text-brand-primary transition-colors">
          {title}
        </h4>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[10px] text-slate-500 font-medium">{author}</span>
          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
            <Clock size={10} />
            <span>{views} views</span>
          </div>
        </div>
      </div>
    </div>
  );
}
