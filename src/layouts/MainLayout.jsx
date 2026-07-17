import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-brand-dark">
      {/* Sidebar - hidden on mobile, visible on lg */}
      <div className="hidden lg:block w-64 fixed inset-y-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
