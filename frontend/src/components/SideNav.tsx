import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Icon Components
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const SavedPortfoliosIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export function SideNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: DashboardIcon, label: 'Dashboard', path: '/dashboard', id: 'dashboard' },
    { icon: SavedPortfoliosIcon, label: 'Saved Portfolios', path: '/saved-portfolios', id: 'saved-portfolios' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 backdrop-blur-xl bg-gradient-to-b from-gray-900/90 to-gray-800/90 border-r border-white/10 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-3 border-b border-gray-700">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
            />
          </svg>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="py-4">
        {navItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <div key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center px-4 py-4 mx-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 group ${
                    isCollapsed ? 'justify-center' : ''
                  } ${isActive ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : ''}`
                }
                title={isCollapsed ? item.label : undefined}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></div>
                )}
                <span className={`flex-shrink-0 ${active ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400 transition-colors'}`}>
                  <item.icon />
                </span>
                {!isCollapsed && (
                  <span className={`ml-3 text-sm font-medium ${active ? 'text-blue-300' : ''}`}>
                    {item.label}
                  </span>
                )}
              </NavLink>
              {index < navItems.length - 1 && !isCollapsed && (
                <div className="border-b border-gray-700 mx-4 my-2"></div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

