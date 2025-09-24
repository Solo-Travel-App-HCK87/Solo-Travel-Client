import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function PackageCard({ package: pkg }) {
  const navigate = useNavigate();
  return (
    <div
      className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group bg-white w-full"
      onClick={() => {
        navigate(`/packages/${pkg.id}`);
      }}
    >
      <img
        src={pkg.image_url}
        alt={pkg.destination}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="absolute rounded-xl sm:rounded-2xl m-1.5 sm:m-2 bottom-0 left-0 right-0 bg-gradient-to-r from-teal-400/30 to-blue-400/30 backdrop-blur-lg border-t border-white/30">
        <div className="p-2.5 sm:p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div className="text-white flex-1 min-w-0 mr-2 sm:mr-3 md:mr-4">
              <h3 className="text-base sm:text-lg md:text-xl font-black mb-1 sm:mb-2 truncate drop-shadow-lg">{pkg.location}</h3>
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm min-w-0">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 drop-shadow-md" strokeWidth={2} />
                <span className="font-semibold truncate drop-shadow-md">{pkg.destination_name}</span>
              </div>
            </div>

            <div className="text-white text-right flex-shrink-0">
              {/* convert to currency format without 00*/}
              <div className="text-lg sm:text-xl md:text-2xl font-bold">
                {pkg.current_price
                  .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                  .replace(/\.00$/, '')}
              </div>
              <div className="text-xs sm:text-sm opacity-90">/Person</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-black/20 backdrop-blur-sm rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-1.5">
        <span className="text-xs sm:text-sm font-medium text-white">{pkg.duration_days} Days</span>
      </div>
    </div>
  );
}
