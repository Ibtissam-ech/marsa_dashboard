import React from 'react';
import { Calendar, Clock, Camera, Thermometer, Play, Download, Tag } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const RecordingCard = ({ recording, onPlay, onDownload }) => {
  const startDate = parseISO(recording.startTime);
  const endDate = parseISO(recording.endTime);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row">
        {/* Miniature / Zone vidéo */}
        <div className="md:w-48 h-32 bg-gray-900 relative">
          {recording.hasThermal ? (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 flex items-center justify-center">
              <Thermometer size={24} className="text-white opacity-50" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <Camera size={24} className="text-gray-600" />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex space-x-1">
            {recording.hasThermal && (
              <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-0.5 rounded flex items-center">
                <Thermometer size={10} className="mr-1" />
                Thermique
              </span>
            )}
          </div>

          {/* Durée */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-0.5 rounded">
            {recording.duration} min
          </div>
        </div>

        {/* Informations */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">{recording.cameraName}</h4>
              <p className="text-sm text-gray-500 mt-1">{recording.zone}</p>
            </div>
            <span className="text-xs text-gray-400">{recording.fileSize}</span>
          </div>

          {/* Date et heure */}
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {format(startDate, 'dd/MM/yyyy', { locale: fr })}
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1" />
              {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
            </span>
          </div>

          {/* Tags */}
          {recording.tags && recording.tags.length > 0 && (
            <div className="flex items-center space-x-2 mt-2">
              <Tag size={12} className="text-gray-400" />
              {recording.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-2 mt-4">
            <button 
              onClick={() => onPlay(recording)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-[#003A6B] text-white text-sm rounded-lg hover:bg-[#002B4F] transition-colors"
            >
              <Play size={14} />
              <span>Lecture</span>
            </button>
            <button 
              onClick={() => onDownload(recording)}
              className="flex items-center space-x-1 px-3 py-1.5 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download size={14} />
              <span>Télécharger</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingCard;
