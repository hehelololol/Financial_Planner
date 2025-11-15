import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export function NavBar() {
  const { currentUser, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
      console.error('Logout error:', error);
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-xl bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border-b border-white/10 shadow-lg"
      style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
    >
      <div className="h-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/60 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h1 className="text-white font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Portfolio Planning
              </h1>
            </Link>
            {currentUser && (
              <nav className="hidden md:flex items-center gap-2">
                <Link
                  to="/about"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === '/about'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  About
                </Link>
              </nav>
            )}
          </div>
          {currentUser && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-600 border border-gray-600 flex items-center justify-center group-hover:border-blue-500/50 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="hidden sm:block text-sm font-medium max-w-[150px] truncate">{currentUser.email}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${showMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 backdrop-blur-xl animate-fade-in">
                  <div className="py-2">
                    <div className="px-4 py-3 text-sm text-gray-400 border-b border-gray-700">
                      {currentUser.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

