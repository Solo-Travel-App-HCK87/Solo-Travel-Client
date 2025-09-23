import { MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function HomePage() {
  const navigate = useNavigate();
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
                  className="flex-1 outline-none text-gray-700 text-base"
                />
              </div>

              <div className="flex items-center bg-white rounded-full px-6 py-4 flex-1">
                <span className="text-gray-500 mr-4 text-lg">💰</span>
                <select className="flex-1 outline-none text-gray-700 text-base bg-transparent">
                  <option>Budget</option>
                  <option>$500 - $1000</option>
                  <option>$1000 - $2000</option>
                  <option>$2000 - $5000</option>
                  <option>$5000+</option>
                </select>
              </div>

              <div className="flex items-center bg-white rounded-full px-6 py-4 flex-1">
                <Calendar className="w-5 h-5 mr-4 text-gray-500" />
                <input type="date" className="flex-1 outline-none text-gray-700 text-base" />
              </div>

              <button
                onClick={() => {
                  navigate('/packages');
                }}
                className="bg-blue-500 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
