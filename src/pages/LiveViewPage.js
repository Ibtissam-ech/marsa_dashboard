import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ZoneTree from '../components/liveview/ZoneTree';
import CameraGrid from '../components/liveview/CameraGrid';
import { getFullHierarchy, getAllCameras } from '../services/mockData';
import { Grid, List, ZoomIn, Search, X } from 'lucide-react';

const LiveViewPage = () => {
  const [hierarchy, setHierarchy] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [layout, setLayout] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState(null);

  useEffect(() => {
    setHierarchy(getFullHierarchy());
    const allCameras = getAllCameras();
    setCameras(allCameras);
    setFilteredCameras(allCameras);
  }, []);

  useEffect(() => {
    let filtered = cameras;
    
    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(cam => 
        cam.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtre par zone sélectionnée
    if (selectedZone) {
      // Logique pour filtrer par zone
    }
    
    setFilteredCameras(filtered);
  }, [searchTerm, selectedZone, cameras]);

  return (
    <Layout title="Live View">
      <div className="flex h-[calc(100vh-8rem)] gap-6">
        {/* Panneau gauche - Arborescence des zones */}
        <div className="w-80 bg-white rounded-xl border border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-semibold text-gray-800 mb-4">Zones & Caméras</h3>
          <ZoneTree 
            data={hierarchy} 
            onSelectCamera={(cam) => {
              setSelectedCamera(cam);
              // Optionnel: faire défiler jusqu'à la caméra
            }}
          />
        </div>

        {/* Panneau droit - Grille des caméras */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 overflow-y-auto">
          {/* Barre d'outils */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <h3 className="font-semibold text-gray-800">
                Caméras {filteredCameras.length > 0 && `(${filteredCameras.length})`}
              </h3>
              
              {/* Filtres de vue */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={() => setLayout('grid')}
                  className={`p-2 rounded ${layout === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                >
                  <Grid size={16} />
                </button>
                <button 
                  onClick={() => setLayout('compact')}
                  className={`p-2 rounded ${layout === 'compact' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                >
                  <ZoomIn size={16} />
                </button>
                <button 
                  onClick={() => setLayout('list')}
                  className={`p-2 rounded ${layout === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Rechercher une caméra..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003A6B] w-64"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X size={14} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Grille des caméras */}
          {filteredCameras.length > 0 ? (
            <CameraGrid 
              cameras={filteredCameras} 
              onCameraSelect={setSelectedCamera}
              layout={layout}
            />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Aucune caméra trouvée
            </div>
          )}
        </div>
      </div>

      {/* Modal plein écran */}
      {selectedCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-4/5 h-4/5 p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedCamera.name}</h3>
                <p className="text-sm text-gray-500">ID: {selectedCamera.id}</p>
              </div>
              <button 
                onClick={() => setSelectedCamera(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="h-[calc(100%-5rem)] bg-gray-900 rounded-lg flex items-center justify-center">
              {selectedCamera.thermal ? (
                <div className="text-center text-white">
                  <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-900 to-red-900 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold">{selectedCamera.temperature}°C</span>
                  </div>
                  <p>Flux thermique en direct</p>
                  <p className="text-sm text-gray-400 mt-2">Caméra thermique - Détection de chaleur</p>
                </div>
              ) : (
                <div className="text-center text-white">
                  <div className="w-64 h-64 mx-auto bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-4xl">📹</span>
                  </div>
                  <p>Flux vidéo en direct</p>
                  <p className="text-sm text-gray-400 mt-2">Caméra standard</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
              <span>Température: {selectedCamera.temperature || 'N/A'}°C</span>
              <span className={`px-2 py-1 rounded-full ${
                selectedCamera.online ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {selectedCamera.online ? 'En ligne' : 'Hors ligne'}
              </span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default LiveViewPage;
