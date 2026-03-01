import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const TemperatureSparkline = ({ data, color = '#003A6B' }) => {
  const sparklineData = data || [
    { temp: 45 }, { temp: 52 }, { temp: 48 }, { temp: 63 }, 
    { temp: 71 }, { temp: 68 }, { temp: 59 }, { temp: 62 }
  ];

  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={sparklineData}>
        <Line 
          type="monotone" 
          dataKey="temp" 
          stroke={color} 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureSparkline;
