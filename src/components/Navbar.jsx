import { Users, User, Package, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import { showError } from '../helpers/alert';
import { http } from '../helpers/http';
import { logoImg } from '../assets';

export default function Navbar() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { profile, fetchProfile } = useContext(AuthContext);
  const [myPackages, setMyPackages] = useState([]);
  // Close dropdown when clicking outside

  const fetchData = async () => {
    try {
      const response = await http({
        url: '/my-packages',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      setMyPackages(response.data);
    } catch (error) {
      showError(error);
      console.log(error, '<<< nav');
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchData();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  console.log(myPackages, '<< nav mypackages');

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 sm:py-5">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center flex-shrink-0">
              <img
                src={logoImg}
                alt="DuoJourney Logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <span
              className="text-lg sm:text-xl md:text-2xl font-bold text-white"
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
              to="/packages"
              className={({ isActive }) =>
                `text-white hover:text-blue-200 hover:bg-white/15 rounded-full transition-colors font-medium text-sm px-5 py-2 ${
                  isActive ? 'bg-white/25' : ''
                }`
              }
            >
              Packages
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="cursor-pointer text-white hover:text-blue-200 transition-colors bg-white/15 backdrop-blur-sm rounded-lg p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="cursor-pointer flex items-center space-x-2 text-white hover:text-blue-200 transition-colors font-medium text-sm bg-white/15 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <Users className="w-4 h-4" />
                <span>Profile</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 overflow-hidden">
                  {/* Profile Header */}
                  <div className="p-4 border-b border-gray-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={
                            profile?.ImageUrl ||
                            'https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78='
                          }
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {profile.firstName} {profile.lastName}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-36">
                          {profile.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate('/profile');
                      }}
                      className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-white/50 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Profile Details</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate('/my-packages');
                        setIsProfileOpen(false);
                      }}
                      className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-white/50 transition-colors"
                    >
                      <Package className="w-4 h-4 text-gray-500" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">My Packages</div>
                        <div className="text-xs text-gray-500">
                          {myPackages.length
                            ? `${myPackages.length} active bookings`
                            : 'No active bookings'}
                        </div>
                      </div>
                    </button>

                    <div className="border-t border-gray-200/50 mt-2 pt-2">
                      <button
                        onClick={() => {
                          localStorage.removeItem(`access_token`);
                          navigate(`/login`);
                        }}
                        className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50/50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-white/20 shadow-xl">
            <div className="px-4 py-4 space-y-2">
              {/* Navigation Links */}
              <div className="space-y-1 pb-4 border-b border-gray-200/50">
                <NavLink
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-gray-800 hover:bg-white/50 rounded-lg transition-colors font-medium ${
                      isActive ? 'bg-white/70' : ''
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/packages"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-gray-800 hover:bg-white/50 rounded-lg transition-colors font-medium ${
                      isActive ? 'bg-white/70' : ''
                    }`
                  }
                >
                  Packages
                </NavLink>
              </div>

              {/* Profile Section */}
              <div className="pt-2">
                <div className="flex items-center space-x-3 px-4 py-3 border-b border-gray-200/50">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={
                        profile?.ImageUrl ||
                        'https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78='
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm sm:text-base">
                      {profile.firstName} {profile.lastName}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 truncate">{profile.email}</div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-1 pt-2">
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setIsMobileMenuOpen(false);
                    }}
                    className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-white/50 transition-colors rounded-lg"
                  >
                    <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">Profile Details</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate('/my-packages');
                      setIsMobileMenuOpen(false);
                    }}
                    className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-white/50 transition-colors rounded-lg"
                  >
                    <Package className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm sm:text-base">My Packages</div>
                      <div className="text-xs text-gray-500">
                        {myPackages.length
                          ? `${myPackages.length} active bookings`
                          : 'No active bookings'}
                      </div>
                    </div>
                  </button>

                  <div className="border-t border-gray-200/50 mt-2 pt-2">
                    <button
                      onClick={() => {
                        localStorage.removeItem(`access_token`);
                        navigate(`/login`);
                      }}
                      className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50/50 transition-colors rounded-lg"
                    >
                      <LogOut className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
