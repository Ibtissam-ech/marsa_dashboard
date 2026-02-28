import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ReportCard from '../components/reports/ReportCard';
import GenerateReportModal from '../components/reports/GenerateReportModal';
import ScheduledReports from '../components/reports/ScheduledReports';
import { FileText, Plus, Calendar, Download, Mail, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('generated'); // 'generated' ou 'scheduled'

  useEffect(() => {
    // Données simulées pour les rapports générés
    const mockReports = [
      {
        id: 1,
        title: 'Rapport quotidien - 28/02/2026',
        description: 'Résumé des alertes et températures',
        date: new Date(2026, 1, 28, 14, 30).toISOString(),
        fileSize: '2.4 MB',
        format: 'pdf',
        tags: ['quotidien', 'alertes', 'températures']
      },
      {
        id: 2,
        title: 'Rapport hebdomadaire - Semaine 8',
        description: 'Analyse des tendances thermiques',
        date: new Date(2026, 1, 25, 9, 15).toISOString(),
        fileSize: '5.1 MB',
        format: 'pdf',
        tags: ['hebdomadaire', 'thermique', 'statistiques']
      },
      {
        id: 3,
        title: 'Rapport mensuel - Février 2026',
        description: 'Bilan complet du mois',
        date: new Date(2026, 1, 20, 11, 0).toISOString(),
        fileSize: '8.7 MB',
        format: 'excel',
        tags: ['mensuel', 'complet', 'export']
      },
      {
        id: 4,
        title: 'Alertes critiques - Février 2026',
        description: 'Liste des alertes critiques du mois',
        date: new Date(2026, 1, 15, 16, 45).toISOString(),
        fileSize: '1.2 MB',
        format: 'csv',
        tags: ['alertes', 'critiques']
      }
    ];

    // Données simulées pour les rapports programmés
    const mockSchedules = [
      {
        id: 101,
        title: 'Rapport quotidien',
        frequency: 'daily',
        time: '08:00',
        period: 'Hier',
        format: 'PDF',
        email: 'supervision@marsamaroc.ma',
        recipients: ['maintenance@marsamaroc.ma']
      },
      {
        id: 102,
        title: 'Rapport hebdomadaire',
        frequency: 'weekly',
        time: '09:00',
        period: 'Lundi',
        format: 'PDF',
        email: 'direction@marsamaroc.ma',
        recipients: ['chef.quai@marsamaroc.ma']
      },
      {
        id: 103,
        title: 'Rapport mensuel',
        frequency: 'monthly',
        time: '10:00',
        period: '1er du mois',
        format: 'Excel',
        email: 'archives@marsamaroc.ma',
        recipients: []
      }
    ];

    setReports(mockReports);
    setSchedules(mockSchedules);
  }, []);

  const handleGenerateReport = (formData) => {
    // Simuler la génération d'un rapport
    const newReport = {
      id: reports.length + 1,
      title: formData.title || `Rapport ${format(new Date(), 'dd/MM/yyyy')}`,
      description: `Rapport ${formData.type} - ${formData.startDate} au ${formData.endDate}`,
      date: new Date().toISOString(),
      fileSize: '3.2 MB',
      format: formData.format,
      tags: [formData.type, ...(formData.includeAlerts ? ['alertes'] : [])]
    };

    setReports([newReport, ...reports]);
    setShowGenerateModal(false);

    // Simuler l'envoi par email si demandé
    if (formData.emailReport && formData.emailAddress) {
      alert(`Rapport envoyé à ${formData.emailAddress}`);
    }
  };

  const handleDownload = (report) => {
    alert(`Téléchargement de ${report.title}`);
  };

  const handleView = (report) => {
    alert(`Visualisation de ${report.title}`);
  };

  const handleDelete = (reportId) => {
    if (window.confirm('Supprimer ce rapport ?')) {
      setReports(reports.filter(r => r.id !== reportId));
    }
  };

  const handleRunSchedule = (schedule) => {
    alert(`Exécution du rapport programmé: ${schedule.title}`);
  };

  const handleEditSchedule = (schedule) => {
    alert(`Modification de ${schedule.title}`);
  };

  const handleDeleteSchedule = (scheduleId) => {
    if (window.confirm('Supprimer cette programmation ?')) {
      setSchedules(schedules.filter(s => s.id !== scheduleId));
    }
  };

  return (
    <Layout title="Rapports">
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText size={24} className="text-[#003A6B]" />
            <h2 className="text-xl font-bold text-gray-800">Centre de rapports</h2>
          </div>
          <button 
            onClick={() => setShowGenerateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#003A6B] text-white rounded-lg hover:bg-[#002B4F]"
          >
            <Plus size={16} />
            <span>Nouveau rapport</span>
          </button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Total rapports</p>
            <p className="text-2xl font-bold mt-1">{reports.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 flex items-center">
              <Calendar size={14} className="mr-1" />
              Ce mois
            </p>
            <p className="text-2xl font-bold mt-1">4</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 flex items-center">
              <Download size={14} className="mr-1" />
              Téléchargements
            </p>
            <p className="text-2xl font-bold mt-1">128</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 flex items-center">
              <Mail size={14} className="mr-1" />
              Programmés
            </p>
            <p className="text-2xl font-bold mt-1">{schedules.length}</p>
          </div>
        </div>

        {/* Onglets */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('generated')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'generated'
                  ? 'border-[#003A6B] text-[#003A6B]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Rapports générés
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'scheduled'
                  ? 'border-[#003A6B] text-[#003A6B]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Rapports programmés
            </button>
          </div>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'generated' ? (
          <>
            {/* Liste des rapports générés */}
            <div className="space-y-4">
              {reports.map(report => (
                <ReportCard 
                  key={report.id}
                  report={report}
                  onDownload={handleDownload}
                  onView={handleView}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {reports.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Aucun rapport généré</p>
                <p className="text-sm text-gray-400 mt-2">Cliquez sur "Nouveau rapport" pour créer votre premier rapport</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Rapports programmés */}
            <ScheduledReports 
              schedules={schedules}
              onRun={handleRunSchedule}
              onEdit={handleEditSchedule}
              onDelete={handleDeleteSchedule}
            />

            {schedules.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Clock size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Aucun rapport programmé</p>
                <p className="text-sm text-gray-400 mt-2">Programmez des rapports pour les recevoir automatiquement</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de génération */}
      {showGenerateModal && (
        <GenerateReportModal 
          onClose={() => setShowGenerateModal(false)}
          onGenerate={handleGenerateReport}
        />
      )}
    </Layout>
  );
};

export default ReportsPage;
