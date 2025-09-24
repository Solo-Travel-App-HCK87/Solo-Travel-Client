import { ArrowLeft, MapPin, Star } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { showError } from '../helpers/alert';
import { http } from '../helpers/http';
import { AuthContext } from '../contexts/auth';

export default function MyPackagesPage() {
  const navigate = useNavigate();
  const [myPackages, setMyPackages] = useState([]);
  const { profile, fetchProfile } = useContext(AuthContext);
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
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchData();
  }, []);

  console.log(myPackages);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-screen">
          {/* Left Panel - Navigation */}
          <div className="lg:col-span-4 bg-white border-b lg:border-b-0 lg:border-r border-gray-100 p-4 sm:p-6 md:p-8 lg:p-12 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto order-2 lg:order-1">
            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="cursor-pointer mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex items-center text-gray-500 hover:text-gray-700 transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs sm:text-sm font-medium tracking-wide">BACK TO HOME</span>
            </button>

            {/* Panel Title */}
            <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <h2 className="text-lg sm:text-xl md:text-2xl font-light text-gray-900 tracking-wide mb-1 sm:mb-2">
                My Travel Packages
              </h2>
              <div className="w-8 sm:w-10 md:w-12 h-px bg-gray-200"></div>
            </div>

            {/* Summary Stats */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <div className="bg-gray-50 border border-gray-200 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-light text-gray-900 mb-1">
                    {myPackages.length && myPackages.length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide uppercase">
                    Total Bookings
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={() => navigate('/packages')}
                className="cursor-pointer w-full bg-gray-900 text-white py-2.5 sm:py-3 text-xs sm:text-sm font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors"
              >
                Browse New Packages
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 bg-gray-50 order-1 lg:order-2">
            {/* Hero Section */}
            <div className="relative h-[30vh] sm:h-[35vh] md:h-[40vh] m-2 sm:m-3 md:m-4">
              <div className="relative h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
                {/* Background Image */}
                <img
                  src="/src/assets/myadvanture-bg.jpg"
                  alt="My Adventure Background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-center justify-center text-center text-white px-2 sm:px-4">
                  <div>
                    <h1
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-2xl"
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)',
                      }}
                    >
                      My Adventures
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg">
                      Hi {profile.firstName}, Ready for your next adventure?
                    </p>
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2 opacity-90">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                      <span className="text-sm sm:text-base md:text-lg font-light tracking-wide">Your Travel Journey</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-12 space-y-8 sm:space-y-12 md:space-y-16 bg-gray-50">
              {/* Bookings List */}
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-light text-gray-900 tracking-wide">Your Bookings</h2>
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {myPackages.length &&
                    myPackages.map((booking, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden"
                      >
                        <div className="flex flex-col md:grid md:grid-cols-12 gap-0 min-h-[200px] sm:min-h-[250px] md:h-[280px] lg:h-[320px]">
                          {/* Image - Top on mobile, Left Side on desktop */}
                          <div className="md:col-span-4 h-32 sm:h-40 md:h-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl">
                            <img
                              src={booking.TravelPackage.image_url}
                              alt={booking.TravelPackage.destination_name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Content - Bottom on mobile, Right Side on desktop */}
                          <div className="md:col-span-8 p-3 sm:p-4 md:p-5 lg:p-6 space-y-2 sm:space-y-3 md:space-y-4">
                            {/* Header */}
                            <div>
                              <h3 className="text-base sm:text-lg md:text-xl font-light text-gray-900 tracking-wide mb-1">
                                {booking.destination}
                              </h3>
                              <div className="text-xs sm:text-sm text-gray-500 font-medium">
                                Booking ID: {booking.OrderId}
                              </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                              <div>
                                <div className="text-gray-500 font-medium mb-0.5 sm:mb-1">Duration</div>
                                <div className="text-gray-900">
                                  {booking.TravelPackage.duration_days} Days
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-500 font-medium mb-0.5 sm:mb-1">Departure</div>
                                <div className="text-gray-900">
                                  {booking.TravelPackage.departure_date.split('T')[0]}
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-500 font-medium mb-0.5 sm:mb-1">Price Paid</div>
                                <div className="text-gray-900 font-semibold">
                                  ${booking.TravelPackage.current_price}
                                </div>
                              </div>
                            </div>

                            {/* Highlights */}
                            <div>
                              <div className="text-xs sm:text-sm text-gray-500 font-medium mb-1 sm:mb-2">
                                Package Highlights
                              </div>
                              <div className="space-y-0.5 sm:space-y-1">
                                {booking.TravelPackage.highlights
                                  .slice(0, 2)
                                  .map((highlight, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-700"
                                    >
                                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500 fill-current flex-shrink-0" />
                                      <span className="truncate">{highlight}</span>
                                    </div>
                                  ))}
                                {booking.TravelPackage.highlights.length > 2 && (
                                  <div className="text-xs text-gray-500">
                                    +{booking.TravelPackage.highlights.length - 2} more highlights
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3 pt-1 sm:pt-2">
                              <button
                                onClick={() => navigate(`/packages/${booking.TravelPackage.id}`)}
                                className="cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-900 text-white text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors flex-1 sm:flex-initial"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => navigate(`/chat/room/${booking.TravelPackage.id}`)}
                                className="cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors flex-1 sm:flex-initial"
                              >
                                Chat Room
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Empty State for no bookings */}
              {myPackages.length === 0 && (
                <div className="bg-white border border-gray-200 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl sm:rounded-2xl shadow-lg text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-light text-gray-900 mb-1 sm:mb-2">No Travel Packages Yet</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6">
                    Start your adventure by booking your first travel package
                  </p>
                  <button
                    onClick={() => navigate('/packages')}
                    className="bg-gray-900 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
                  >
                    Explore Packages
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
