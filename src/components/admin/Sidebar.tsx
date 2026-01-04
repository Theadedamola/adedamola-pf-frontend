import { Link } from 'react-router-dom';
import { usePathContext } from '../../hooks/usePathContext';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { pathname } = usePathContext();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Projects', path: '/admin/projects' },
    { label: 'Blogs', path: '/admin/blogs' },
    { label: 'Media', path: '/admin/media' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full">
      <div className="p-8">
        <h2 className="text-xl font-bold tracking-wide">Admin</h2>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
