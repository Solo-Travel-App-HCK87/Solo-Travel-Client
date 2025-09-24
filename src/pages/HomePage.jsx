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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    // Auto navigate ketika sort dipilih
    const searchParams = new URLSearchParams();
    if (searchDestination.trim()) {
      searchParams.append('search', searchDestination.trim());
    }
    if (newSortOption) {
      searchParams.append('sort', newSortOption);
    }
    console.log('HomePage navigating with params:', searchParams.toString()); // Debug log
    navigate(`/packages${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
  };
  return (
    <div className="h-screen overflow-hidden relative">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
        style={{
          backgroundImage: "url('/src/assets/bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      <section className="relative z-10 flex items-center justify-center h-screen">
        <div className="max-w-7xl mx-auto px-8 text-center w-full">
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: '700' }}
          >
            Explore The World Together
          </h1>
          <p
            className="text-xl md:text-2xl text-white/90 mb-20 max-w-4xl mx-auto font-medium"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Find your perfect travel companion and create unforgettable memories.
          </p>

          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white rounded-full px-6 py-4 flex-1">
                <MapPin className="w-5 h-5 mr-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Destination"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 outline-none text-gray-700 text-base"
                />
              </div>

              <div className="flex items-center bg-white rounded-full px-6 py-4 flex-1 relative">
                <span className="text-gray-500 mr-4 text-lg">💰</span>
                <select 
                  value={sortOption} 
                  onChange={handleSortChange}
                  className="cursor-pointer flex-1 outline-none text-gray-700 text-base bg-transparent appearance-none cursor-pointer pr-8"
                >
                  <option value="">Sort by Price</option>
                  <option value="ASC">Price: Low to High</option>
                  <option value="DESC">Price: High to Low</option>
                </select>
                <div className="absolute right-4 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
