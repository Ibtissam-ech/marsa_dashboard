import React from 'react';

const ZoneStats = ({ zones }) => {
  return (
    <div className="space-y-4">
      {zones.map((zone, index) => (
        <div key={index}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700">{zone.name}</span>
            <span className="font-medium">{zone.alerts} alertes</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#003A6B] h-2 rounded-full"
              style={{ width: `${(zone.alerts / 10) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{zone.cameras} caméras</p>
        </div>
      ))}
    </div>
  );
};

export default ZoneStats;

