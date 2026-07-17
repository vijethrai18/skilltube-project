import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-secondary/20 blur-[120px] rounded-full animate-pulse" />
      
      <div className="w-full max-w-md relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
