import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const MultiZoneChart = ({ data }) => {
  // Données par défaut si aucune n'est fournie
  const chartData = data || [
    { zone: 'Zone A', normal: 4, warning: 2, critical: 1, total: 7 },
    { zone: 'Zone B', normal: 3, warning: 3, critical: 2, total: 8 },
    { zone: 'Zone C', normal: 5, warning: 1, critical: 0, total: 6 },
    { zone: 'Zone D', normal: 2, warning: 4, critical: 3, total: 9 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="zone" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e2e8f0',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Bar dataKey="normal" stackId="a" fill="#10b981" name="Normal (<60°C)" />
        <Bar dataKey="warning" stackId="a" fill="#f59e0b" name="Warning (60-75°C)" />
        <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critique (>75°C)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MultiZoneChart;
