import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ThermalCameraCard from '../components/thermal/ThermalCameraCard';
import ThermalStats from '../components/thermal/ThermalStats';
import ThermalHeatMap from '../components/thermal/ThermalHeatMap';
import CameraDetailModal from '../components/cameras/CameraDetailModal';  // ← AJOUTÉ
import { getAllCameras } from '../services/mockData';
import { Thermometer, Grid, Map, Filter, X } from 'lucide-react';

const ThermalPage = () => {
  const [cameras, setCameras] = useState([]);
  const [thermalCameras, setThermalCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filterTemp, setFilterTemp] = useState('all');
  const [filterZone, setFilterZone] = useState('all');

  useEffect(() => {
    const allCameras = getAllCameras();
    const thermal = allCameras.filter(c => c.thermal);
    setCameras(allCameras);
    setThermalCameras(thermal);
  }, []);

  const zones = [...new Set(thermalCameras.map(c => c.zone || 'Non assignée'))];

  const filteredCameras = thermalCameras.filter(camera => {
    if (filterTemp === 'critical' && camera.temperature <= 75) return false;
    if (filterTemp === 'warning' && (camera.temperature <= 60 || camera.temperature > 75)) return false;
    if (filterTemp === 'normal' && camera.temperature > 60) return false;
    if (filterZone !== 'all' && camera.zone !== filterZone) return false;
    return true;
  });

  const clearFilters = () => {
    setFilterTemp('all');
    setFilterZone('all');
  };

  const hasActiveFilters = filterTemp !== 'all' || filterZone !== 'all';

  return (
    <Layout title="Surveillance Thermique">
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Thermometer size={24} className="text-[#003A6B]" />
            <h2 className="text-xl font-bold text-gray-800">Caméras Thermiques</h2>
          </div>
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
              title="Vue grille"
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('heatmap')}
              className={`p-2 rounded ${viewMode === 'heatmap' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
              title="Vue heatmap"
            >
              <Map size={18} />
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <ThermalStats cameras={cameras} />

        {/* Filtres */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <Filter size={16} className="mr-2" />
              Filtres
            </h3>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
              >
                <X size={14} className="mr-1" />
                Effacer
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Niveau de température</label>
              <select
                value={filterTemp}
                onChange={(e) => setFilterTemp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
              >
                <option value="all">Tous les niveaux</option>
                <option value="critical">Critique (&gt;75°C)</option>
                <option value="warning">Avertissement (60-75°C)</option>
                <option value="normal">Normal (&lt;60°C)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Zone</label>
              <select
                value={filterZone}
                onChange={(e) => setFilterZone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
              >
                <option value="all">Toutes les zones</option>
                {zones.map((zone, i) => (
                  <option key={i} value={zone}>{zone}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Vue principale */}
        {viewMode === 'grid' ? (
          <>
            <p className="text-sm text-gray-500">
              {filteredCameras.length} caméra(s) thermique(s) trouvée(s)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCameras.map(camera => (
                <ThermalCameraCard 
                  key={camera.id}
                  camera={camera}
                  onClick={setSelectedCamera}
                />
              ))}
            </div>

            {filteredCameras.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Thermometer size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Aucune caméra thermique trouvée</p>
                <p className="text-sm text-gray-400 mt-2">Modifiez vos filtres pour voir plus de résultats</p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Carte thermique - Zones</h3>
            <ThermalHeatMap cameras={filteredCameras} />
          </div>
        )}
      </div>

      {/* Modal de détails */}
      {selectedCamera && (
        <CameraDetailModal 
          camera={selectedCamera}
          onClose={() => setSelectedCamera(null)}
        />
      )}
    </Layout>
  );
};

export default ThermalPage;