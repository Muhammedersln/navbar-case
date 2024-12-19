'use client';

import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import MobileLogo from "../../public/images/Resim1.png";
import DesktopLogo from "../../public/images/Resim2.png";

const categories = ['TOURS', 'TICKETS', 'RENT', 'TRANSFER'];

const filters = {
    TOURS: {
        location: {
            type: 'search',
            placeholder: 'Where you wanna visit? (Ph Phi island, Chasing temple...)'
        },
        theme: ['Island Tour (43)', 'Land tour(43)', 'Safari (43)'],
        activity: ['Swimming (43)', 'Running (43)', 'Elephant cave (43)', 'Snorkelling (43)'],
        price: {
            type: 'range',
            min: 0,
            max: 25000,
            default: 12500
        },
        startTime: {
            type: 'range',
            min: '00:00',
            max: '23:59',
            default: '17:00'
        },
        groupSize: {
            type: 'range',
            min: 0,
            max: 40,
            default: 20
        },
        vehicle: ['Yacht (43)', 'Speedboat (43)', 'Safari (43)', 'Catamaran (43)', 'Speedcatamaran (43)'],
        features: ['Transfer (43)', 'Local Food (43)', 'Vegetarian food (43)'],
    }
};

export default function Navbar({ onFilterChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('TOURS');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        location: '',
        price: 12500,
        startTime: '17:00',
        groupSize: 20,
        theme: [],
        activity: [],
        vehicle: [],
        features: [],
    });

    const [priceRange, setPriceRange] = useState(filters.TOURS.price.default);
    const [locationSearch, setLocationSearch] = useState('');
    const [selectedStartTime, setSelectedStartTime] = useState('17:00');

    const handleFilterChange = (category, value) => {
        setActiveFilters(prev => ({
            ...prev,
            [category]: value
        }));
    };

    const handleCheckboxChange = (category, value) => {
        setActiveFilters(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value]
        }));
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setIsCategoryDropdownOpen(false);
    };

    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const applyFilters = () => {
        const formattedFilters = {
            location: locationSearch,
            price: priceRange,
            startTime: selectedStartTime,
            groupSize: activeFilters.groupSize,
            theme: activeFilters.theme.map(t => t.split(' (')[0]),
            activity: activeFilters.activity.map(a => a.split(' (')[0]),
            vehicle: activeFilters.vehicle.map(v => v.split(' (')[0]),
            features: activeFilters.features.map(f => f.split(' (')[0])
        };

        onFilterChange(formattedFilters);
        setIsOpen(false);
    };

    const resetFilters = () => {
        setLocationSearch('');
        setPriceRange(filters.TOURS.price.default);
        setSelectedStartTime('17:00');
        setActiveFilters({
            location: '',
            price: 12500,
            startTime: '17:00',
            groupSize: 20,
            theme: [],
            activity: [],
            vehicle: [],
            features: [],
        });
    };

    const handleLocationSearch = (e) => {
        setLocationSearch(e.target.value);
        handleFilterChange('location', e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedStartTime(e.target.value);
        handleFilterChange('startTime', e.target.value);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    {/* Mobile Menu - Left */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                        <span className="text-[10px] ">Travellers local market</span>

                    </div>

                    {/* Mobile Logo - Center */}
                    <div className="flex-1 flex justify-center md:hidden">
                        <div className="w-32 h-8 flex items-center justify-center">
                            <Link href="/">
                                <Image
                                    src={MobileLogo}
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="w-32 h-8 flex items-center justify-center">
                            <Link href="/">
                                <Image
                                    src={DesktopLogo}
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Profile Icons - Mobile Only */}
                    <div className="flex md:hidden items-center space-x-4">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/login">
                            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                                Login
                            </button>
                        </Link>
                        <Link href="/register">
                            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                                Register
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Popup - Only shows on mobile */}
            {isOpen && (
                <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-black bg-opacity-50 z-50">
                    <div className="fixed top-12 left-0 right-0 bottom-12 border-t-2 border-gray-600 rounded-t-3xl rounded-b-3xl">
                        <div className="bg-white rounded-t-3xl rounded-b-3xl w-full h-full overflow-y-auto">
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex justify-between items-center p-4  relative">
                                    {/* Left - Dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                            className="flex items-center bg-primary-500 text-white p-2 rounded-xl text-xl tracking-wider font-semibold px-3 focus:outline-none"
                                        >
                                            <span>{selectedCategory}</span>
                                        </button>

                                        {/* Category Dropdown */}
                                        {isCategoryDropdownOpen && (
                                            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg p-2 space-y-2 shadow-lg border border-gray-100 z-50">
                                                {categories.map((category) => (
                                                    <button
                                                        key={category}
                                                        className={`w-full text-left px-4 py-2 text-sm font-medium rounded-xl ${selectedCategory === category
                                                            ? 'bg-primary-500 text-white'
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                            }`}
                                                        onClick={() => handleCategoryChange(category)}
                                                    >
                                                        {category}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Center - Filter Text */}
                                    <div className="mr-6 flex justify-center">
                                        <p className="text-black font-semibold text-xl">
                                            <span className="relative">
                                                Filter
                                                <span className="absolute left-0 right-0 bottom-0 border-b border-black mb-0.5"></span>
                                            </span>
                                        </p>
                                    </div>

                                    {/* Right - Close Button */}
                                    <div>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="text-black font-semibold rounded-full p-2 border-2 border-black"
                                        >
                                            <XMarkIcon className="h-4 w-4 text-black font-semibold" />
                                        </button>
                                    </div>
                                </div>

                                {/* Filters */}
                                <div className="flex-1 overflow-y-auto">
                                    {/* Location Search */}
                                    <div className="p-4 ">
                                        <h3 className="text-md font-medium tracking-wide mb-4">Location</h3>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full p-2 pr-10 border border-gray-400 rounded-md text-sm"
                                                placeholder={filters.TOURS.location.placeholder}
                                                value={locationSearch}
                                                onChange={handleLocationSearch}
                                            />
                                            <MagnifyingGlassIcon className="h-5 w-5 text-primary-500 absolute right-3 top-2.5 rotate-90" />
                                        </div>
                                    </div>

                                    {/* Theme */}
                                    <div className="p-4 ">
                                        <h3 className="text-md font-medium tracking-wide mb-4">Theme</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {filters.TOURS.theme.map((option) => (
                                                <button
                                                    key={option}
                                                    className={`px-4 py-2 rounded-xl text-base ${activeFilters.theme.includes(option)
                                                        ? 'bg-primary-400 text-white'
                                                        : 'bg-white text-gray-700 border border-gray-200'
                                                        }`}
                                                    onClick={() => handleCheckboxChange('theme', option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Activity */}
                                    <div className="p-4">
                                        <h3 className="text-md font-medium tracking-wide mb-4">Activity</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {filters.TOURS.activity.map((option) => (
                                                <button
                                                    key={option}
                                                    className={`px-4 py-2 rounded-xl text-base ${activeFilters.activity.includes(option)
                                                        ? 'bg-primary-400 text-white'
                                                        : 'bg-white text-gray-700 border border-gray-200'
                                                        }`}
                                                    onClick={() => handleCheckboxChange('activity', option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range - Eski tasarım */}
                                    <div className="p-4">
                                        <h3 className="text-md font-medium tracking-wide mb-4">Price</h3>
                                        <div className="relative flex items-center justify-between gap-10">
                                            <div className="flex-1 flex items-center relative">
                                                <input
                                                    type="range"
                                                    min={filters.TOURS.price.min}
                                                    max={filters.TOURS.price.max}
                                                    value={priceRange}
                                                    onChange={(e) => {
                                                        setPriceRange(parseInt(e.target.value));
                                                        handleFilterChange('price', parseInt(e.target.value));
                                                    }}
                                                    className="w-full h-0.5 bg-gray-500 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                                                />
                                                <div className="absolute left-0 h-5 w-5 rounded-full bg-white border-2 border-gray-600 pointer-events-none"></div>
                                                <div className="absolute right-0 h-5 w-5 rounded-full bg-white border-2 border-gray-600 pointer-events-none"></div>
                                            </div>
                                            <span className="px-1 py-1 bg-white border border-gray-300 rounded-md text-sm min-w-[60px] text-center">
                                                ${priceRange}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Start Time - Eski tasarım */}
                                    <div className="p-4">
                                        <h3 className="text-md font-medium tracking-wide mb-4">Start time</h3>
                                        <div className="relative flex items-center justify-between gap-10">
                                            <div className="flex-1 flex items-center relative">
                                                <input
                                                    type="range"
                                                    min={0}
                                                    max={1439}
                                                    value={timeToMinutes(selectedStartTime)}
                                                    onChange={(e) => {
                                                        const minutes = parseInt(e.target.value);
                                                        const hours = Math.floor(minutes / 60);
                                                        const mins = minutes % 60;
                                                        const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
                                                        setSelectedStartTime(timeString);
                                                        handleFilterChange('startTime', timeString);
                                                    }}
                                                    className="w-full h-0.5 bg-gray-500 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                                                />
                                                <div className="absolute left-0 h-5 w-5 rounded-full bg-white border-2 border-gray-600 pointer-events-none"></div>
                                                <div className="absolute right-0 h-5 w-5 rounded-full bg-white border-2 border-gray-600 pointer-events-none"></div>
                                            </div>
                                            <span className="px-1 py-1 bg-white border border-gray-300 rounded-md text-sm min-w-[60px] text-center">
                                                {selectedStartTime}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Group Size */}
                                    <div className="p-4">
                                        <h3 className="text-md font-medium tracking-wide mb-4">Group size</h3>
                                        <div className="relative flex items-center justify-between gap-10">
                                            <div className="flex-1 flex items-center relative">
                                                <input
                                                    type="range"
                                                    min={filters.TOURS.groupSize.min}
                                                    max={filters.TOURS.groupSize.max}
                                                    value={activeFilters.groupSize}
                                                    onChange={(e) => handleFilterChange('groupSize', parseInt(e.target.value))}
                                                    className="w-full h-0.5 bg-gray-500 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                                                />
                                                <div className="absolute left-0 h-5 w-5 rounded-full bg-white border-2 border-gray-600 pointer-events-none"></div>
                                                <div className="absolute right-0 h-5 w-5 rounded-full bg-white border-2 border-gray-600 pointer-events-none"></div>
                                            </div>
                                            <span className="px-1 py-1 bg-white border border-gray-300 rounded-md text-sm min-w-[60px] text-center">
                                                {activeFilters.groupSize}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Vehicle */}
                                    <div className="p-4 border-b">
                                        <h3 className="text-md font-medium tracking-wide mb-4">Vehicle</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {filters.TOURS.vehicle.map((option) => (
                                                <button
                                                    key={option}
                                                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilters.vehicle.includes(option)
                                                        ? 'bg-primary-400 text-white'
                                                        : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                    onClick={() => handleCheckboxChange('vehicle', option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="p-4 ">
                                        <h3 className="text-md font-medium tracking-wide mb-4">Features</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {filters.TOURS.features.map((option) => (
                                                <button
                                                    key={option}
                                                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilters.features.includes(option)
                                                        ? 'bg-primary-400 text-white'
                                                        : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                    onClick={() => handleCheckboxChange('features', option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="p-4 flex flex-col mt-8 mb-4">
                                        <div className="flex justify-end space-x-2 w-full">
                                            <button
                                                onClick={resetFilters}
                                                className="w-32 px-6 py-3 bg-primary-500 text-white rounded-xl text-base font-medium"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                onClick={applyFilters}
                                                className="w-32 px-6 py-3 bg-primary-500 text-white rounded-xl text-base font-medium"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
} 