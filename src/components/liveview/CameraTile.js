import React from 'react';
import { Thermometer, Video, Maximize2 } from 'lucide-react';

const CameraTile = ({ camera, onClick }) => {
  const getTemperatureColor = (temp) => {
    if (!temp) return 'text-gray-400';
    if (temp > 75) return 'text-red-600';
    if (temp > 60) return 'text-orange-600';
    if (temp > 45) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusColor = () => {
    if (!camera.online) return 'bg-gray-400';
    if (camera.temperature > 75) return 'bg-red-500';
    if (camera.temperature > 60) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => onClick(camera)}
    >
      {/* Zone vidéo (simulée) */}
      <div className="relative h-32 bg-gray-900">
        {camera.thermal ? (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-red-900 opacity-80"></div>
        ) : (
          <div className="absolute inset-0 bg-gray-800"></div>
        )}
        
        {/* Indicateur de statut */}
        <div className="absolute top-2 left-2 flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
          <span className="text-xs text-white bg-black bg-opacity-50 px-2 py-0.5 rounded">
            {camera.online ? 'Live' : 'Offline'}
          </span>
        </div>

        {/* Badge thermique */}
        {camera.thermal && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-0.5 rounded flex items-center">
            <Thermometer size={12} className="text-orange-400 mr-1" />
            <span className="text-xs text-white">Thermique</span>
          </div>
        )}

        {/* Bouton plein écran au hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
          <Maximize2 className="text-white opacity-0 hover:opacity-100 transition-opacity" size={20} />
        </div>
      </div>

      {/* Informations caméra */}
      <div className="p-3">
        <h4 className="text-sm font-medium text-gray-900 truncate">{camera.name}</h4>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">ID: {camera.id}</span>
          {camera.temperature && (
            <span className={`text-xs font-medium ${getTemperatureColor(camera.temperature)}`}>
              {camera.temperature}°C
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraTile;
