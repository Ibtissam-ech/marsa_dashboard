import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import RecordingFilters from '../components/playback/RecordingFilters';
import RecordingCard from '../components/playback/RecordingCard';
import TimelineView from '../components/playback/TimelineView';
import { getRecordings, getAllCameras } from '../services/mockData';
import { Calendar, Clock, DownloadCloud } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const PlaybackPage = () => {
  const [recordings, setRecordings] = useState([]);
  const [filteredRecordings, setFilteredRecordings] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [filters, setFilters] = useState({
    cameraId: '',
    date: '',
    type: 'all'
  });

  useEffect(() => {
    setRecordings(getRecordings());
    setCameras(getAllCameras());
  }, []);

  useEffect(() => {
    let filtered = [...recordings];

    // Filtre par caméra
    if (filters.cameraId) {
      filtered = filtered.filter(rec => rec.cameraId === filters.cameraId);
    }

    // Filtre par date
    if (filters.date) {
      filtered = filtered.filter(rec => 
        format(parseISO(rec.startTime), 'yyyy-MM-dd') === filters.date
      );
    }

    // Filtre par type
    if (filters.type === 'thermal') {
      filtered = filtered.filter(rec => rec.hasThermal);
    } else if (filters.type === 'standard') {
      filtered = filtered.filter(rec => !rec.hasThermal);
    } else if (filters.type === 'alertes') {
      filtered = filtered.filter(rec => rec.tags && rec.tags.length > 0);
    }

    setFilteredRecordings(filtered);
  }, [filters, recordings]);

  const handlePlay = (recording) => {
    // Ajouter des événements simulés
    const events = [
      { time: recording.startTime, severity: 'warning', description: 'Température élevée' },
      { time: new Date(new Date(recording.startTime).getTime() + 5 * 60000).toISOString(), severity: 'critical', description: 'Surchauffe moteur' }
    ];
    setSelectedRecording({ ...recording, events });
  };

  const handleDownload = (recording) => {
    alert(`Téléchargement de ${recording.cameraName} - ${format(parseISO(recording.startTime), 'dd/MM/yyyy HH:mm')}`);
  };

  const stats = {
    total: recordings.length,
    totalHours: recordings.reduce((acc, rec) => acc + rec.duration, 0),
    thermalCount: recordings.filter(r => r.hasThermal).length
  };

  return (
    <Layout title="Playback - Enregistrements">
      <div className="space-y-6">
        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500">Total enregistrements</p>
            <p className="text-2xl font-bold mt-1">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" />
              Heures d'enregistrement
            </p>
            <p className="text-2xl font-bold mt-1">{Math.round(stats.totalHours / 60)}h</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500">Enregistrements thermiques</p>
            <p className="text-2xl font-bold mt-1">{stats.thermalCount}</p>
          </div>
        </div>

        {/* Filtres */}
        <RecordingFilters 
          filters={filters}
          onFilterChange={setFilters}
          cameras={cameras}
        />

        {/* Liste des enregistrements */}
        <div className="space-y-4">
          {filteredRecordings.length > 0 ? (
            filteredRecordings.map(recording => (
              <RecordingCard 
                key={recording.id}
                recording={recording}
                onPlay={handlePlay}
                onDownload={handleDownload}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <DownloadCloud size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucun enregistrement trouvé</p>
              <p className="text-sm text-gray-400 mt-2">Modifiez vos filtres pour voir plus de résultats</p>
            </div>
          )}
        </div>
      </div>

      {/* Timeline view modale */}
      {selectedRecording && (
        <TimelineView 
          recording={selectedRecording}
          onClose={() => setSelectedRecording(null)}
        />
      )}
    </Layout>
  );
};

export default PlaybackPage;
