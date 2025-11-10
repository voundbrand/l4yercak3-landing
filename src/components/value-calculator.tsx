'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useContentTheme, useReadingMode } from '@/components/content-page-layout';
import { LeadCaptureForm } from '@/components/lead-capture-form';

interface CalculatorInputs {
  organizationSize: number;
  adminStaffCount: number;
  adminHoursPerWeek: number;
  adminLaborCost: number;
  executiveStaffCount: number;
  executiveHoursPerWeek: number;
  executiveLaborCost: number;
  annualEvents: number;
  avgMemberValue: number;
  currentRevenue?: number;
  industryType: string;
}

interface CalculatedValues {
  // Admin staff calculations
  adminWeeklyHours: number;
  adminAnnualHours: number;
  adminAnnualWaste: number;
  adminFreedHours: number;
  adminLaborCostAvoided: number;
  
  // Executive staff calculations
  executiveWeeklyHours: number;
  executiveAnnualHours: number;
  executiveAnnualWaste: number;
  executiveFreedHours: number;
  executiveLaborCostAvoided: number;
  
  // Combined totals
  totalWeeklyHours: number;
  totalAnnualHours: number;
  annualWaste: number;
  potentialFreedHours: number;
  potentialFreedWeeklyHours: number;
  laborCostAvoided: number;
  
  // Revenue calculations
  newMembersAcquired: number;
  memberRevenue: number;
  newProgramRevenue: number;
  partnershipRevenue: number;
  churnReductionRevenue: number;
  conservativeNewRevenue: number;
  totalValueCreated: number;
  
  taskBreakdown: {
    [key: string]: {
      annualHours: number;
      annualCost: number;
      percentage: number;
    };
  };
}

const defaultInputs: CalculatorInputs = {
  organizationSize: 20,
  adminStaffCount: 2,
  adminHoursPerWeek: 20,
  adminLaborCost: 30,
  executiveStaffCount: 1,
  executiveHoursPerWeek: 15,
  executiveLaborCost: 80,
  annualEvents: 20,
  avgMemberValue: 500,
  currentRevenue: undefined,
  industryType: 'medical'
};

export function ValueCalculator() {
  const { t } = useTranslation();
  const theme = useContentTheme();
  const { readingMode } = useReadingMode();
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);

  // Theme classes for inputs and other elements
  const themeClasses = {
    dark: {
      input: "bg-background/80 border-border/30 text-foreground",
      taskTile: "bg-background border-border",
      button: "bg-primary text-primary-foreground hover:bg-primary/90",
      buttonSecondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    },
    sepia: {
      input: "bg-amber-50/90 border-amber-300/40 text-amber-950 placeholder:text-amber-700/50",
      taskTile: "bg-amber-50/90 border-amber-300/40",
      button: "bg-amber-800 text-amber-50 hover:bg-amber-700",
      buttonSecondary: "bg-amber-700 text-amber-50 hover:bg-amber-600",
    },
  };

  const currentTheme = themeClasses[readingMode];
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const calculations = useMemo((): CalculatedValues => {
    // Admin staff calculations
    const adminWeeklyHours = inputs.adminStaffCount * inputs.adminHoursPerWeek;
    const adminAnnualHours = adminWeeklyHours * 52;
    const adminAnnualWaste = adminAnnualHours * inputs.adminLaborCost;
    const adminFreedHours = adminAnnualHours * 0.75; // 75% automation potential
    const adminLaborCostAvoided = adminFreedHours * inputs.adminLaborCost;
    
    // Executive staff calculations
    const executiveWeeklyHours = inputs.executiveStaffCount * inputs.executiveHoursPerWeek;
    const executiveAnnualHours = executiveWeeklyHours * 52;
    const executiveAnnualWaste = executiveAnnualHours * inputs.executiveLaborCost;
    const executiveFreedHours = executiveAnnualHours * 0.75; // 75% automation potential
    const executiveLaborCostAvoided = executiveFreedHours * inputs.executiveLaborCost;
    
    // Combined totals
    const totalWeeklyHours = adminWeeklyHours + executiveWeeklyHours;
    const totalAnnualHours = adminAnnualHours + executiveAnnualHours;
    const annualWaste = adminAnnualWaste + executiveAnnualWaste;
    const potentialFreedHours = adminFreedHours + executiveFreedHours;
    const potentialFreedWeeklyHours = Math.floor(potentialFreedHours / 52);
    const laborCostAvoided = adminLaborCostAvoided + executiveLaborCostAvoided;
    
    // Conservative growth scenario (50% utilization of freed hours)
    const productiveHours = potentialFreedHours * 0.50;
    const hoursPerNewMember = 10;
    const conversionRate = 0.30;
    const newMembersAcquired = Math.floor((productiveHours / hoursPerNewMember) * conversionRate);
    const memberRevenue = newMembersAcquired * inputs.avgMemberValue;
    
    // Additional revenue streams
    const newProgramRevenue = 15000;
    const partnershipRevenue = 20000;
    const churnReductionRevenue = inputs.avgMemberValue * 5;
    
    const conservativeNewRevenue = memberRevenue + newProgramRevenue + 
                                   partnershipRevenue + churnReductionRevenue;
    
    // Total value created
    const totalValueCreated = laborCostAvoided + conservativeNewRevenue;
    
    // Task breakdown with weighted average labor cost
    const weightedAverageLaborCost = totalAnnualHours > 0 
      ? (adminAnnualHours * inputs.adminLaborCost + executiveAnnualHours * inputs.executiveLaborCost) / totalAnnualHours
      : inputs.adminLaborCost;
    
    const taskBreakdown = {
      eventCoordination: {
        percentage: 0.256,
        annualHours: Math.floor(totalAnnualHours * 0.256),
        annualCost: Math.floor(totalAnnualHours * 0.256) * weightedAverageLaborCost
      },
      memberCommunication: {
        percentage: 0.192,
        annualHours: Math.floor(totalAnnualHours * 0.192),
        annualCost: Math.floor(totalAnnualHours * 0.192) * weightedAverageLaborCost
      },
      complianceReporting: {
        percentage: 0.167,
        annualHours: Math.floor(totalAnnualHours * 0.167),
        annualCost: Math.floor(totalAnnualHours * 0.167) * weightedAverageLaborCost
      },
      financialAdmin: {
        percentage: 0.167,
        annualHours: Math.floor(totalAnnualHours * 0.167),
        annualCost: Math.floor(totalAnnualHours * 0.167) * weightedAverageLaborCost
      },
      dataManagement: {
        percentage: 0.218,
        annualHours: Math.floor(totalAnnualHours * 0.218),
        annualCost: Math.floor(totalAnnualHours * 0.218) * weightedAverageLaborCost
      }
    };

    return {
      // Admin staff calculations
      adminWeeklyHours,
      adminAnnualHours,
      adminAnnualWaste,
      adminFreedHours,
      adminLaborCostAvoided,
      
      // Executive staff calculations
      executiveWeeklyHours,
      executiveAnnualHours,
      executiveAnnualWaste,
      executiveFreedHours,
      executiveLaborCostAvoided,
      
      // Combined totals
      totalWeeklyHours,
      totalAnnualHours,
      annualWaste,
      potentialFreedHours,
      potentialFreedWeeklyHours,
      laborCostAvoided,
      
      // Revenue calculations
      newMembersAcquired,
      memberRevenue,
      newProgramRevenue,
      partnershipRevenue,
      churnReductionRevenue,
      conservativeNewRevenue,
      totalValueCreated,
      
      taskBreakdown
    };
  }, [inputs]);

  const updateInput = (field: keyof CalculatorInputs, value: number | string | undefined) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('de-DE').format(num);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Input Form */}
      <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
        <h2 className={cn("font-serif text-3xl italic mb-6 text-center transition-colors duration-300", theme.headings)}>
          {t('doMoreWithLess.form.title')}
        </h2>
        <p className={cn("text-lg text-center mb-8 transition-colors duration-300", theme.muted)}>
          {t('doMoreWithLess.form.subtitle')}
        </p>

        {/* Organization Overview */}
        <div className="mb-8">
          <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
            {t('doMoreWithLess.form.sections.organizationOverview')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Organization Size */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <div className="h-40">
                <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                  {t('doMoreWithLess.form.fields.organizationSize.label')}
                </label>
                <input
                  type="number"
                  min="5"
                  max="500"
                  value={inputs.organizationSize}
                  onChange={(e) => updateInput('organizationSize', parseInt(e.target.value) || 0)}
                  className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                    currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
                />
                <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                  {t('doMoreWithLess.form.fields.organizationSize.helpText')}
                </p>
              </div>
            </div>

            {/* Annual Events */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <div className="h-40">
                <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                  {t('doMoreWithLess.form.fields.annualEvents.label')}
                </label>
                <input
                  type="number"
                  min="5"
                  max="200"
                  value={inputs.annualEvents}
                  onChange={(e) => updateInput('annualEvents', parseInt(e.target.value) || 0)}
                  className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                    currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
                />
                <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                  {t('doMoreWithLess.form.fields.annualEvents.helpText')}
                </p>
              </div>
            </div>

            {/* Average Member Value */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <div className="h-40">
                <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                  {t('doMoreWithLess.form.fields.avgMemberValue.label')}
                </label>
                <input
                  type="number"
                  min="100"
                  max="5000"
                  step="50"
                  value={inputs.avgMemberValue}
                  onChange={(e) => updateInput('avgMemberValue', parseInt(e.target.value) || 0)}
                  className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                    currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
                />
                <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                  {t('doMoreWithLess.form.fields.avgMemberValue.helpText')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Administrative Staff */}
        <div className="mb-8">
          <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
            {t('doMoreWithLess.form.sections.administrativeStaff')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Admin Staff Count */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <div className="h-40">
                <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                  {t('doMoreWithLess.form.fields.adminStaffCount.label')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={inputs.adminStaffCount}
                  onChange={(e) => updateInput('adminStaffCount', parseInt(e.target.value) || 0)}
                  className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                    currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
                />
                <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                  {t('doMoreWithLess.form.fields.adminStaffCount.helpText')}
                </p>
              </div>
            </div>

            {/* Admin Hours Per Week */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <div className="h-40">
                <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                  {t('doMoreWithLess.form.fields.adminHoursPerWeek.label')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={inputs.adminHoursPerWeek}
                  onChange={(e) => updateInput('adminHoursPerWeek', parseInt(e.target.value) || 0)}
                  className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                    currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
                />
                <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                  {t('doMoreWithLess.form.fields.adminHoursPerWeek.helpText')}
                </p>
              </div>
            </div>

            {/* Admin Labor Cost */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <div className="h-40">
                <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                  {t('doMoreWithLess.form.fields.adminLaborCost.label')}
                </label>
                <input
                  type="number"
                  min="20"
                  max="60"
                  step="5"
                  value={inputs.adminLaborCost}
                  onChange={(e) => updateInput('adminLaborCost', parseInt(e.target.value) || 0)}
                  className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                    currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
                />
                <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                  {t('doMoreWithLess.form.fields.adminLaborCost.helpText')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Staff */}
        <div className="mb-8">
          <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
            {t('doMoreWithLess.form.sections.executiveStaff')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Executive Staff Count */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <div className="h-40">
                <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                  {t('doMoreWithLess.form.fields.executiveStaffCount.label')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={inputs.executiveStaffCount}
                  onChange={(e) => updateInput('executiveStaffCount', parseInt(e.target.value) || 0)}
                  className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                    currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
                />
                <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                  {t('doMoreWithLess.form.fields.executiveStaffCount.helpText')}
                </p>
              </div>
            </div>

            {/* Executive Hours Per Week */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <div className="h-40">
                <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                  Manual Hours/Week
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={inputs.executiveHoursPerWeek}
                  onChange={(e) => updateInput('executiveHoursPerWeek', parseInt(e.target.value) || 0)}
                  className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                    currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
                />
                <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                  Hours per executive per week on tasks that could be automated
                </p>
              </div>
            </div>

            {/* Executive Labor Cost */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <div className="h-40">
                <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                  Labor Cost/Hour (€)
                </label>
                <input
                  type="number"
                  min="50"
                  max="200"
                  step="10"
                  value={inputs.executiveLaborCost}
                  onChange={(e) => updateInput('executiveLaborCost', parseInt(e.target.value) || 0)}
                  className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                    currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
                />
                <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                  Salary + benefits + taxes for executives (typically €60-150/hour)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-8">
          <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
            {t('doMoreWithLess.form.sections.additionalInformation')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Industry Type */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <div className="h-36">
                <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                  Industry Type
                </label>
                <select
                  value={inputs.industryType}
                  onChange={(e) => updateInput('industryType', e.target.value)}
                  className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                    currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
                >
                  <option value="medical">Medical / Healthcare</option>
                  <option value="legal">Legal / Law</option>
                  <option value="tax">Tax Advisory / Accounting</option>
                  <option value="engineering">Engineering / Technical</option>
                  <option value="other">Other Professional Network</option>
                </select>
                <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                  Helps us customize your value report
                </p>
              </div>
            </div>

            {/* Current Revenue */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <div className="h-36">
                <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                  Annual Revenue (€) - Optional
                </label>
                <input
                  type="number"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={inputs.currentRevenue || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateInput('currentRevenue', value ? parseInt(value) : undefined);
                  }}
                  className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                    currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
                  placeholder="e.g. 100000"
                />
                <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                  Helps us understand your growth context
                </p>
              </div>
            </div>
      </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-8">
        {/* Current Waste */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-red-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-red-100/80' : 'bg-red-50 dark:bg-red-900/20')}>
          <div className="text-center mb-6">
            <h3 className={cn("text-2xl font-bold mb-2 transition-colors duration-300",
              readingMode === 'sepia' ? 'text-red-800' : 'text-red-600 dark:text-red-400')}>
              ⚠️ {t('results.currentWaste.title')}
            </h3>
            <div className={cn("text-4xl font-bold mb-2 transition-colors duration-300",
              readingMode === 'sepia' ? 'text-red-700' : 'text-red-700 dark:text-red-300')}>
              {formatCurrency(calculations.annualWaste)} {t('results.currentWaste.subtitle')}
            </div>
            <p className={cn("text-lg transition-colors duration-300",
              readingMode === 'sepia' ? 'text-red-700' : 'text-red-600 dark:text-red-400')}>
              {formatNumber(calculations.totalAnnualHours)} {t('results.currentWaste.description')}
            </p>
          </div>
          
          {/* Staff Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {calculations.adminAnnualHours > 0 && (
              <div className={cn("p-4 rounded-lg transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-red-200/60' : 'bg-red-100/60 dark:bg-red-800/20')}>
                <h4 className={cn("font-semibold mb-2 transition-colors duration-300",
                  readingMode === 'sepia' ? 'text-red-800' : 'text-red-700 dark:text-red-300')}>
                  {t('doMoreWithLess.form.sections.administrativeStaff')}
                </h4>
                <p className="text-sm">
                  {inputs.adminStaffCount} {t('doMoreWithLess.results.currentWaste.staffLabel')} × {inputs.adminHoursPerWeek} {t('doMoreWithLess.results.currentWaste.hoursPerWeek')}
                </p>
                <p className="text-sm">
                  {formatNumber(calculations.adminAnnualHours)} {t('doMoreWithLess.results.currentWaste.hoursPerYear')} × €{inputs.adminLaborCost}/{t('doMoreWithLess.results.currentWaste.hour')}
                </p>
                <p className={cn("font-bold transition-colors duration-300",
                  readingMode === 'sepia' ? 'text-red-700' : 'text-red-600 dark:text-red-400')}>
                  = {formatCurrency(calculations.adminAnnualWaste)}/{t('doMoreWithLess.results.currentWaste.year')}
                </p>
              </div>
            )}
            
            {calculations.executiveAnnualHours > 0 && (
              <div className={cn("p-4 rounded-lg transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-red-200/60' : 'bg-red-100/60 dark:bg-red-800/20')}>
                <h4 className={cn("font-semibold mb-2 transition-colors duration-300",
                  readingMode === 'sepia' ? 'text-red-800' : 'text-red-700 dark:text-red-300')}>
                  {t('doMoreWithLess.form.sections.executiveStaff')}
                </h4>
                <p className="text-sm">
                  {inputs.executiveStaffCount} {t('doMoreWithLess.results.currentWaste.executives')} × {inputs.executiveHoursPerWeek} {t('doMoreWithLess.results.currentWaste.hoursPerWeek')}
                </p>
                <p className="text-sm">
                  {formatNumber(calculations.executiveAnnualHours)} {t('doMoreWithLess.results.currentWaste.hoursPerYear')} × €{inputs.executiveLaborCost}/{t('doMoreWithLess.results.currentWaste.hour')}
                </p>
                <p className={cn("font-bold transition-colors duration-300",
                  readingMode === 'sepia' ? 'text-red-700' : 'text-red-600 dark:text-red-400')}>
                  = {formatCurrency(calculations.executiveAnnualWaste)}/{t('doMoreWithLess.results.currentWaste.year')}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className={cn("text-sm transition-colors duration-300",
              readingMode === 'sepia' ? 'text-red-700' : 'text-red-700 dark:text-red-300')}>
              {t('doMoreWithLess.results.currentWaste.timeTrapped')}
            </p>
            <ul className="space-y-1 text-sm">
              {(t('doMoreWithLess.results.currentWaste.tasks', { returnObjects: true }) as string[]).map((task: string, index: number) => (
                <li key={index} className={cn("flex items-start gap-2 transition-colors duration-300",
                  readingMode === 'sepia' ? 'text-red-700' : 'text-red-700 dark:text-red-300')}>
                  <span>•</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Freed Capacity */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-blue-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-blue-100/80' : 'bg-blue-50 dark:bg-blue-900/20')}>
          <div className="text-center mb-6">
            <h3 className={cn("text-2xl font-bold mb-2 transition-colors duration-300",
              readingMode === 'sepia' ? 'text-blue-800' : 'text-blue-600 dark:text-blue-400')}>
              🚀 {t('doMoreWithLess.results.freedCapacity.title')}
            </h3>
            <div className={cn("text-4xl font-bold mb-2 transition-colors duration-300",
              readingMode === 'sepia' ? 'text-blue-700' : 'text-blue-700 dark:text-blue-300')}>
              {formatNumber(calculations.potentialFreedHours)} {t('doMoreWithLess.results.freedCapacity.subtitle')}
            </div>
            <p className={cn("text-lg transition-colors duration-300",
              readingMode === 'sepia' ? 'text-blue-700' : 'text-blue-600 dark:text-blue-400')}>
              {t('doMoreWithLess.results.freedCapacity.description').replace('{weeklyHours}', calculations.potentialFreedWeeklyHours.toString())}
            </p>
          </div>
          <ul className="space-y-2 mb-4">
            {(t('doMoreWithLess.results.freedCapacity.activities', { returnObjects: true }) as string[]).map((activity: string, index: number) => (
              <li key={index} className={cn("flex items-start gap-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-700' : 'text-blue-700 dark:text-blue-300')}>
                <span>✓</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
          <p className={cn("text-sm italic transition-colors duration-300",
            readingMode === 'sepia' ? 'text-blue-700' : 'text-blue-600 dark:text-blue-400')}>
            {t('doMoreWithLess.results.freedCapacity.instead')}
          </p>
        </div>

        {/* Growth Revenue */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-green-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
          <h3 className={cn("text-2xl font-bold mb-6 text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-green-800' : 'text-green-600 dark:text-green-400')}>
            💰 {t('doMoreWithLess.results.growthRevenue.title')}
          </h3>
          <p className={cn("text-lg mb-6 text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-green-700' : 'text-green-600 dark:text-green-400')}>
            {t('doMoreWithLess.results.growthRevenue.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className={cn("font-semibold mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-700' : 'text-green-700 dark:text-green-300')}>
                {t('doMoreWithLess.results.growthRevenue.memberGrowth.title')}
              </h4>
              <p className="text-sm">
                • {calculations.newMembersAcquired} new members acquired
              </p>
              <p className="text-sm">
                • €{formatNumber(calculations.memberRevenue)} in new member revenue
              </p>
            </div>

            <div>
              <h4 className={cn("font-semibold mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-700' : 'text-green-700 dark:text-green-300')}>
                {t('doMoreWithLess.results.growthRevenue.programExpansion.title')}
              </h4>
              <p className="text-sm">
                • {t('doMoreWithLess.results.growthRevenue.programExpansion.programs')}
              </p>
              <p className="text-sm">
                • €{formatNumber(calculations.newProgramRevenue)} in program revenue
              </p>
            </div>

            <div>
              <h4 className={cn("font-semibold mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-700' : 'text-green-700 dark:text-green-300')}>
                {t('doMoreWithLess.results.growthRevenue.partnerships.title')}
              </h4>
              <p className="text-sm">
                • {t('doMoreWithLess.results.growthRevenue.partnerships.sponsors')}
              </p>
              <p className="text-sm">
                • €{formatNumber(calculations.partnershipRevenue)} in partnership revenue
              </p>
            </div>

            <div>
              <h4 className={cn("font-semibold mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-700' : 'text-green-700 dark:text-green-300')}>
                {t('doMoreWithLess.results.growthRevenue.retention.title')}
              </h4>
              <p className="text-sm">
                • {t('doMoreWithLess.results.growthRevenue.retention.improvement')}
              </p>
              <p className="text-sm">
                • €{formatNumber(calculations.churnReductionRevenue)} retained revenue
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className={cn("text-xl font-bold transition-colors duration-300",
              readingMode === 'sepia' ? 'text-green-700' : 'text-green-700 dark:text-green-300')}>
              Conservative Total: €{formatNumber(calculations.conservativeNewRevenue)} in new annual revenue
            </p>
          </div>
        </div>

        {/* Total Value Summary */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-purple-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-purple-100/80' : 'bg-purple-50 dark:bg-purple-900/20')}>
          <h3 className={cn("text-3xl font-bold mb-6 text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-purple-800' : 'text-purple-600 dark:text-purple-400')}>
            📊 {t('doMoreWithLess.results.totalValue.title')}
          </h3>
          
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold">Labor Cost Avoided:</span>
                <span className="text-lg font-bold">€{formatNumber(calculations.laborCostAvoided)}/year</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm ml-4">
                {calculations.adminLaborCostAvoided > 0 && (
                  <div>
                    <span>Admin Staff: €{formatNumber(calculations.adminLaborCostAvoided)}/year</span>
                  </div>
                )}
                {calculations.executiveLaborCostAvoided > 0 && (
                  <div>
                    <span>Executive Staff: €{formatNumber(calculations.executiveLaborCostAvoided)}/year</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">New Revenue Potential:</span>
              <span className="text-lg font-bold">€{formatNumber(calculations.conservativeNewRevenue)}/year</span>
            </div>
            
            <hr className={cn("transition-colors duration-300",
              readingMode === 'sepia' ? 'border-purple-400' : 'border-purple-300 dark:border-purple-600')} />
            
            <div className="text-center">
              <span className={cn("text-3xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-purple-700' : 'text-purple-700 dark:text-purple-300')}>
                TOTAL VALUE AVAILABLE: €{formatNumber(calculations.totalValueCreated)}/year
              </span>
            </div>
          </div>
          
          <p className={cn("text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-purple-700' : 'text-purple-600 dark:text-purple-400')}>
            This value is currently locked away in manual processes.
          </p>
        </div>

        {/* Task Breakdown (Expandable) */}
        <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
          <button
            onClick={() => setExpandedSection(expandedSection === 'tasks' ? null : 'tasks')}
            className={cn("w-full text-left transition-colors duration-300", theme.headings)}
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-between">
              {t('doMoreWithLess.results.taskBreakdown.title')}
              <span className="text-lg">{expandedSection === 'tasks' ? '−' : '+'}</span>
            </h3>
          </button>
          
          {expandedSection === 'tasks' && (
            <div className="space-y-6 mt-6">
              {Object.entries(calculations.taskBreakdown).map(([key, data]) => (
                <div key={key} className={cn("p-6 rounded-lg transition-colors duration-300",
                  currentTheme.taskTile)}>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className={cn("text-lg font-semibold transition-colors duration-300", theme.headings)}>
                      {t(`doMoreWithLess.results.taskBreakdown.${key}.label`)}
                    </h4>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatNumber(data.annualHours)} hours/year</div>
                      <div className={cn("text-sm transition-colors duration-300",
                        readingMode === 'sepia' ? 'text-red-700' : 'text-red-600 dark:text-red-400')}>
                        {formatCurrency(data.annualCost)}
                      </div>
                    </div>
                  </div>
                  <p className={cn("text-sm mb-4 transition-colors duration-300", theme.muted)}>
                    {t(`doMoreWithLess.results.taskBreakdown.${key}.description`)}
                  </p>
                  <div className="mb-4">
                    <span className={cn("text-sm font-medium transition-colors duration-300",
                      readingMode === 'sepia' ? 'text-green-700' : 'text-green-600 dark:text-green-400')}>
                      Automation Potential: {t(`doMoreWithLess.results.taskBreakdown.${key}.automationPotential`)}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {(t(`doMoreWithLess.results.taskBreakdown.${key}.whatGetsAutomated`, { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <li key={index} className={cn("text-sm transition-colors duration-300",
                        readingMode === 'sepia' ? 'text-green-700' : 'text-green-700 dark:text-green-300')}>
                        ✓ {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <button
          onClick={() => setShowLeadForm(true)}
          className={cn("inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium transition-colors",
            currentTheme.button)}
        >
          {t('doMoreWithLess.leadCapture.primaryCta')}
        </button>
        <p className={cn("mt-4 text-sm transition-colors duration-300", theme.muted)}>
          {t('doMoreWithLess.leadCapture.form.noCommitment')}
        </p>
      </div>

      {/* Lead Capture Form */}
      <LeadCaptureForm
        isOpen={showLeadForm}
        onClose={() => setShowLeadForm(false)}
        calculatorInputs={inputs}
        calculatedValues={calculations}
        onSubmitSuccess={() => {
          // Keep the form open to show success message
          // It will close when user clicks the close button
        }}
      />
    </div>
  );
}