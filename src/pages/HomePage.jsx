import { MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchDestination, setSearchDestination] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchDestination.trim()) {
      searchParams.append('search', searchDestination.trim());
    }
    if (sortOption) {
      searchParams.append('sort', sortOption);
    }
    navigate(`/packages${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
  };
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
        style={{
          backgroundImage: "url('/src/assets/bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <section className="relative z-10 flex items-center justify-center min-h-screen py-4 sm:py-8 lg:py-12 mobile-landscape-fix">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-tight px-2 font-playfair">
            Explore The World Together
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 md:mb-12 lg:mb-16 max-w-sm xs:max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto font-medium px-2 leading-relaxed font-inter">
            Find your perfect travel companion and create unforgettable memories.
          </p>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-full p-2 sm:p-3 lg:p-4 shadow-2xl max-w-sm xs:max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto search-container">
            <div className="flex flex-col sm:flex-col lg:flex-row items-stretch gap-2 sm:gap-3">
              {/* Destination Input */}
              <div className="flex items-center bg-white rounded-xl lg:rounded-full px-3 sm:px-4 lg:px-6 py-3 sm:py-3.5 lg:py-4 flex-1 min-w-0 shadow-sm">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="flex-1 outline-none text-gray-700 text-sm sm:text-base placeholder:text-gray-400 min-w-0 search-input"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center bg-white rounded-xl lg:rounded-full px-3 sm:px-4 lg:px-6 py-3 sm:py-3.5 lg:py-4 flex-1 relative min-w-0 shadow-sm">
                <span className="text-gray-500 mr-2 sm:mr-3 text-sm sm:text-base flex-shrink-0">
                  💰
                </span>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="cursor-pointer flex-1 outline-none text-gray-700 text-sm sm:text-base bg-transparent appearance-none pr-6 sm:pr-8 min-w-0 search-select"
                >
                  <option value="">Sort by Price</option>
                  <option value="ASC">Price: Low to High</option>
                  <option value="DESC">Price: High to Low</option>
                </select>
                <div className="absolute right-3 sm:right-4 pointer-events-none">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl lg:rounded-full px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap min-w-0 search-button"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="hidden xs:inline sm:hidden lg:inline">Search</span>
                <span className="xs:hidden sm:inline lg:hidden">Find Trips</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
