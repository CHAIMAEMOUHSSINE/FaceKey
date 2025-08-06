import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptions = ({ 
  onExport = () => {},
  isExporting = false,
  currentLanguage = 'fr'
}) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    template: 'standard',
    includeCharts: false,
    includeFilters: true,
    scheduleRecurring: false,
    gdprCompliant: true
  });

  const translations = {
    fr: {
      exportOptions: 'Options d\'Exportation',
      exportFormat: 'Format d\'exportation',
      template: 'Modèle',
      additionalOptions: 'Options supplémentaires',
      includeCharts: 'Inclure les graphiques',
      includeFilters: 'Inclure les filtres appliqués',
      scheduleRecurring: 'Programmer des rapports récurrents',
      gdprCompliant: 'Conforme RGPD',
      exportReport: 'Exporter le rapport',
      exporting: 'Exportation en cours...',
      estimatedTime: 'Temps estimé: 30 secondes',
      dataProtection: 'Protection des données personnelles garantie'
    },
    en: {
      exportOptions: 'Export Options',
      exportFormat: 'Export Format',
      template: 'Template',
      additionalOptions: 'Additional Options',
      includeCharts: 'Include Charts',
      includeFilters: 'Include Applied Filters',
      scheduleRecurring: 'Schedule Recurring Reports',
      gdprCompliant: 'GDPR Compliant',
      exportReport: 'Export Report',
      exporting: 'Exporting...',
      estimatedTime: 'Estimated time: 30 seconds',
      dataProtection: 'Personal data protection guaranteed'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const formatOptions = [
    { value: 'csv', label: 'CSV (Excel)', description: 'Format compatible Excel' },
    { value: 'pdf', label: 'PDF', description: 'Document portable' },
    { value: 'excel', label: 'Excel (.xlsx)', description: 'Fichier Excel natif' },
    { value: 'json', label: 'JSON', description: 'Format de données structurées' }
  ];

  const templateOptions = [
    { value: 'standard', label: 'Standard', description: 'Rapport standard avec toutes les colonnes' },
    { value: 'summary', label: 'Résumé', description: 'Vue d\'ensemble condensée' },
    { value: 'detailed', label: 'Détaillé', description: 'Rapport complet avec analyses' },
    { value: 'payroll', label: 'Paie', description: 'Format optimisé pour la paie' },
    { value: 'compliance', label: 'Conformité', description: 'Rapport de conformité réglementaire' }
  ];

  const handleConfigChange = (key, value) => {
    setExportConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = () => {
    onExport(exportConfig);
  };

  const getFormatIcon = (format) => {
    const icons = {
      csv: 'FileSpreadsheet',
      pdf: 'FileText',
      excel: 'FileSpreadsheet',
      json: 'FileCode'
    };
    return icons?.[format] || 'File';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Download" size={20} color="var(--color-primary)" />
          <span>{t?.exportOptions}</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Format & Template */}
        <div className="space-y-4">
          <Select
            label={t?.exportFormat}
            options={formatOptions}
            value={exportConfig?.format}
            onChange={(value) => handleConfigChange('format', value)}
          />
          
          <Select
            label={t?.template}
            options={templateOptions}
            value={exportConfig?.template}
            onChange={(value) => handleConfigChange('template', value)}
          />
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">{t?.additionalOptions}</h3>
          <div className="space-y-3">
            <Checkbox
              label={t?.includeCharts}
              description="Ajouter les graphiques au rapport"
              checked={exportConfig?.includeCharts}
              onChange={(e) => handleConfigChange('includeCharts', e?.target?.checked)}
            />
            <Checkbox
              label={t?.includeFilters}
              description="Afficher les filtres utilisés"
              checked={exportConfig?.includeFilters}
              onChange={(e) => handleConfigChange('includeFilters', e?.target?.checked)}
            />
            <Checkbox
              label={t?.scheduleRecurring}
              description="Programmer l'envoi automatique"
              checked={exportConfig?.scheduleRecurring}
              onChange={(e) => handleConfigChange('scheduleRecurring', e?.target?.checked)}
            />
            <Checkbox
              label={t?.gdprCompliant}
              description={t?.dataProtection}
              checked={exportConfig?.gdprCompliant}
              onChange={(e) => handleConfigChange('gdprCompliant', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Export Progress */}
      {isExporting && (
        <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Loader2" size={20} color="var(--color-primary)" className="animate-spin" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{t?.exporting}</p>
              <p className="text-xs text-muted-foreground">{t?.estimatedTime}</p>
            </div>
          </div>
          <div className="mt-3 w-full bg-border rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '45%' }}></div>
          </div>
        </div>
      )}
      {/* GDPR Notice */}
      <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} color="var(--color-accent)" className="mt-0.5" />
          <div className="text-xs text-accent">
            <p className="font-medium">Conformité RGPD</p>
            <p className="mt-1">
              Les données personnelles sont traitées conformément au RGPD. 
              L'exportation respecte les principes de minimisation et de protection des données.
            </p>
          </div>
        </div>
      </div>
      {/* Export Button */}
      <div className="flex items-center justify-end mt-6 pt-6 border-t border-border">
        <Button
          variant="default"
          onClick={handleExport}
          loading={isExporting}
          iconName={getFormatIcon(exportConfig?.format)}
          iconPosition="left"
          className="min-w-[140px]"
        >
          {t?.exportReport}
        </Button>
      </div>
    </div>
  );
};

export default ExportOptions;