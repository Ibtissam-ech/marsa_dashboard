import React, { useState } from 'react';
import { X, Calendar, Camera, FileText, Download, Mail } from 'lucide-react';

const GenerateReportModal = ({ onClose, onGenerate }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'daily',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    includeCameras: 'all',
    includeAlerts: true,
    includeStats: true,
    includeCharts: true,
    format: 'pdf',
    emailReport: false,
    emailAddress: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FileText size={20} className="text-[#003A6B]" />
            <h2 className="text-xl font-semibold text-gray-900">Générer un rapport</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre du rapport
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
              placeholder="Ex: Rapport quotidien - 28/02/2026"
              required
            />
          </div>

          {/* Type de rapport */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de rapport
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
            >
              <option value="daily">Quotidien</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuel</option>
              <option value="custom">Personnalisé</option>
            </select>
          </div>

          {/* Période */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date début
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date fin
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
              />
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenu du rapport
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.includeAlerts}
                  onChange={(e) => setFormData({ ...formData, includeAlerts: e.target.checked })}
                  className="w-4 h-4 text-[#003A6B] rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Inclure les alertes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.includeStats}
                  onChange={(e) => setFormData({ ...formData, includeStats: e.target.checked })}
                  className="w-4 h-4 text-[#003A6B] rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Inclure les statistiques</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.includeCharts}
                  onChange={(e) => setFormData({ ...formData, includeCharts: e.target.checked })}
                  className="w-4 h-4 text-[#003A6B] rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Inclure les graphiques</span>
              </label>
            </div>
          </div>

          {/* Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format du fichier
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="pdf"
                  checked={formData.format === 'pdf'}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                  className="w-4 h-4 text-[#003A6B] border-gray-300"
                />
                <span className="text-sm text-gray-700">PDF</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="excel"
                  checked={formData.format === 'excel'}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                  className="w-4 h-4 text-[#003A6B] border-gray-300"
                />
                <span className="text-sm text-gray-700">Excel</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="csv"
                  checked={formData.format === 'csv'}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                  className="w-4 h-4 text-[#003A6B] border-gray-300"
                />
                <span className="text-sm text-gray-700">CSV</span>
              </label>
            </div>
          </div>

          {/* Envoi par email */}
          <div className="border-t border-gray-200 pt-4">
            <label className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                checked={formData.emailReport}
                onChange={(e) => setFormData({ ...formData, emailReport: e.target.checked })}
                className="w-4 h-4 text-[#003A6B] rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">Envoyer par email</span>
            </label>

            {formData.emailReport && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003A6B]"
                  placeholder="exemple@marsamaroc.ma"
                />
              </div>
            )}
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#003A6B] text-white rounded-lg hover:bg-[#002B4F] flex items-center"
            >
              <Download size={16} className="mr-2" />
              Générer le rapport
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateReportModal;
