import { MapPin } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPackages } from '../store/packageSlice';

export default function PackagePage() {
  const { packages } = useSelector((state) => state.package);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPackages());
  }, []);

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
          <section className="pt-32 pb-23 text-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h1
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: '700' }}
              >
                Discover Amazing Packages
              </h1>
              <p
                className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-medium opacity-90"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Choose your destination and find your perfect travel companion
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className="relative z-30 -mt-16" style={{ transform: 'translateY(-20px)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-4 border-white/20">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-gray-200">
                <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search destination"
                  className="flex-1 outline-none text-gray-700 bg-transparent"
                />
              </div>
              <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-gray-200">
                <span className="text-gray-500 mr-3">💰</span>
                <select className="flex-1 outline-none text-gray-700 bg-transparent">
                  <option>All Budgets</option>
                  <option>$500 - $1000</option>
                  <option>$1000 - $2000</option>
                  <option>$2000+</option>
                </select>
              </div>
              <button className="bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors">
                Search Packages
              </button>
            </div>
          </div>
        </div>
      </div>

      <section
        className="relative -mt-18 pt-48 pb-32 z-20 min-h-screen"
        style={{
          backgroundColor: '#F8F9FA',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <div className="px-20">
          <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-5 mb-16">
            {packages.map((pkg, index) => (
              <PackageCard key={index} package={pkg} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
