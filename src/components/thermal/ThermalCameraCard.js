import React from 'react';
import { Thermometer, AlertTriangle, Activity, Eye } from 'lucide-react';

const ThermalCameraCard = ({ camera, onClick }) => {
  const getTemperatureColor = (temp) => {
    if (temp > 75) return 'text-red-600';
    if (temp > 60) return 'text-orange-600';
    if (temp > 45) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getHeatMapColor = (temp) => {
    if (temp > 75) return 'from-red-600 to-red-800';
    if (temp > 60) return 'from-orange-500 to-red-600';
    if (temp > 45) return 'from-yellow-500 to-orange-500';
    return 'from-blue-500 to-green-500';
  };

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => onClick(camera)}
    >
      {/* Visualisation thermique */}
      <div className="relative h-40">
        <div className={`absolute inset-0 bg-gradient-to-br ${getHeatMapColor(camera.temperature)} opacity-90`}>
          {/* Points chauds simulés */}
          <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-white bg-opacity-30 rounded-full blur-md"></div>
          <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-red-500 bg-opacity-40 rounded-full blur-lg"></div>
        </div>
        
        {/* Température affichée */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full flex items-center">
          <Thermometer size={14} className="mr-1" />
          <span className="text-sm font-bold">{camera.temperature}°C</span>
        </div>

        {/* Statut */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            camera.temperature > 75 ? 'bg-red-500 text-white' :
            camera.temperature > 60 ? 'bg-orange-500 text-white' :
            'bg-green-500 text-white'
          }`}>
            {camera.temperature > 75 ? 'CRITIQUE' :
             camera.temperature > 60 ? 'WARNING' : 'NORMAL'}
          </span>
        </div>

        {/* Icône de vue */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-1.5 rounded-lg">
          <Eye size={16} className="text-white" />
        </div>
      </div>

      {/* Informations */}
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-sm font-medium text-gray-900">{camera.name}</h4>
            <p className="text-xs text-gray-500 mt-1">{camera.zone || 'Zone non assignée'}</p>
          </div>
        </div>

        {/* Mini graphique de température */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Température</span>
            <span className={getTemperatureColor(camera.temperature)}>
              {camera.temperature}°C
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                camera.temperature > 75 ? 'bg-red-500' :
                camera.temperature > 60 ? 'bg-orange-500' :
                'bg-green-500'
              }`}
              style={{ width: `${(camera.temperature / 100) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Dernière alerte */}
        {camera.temperature > 60 && (
          <div className="mt-2 flex items-center text-xs text-red-600">
            <AlertTriangle size={12} className="mr-1" />
            Alerte température élevée
          </div>
        )}
      </div>
    </div>
  );
};

export default ThermalCameraCard;
