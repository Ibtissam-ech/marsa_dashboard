import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TemperatureGauge = ({ value, min = 0, max = 100, warningThreshold = 60, criticalThreshold = 75, size = 'md' }) => {
  // Calculer l'angle pour le gauge
  const percentage = (value / max) * 100;
  const data = [
    { name: 'Normal', value: Math.min(percentage, warningThreshold) },
    { name: 'Warning', value: Math.max(0, Math.min(percentage - warningThreshold, criticalThreshold - warningThreshold)) },
    { name: 'Critical', value: Math.max(0, percentage - criticalThreshold) },
    { name: 'Remaining', value: 100 - percentage }
  ];

  const COLORS = {
    Normal: '#10b981',    // Vert
    Warning: '#f59e0b',   // Orange
    Critical: '#ef4444',  // Rouge
    Remaining: '#e5e7eb'  // Gris clair
  };

  const getStatusColor = () => {
    if (value >= criticalThreshold) return 'text-red-600';
    if (value >= warningThreshold) return 'text-orange-600';
    return 'text-green-600';
  };

  const getStatusText = () => {
    if (value >= criticalThreshold) return 'CRITIQUE';
    if (value >= warningThreshold) return 'WARNING';
    return 'NORMAL';
  };

  const getSize = () => {
    if (size === 'sm') return { container: 'w-20 h-20', text: 'text-lg', innerRadius: 20, outerRadius: 28 };
    if (size === 'lg') return { container: 'w-48 h-48', text: 'text-3xl', innerRadius: 55, outerRadius: 75 };
    return { container: 'w-40 h-40', text: 'text-2xl', innerRadius: 45, outerRadius: 60 };
  };

  const dimensions = getSize();

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${dimensions.container}`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={dimensions.innerRadius}
              outerRadius={dimensions.outerRadius}
              startAngle={180}
              endAngle={0}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${dimensions.text} font-bold ${getStatusColor()}`}>{value}°C</span>
        </div>
      </div>
      {size !== 'sm' && (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${
          value >= criticalThreshold ? 'bg-red-100 text-red-700' :
          value >= warningThreshold ? 'bg-orange-100 text-orange-700' :
          'bg-green-100 text-green-700'
        }`}>
          {getStatusText()}
        </span>
      )}
    </div>
  );
};

export default TemperatureGauge;
