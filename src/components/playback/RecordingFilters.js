import React from 'react';
import { Calendar, Camera, Filter, X } from 'lucide-react';

const RecordingFilters = ({ filters, onFilterChange, cameras }) => {
  const clearFilters = () => {
    onFilterChange({
      cameraId: '',
      date: '',
      type: 'all'
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <Filter size={18} className="mr-2" />
          Filtres
        </h3>
        {(filters.cameraId || filters.date || filters.type !== 'all') && (
          <button 
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <X size={14} className="mr-1" />
            Effacer tout
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtre par caméra */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Caméra</label>
          <div className="relative">
            <Camera size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filters.cameraId}
              onChange={(e) => onFilterChange({ ...filters, cameraId: e.target.value })}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B] appearance-none bg-white"
            >
              <option value="">Toutes les caméras</option>
              {cameras.map(cam => (
                <option key={cam.id} value={cam.id}>{cam.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filtre par date */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Date</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={filters.date}
              onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
            />
          </div>
        </div>

        {/* Filtre par type */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Type</label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B] appearance-none bg-white"
          >
            <option value="all">Tous les types</option>
            <option value="thermal">Thermique uniquement</option>
            <option value="standard">Standard uniquement</option>
            <option value="alertes">Avec alertes</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default RecordingFilters;
