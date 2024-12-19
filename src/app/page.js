'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import TourCard from '@/components/TourCard';

export default function Home() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    price: 12500,
    startTime: '17:00',
    groupSize: 20,
    theme: [],
    activity: [],
    vehicle: [],
    features: [],
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchTours = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('https://beta.tripkolic.com/api/v1/product/task/tours', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${token}`,
          }
        });
        
        let toursData;
        if (response.data?.data && Array.isArray(response.data.data)) {
          toursData = response.data.data;
        } else if (Array.isArray(response.data)) {
          toursData = response.data;
        } else if (response.data && typeof response.data === 'object') {
          const possibleArrays = Object.values(response.data).find(value => Array.isArray(value));
          if (possibleArrays) {
            toursData = possibleArrays;
          } else {
            toursData = [];
            console.warn('No valid tours data found in API response');
          }
        } else {
          toursData = [];
          console.warn('Unexpected API response format');
        }
        
        setTours(toursData);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request cancelled');
        } else {
          console.error('Error fetching tours:', err);
          setError(err.response?.data?.message || 'Failed to fetch tours. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTours();

    return () => {
      controller.abort();
    };
  }, []);

  const handleFilterChange = (newFilters) => {
    console.log('New filters:', newFilters);
    setFilters(newFilters);
  };

  const filteredTours = Array.isArray(tours) ? tours.filter(tour => {
    if (filters.location && filters.location.trim() !== '') {
      const searchTerm = filters.location.toLowerCase().trim();
      const locationMatch = tour.location?.toLowerCase().includes(searchTerm) || false;
      const titleMatch = tour.title?.toLowerCase().includes(searchTerm) || false;
      
      if (!locationMatch && !titleMatch) return false;
    }

    if (filters.price && tour.price > filters.price) {
      return false;
    }

    // Start time filter - convert times to comparable format
    if (filters.startTime && tour.startTime) {
      const [filterHour, filterMinute] = filters.startTime.split(':').map(Number);
      const [tourHour, tourMinute] = tour.startTime.split(':').map(Number);
      const filterMinutes = filterHour * 60 + filterMinute;
      const tourMinutes = tourHour * 60 + tourMinute;
      if (tourMinutes < filterMinutes) return false;
    }

    // Group size filter
    if (filters.groupSize && tour.maxGroupSize > filters.groupSize) {
      return false;
    }

    // Array filters (theme, activity, vehicle, features)
    const arrayFilters = ['theme', 'activity', 'vehicle', 'features'];
    return arrayFilters.every(filterType => {
      if (!filters[filterType].length) return true;
      
      // Remove count numbers from filter values (e.g., "Island Tour (43)" -> "Island Tour")
      const selectedFilters = filters[filterType].map(filter => 
        filter.replace(/\s*\(\d+\)$/, '').toLowerCase()
      );
      
      const tourValues = tour[filterType]?.map(item => 
        item.replace(/\s*\(\d+\)$/, '').toLowerCase()
      ) || [];

      return selectedFilters.some(filter => tourValues.includes(filter));
    });
  }) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onFilterChange={handleFilterChange} />
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <div className="text-gray-600 mt-4">Loading tours...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onFilterChange={handleFilterChange} />
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onFilterChange={handleFilterChange} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">,
        {/* 
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          {filteredTours.length === 0 && (
            <div className="text-center text-gray-600 mt-8">
              No tours found matching your filters.
            </div>
          )}
        </div>
        */}
      </main>
    </div>
  );
}
