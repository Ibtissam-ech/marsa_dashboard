import React from 'react';
import { AlertTriangle, Thermometer, Clock } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const RecentAlerts = ({ alerts }) => {
  const getAlertColor = (severity) => {
    switch(severity) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  return (
    <div className="space-y-3">
      {alerts.slice(0, 5).map((alert) => (
        <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.severity)}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 mt-0.5" />
              <div>
                <p className="font-medium">{alert.camera}</p>
                <p className="text-sm mt-1">{alert.type}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs">
                  <span className="flex items-center">
                    <Thermometer className="w-3 h-3 mr-1" />
                    {alert.temperature}°C
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDistanceToNow(parseISO(alert.time), { addSuffix: true, locale: fr })}
                  </span>
                </div>
              </div>
            </div>
            {!alert.acknowledged && (
              <span className="text-xs bg-white px-2 py-1 rounded-full">Nouvelle</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentAlerts;
