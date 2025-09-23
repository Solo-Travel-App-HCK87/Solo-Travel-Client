import { MapPin } from 'lucide-react';
import PackageCard from '../components/PackageCard';

export default function PackagePage() {
  const packages = [
    {
      id: 1,
      destination: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop',
      duration: '7 Days',
      price: '$899',
      originalPrice: '$1,299',
      includes: [
        'Flight',
        'Accommodation',
        'Daily breakfast',
        'Random travel buddy',
        'Local guide',
      ],
      availableSlots: 12,
      nextDeparture: 'Dec 15, 2025',
      tags: ['Beach', 'Culture', 'Adventure'],
    },
    {
      id: 2,
      destination: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
      duration: '8 Days',
      price: '$1,299',
      originalPrice: '$1,899',
      includes: ['Flight', 'Hotel', 'JR Pass', 'Random travel buddy', 'City tours'],
      availableSlots: 8,
      nextDeparture: 'Jan 10, 2026',
      tags: ['Culture', 'Food', 'Technology'],
    },
    {
      id: 3,
      destination: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      duration: '6 Days',
      price: '$1,099',
      originalPrice: '$1,599',
      includes: ['Flight', 'Hotel', 'Museum passes', 'Random travel buddy', 'Seine cruise'],
      availableSlots: 15,
      nextDeparture: 'Dec 20, 2025',
      tags: ['Romance', 'Art', 'History'],
    },
    {
      id: 4,
      destination: 'Iceland',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      duration: '9 Days',
      price: '$1,599',
      originalPrice: '$2,299',
      includes: [
        'Flight',
        'Accommodation',
        'Car rental',
        'Random travel buddy',
        'Northern lights tour',
      ],
      availableSlots: 6,
      nextDeparture: 'Feb 1, 2026',
      tags: ['Nature', 'Adventure', 'Photography'],
    },
    {
      id: 5,
      destination: 'Thailand',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      duration: '10 Days',
      price: '$699',
      originalPrice: '$999',
      includes: ['Flight', 'Hotels', 'Island hopping', 'Random travel buddy', 'Cooking class'],
      availableSlots: 20,
      nextDeparture: 'Dec 18, 2025',
      tags: ['Beach', 'Food', 'Budget'],
    },
    {
      id: 6,
      destination: 'Morocco',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=300&fit=crop',
      duration: '8 Days',
      price: '$999',
      originalPrice: '$1,399',
      includes: ['Flight', 'Riads', 'Desert safari', 'Random travel buddy', 'Marrakech tour'],
      availableSlots: 4,
      nextDeparture: 'Mar 5, 2026',
      tags: ['Culture', 'Adventure', 'Markets'],
    },
  ];

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
