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
      className={`bg-white border-r border-fidelity transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      style={{ minHeight: 'calc(100vh - 60px)' }}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-3 border-b border-fidelity">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 text-fidelity-gray-medium hover:bg-fidelity-gray-light"
          aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          <svg
            className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
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
      <nav className="py-2">
        {navItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <div key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center px-4 py-3.5 text-fidelity-gray-medium hover:bg-fidelity-gray-light transition-colors ${
                    isCollapsed ? 'justify-center' : ''
                  } ${isActive ? 'bg-fidelity-gray-light font-semibold' : ''}`
                }
                title={isCollapsed ? item.label : undefined}
              >
                {active && !isCollapsed && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-fidelity-green" />
                )}
                <span className="flex-shrink-0" style={{ minWidth: '24px' }}>
                  <item.icon />
                </span>
                {!isCollapsed && (
                  <span className={`ml-3 text-sm ${active ? 'font-semibold text-fidelity-gray-dark' : 'font-medium'}`}>
                    {item.label}
                  </span>
                )}
              </NavLink>
              {index < navItems.length - 1 && (
                <div className="border-b border-fidelity mx-4" />
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

