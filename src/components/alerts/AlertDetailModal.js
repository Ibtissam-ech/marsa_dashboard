import React from 'react';
import { X, AlertTriangle, Thermometer, Camera, Clock, MapPin, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AlertDetailModal = ({ alert, onClose, onAcknowledge }) => {
  if (!alert) return null;

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-orange-600 bg-orange-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Détails de l'alerte</h2>
              <p className="text-sm text-gray-500">ID: {alert.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-6">
          {/* Informations principales */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Caméra</p>
              <p className="font-medium">{alert.camera}</p>
              <p className="text-xs text-gray-400 mt-1">ID: {alert.cameraId}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Type d'alerte</p>
              <p className="font-medium">{alert.type}</p>
            </div>
          </div>

          {/* Température */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-xs text-gray-500 mb-2">Température relevée</p>
            <div className="flex items-end space-x-2">
              <span className={`text-4xl font-bold ${
                alert.temperature > 75 ? 'text-red-600' :
                alert.temperature > 60 ? 'text-orange-600' :
                'text-green-600'
              }`}>
                {alert.temperature}°C
              </span>
              <span className="text-sm text-gray-500 mb-1">
                (seuil: 60°C)
              </span>
            </div>
          </div>

          {/* Horodatage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1 flex items-center">
                <Clock size={12} className="mr-1" />
                Date et heure
              </p>
              <p className="font-medium">
                {format(new Date(alert.time), 'dd/MM/yyyy HH:mm:ss', { locale: fr })}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Statut</p>
              <p className="font-medium">
                {alert.acknowledged ? 'Acceptée' : 'Nouvelle'}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Description</p>
            <p className="text-gray-700">{alert.description || 'Aucune description'}</p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            {!alert.acknowledged && (
              <button 
                onClick={() => {
                  onAcknowledge(alert.id);
                  onClose();
                }}
                className="flex-1 bg-[#003A6B] text-white py-3 rounded-lg hover:bg-[#002B4F] transition-colors flex items-center justify-center"
              >
                <CheckCircle size={18} className="mr-2" />
                Accepter l'alerte
              </button>
            )}
            <button 
              onClick={onClose}
              className="flex-1 border border-gray-200 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailModal;
