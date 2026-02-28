import React from 'react';
import { Calendar, Clock, Mail, Edit, Trash2, Play } from 'lucide-react';

const ScheduledReports = ({ schedules, onRun, onEdit, onDelete }) => {
  const getFrequencyText = (schedule) => {
    switch(schedule.frequency) {
      case 'daily': return 'Tous les jours';
      case 'weekly': return 'Toutes les semaines';
      case 'monthly': return 'Tous les mois';
      default: return schedule.frequency;
    }
  };

  return (
    <div className="space-y-4">
      {schedules.map((schedule) => (
        <div key={schedule.id} className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{schedule.title}</h4>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {getFrequencyText(schedule)}
                </span>
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {schedule.time}
                </span>
                {schedule.email && (
                  <span className="flex items-center">
                    <Mail size={14} className="mr-1" />
                    {schedule.email}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {schedule.format}
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {schedule.period}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button 
                onClick={() => onRun(schedule)}
                className="p-2 text-gray-400 hover:text-green-600 hover:bg-gray-100 rounded-lg"
                title="Exécuter maintenant"
              >
                <Play size={16} />
              </button>
              <button 
                onClick={() => onEdit(schedule)}
                className="p-2 text-gray-400 hover:text-[#003A6B] hover:bg-gray-100 rounded-lg"
                title="Modifier"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => onDelete(schedule.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                title="Supprimer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduledReports;
