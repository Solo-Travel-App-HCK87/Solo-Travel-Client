import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Calendar,
  Star,
  Check,
  FileText,
  Shirt,
  Backpack,
  Camera,
  Flame,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { http } from '../helpers/http';
import { showError } from '../helpers/alert';

export default function PackageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [packageData, setPackageData] = useState({
    destination_name: '',
    location: '',
    duration_days: '',
    original_price: 0,
    current_price: 0,
    discount_percentage: 0,
    available_slots: '',
    departure_date: '',
    description: '',
    image_url: '',
    categories: '',
    inclusions: [],
    itinerary: [],
    preparation_docs: [],
    preparation_clothing: [],
    preparation_essentials: [],
    preparation_electronics: [],
    highlights: [],
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await http({
        url: `/packages/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      setPackageData(response.data);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const buyPackage = async () => {
    try {
      const response = await http({
        url: `/buys/${id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      navigate('/my-packages');
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(packageData);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="w-full">
          <div className="grid grid-cols-12 min-h-screen">
            {/* Left Panel - Loading Skeleton */}
            <div className="col-span-4 bg-white border-r border-gray-100 p-12 sticky top-0 h-screen overflow-y-auto">
              {/* Back Button Skeleton */}
              <div className="mb-12 flex items-center">
                <div className="w-4 h-4 bg-gray-200 rounded mr-3 animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Panel Title Skeleton */}
              <div className="mb-12">
                <div className="w-48 h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="w-12 h-px bg-gray-200 animate-pulse"></div>
              </div>

              {/* Price Section Skeleton */}
              <div className="mb-12">
                <div className="flex items-baseline space-x-4 mb-3">
                  <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-24 h-10 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="mt-6 pt-6 border-t border-gray-100"></div>
              </div>

              {/* What's Included Skeleton */}
              <div className="mb-12">
                <div className="w-32 h-4 bg-gray-200 rounded mb-6 animate-pulse"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-gray-200 rounded-sm animate-pulse"></div>
                      <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button Skeleton */}
              <div className="w-full h-12 bg-gray-200 rounded mb-6 animate-pulse"></div>

              {/* Urgency Message Skeleton */}
              <div className="bg-gray-50 border border-gray-200 p-4 flex items-center space-x-3">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Right Content Area - Loading Skeleton */}
            <div className="col-span-8 bg-gray-50">
              {/* Hero Section Skeleton */}
              <div className="relative h-[60vh] m-4">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl bg-gray-300 animate-pulse">
                  {/* Loading spinner in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-12 h-12 border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
                      <div className="text-gray-600 font-medium">Loading package details...</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Container Skeleton */}
              <div className="p-12 space-y-16 bg-gray-50">
                {/* Description Skeleton */}
                <div className="space-y-4">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Itinerary Skeleton */}
                <div className="space-y-8">
                  <div className="w-48 h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((day) => (
                      <div key={day} className="bg-white border border-gray-200 p-6 rounded-xl">
                        <div className="flex items-start space-x-6">
                          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        <div className="grid grid-cols-12 min-h-screen">
          {/* Left Panel - Booking Card (35%) */}
          <div className="col-span-4 bg-white border-r border-gray-100 p-12 sticky top-0 h-screen overflow-y-auto">
            {/* Back Button */}
            <button
              onClick={() => navigate('/packages')}
              className="cursor-pointer mb-12 flex items-center text-gray-500 hover:text-gray-700 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium tracking-wide">BACK TO PACKAGES</span>
            </button>

            {/* Panel Title */}
            <div className="mb-12">
              <h2 className="text-2xl font-light text-gray-900 tracking-wide mb-2">
                Reserve Your Journey
              </h2>
              <div className="w-12 h-px bg-gray-200"></div>
            </div>

            {/* Price Section */}
            <div className="mb-12">
              <div className="flex items-baseline space-x-4 mb-3">
                <span className="text-gray-400 line-through text-lg font-light tracking-wide">
                  {packageData.original_price
                    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                    .replace(/\.00$/, '')}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium tracking-wide uppercase">
                  Save 47%
                </span>
              </div>
              <div className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
                {packageData.current_price
                  .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                  .replace(/\.00$/, '')}
              </div>
              <div className="text-gray-500 font-light tracking-wide">per person</div>
              <div className="mt-6 pt-6 border-t border-gray-100"></div>
            </div>

            {/* What's Included */}
            <div className="mb-12">
              <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase mb-6">
                What's Included
              </h3>
              <div className="space-y-4">
                {packageData.inclusions.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center">
                      <Check className="w-3 h-3 text-gray-600" strokeWidth={2} />
                    </div>
                    <span className="text-gray-700 font-light tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                buyPackage();
              }}
              className="cursor-pointer w-full bg-gray-900 text-white py-4 text-sm font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors mb-6"
            >
              Book Now
            </button>

            {/* Urgency Message */}
            <div className="bg-gray-50 border border-gray-200 p-4 flex items-center space-x-3">
              <Flame className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
              <span className="text-sm text-gray-700 font-light">
                Only {packageData.available_slots} spots remaining
              </span>
            </div>
          </div>

          {/* Right Content Area (65%) */}
          <div className="col-span-8 bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[60vh] m-4">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={packageData.image_url}
                  alt="Iceland landscape"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Bottom-left Info Bar */}
                <div className="absolute bottom-8 left-8">
                  <div className="flex items-center space-x-8">
                    {/* Duration */}
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-white/90" strokeWidth={1.5} />
                      <span className="text-white text-sm font-medium drop-shadow-lg">
                        {packageData.duration_days} Days
                      </span>
                    </div>

                    {/* Available Slots */}
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-white/90" strokeWidth={1.5} />
                      <span className="text-white text-sm font-medium drop-shadow-lg">
                        {packageData.available_slots} Slots Left
                      </span>
                    </div>

                    {/* Departure Date */}
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-white/90" strokeWidth={1.5} />
                      <span className="text-white text-sm font-medium drop-shadow-lg">
                        {packageData.departure_date.split('T')[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location - Centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1
                      className="text-7xl font-black tracking-tight mb-4"
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        textShadow: '4px 4px 12px rgba(0,0,0,0.8), 2px 2px 8px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.4)'
                      }}
                    >
                      {packageData.destination_name}
                    </h1>
                    <div className="flex items-center justify-center space-x-2">
                      <MapPin className="w-6 h-6" strokeWidth={2} style={{ filter: 'drop-shadow(2px 2px 6px rgba(0,0,0,0.8))' }} />
                      <span
                        className="text-xl font-bold tracking-wide"
                        style={{
                          textShadow: '3px 3px 8px rgba(0,0,0,0.8), 1px 1px 4px rgba(0,0,0,0.6)'
                        }}
                      >
                        {packageData.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-12 space-y-16 bg-gray-50">
              {/* Description */}
              <div className="space-y-8">
                <p
                  className="text-lg leading-relaxed text-gray-700 font-light max-w-4xl"
                  style={{ lineHeight: '1.6' }}
                >
                  {packageData.description}
                </p>
              </div>

              {/* Day by Day Itinerary */}
              <div className="space-y-8">
                <h2 className="text-2xl font-light text-gray-900 tracking-wide">
                  Day by Day Itinerary
                </h2>
                <div className="space-y-4">
                  {packageData.itinerary.map((dayItem, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg"
                    >
                      <div className="flex items-start space-x-6">
                        <div className="w-8 h-8 border border-gray-300 flex items-center justify-center text-sm font-light text-gray-600 flex-shrink-0">
                          {dayItem.day}
                        </div>
                        <div>
                          <h3 className="text-gray-900 font-light tracking-wide mb-2">
                            Day {dayItem.day}
                          </h3>
                          <p className="text-gray-600 font-light leading-relaxed">
                            {dayItem.activity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Highlights */}
              <div className="space-y-8">
                <h2 className="text-2xl font-light text-gray-900 tracking-wide">
                  Package Highlights
                </h2>
                <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
                  <div className="grid grid-cols-2 gap-6">
                    {packageData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <Star
                          className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0"
                          strokeWidth={1.5}
                        />
                        <span className="text-gray-700 font-light leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Package Highlights */}
              {/* TAMBAHKAN INI - What to Prepare */}
              <div className="space-y-8">
                <h2 className="text-2xl font-light text-gray-900 tracking-wide">What to Prepare</h2>
                <div className="grid grid-cols-2 gap-8">
                  {/* Documents */}
                  {packageData.preparation_docs.length > 0 && (
                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <FileText className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                        <h3 className="text-lg font-light text-gray-900">Documents</h3>
                      </div>
                      <ul className="space-y-2">
                        {packageData.preparation_docs.map((item, index) => (
                          <li
                            key={index}
                            className="text-gray-600 font-light text-sm leading-relaxed"
                          >
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Clothing */}
                  {packageData.preparation_clothing.length > 0 && (
                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <Shirt className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                        <h3 className="text-lg font-light text-gray-900">Clothing</h3>
                      </div>
                      <ul className="space-y-2">
                        {packageData.preparation_clothing.map((item, index) => (
                          <li
                            key={index}
                            className="text-gray-600 font-light text-sm leading-relaxed"
                          >
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Essentials */}
                  {packageData.preparation_essentials.length > 0 && (
                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <Backpack className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                        <h3 className="text-lg font-light text-gray-900">Essentials</h3>
                      </div>
                      <ul className="space-y-2">
                        {packageData.preparation_essentials.map((item, index) => (
                          <li
                            key={index}
                            className="text-gray-600 font-light text-sm leading-relaxed"
                          >
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Electronics */}
                  {packageData.preparation_electronics.length > 0 && (
                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <Camera className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                        <h3 className="text-lg font-light text-gray-900">Electronics</h3>
                      </div>
                      <ul className="space-y-2">
                        {packageData.preparation_electronics.map((item, index) => (
                          <li
                            key={index}
                            className="text-gray-600 font-light text-sm leading-relaxed"
                          >
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
