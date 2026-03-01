import React from 'react';

const ThermalHeatMap = ({ data }) => {
  const zones = data || [
    { name: 'Zone A', temps: [45, 52, 48, 63, 71, 68] },
    { name: 'Zone B', temps: [38, 42, 55, 72, 68, 59] },
    { name: 'Zone C', temps: [62, 58, 53, 49, 44, 41] },
    { name: 'Zone D', temps: [77, 73, 69, 64, 58, 52] },
  ];

  const getColor = (temp) => {
    if (temp > 75) return 'bg-red-500';
    if (temp > 60) return 'bg-orange-500';
    if (temp > 45) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-4">
      {zones.map((zone, idx) => (
        <div key={idx} className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">{zone.name}</span>
            <span className="text-xs text-gray-500">
              Max: {Math.max(...zone.temps)}°C
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {zone.temps.map((temp, i) => (
              <div
                key={i}
                className={`${getColor(temp)} h-10 rounded flex items-center justify-center text-white text-xs font-medium`}
                title={`${temp}°C`}
              >
                {temp}°
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThermalHeatMap;
