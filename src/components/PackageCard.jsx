import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function PackageCard({ package: pkg }) {
  const navigate = useNavigate();
  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group bg-white"
      onClick={() => {
        navigate(`/packages/${pkg.id}`);
      }}
    >
      <img
        src={pkg.image_url}
        alt={pkg.destination}
        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="absolute rounded-2xl m-2 bottom-0 left-0 right-0 bg-gradient-to-r from-teal-400/30 to-blue-400/30 backdrop-blur-lg border-t border-white/30">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-white flex-1 min-w-0 mr-4">
              <h3 className="text-xl font-black mb-2 truncate drop-shadow-lg">{pkg.location}</h3>
              <div className="flex items-center space-x-2 text-sm min-w-0">
                <MapPin className="w-4 h-4 flex-shrink-0 drop-shadow-md" strokeWidth={2} />
                <span className="font-semibold truncate drop-shadow-md">{pkg.destination_name}</span>
              </div>
            </div>

            <div className="text-white text-right flex-shrink-0">
              {/* convert to currency format without 00*/}
              <div className="text-2xl font-bold">
                {pkg.current_price
                  .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                  .replace(/\.00$/, '')}
              </div>
              <div className="text-sm opacity-90">/Person</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
        <span className="text-sm font-medium text-white">{pkg.duration_days} Days</span>
      </div>
    </div>
  );
}
