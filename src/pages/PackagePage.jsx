import { MapPin } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPackages } from '../store/packageSlice';
import { useSearchParams } from 'react-router';

export default function PackagePage() {
  const { packages } = useSelector((state) => state.package);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchDestination, setSearchDestination] = useState(searchParams.get('search') || '');
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || '');

  const dispatch = useDispatch();

  useEffect(() => {
    const initialSearch = searchParams.get('search');
    const initialSort = searchParams.get('sort');
    const params = {};
    
    if (initialSearch) {
      params.search = initialSearch;
    }
    
    if (initialSort) {
      params.sort = initialSort;
    }
    
    dispatch(fetchPackages(params));
  }, [dispatch, searchParams]);

  const handleSearch = () => {
    const params = {};
    
    if (searchDestination.trim()) {
      params.search = searchDestination.trim();
    }
    
    if (sortOption) {
      params.sort = sortOption;
    }
    
    dispatch(fetchPackages(params));
    
    // Update URL params
    const newSearchParams = new URLSearchParams();
    if (searchDestination.trim()) {
      newSearchParams.append('search', searchDestination.trim());
    }
    if (sortOption) {
      newSearchParams.append('sort', sortOption);
    }
    setSearchParams(newSearchParams);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    
    // Auto search ketika sort berubah
    const params = {};
    
    if (searchDestination.trim()) {
      params.search = searchDestination.trim();
    }
    
    if (newSortOption) {
      params.sort = newSortOption;
    }
    
    console.log('Sort params being sent:', params); // Debug log
    dispatch(fetchPackages(params));
    
    // Update URL params
    const newSearchParams = new URLSearchParams();
    if (searchDestination.trim()) {
      newSearchParams.append('search', searchDestination.trim());
    }
    if (newSortOption) {
      newSearchParams.append('sort', newSortOption);
    }
    setSearchParams(newSearchParams);
  };

  console.log(packages)

  return (
    <div className="min-h-screen">
      <div
        className="bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('/src/assets/bg.jpg')",
        }}
      >
        <div className="bg-black/30">
          <section className="pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-23 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: '700' }}
              >
                Discover Amazing Packages
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto font-medium opacity-90 px-2"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Choose your destination and find your perfect travel companion
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className="relative z-30 -mt-8 sm:-mt-12 md:-mt-16" style={{ transform: 'translateY(-20px)' }}>
        <div className="max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-2 sm:border-4 border-white/20">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex items-center bg-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 flex-1 min-w-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search destination"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 outline-none text-gray-700 bg-transparent text-sm sm:text-base min-w-0"
                />
              </div>
              <div className="flex items-center bg-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 relative flex-1 min-w-0">
                <span className="text-gray-500 mr-2 sm:mr-3 text-sm sm:text-base flex-shrink-0">💰</span>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="flex-1 outline-none text-gray-700 bg-transparent appearance-none cursor-pointer pr-5 sm:pr-6 text-sm sm:text-base min-w-0"
                >
                  <option value="">Sort by Price</option>
                  <option value="ASC">Price: Low to High</option>
                  <option value="DESC">Price: High to Low</option>
                </select>
                <div className="absolute right-2 sm:right-3 pointer-events-none">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="cursor-pointer bg-gray-800 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm hover:bg-gray-900 transition-colors whitespace-nowrap"
              >
                <span className="hidden sm:inline">Search Packages</span>
                <span className="sm:hidden">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <section
        className="relative -mt-12 sm:-mt-16 md:-mt-18 pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-16 sm:pb-24 md:pb-32 z-20 min-h-screen"
        style={{
          backgroundColor: '#F8F9FA',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-12 md:mb-16">
            {packages.map((pkg, index) => (
              <PackageCard key={index} package={pkg} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
