import React from 'react';
import { Thermometer, AlertTriangle, Activity, TrendingUp, TrendingDown } from 'lucide-react';

const ThermalStats = ({ cameras }) => {
  const thermalCameras = cameras.filter(c => c.thermal);
  
  const stats = {
    total: thermalCameras.length,
    critical: thermalCameras.filter(c => c.temperature > 75).length,
    warning: thermalCameras.filter(c => c.temperature > 60 && c.temperature <= 75).length,
    normal: thermalCameras.filter(c => c.temperature <= 60).length,
    avgTemp: Math.round(thermalCameras.reduce((acc, c) => acc + c.temperature, 0) / thermalCameras.length),
    maxTemp: Math.max(...thermalCameras.map(c => c.temperature)),
    minTemp: Math.min(...thermalCameras.map(c => c.temperature))
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total caméras thermiques */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Caméras thermiques</p>
            <p className="text-2xl font-bold mt-1">{stats.total}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Thermometer size={20} className="text-blue-600" />
          </div>
        </div>
      </div>

      {/* Alertes critiques */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Alertes critiques</p>
            <p className="text-2xl font-bold mt-1 text-red-600">{stats.critical}</p>
          </div>
          <div className="p-3 bg-red-100 rounded-lg">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
        </div>
      </div>

      {/* Température moyenne */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Température moyenne</p>
            <p className="text-2xl font-bold mt-1">{stats.avgTemp}°C</p>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <Activity size={20} className="text-orange-600" />
          </div>
        </div>
      </div>

      {/* Température max/min */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Max / Min</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-lg font-bold text-red-600">{stats.maxTemp}°C</span>
              <span className="text-gray-400">/</span>
              <span className="text-lg font-bold text-green-600">{stats.minTemp}°C</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-xs text-red-600">
              <TrendingUp size={12} className="mr-1" />
              Max
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown size={12} className="mr-1" />
              Min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermalStats;
