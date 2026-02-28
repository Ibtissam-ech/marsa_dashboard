import React from 'react';
import { Filter, X, Calendar, Camera, AlertTriangle } from 'lucide-react';

const AlertFilters = ({ filters, onFilterChange, cameras = [] }) => {
  const clearFilters = () => {
    onFilterChange({
      search: '',
      severity: 'all',
      status: 'all',
      cameraId: '',
      startDate: '',
      endDate: ''
    });
  };

  const hasActiveFilters = filters.search || filters.severity !== 'all' || filters.status !== 'all' || filters.cameraId || filters.startDate || filters.endDate;

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
        <div>
          <input
            type="text"
            placeholder="Rechercher une alerte..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filtre par sévérité */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Sévérité</label>
            <select
              value={filters.severity}
              onChange={(e) => onFilterChange({ ...filters, severity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
            >
              <option value="all">Toutes</option>
              <option value="critical">Critique</option>
              <option value="warning">Avertissement</option>
              <option value="info">Info</option>
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
              <option value="all">Tous</option>
              <option value="new">Nouvelle</option>
              <option value="acknowledged">Acceptée</option>
              <option value="resolved">Résolue</option>
            </select>
          </div>

          {/* Filtre par caméra */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Caméra</label>
            <select
              value={filters.cameraId}
              onChange={(e) => onFilterChange({ ...filters, cameraId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
            >
              <option value="">Toutes</option>
              {cameras.slice(0, 10).map(cam => (
                <option key={cam.id} value={cam.id}>{cam.name}</option>
              ))}
            </select>
          </div>

          {/* Filtre par date rapide */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Période</label>
            <select
              value={filters.quickDate}
              onChange={(e) => {
                const value = e.target.value;
                const now = new Date();
                let startDate = '';
                
                if (value === 'today') {
                  startDate = new Date(now.setHours(0,0,0,0)).toISOString().split('T')[0];
                } else if (value === 'yesterday') {
                  const yesterday = new Date(now.setDate(now.getDate() - 1));
                  startDate = yesterday.toISOString().split('T')[0];
                } else if (value === 'week') {
                  const weekAgo = new Date(now.setDate(now.getDate() - 7));
                  startDate = weekAgo.toISOString().split('T')[0];
                }
                
                onFilterChange({ ...filters, quickDate: value, startDate });
              }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
            >
              <option value="">Personnalisé</option>
              <option value="today">Aujourd'hui</option>
              <option value="yesterday">Hier</option>
              <option value="week">7 derniers jours</option>
            </select>
          </div>
        </div>

        {/* Dates personnalisées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Date début</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value, quickDate: '' })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Date fin</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value, quickDate: '' })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertFilters;

