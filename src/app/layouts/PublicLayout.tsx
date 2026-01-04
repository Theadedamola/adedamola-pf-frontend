import { Outlet } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import Navbar from '@/components/common/Navbar';

export default function PublicLayout() {
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <footer className="bg-white text-gray-500 p-8 text-center font-mono text-sm border-t border-gray-100">
        <p>&copy; {new Date().getFullYear()} Adedamola. All rights reserved.</p>
      </footer>
    </div>
  );
}
