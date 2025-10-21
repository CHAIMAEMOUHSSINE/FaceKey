import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ currentLanguage = 'fr' }) => {
  const navigate = useNavigate();

  const translations = {
    fr: {
      quickActions: 'Actions Rapides',
      addEmployee: 'Ajouter Employé',
      generateReport: 'Générer Rapport',
      systemSettings: 'Paramètres Système',
      manageEmployees: 'Gérer Employés',
      viewReports: 'Voir Rapports',
      exportData: 'Exporter Données'
    },
    en: {
      quickActions: 'Quick Actions',
      addEmployee: 'Add Employee',
      generateReport: 'Generate Report',
      systemSettings: 'System Settings',
      manageEmployees: 'Manage Employees',
      viewReports: 'View Reports',
      exportData: 'Export Data'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const actions = [
    {
      id: 'add-employee',
      title: t?.addEmployee,
      description: 'Nouveau membre de l\'équipe',
      icon: 'UserPlus',
      color: 'success',
      onClick: () => navigate('/employee-management')
    },
    {
      id: 'generate-report',
      title: t?.generateReport,
      description: 'Rapport de présence',
      icon: 'FileText',
      color: 'primary',
      onClick: () => navigate('/attendance-reports')
    },
    {
      id: 'manage-employees',
      title: t?.manageEmployees,
      description: 'Liste des employés',
      icon: 'Users',
      color: 'accent',
      onClick: () => navigate('/employee-management')
    },
    {
      id: 'view-reports',
      title: t?.viewReports,
      description: 'Analyses détaillées',
      icon: 'BarChart3',
      color: 'secondary',
      onClick: () => navigate('/attendance-reports')
    },
    {
      id: 'export-data',
      title: t?.exportData,
      description: 'CSV/PDF export',
      icon: 'Download',
      color: 'warning',
      onClick: () => {
        // Mock export functionality
        const csvData = `Nom,ID,Département,Statut,Heure\nChaimae Essou,EMP001,Production,Présent,08:00\nNourredine Allasak,EMP002,Administration,Présent,08:15`;
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL?.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attendance_${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
        a?.click();
        window.URL?.revokeObjectURL(url);
      }
    }
  ];

  const getButtonVariant = (color) => {
    switch (color) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'accent':
        return 'default';
      case 'secondary':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">{t?.quickActions}</h2>
      </div>
      <div className="p-6 space-y-4">
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant={getButtonVariant(action?.color)}
            onClick={action?.onClick}
            className="w-full justify-start h-auto p-4"
          >
            <div className="flex items-center space-x-4 w-full">
              <div className="flex-shrink-0">
                <Icon name={action?.icon} size={20} color="currentColor" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">{action?.title}</p>
                <p className="text-xs opacity-80 mt-1">{action?.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} color="currentColor" className="opacity-60" />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;