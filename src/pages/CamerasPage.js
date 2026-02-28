import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import CameraFilters from '../components/cameras/CameraFilters';
import CameraDetailModal from '../components/cameras/CameraDetailModal';
import { getCameras, getAllCameras } from '../services/mockData';
import { Camera, Thermometer, Wifi, WifiOff, MoreVertical, Eye, Edit, Download } from 'lucide-react';

const CamerasPage = () => {
  const [cameras, setCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    zone: '',
    status: 'all',
    type: 'all',
    thermalOnly: false
  });

  // Extraire les zones uniques pour les filtres
  const zones = [...new Set(getAllCameras().map(c => c.zone || 'Non assignée'))];

  useEffect(() => {
    setCameras(getAllCameras());
  }, []);

  useEffect(() => {
    let filtered = [...cameras];

    // Filtre par recherche
    if (filters.search) {
      filtered = filtered.filter(cam => 
        cam.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        cam.id.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtre par zone
    if (filters.zone) {
      filtered = filtered.filter(cam => cam.zone === filters.zone);
    }

    // Filtre par statut
    if (filters.status !== 'all') {
      filtered = filtered.filter(cam => 
        filters.status === 'online' ? cam.online : !cam.online
      );
    }

    // Filtre par type
    if (filters.type !== 'all') {
      filtered = filtered.filter(cam => 
        filters.type === 'thermal' ? cam.thermal : !cam.thermal
      );
    }

    // Filtre thermique uniquement
    if (filters.thermalOnly) {
      filtered = filtered.filter(cam => cam.thermal);
    }

    setFilteredCameras(filtered);
  }, [filters, cameras]);

  const getStatusBadge = (camera) => {
    if (!camera.online) {
      return <span className="flex items-center text-xs text-gray-500"><WifiOff size={12} className="mr-1" /> Hors ligne</span>;
    }
    return <span className="flex items-center text-xs text-green-600"><Wifi size={12} className="mr-1" /> En ligne</span>;
  };

  const getTemperatureColor = (temp) => {
    if (!temp) return 'text-gray-400';
    if (temp > 75) return 'text-red-600';
    if (temp > 60) return 'text-orange-600';
    if (temp > 45) return 'text-yellow-600';
    return 'text-green-600';
  };

  const stats = {
    total: cameras.length,
    online: cameras.filter(c => c.online).length,
    thermal: cameras.filter(c => c.thermal).length,
    alert: cameras.filter(c => c.temperature > 60).length
  };

  return (
    <Layout title="Caméras">
      <div className="space-y-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500">Total caméras</p>
            <p className="text-2xl font-bold mt-1">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center">
              <Wifi size={14} className="mr-1 text-green-500" />
              En ligne
            </p>
            <p className="text-2xl font-bold mt-1">{stats.online}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center">
              <Thermometer size={14} className="mr-1 text-orange-500" />
              Thermiques
            </p>
            <p className="text-2xl font-bold mt-1">{stats.thermal}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              En alerte
            </p>
            <p className="text-2xl font-bold mt-1">{stats.alert}</p>
          </div>
        </div>

        {/* Filtres */}
        <CameraFilters 
          filters={filters}
          onFilterChange={setFilters}
          zones={zones}
        />

        {/* Tableau des caméras */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Caméra</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Zone</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Température</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Dernière alerte</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCameras.map((camera) => (
                  <tr key={camera.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Camera size={16} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{camera.name}</p>
                          <p className="text-xs text-gray-500">ID: {camera.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{camera.zone || '-'}</td>
                    <td className="py-3 px-4">
                      {camera.thermal ? (
                        <span className="flex items-center text-xs text-orange-600">
                          <Thermometer size={12} className="mr-1" />
                          Thermique
                        </span>
                      ) : (
                        <span className="text-xs text-gray-600">Standard</span>
                      )}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(camera)}</td>
                    <td className="py-3 px-4">
                      {camera.temperature ? (
                        <span className={`text-sm font-medium ${getTemperatureColor(camera.temperature)}`}>
                          {camera.temperature}°C
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {camera.lastAlert ? new Date(camera.lastAlert).toLocaleDateString('fr-FR') : '-'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => setSelectedCamera(camera)}
                          className="p-1 text-gray-400 hover:text-[#003A6B] hover:bg-gray-100 rounded"
                          title="Voir détails"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-[#003A6B] hover:bg-gray-100 rounded">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-[#003A6B] hover:bg-gray-100 rounded">
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination simple */}
          {filteredCameras.length === 0 && (
            <div className="text-center py-12">
              <Camera size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucune caméra trouvée</p>
              <p className="text-sm text-gray-400 mt-2">Modifiez vos filtres pour voir plus de résultats</p>
            </div>
          )}

          {filteredCameras.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {filteredCameras.length} caméra(s) sur {cameras.length}
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                  Précédent
                </button>
                <button className="px-3 py-1 text-sm bg-[#003A6B] text-white rounded-lg hover:bg-[#002B4F]">
                  1
                </button>
                <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                  Suivant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de détails */}
      <CameraDetailModal 
        camera={selectedCamera}
        onClose={() => setSelectedCamera(null)}
      />
    </Layout>
  );
};

export default CamerasPage;
