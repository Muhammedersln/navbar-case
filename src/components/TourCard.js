import Image from 'next/image';

export default function TourCard({ tour }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        {tour.image && (
          <div className="relative w-full h-full">
            <Image 
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white text-lg font-semibold">{tour.title}</h3>
          <p className="text-white text-sm opacity-90">{tour.location}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-primary-500 font-semibold">${tour.price}</span>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm">{tour.duration}</span>
            <span className="text-gray-600 text-sm">|</span>
            <span className="text-gray-600 text-sm">Max: {tour.maxGroupSize} people</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">{tour.description}</p>
        
        {/* Theme and Activity Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {tour.theme?.map((item, index) => (
            <span
              key={`theme-${index}`}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {item}
            </span>
          ))}
          {tour.activity?.map((item, index) => (
            <span
              key={`activity-${index}`}
              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Vehicle and Features */}
        <div className="flex flex-wrap gap-2">
          {tour.vehicle?.map((item, index) => (
            <span
              key={`vehicle-${index}`}
              className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
            >
              {item}
            </span>
          ))}
          {tour.features?.map((item, index) => (
            <span
              key={`feature-${index}`}
              className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 