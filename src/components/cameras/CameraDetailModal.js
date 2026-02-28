import React from 'react';
import { X, Camera, Thermometer, MapPin, Activity, Calendar, AlertTriangle, Wifi, WifiOff, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const CameraDetailModal = ({ camera, onClose }) => {
  if (!camera) return null;

  const getStatusColor = () => {
    if (!camera.online) return 'bg-gray-400';
    if (camera.temperature > 75) return 'bg-red-500';
    if (camera.temperature > 60) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getTemperatureColor = (temp) => {
    if (!temp) return 'text-gray-400';
    if (temp > 75) return 'text-red-600';
    if (temp > 60) return 'text-orange-600';
    if (temp > 45) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
            <h2 className="text-xl font-semibold text-gray-900">{camera.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne gauche - Flux vidéo */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-xl h-80 flex items-center justify-center mb-4">
                {camera.thermal ? (
                  <div className="text-center text-white">
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-900 to-red-900 rounded-lg flex items-center justify-center mb-4">
                      <Thermometer size={48} className="text-white opacity-50" />
                    </div>
                    <p>Flux thermique en direct</p>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <div className="w-48 h-48 mx-auto bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                      <Camera size={48} className="text-gray-600" />
                    </div>
                    <p>Flux vidéo en direct</p>
                  </div>
                )}
              </div>

              {/* Mini-graphique de température simulé */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Historique température (24h)</h4>
                <div className="h-20 flex items-end space-x-1">
                  {[45, 52, 48, 63, 71, 68, 59, 62, 58, 55, 61, 65].map((temp, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div 
                        className={`w-full ${temp > 70 ? 'bg-red-400' : temp > 55 ? 'bg-orange-400' : 'bg-green-400'} rounded-t`}
                        style={{ height: `${temp}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">{i}h</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite - Informations */}
            <div className="space-y-4">
              {/* Carte d'info principale */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Informations générales</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">ID</span>
                    <span className="text-sm font-medium">{camera.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Zone</span>
                    <span className="text-sm font-medium">{camera.zone || 'Non assignée'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Sous-zone</span>
                    <span className="text-sm font-medium">{camera.subzone || 'Non assignée'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Type</span>
                    <span className="text-sm font-medium flex items-center">
                      {camera.thermal ? (
                        <>
                          <Thermometer size={14} className="mr-1 text-orange-500" />
                          Thermique
                        </>
                      ) : (
                        'Standard'
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Température actuelle */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Température</h4>
                {camera.temperature ? (
                  <div className="text-center">
                    <span className={`text-4xl font-bold ${getTemperatureColor(camera.temperature)}`}>
                      {camera.temperature}°C
                    </span>
                    <p className="text-sm text-gray-500 mt-2">
                      {camera.temperature > 75 ? '⚠️ Critique - Action requise' :
                       camera.temperature > 60 ? '⚠️ Avertissement - Surveiller' :
                       '✅ Normal'}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center">Non disponible</p>
                )}
              </div>

              {/* Statut */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Statut</h4>
                <div className="flex items-center space-x-2">
                  {camera.online ? (
                    <>
                      <Wifi className="text-green-500" size={20} />
                      <span className="text-green-600 font-medium">En ligne</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="text-gray-500" size={20} />
                      <span className="text-gray-600">Hors ligne</span>
                    </>
                  )}
                </div>
                {camera.lastAlert && (
                  <div className="mt-3 text-xs text-gray-500 flex items-center">
                    <Clock size={12} className="mr-1" />
                    Dernière alerte: {format(new Date(camera.lastAlert), 'dd/MM/yyyy HH:mm', { locale: fr })}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-[#003A6B] text-white py-2 rounded-lg hover:bg-[#002B4F] transition-colors">
                  Voir en direct
                </button>
                <button className="flex-1 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Historique
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraDetailModal;
