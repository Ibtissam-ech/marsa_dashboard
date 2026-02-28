import React from 'react';

const ThermalHeatMap = ({ cameras }) => {
  const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];
  const times = ['00h', '04h', '08h', '12h', '16h', '20h'];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {/* En-tête */}
        <div className="col-span-1"></div>
        {times.map(time => (
          <div key={time} className="text-center text-xs text-gray-500 font-medium">
            {time}
          </div>
        ))}

        {/* Lignes de zones */}
        {zones.map((zone, zoneIdx) => (
          <React.Fragment key={zone}>
            <div className="col-span-1 text-sm text-gray-700 font-medium flex items-center">
              {zone}
            </div>
            {times.map((_, timeIdx) => {
              // Générer des températures aléatoires pour la démo
              const temp = 40 + Math.floor(Math.random() * 45);
              const getColor = (temp) => {
                if (temp > 75) return 'bg-red-500';
                if (temp > 60) return 'bg-orange-500';
                if (temp > 45) return 'bg-yellow-500';
                return 'bg-green-500';
              };
              return (
                <div 
                  key={`${zoneIdx}-${timeIdx}`}
                  className={`aspect-square rounded-lg ${getColor(temp)} flex items-center justify-center text-white text-xs font-bold opacity-90`}
                  title={`${zone} - ${temp}°C`}
                >
                  {temp}°
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Légende */}
      <div className="flex items-center justify-end space-x-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
          <span className="text-gray-600">&lt; 45°C</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
          <span className="text-gray-600">45-60°C</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
          <span className="text-gray-600">60-75°C</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
          <span className="text-gray-600">&gt; 75°C</span>
        </div>
      </div>
    </div>
  );
};

export default ThermalHeatMap;
