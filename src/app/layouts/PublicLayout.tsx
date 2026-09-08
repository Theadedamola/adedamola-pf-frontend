import { Outlet } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function PublicLayout() {
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
