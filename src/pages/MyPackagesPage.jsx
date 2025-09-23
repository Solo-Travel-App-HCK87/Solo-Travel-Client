import { ArrowLeft, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function MyPackagesPage() {
  const navigate = useNavigate();

  const myBookings = [
    {
      id: 1,
      destination: 'Iceland',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      duration: '9 Days',
      price: '$1,599',
      bookingDate: 'Dec 15, 2024',
      departureDate: 'Feb 1, 2026',
      bookingId: 'ICE-2024-001',
      highlights: [
        'Northern Lights photography workshop',
        'Blue Lagoon luxury spa experience',
        'Glacier hiking with professional guide',
      ],
    },
    {
      id: 2,
      destination: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
      duration: '7 Days',
      price: '$899',
      bookingDate: 'Nov 20, 2024',
      departureDate: 'Jan 15, 2026',
      bookingId: 'BALI-2024-002',
      highlights: [
        'UNESCO World Heritage rice terraces',
        'Traditional Balinese temple ceremonies',
        'Local cooking class experience',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        <div className="grid grid-cols-12 min-h-screen">
          {/* Left Panel - Navigation */}
          <div className="col-span-4 bg-white border-r border-gray-100 p-12 sticky top-0 h-screen overflow-y-auto">
            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="mb-12 flex items-center text-gray-500 hover:text-gray-700 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium tracking-wide">BACK TO HOME</span>
            </button>

            {/* Panel Title */}
            <div className="mb-12">
              <h2 className="text-2xl font-light text-gray-900 tracking-wide mb-2">
                My Travel Packages
              </h2>
              <div className="w-12 h-px bg-gray-200"></div>
            </div>

            {/* Summary Stats */}
            <div className="space-y-6 mb-12">
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 mb-1">{myBookings.length}</div>
                  <div className="text-sm text-gray-500 font-medium tracking-wide uppercase">
                    Total Bookings
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/packages')}
                className="w-full bg-gray-900 text-white py-3 text-sm font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors"
              >
                Browse New Packages
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="col-span-8 bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[40vh] m-4">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
                {/* Background Image */}
                <img
                  src="/src/assets/myadvanture-bg.jpg"
                  alt="My Adventure Background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                  <div>
                    <h1
                      className="text-6xl font-bold tracking-tight mb-4 text-white drop-shadow-2xl"
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      My Adventures
                    </h1>
                    <p className="text-xl font-medium tracking-wide mb-4 text-white drop-shadow-lg">
                      Hi Gerry, Ready for your next adventure?
                    </p>
                    <div className="flex items-center justify-center space-x-2 opacity-90">
                      <MapPin className="w-5 h-5" strokeWidth={1.5} />
                      <span className="text-lg font-light tracking-wide">Your Travel Journey</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-12 space-y-16 bg-gray-50">
              {/* Bookings List */}
              <div className="space-y-8">
                <h2 className="text-2xl font-light text-gray-900 tracking-wide">Your Bookings</h2>
                <div className="space-y-6">
                  {myBookings.map((booking, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 p-2 rounded-2xl shadow-lg overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-0">
                        {/* Image - Left Side */}
                        <div className="col-span-4">
                          <img
                            src={booking.image}
                            alt={booking.destination}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        </div>

                        {/* Content - Right Side */}
                        <div className="col-span-8 p-6 space-y-4">
                          {/* Header */}
                          <div>
                            <h3 className="text-xl font-light text-gray-900 tracking-wide mb-1">
                              {booking.destination}
                            </h3>
                            <div className="text-sm text-gray-500 font-medium">
                              Booking ID: {booking.bookingId}
                            </div>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500 font-medium mb-1">Duration</div>
                              <div className="text-gray-900">{booking.duration}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 font-medium mb-1">Departure</div>
                              <div className="text-gray-900">{booking.departureDate}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 font-medium mb-1">Price Paid</div>
                              <div className="text-gray-900 font-semibold">{booking.price}</div>
                            </div>
                          </div>

                          {/* Highlights */}
                          <div>
                            <div className="text-sm text-gray-500 font-medium mb-2">
                              Package Highlights
                            </div>
                            <div className="space-y-1">
                              {booking.highlights.slice(0, 2).map((highlight, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center space-x-2 text-sm text-gray-700"
                                >
                                  <Star className="w-3 h-3 text-yellow-500 fill-current flex-shrink-0" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                              {booking.highlights.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{booking.highlights.length - 2} more highlights
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-3 pt-2">
                            <button
                              onClick={() => navigate(`/packages/${booking.id}`)}
                              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => navigate(`/chat/room/${booking.id}`)}
                              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
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
              {myBookings.length === 0 && (
                <div className="bg-white border border-gray-200 p-12 rounded-2xl shadow-lg text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-2">No Travel Packages Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start your adventure by booking your first travel package
                  </p>
                  <button
                    onClick={() => navigate('/packages')}
                    className="bg-gray-900 text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors"
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
