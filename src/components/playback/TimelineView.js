import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Maximize, Scissors, SkipBack, SkipForward } from 'lucide-react';

const TimelineView = ({ recording, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(recording.duration * 60); // en secondes
  const videoRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return h > 0 
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * duration);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="w-4/5 bg-black rounded-xl overflow-hidden">
        {/* Zone vidéo */}
        <div className="relative h-[60vh] bg-gray-900 flex items-center justify-center">
          {recording.hasThermal ? (
            <div className="text-center text-white">
              <div className="w-96 h-96 mx-auto bg-gradient-to-br from-blue-900 to-red-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-6xl font-bold">45°C</span>
              </div>
              <p>Lecture de l'enregistrement thermique</p>
            </div>
          ) : (
            <div className="text-center text-white">
              <div className="w-96 h-96 mx-auto bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <span className="text-6xl">🎥</span>
              </div>
              <p>Lecture de l'enregistrement - {recording.cameraName}</p>
            </div>
          )}

          {/* Bouton fermer */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* Contrôles */}
        <div className="p-4 bg-black border-t border-gray-800">
          {/* Timeline */}
          <div 
            className="relative h-2 bg-gray-800 rounded-full mb-4 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="absolute h-full bg-[#003A6B] rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
            {/* Marqueurs d'événements */}
            {recording.events?.map((event, i) => (
              <div
                key={i}
                className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full ${
                  event.severity === 'critical' ? 'bg-red-500' : 'bg-orange-500'
                }`}
                style={{ left: `${(new Date(event.time).getHours() / 24) * 100}%` }}
                title={event.description}
              ></div>
            ))}
          </div>

          {/* Barre de contrôle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-[#003A6B] text-white rounded-lg hover:bg-[#002B4F]"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <SkipBack size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <SkipForward size={18} />
              </button>
              <span className="text-sm text-gray-400">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white">
                <Scissors size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Volume2 size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Maximize size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
