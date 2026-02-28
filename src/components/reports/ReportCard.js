import React from 'react';
import { FileText, Download, Calendar, Clock, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ReportCard = ({ report, onDownload, onView, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText size={20} className="text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{report.title}</h4>
            <p className="text-sm text-gray-500 mt-1">{report.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
              <span className="flex items-center">
                <Calendar size={12} className="mr-1" />
                {format(new Date(report.date), 'dd/MM/yyyy')}
              </span>
              <span className="flex items-center">
                <Clock size={12} className="mr-1" />
                {format(new Date(report.date), 'HH:mm')}
              </span>
              <span>{report.fileSize}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button 
            onClick={() => onView(report)}
            className="p-2 text-gray-400 hover:text-[#003A6B] hover:bg-gray-100 rounded-lg"
            title="Voir"
          >
            <Eye size={16} />
          </button>
          <button 
            onClick={() => onDownload(report)}
            className="p-2 text-gray-400 hover:text-[#003A6B] hover:bg-gray-100 rounded-lg"
            title="Télécharger"
          >
            <Download size={16} />
          </button>
          <button 
            onClick={() => onDelete(report.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg"
            title="Supprimer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Tags */}
      {report.tags && report.tags.length > 0 && (
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-100">
          {report.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportCard;
