import React from 'react';
import { AlertTriangle, Thermometer, Camera, Clock, CheckCircle, Eye } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const AlertCard = ({ alert, onAcknowledge, onView }) => {
  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          icon: 'text-red-500',
          badge: 'bg-red-100 text-red-700'
        };
      case 'warning':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          text: 'text-orange-700',
          icon: 'text-orange-500',
          badge: 'bg-orange-100 text-orange-700'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700',
          icon: 'text-blue-500',
          badge: 'bg-blue-100 text-blue-700'
        };
    }
  };

  const styles = getSeverityStyles(alert.severity);
  const timeAgo = formatDistanceToNow(new Date(alert.time), { addSuffix: true, locale: fr });

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-xl p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <AlertTriangle className={`${styles.icon} w-5 h-5 mt-0.5`} />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-gray-900">{alert.camera}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full ${styles.badge}`}>
                {alert.severity === 'critical' ? 'Critique' : alert.severity === 'warning' ? 'Avertissement' : 'Info'}
              </span>
              {!alert.acknowledged && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                  Nouvelle
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-700 mt-1">{alert.type}</p>
            <p className="text-xs text-gray-500 mt-1">{alert.description}</p>
            
            <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center">
                <Thermometer size={12} className="mr-1" />
                {alert.temperature}°C
              </span>
              <span className="flex items-center">
                <Camera size={12} className="mr-1" />
                {alert.cameraId}
              </span>
              <span className="flex items-center">
                <Clock size={12} className="mr-1" />
                {timeAgo}
              </span>
            </div>

            <div className="flex items-center space-x-2 mt-3">
              <button 
                onClick={() => onView(alert)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-50"
              >
                <Eye size={12} />
                <span>Détails</span>
              </button>
              {!alert.acknowledged && (
                <button 
                  onClick={() => onAcknowledge(alert.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-[#003A6B] text-white text-xs rounded-lg hover:bg-[#002B4F]"
                >
                  <CheckCircle size={12} />
                  <span>Accepter</span>
                </button>
              )}
            </div>
          </div>
        </div>
        
        <span className="text-xs text-gray-400">
          {format(new Date(alert.time), 'HH:mm')}
        </span>
      </div>
    </div>
  );
};

export default AlertCard;
