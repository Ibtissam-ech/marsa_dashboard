import React from 'react';
import { AlertTriangle, Bell, CheckCircle, Clock } from 'lucide-react';

const AlertStats = ({ alerts }) => {
  const stats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    warning: alerts.filter(a => a.severity === 'warning').length,
    info: alerts.filter(a => a.severity === 'info').length,
    new: alerts.filter(a => !a.acknowledged).length,
    resolved: alerts.filter(a => a.acknowledged).length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total alertes</p>
            <p className="text-2xl font-bold mt-1">{stats.total}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Bell size={20} className="text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Critiques</p>
            <p className="text-2xl font-bold mt-1 text-red-600">{stats.critical}</p>
          </div>
          <div className="p-3 bg-red-100 rounded-lg">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Avertissements</p>
            <p className="text-2xl font-bold mt-1 text-orange-600">{stats.warning}</p>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <AlertTriangle size={20} className="text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Nouvelles</p>
            <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.new}</p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Clock size={20} className="text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Résolues</p>
            <p className="text-2xl font-bold mt-1 text-green-600">{stats.resolved}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <CheckCircle size={20} className="text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertStats;
