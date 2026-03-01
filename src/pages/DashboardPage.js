import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import StatsCards from '../components/dashboard/StatsCards';
import TemperatureChart from '../components/dashboard/TemperatureChart';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import ZoneStats from '../components/dashboard/ZoneStats';
import TemperatureGauge from '../components/dashboard/TemperatureGauge';
import MultiZoneChart from '../components/dashboard/MultiZoneChart';
import ThermalHeatMap from '../components/dashboard/ThermalHeatMap';
import Card from '../components/common/Card';
import { getDashboardStats, getAlerts, getZones } from '../services/mockData';
import { RefreshCw, TrendingUp, Thermometer, PieChart, Map } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('temperature');

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

  // Données pour les gauges (caméras critiques)
  const criticalCameras = [
    { name: 'Caméra A1-2', temp: 82 },
    { name: 'Caméra B3-1', temp: 79 },
    { name: 'Caméra C2-4', temp: 76 },
    { name: 'Caméra D1-3', temp: 68 },
  ];

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

        {/* Première ligne : Graphique principal et gauges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Évolution des températures (24h)" className="lg:col-span-2">
            <TemperatureChart data={stats.temperatureHistory} />
          </Card>
          
          <Card title="Caméras critiques">
            <div className="space-y-4">
              {criticalCameras.map((cam, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{cam.name}</p>
                    <p className="text-xs text-gray-500">Zone {cam.name.split('-')[0]}</p>
                  </div>
                  <TemperatureGauge value={cam.temp} size="sm" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Deuxième ligne : Graphiques avancés */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Répartition par zone">
            <MultiZoneChart />
          </Card>
          
          <Card title="Carte thermique - Zones">
            <ThermalHeatMap />
          </Card>
        </div>

        {/* Troisième ligne : Alertes et zones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Alertes récentes" className="lg:col-span-2">
            <RecentAlerts alerts={alerts} />
          </Card>
          
          <Card title="Statistiques par zone">
            <ZoneStats zones={zones} />
          </Card>
        </div>

        {/* Aperçu des caméras */}
        <Card title="Aperçu des caméras">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
              <div key={i} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-lg">📹</span>
                </div>
                <p className="text-xs font-medium">Caméra {i}</p>
                <span className="text-xs text-green-600">● En ligne</span>
                <div className="mt-1 text-xs">
                  <span className={i % 3 === 0 ? 'text-red-600' : i % 3 === 1 ? 'text-orange-600' : 'text-green-600'}>
                    {45 + i * 2}°C
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage;