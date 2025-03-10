import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-2 
              shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/40 transition-all duration-300 
              group-hover:scale-105"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-full h-full text-white drop-shadow-sm"
              >
                <path 
                  d="M12 3v18M3 12h18M3 6h18M3 18h18" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
              bg-clip-text text-transparent drop-shadow-sm"
            >
              Algorithm Visualizer
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-3">
            <NavLink to="/" current={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/race-mode" current={location.pathname === "/race-mode"}>
              Race Mode
            </NavLink>
            <NavLink to="/leaderboard" current={location.pathname === "/leaderboard"}>
              Leaderboard
            </NavLink>
            <NavLink to="/about" current={location.pathname === "/about"}>
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Enhanced NavLink component
const NavLink = ({ to, current, children }) => (
  <Link
    to={to}
    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300
      ${current 
        ? 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-105' 
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
      }
      relative overflow-hidden group
    `}
  >
    {/* Background shine effect for active links */}
    {current && (
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
        translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
      />
    )}
    <span className="relative z-10">{children}</span>
  </Link>
);

export default Navbar;

