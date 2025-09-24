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
    highlights: []
  })

  const fetchData = async () => {

    try {
      
      const response = await http({
        url : `/packages/${id}`,
        method : 'GET',
        headers : {
          Authorization : `Bearer ${localStorage.getItem('access_token')}`
        }
      })

      setPackageData(response.data)

    } catch (error) {
      
      showError(error);

    }

  }

  const buyPackage = async () => {

    try {
      
      const response = await http({
        url : `/buys/${id}`,
        method : 'POST',
        headers : {
          Authorization : `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      navigate('/my-packages')

    } catch (error) {
      
      showError(error)

    }

  }


  useEffect(() => {

    fetchData();

  }, [])

  console.log(packageData)

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
                  {packageData.original_price}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium tracking-wide uppercase">
                  Save 47%
                </span>
              </div>
              <div className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
                {packageData.current_price}
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
            <button onClick={() => {

              buyPackage()

            }} className="cursor-pointer w-full bg-gray-900 text-white py-4 text-sm font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors mb-6">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Location - Centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1
                      className="text-6xl font-light tracking-tight mb-4"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      Iceland
                    </h1>
                    <div className="flex items-center justify-center space-x-2 opacity-90">
                      <MapPin className="w-5 h-5" strokeWidth={1.5} />
                      <span className="text-lg font-light tracking-wide">Iceland</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-12 left-12 text-white">
                  {/* Key Information Bar */}
                  <div className="grid grid-cols-3 gap-8 mb-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                      <div>
                        <div className="text-xs text-white/70 uppercase tracking-wider font-medium mb-1">
                          Duration
                        </div>
                        <div className="text-white font-light">{packageData.duration_days}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                      <div>
                        <div className="text-xs text-white/70 uppercase tracking-wider font-medium mb-1">
                          Available
                        </div>
                        <div className="text-white font-light">
                          {packageData.available_slots} slots left
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                      <div>
                        <div className="text-xs text-white/70 uppercase tracking-wider font-medium mb-1">
                          Departure
                        </div>
                        <div className="text-white font-light">{packageData.departure_date.split('T')[0]}</div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex space-x-3">
                    {packageData.highlights.map((tag, index) => (
                      <span
                        key={index}
                        className="border border-white/30 text-white px-4 py-2 text-sm font-light tracking-wide backdrop-blur-sm bg-white/10 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
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
  <h2 className="text-2xl font-light text-gray-900 tracking-wide">
    What to Prepare
  </h2>
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
            <li key={index} className="text-gray-600 font-light text-sm leading-relaxed">
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
            <li key={index} className="text-gray-600 font-light text-sm leading-relaxed">
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
            <li key={index} className="text-gray-600 font-light text-sm leading-relaxed">
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
            <li key={index} className="text-gray-600 font-light text-sm leading-relaxed">
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
