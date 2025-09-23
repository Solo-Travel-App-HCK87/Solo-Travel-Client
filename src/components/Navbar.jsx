import { Users } from 'lucide-react';
import { NavLink } from 'react-router';

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="w-full px-6">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center space-x-1">
            <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
              <img
                src="/src/assets/logo.png"
                alt="DuoJourney Logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', letterSpacing: '0.5px' }}
            >
              DuoJourney
            </span>
          </div>

          <nav className="hidden lg:flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-full px-6 py-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:text-blue-200 hover:bg-white/15 rounded-full transition-colors font-medium text-sm px-5 py-2 ${
                  isActive ? 'bg-white/25' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/package"
              className={({ isActive }) =>
                `text-white hover:text-blue-200 hover:bg-white/15 rounded-full transition-colors font-medium text-sm px-5 py-2 ${
                  isActive ? 'bg-white/25' : ''
                }`
              }
            >
              Packages
            </NavLink>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-white hover:text-blue-200 transition-colors font-medium text-sm bg-white/15 backdrop-blur-sm rounded-full px-5 py-2">
              Already Booked?
            </button>
            <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
