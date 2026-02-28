import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import StatsCards from '../components/dashboard/StatsCards';
import TemperatureChart from '../components/dashboard/TemperatureChart';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import ZoneStats from '../components/dashboard/ZoneStats';
import Card from '../components/common/Card';
import { getDashboardStats, getAlerts, getZones } from '../services/mockData';
import { RefreshCw } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setStats(getDashboardStats());
      setAlerts(getAlerts());
      setZones(getZones().map(z => ({
        name: z.name,
        cameras: z.subzones.reduce((acc, s) => acc + s.cameras, 0),
        alerts: Math.floor(Math.random() * 10)
      })));
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading || !stats) {
    return (
      <Layout title="Dashboard">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003A6B]"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* En-tête avec bouton refresh */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Vue d'ensemble</h2>
          <button 
            onClick={loadData}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <RefreshCw size={16} />
            <span>Actualiser</span>
          </button>
        </div>

        {/* Cartes statistiques */}
        <StatsCards stats={stats} />

        {/* Graphique et zones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Évolution des températures (24h)" className="lg:col-span-2">
            <TemperatureChart data={stats.temperatureHistory} />
          </Card>
          
          <Card title="Alertes par zone">
            <ZoneStats zones={zones} />
          </Card>
        </div>

        {/* Alertes récentes */}
        <Card title="Alertes récentes">
          <RecentAlerts alerts={alerts} />
        </Card>

        {/* Caméras rapides */}
        <Card title="Aperçu des caméras">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="text-center">
                <div className="bg-gray-100 h-20 rounded-lg mb-2 flex items-center justify-center text-gray-400">
                  Cam {i}
                </div>
                <p className="text-sm font-medium">Caméra {i}</p>
                <span className="text-xs text-green-600">● En ligne</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage;
