export default function ProgressBar({ progress, color = 'bg-brand-primary' }) {
  return (
    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-out`} 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
