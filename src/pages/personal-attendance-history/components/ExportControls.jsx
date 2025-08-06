import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ExportControls = ({ 
  onExport,
  isExporting = false,
  currentLanguage = 'fr'
}) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportRange, setExportRange] = useState('current');

  const translations = {
    fr: {
      export: 'Exporter',
      exportData: 'Exporter les données',
      format: 'Format',
      range: 'Période',
      exporting: 'Exportation...',
      currentMonth: 'Mois actuel',
      last3Months: '3 derniers mois',
      last6Months: '6 derniers mois',
      lastYear: 'Année dernière',
      allData: 'Toutes les données',
      exportSuccess: 'Export réussi',
      exportError: 'Erreur d\'export'
    },
    en: {
      export: 'Export',
      exportData: 'Export Data',
      format: 'Format',
      range: 'Range',
      exporting: 'Exporting...',
      currentMonth: 'Current Month',
      last3Months: 'Last 3 Months',
      last6Months: 'Last 6 Months',
      lastYear: 'Last Year',
      allData: 'All Data',
      exportSuccess: 'Export successful',
      exportError: 'Export error'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const formatOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'csv', label: 'CSV' },
    { value: 'excel', label: 'Excel' }
  ];

  const rangeOptions = [
    { value: 'current', label: t?.currentMonth },
    { value: 'last3', label: t?.last3Months },
    { value: 'last6', label: t?.last6Months },
    { value: 'lastYear', label: t?.lastYear },
    { value: 'all', label: t?.allData }
  ];

  const handleExport = async () => {
    try {
      await onExport({
        format: exportFormat,
        range: exportRange
      });
      
      // Show success notification (in a real app, you'd use a toast library)
      console.log(t?.exportSuccess);
    } catch (error) {
      console.error(t?.exportError, error);
    }
  };

  const getExportIcon = () => {
    switch (exportFormat) {
      case 'pdf':
        return 'FileText';
      case 'csv':
        return 'Table';
      case 'excel':
        return 'Sheet';
      default:
        return 'Download';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Download" size={20} />
          <span>{t?.exportData}</span>
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Format Selection */}
        <div>
          <Select
            label={t?.format}
            options={formatOptions}
            value={exportFormat}
            onChange={setExportFormat}
          />
        </div>

        {/* Range Selection */}
        <div>
          <Select
            label={t?.range}
            options={rangeOptions}
            value={exportRange}
            onChange={setExportRange}
          />
        </div>

        {/* Export Button */}
        <div>
          <Button
            variant="default"
            onClick={handleExport}
            disabled={isExporting}
            loading={isExporting}
            className="w-full"
          >
            <Icon name={getExportIcon()} size={18} />
            <span className="ml-2">
              {isExporting ? t?.exporting : t?.export}
            </span>
          </Button>
        </div>
      </div>
      {/* Export Info */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="mb-1">
              <strong>PDF:</strong> Rapport détaillé avec graphiques et statistiques
            </p>
            <p className="mb-1">
              <strong>CSV:</strong> Données brutes pour analyse dans Excel
            </p>
            <p>
              <strong>Excel:</strong> Feuille de calcul formatée avec formules
            </p>
          </div>
        </div>
      </div>
      {/* Quick Export Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setExportFormat('pdf');
              setExportRange('current');
              handleExport();
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="FileText" size={16} />
            <span className="ml-2">PDF du mois</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setExportFormat('csv');
              setExportRange('last3');
              handleExport();
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Table" size={16} />
            <span className="ml-2">CSV 3 mois</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setExportFormat('excel');
              setExportRange('lastYear');
              handleExport();
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Sheet" size={16} />
            <span className="ml-2">Excel annuel</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportControls;