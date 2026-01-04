import { useLocation } from 'react-router-dom';

export const usePathContext = () => {
  const { pathname } = useLocation();
  
  const segments = pathname.split('/').filter(Boolean);
  const isHome = pathname === '/';
  const isAdmin = pathname.startsWith('/admin');
  
  return {
    pathname,
    segments,
    isHome,
    isAdmin,
  };
};
