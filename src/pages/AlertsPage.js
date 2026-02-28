import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import AlertFilters from '../components/alerts/AlertFilters';
import AlertCard from '../components/alerts/AlertCard';
import AlertStats from '../components/alerts/AlertStats';
import AlertDetailModal from '../components/alerts/AlertDetailModal';
import { getAlerts, getAllCameras } from '../services/mockData';
import { Bell, Download, CheckCircle } from 'lucide-react';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    severity: 'all',
    status: 'all',
    cameraId: '',
    startDate: '',
    endDate: '',
    quickDate: ''
  });

  useEffect(() => {
    setAlerts(getAlerts());
    setCameras(getAllCameras());
  }, []);

  useEffect(() => {
    let filtered = [...alerts];

    // Filtre par recherche
    if (filters.search) {
      filtered = filtered.filter(alert => 
        alert.camera.toLowerCase().includes(filters.search.toLowerCase()) ||
        alert.type.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtre par sévérité
    if (filters.severity !== 'all') {
      filtered = filtered.filter(alert => alert.severity === filters.severity);
    }

    // Filtre par statut
    if (filters.status !== 'all') {
      if (filters.status === 'new') {
        filtered = filtered.filter(alert => !alert.acknowledged);
      } else if (filters.status === 'acknowledged') {
        filtered = filtered.filter(alert => alert.acknowledged);
      }
    }

    // Filtre par caméra
    if (filters.cameraId) {
      filtered = filtered.filter(alert => alert.cameraId === filters.cameraId);
    }

    // Filtre par date
    if (filters.startDate) {
      const start = new Date(filters.startDate).setHours(0,0,0,0);
      filtered = filtered.filter(alert => new Date(alert.time) >= start);
    }
    if (filters.endDate) {
      const end = new Date(filters.endDate).setHours(23,59,59,999);
      filtered = filtered.filter(alert => new Date(alert.time) <= end);
    }

    setFilteredAlerts(filtered);
  }, [filters, alerts]);

  const handleAcknowledge = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleAcknowledgeAll = () => {
    setAlerts(alerts.map(alert => ({ ...alert, acknowledged: true })));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredAlerts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `alertes_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const newAlertsCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <Layout title="Alertes & Alarmes">
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell size={24} className="text-[#003A6B]" />
            <h2 className="text-xl font-bold text-gray-800">Centre d'alertes</h2>
            {newAlertsCount > 0 && (
              <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full ml-2">
                {newAlertsCount} nouvelle(s)
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {newAlertsCount > 0 && (
              <button 
                onClick={handleAcknowledgeAll}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <CheckCircle size={16} />
                <span>Tout accepter</span>
              </button>
            )}
            <button 
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-[#003A6B] text-white rounded-lg hover:bg-[#002B4F]"
            >
              <Download size={16} />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <AlertStats alerts={filteredAlerts} />

        {/* Filtres */}
        <AlertFilters 
          filters={filters}
          onFilterChange={setFilters}
          cameras={cameras}
        />

        {/* Liste des alertes */}
        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map(alert => (
              <AlertCard 
                key={alert.id}
                alert={alert}
                onAcknowledge={handleAcknowledge}
                onView={setSelectedAlert}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <Bell size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucune alerte trouvée</p>
              <p className="text-sm text-gray-400 mt-2">Modifiez vos filtres pour voir plus de résultats</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de détails */}
      <AlertDetailModal 
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
        onAcknowledge={handleAcknowledge}
      />
    </Layout>
  );
};

export default AlertsPage;
