import React from 'react';
import { Filter, X, Search, Camera, Thermometer, Wifi, WifiOff } from 'lucide-react';

const CameraFilters = ({ filters, onFilterChange, zones = [] }) => {
  const clearFilters = () => {
    onFilterChange({
      search: '',
      zone: '',
      status: 'all',
      type: 'all',
      thermalOnly: false
    });
  };

  const hasActiveFilters = filters.search || filters.zone || filters.status !== 'all' || filters.type !== 'all' || filters.thermalOnly;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <Filter size={18} className="mr-2" />
          Filtres
        </h3>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <X size={14} className="mr-1" />
            Effacer tout
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Recherche */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une caméra..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filtre par zone */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Zone</label>
            <select
              value={filters.zone}
              onChange={(e) => onFilterChange({ ...filters, zone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
            >
              <option value="">Toutes les zones</option>
              {zones.map((zone, i) => (
                <option key={i} value={zone}>{zone}</option>
              ))}
            </select>
          </div>

          {/* Filtre par statut */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Statut</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
            >
              <option value="all">Tous les statuts</option>
              <option value="online">En ligne</option>
              <option value="offline">Hors ligne</option>
            </select>
          </div>

          {/* Filtre par type */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Type</label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
            >
              <option value="all">Tous les types</option>
              <option value="standard">Standard</option>
              <option value="thermal">Thermique</option>
              <option value="ptz">PTZ</option>
            </select>
          </div>

          {/* Filtre thermique uniquement */}
          <div className="flex items-center">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.thermalOnly}
                onChange={(e) => onFilterChange({ ...filters, thermalOnly: e.target.checked })}
                className="w-4 h-4 text-[#003A6B] rounded border-gray-300 focus:ring-[#003A6B]"
              />
              <span className="text-sm text-gray-700 flex items-center">
                <Thermometer size={14} className="mr-1 text-orange-500" />
                Thermique uniquement
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraFilters;
