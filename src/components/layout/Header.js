import React from 'react';
import { Bell, User, Wifi } from 'lucide-react';

const Header = ({ title }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-full">
            <Wifi size={16} className="text-green-600" />
            <span className="text-xs font-medium text-green-700">Système en ligne</span>
          </div>
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 bg-[#003A6B] rounded-full flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
