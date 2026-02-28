import React from 'react';
import { Camera, Activity, Bell, Thermometer, AlertTriangle } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const cards = [
    { 
      title: 'Caméras totales', 
      value: stats.totalCameras, 
      icon: Camera, 
      color: 'bg-blue-500',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      title: 'Caméras en ligne', 
      value: stats.onlineCameras, 
      icon: Activity, 
      color: 'bg-green-500',
      bgLight: 'bg-green-50',
      textColor: 'text-green-600',
      subtext: `${stats.offlineCameras} hors ligne`
    },
    { 
      title: 'Alertes actives', 
      value: stats.activeAlerts, 
      icon: Bell, 
      color: 'bg-red-500',
      bgLight: 'bg-red-50',
      textColor: 'text-red-600',
      subtext: `${stats.criticalAlerts} critiques`
    },
    { 
      title: 'Température moyenne', 
      value: `${stats.avgTemperature}°C`, 
      icon: Thermometer, 
      color: 'bg-orange-500',
      bgLight: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgLight} rounded-xl p-6 border border-gray-100`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold mt-2 text-gray-900">{card.value}</p>
              {card.subtext && <p className="text-xs text-gray-500 mt-1">{card.subtext}</p>}
            </div>
            <div className={`p-3 ${card.color} rounded-lg bg-opacity-10`}>
              <card.icon className={`w-6 h-6 ${card.textColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
