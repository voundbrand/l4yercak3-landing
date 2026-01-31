'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useContentTheme, useReadingMode } from '@/components/content-page-layout';
import { ApplicationModal } from '@/components/application-modal';
import Link from 'next/link';

interface FounderCalculatorInputs {
  // Founder situation
  fundingStage: 'bootstrapped' | 'pre-seed' | 'seed' | 'series-a' | 'series-b+';
  runwayMonths: number;
  monthlyBurn: number;

  // Team & hiring
  hasDevTeam: boolean;
  teamSize: 'solo' | '1-2' | '3-5' | '6-10' | '10+';
  hiringPlan: 'none' | 'one' | 'two' | 'team';
  developerSalary: number; // Annual salary for hiring comparison

  // Product scope
  productComplexity: 'mvp' | 'v1' | 'scale' | 'enterprise';

  // Infrastructure needs
  needsAuth: boolean;
  needsPayments: boolean;
  needsEmail: boolean;
  needsDatabase: boolean;
  needsAdmin: boolean;
  needsAI: boolean;
  needsFileStorage: boolean;
}

interface FounderCalculatedValues {
  // Time calculations
  selfBuildMonths: number;
  buildSprintWeeks: number;
  monthsSaved: number;

  // Runway impact
  runwayExtensionMonths: number;
  burnSavedDuringDelay: number;

  // Cost calculations
  hiringCostAnnual: number;
  buildSprintInvestment: number;
  firstYearSavings: number;

  // Opportunity cost
  revenueDelay: number; // Potential revenue lost during delay
  competitorRisk: 'low' | 'medium' | 'high' | 'critical';

  // Infrastructure breakdown
  infrastructureBreakdown: {
    [key: string]: {
      months: number;
      hiringCost: number;
      enabled: boolean;
    };
  };

  // Total value
  totalFirstYearValue: number;
  roiMultiple: number;
}

const defaultInputs: FounderCalculatorInputs = {
  fundingStage: 'seed',
  runwayMonths: 18,
  monthlyBurn: 25000,
  hasDevTeam: false,
  teamSize: 'solo',
  hiringPlan: 'one',
  developerSalary: 80000,
  productComplexity: 'v1',
  needsAuth: true,
  needsPayments: true,
  needsEmail: true,
  needsDatabase: true,
  needsAdmin: true,
  needsAI: false,
  needsFileStorage: false,
};

// Base months to build each infrastructure component (with a mid-level developer)
const baseInfrastructureMonths = {
  auth: 0.75, // 3 weeks
  payments: 0.6, // 2.5 weeks
  email: 0.4, // 1.5 weeks
  database: 0.9, // 3.5 weeks
  admin: 0.6, // 2.5 weeks
  ai: 0.4, // 1.5 weeks
  fileStorage: 0.25, // 1 week
};

// Build Sprint pricing tiers in EUR
const buildSprintPricing = {
  starter: 7500,
  growth: 15000,
  scale: 25000,
};

// Complexity multipliers for time estimates
const complexityMultipliers = {
  mvp: 0.7,
  v1: 1.0,
  scale: 1.4,
  enterprise: 2.0,
};

// Average time to hire a developer (months)
const avgHiringTimeMonths = 2;

export function FounderValueCalculator() {
  const { t } = useTranslation();
  const theme = useContentTheme();
  const { readingMode } = useReadingMode();
  const [inputs, setInputs] = useState<FounderCalculatorInputs>(defaultInputs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const themeClasses = {
    dark: {
      input: "bg-background/80 border-border/30 text-foreground",
      checkbox: "accent-primary",
      taskTile: "bg-background border-border",
      button: "bg-primary text-primary-foreground hover:bg-primary/90",
      buttonSecondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    },
    sepia: {
      input: "bg-amber-50/90 border-amber-300/40 text-amber-950 placeholder:text-amber-700/50",
      checkbox: "accent-amber-700",
      taskTile: "bg-amber-50/90 border-amber-300/40",
      button: "bg-amber-800 text-amber-50 hover:bg-amber-700",
      buttonSecondary: "bg-amber-700 text-amber-50 hover:bg-amber-600",
    },
  };

  const currentTheme = themeClasses[readingMode];

  const calculations = useMemo((): FounderCalculatedValues => {
    const complexityMult = complexityMultipliers[inputs.productComplexity];

    // Calculate infrastructure breakdown
    const infrastructureBreakdown: FounderCalculatedValues['infrastructureBreakdown'] = {
      auth: {
        months: inputs.needsAuth ? baseInfrastructureMonths.auth * complexityMult : 0,
        hiringCost: inputs.needsAuth ? (baseInfrastructureMonths.auth * complexityMult * inputs.developerSalary / 12) : 0,
        enabled: inputs.needsAuth,
      },
      payments: {
        months: inputs.needsPayments ? baseInfrastructureMonths.payments * complexityMult : 0,
        hiringCost: inputs.needsPayments ? (baseInfrastructureMonths.payments * complexityMult * inputs.developerSalary / 12) : 0,
        enabled: inputs.needsPayments,
      },
      email: {
        months: inputs.needsEmail ? baseInfrastructureMonths.email * complexityMult : 0,
        hiringCost: inputs.needsEmail ? (baseInfrastructureMonths.email * complexityMult * inputs.developerSalary / 12) : 0,
        enabled: inputs.needsEmail,
      },
      database: {
        months: inputs.needsDatabase ? baseInfrastructureMonths.database * complexityMult : 0,
        hiringCost: inputs.needsDatabase ? (baseInfrastructureMonths.database * complexityMult * inputs.developerSalary / 12) : 0,
        enabled: inputs.needsDatabase,
      },
      admin: {
        months: inputs.needsAdmin ? baseInfrastructureMonths.admin * complexityMult : 0,
        hiringCost: inputs.needsAdmin ? (baseInfrastructureMonths.admin * complexityMult * inputs.developerSalary / 12) : 0,
        enabled: inputs.needsAdmin,
      },
      ai: {
        months: inputs.needsAI ? baseInfrastructureMonths.ai * complexityMult : 0,
        hiringCost: inputs.needsAI ? (baseInfrastructureMonths.ai * complexityMult * inputs.developerSalary / 12) : 0,
        enabled: inputs.needsAI,
      },
      fileStorage: {
        months: inputs.needsFileStorage ? baseInfrastructureMonths.fileStorage * complexityMult : 0,
        hiringCost: inputs.needsFileStorage ? (baseInfrastructureMonths.fileStorage * complexityMult * inputs.developerSalary / 12) : 0,
        enabled: inputs.needsFileStorage,
      },
    };

    // Calculate total self-build time
    const infrastructureMonths = Object.values(infrastructureBreakdown).reduce(
      (sum, item) => sum + item.months, 0
    );

    // Add hiring time if they don't have a dev team
    const hiringDelay = !inputs.hasDevTeam ? avgHiringTimeMonths : 0;
    const selfBuildMonths = infrastructureMonths + hiringDelay;

    // Build Sprint is 12 weeks (3 months) - includes product development
    const buildSprintWeeks = 12;
    const buildSprintMonths = 3;
    const monthsSaved = Math.max(0, selfBuildMonths - buildSprintMonths);

    // Runway impact
    const burnSavedDuringDelay = monthsSaved * inputs.monthlyBurn;
    const runwayExtensionMonths = burnSavedDuringDelay / inputs.monthlyBurn;

    // Hiring costs (annual)
    const developersToHire = inputs.hiringPlan === 'none' ? 0 :
                            inputs.hiringPlan === 'one' ? 1 :
                            inputs.hiringPlan === 'two' ? 2 : 4;
    const hiringCostAnnual = developersToHire * inputs.developerSalary;

    // Build Sprint investment (recommend Growth for most funded startups)
    const buildSprintInvestment = inputs.fundingStage === 'bootstrapped' ? buildSprintPricing.starter :
                                  inputs.fundingStage === 'pre-seed' ? buildSprintPricing.starter :
                                  inputs.fundingStage === 'seed' ? buildSprintPricing.growth :
                                  buildSprintPricing.scale;

    // First year savings = hiring cost avoided + burn saved - Build Sprint investment
    const firstYearSavings = hiringCostAnnual + burnSavedDuringDelay - buildSprintInvestment;

    // Revenue delay (conservative: assume $10k/month potential revenue once launched)
    const monthlyRevenuePostLaunch = 10000;
    const revenueDelay = monthsSaved * monthlyRevenuePostLaunch;

    // Competitor risk based on runway and delay
    const delayPercentOfRunway = (selfBuildMonths / inputs.runwayMonths) * 100;
    let competitorRisk: 'low' | 'medium' | 'high' | 'critical';
    if (delayPercentOfRunway < 15) competitorRisk = 'low';
    else if (delayPercentOfRunway < 30) competitorRisk = 'medium';
    else if (delayPercentOfRunway < 50) competitorRisk = 'high';
    else competitorRisk = 'critical';

    // Total first year value
    const totalFirstYearValue = firstYearSavings + revenueDelay;

    // ROI multiple
    const roiMultiple = totalFirstYearValue / buildSprintInvestment;

    return {
      selfBuildMonths,
      buildSprintWeeks,
      monthsSaved,
      runwayExtensionMonths,
      burnSavedDuringDelay,
      hiringCostAnnual,
      buildSprintInvestment,
      firstYearSavings,
      revenueDelay,
      competitorRisk,
      infrastructureBreakdown,
      totalFirstYearValue,
      roiMultiple,
    };
  }, [inputs]);

  const updateInput = <K extends keyof FounderCalculatorInputs>(field: K, value: FounderCalculatorInputs[K]) => {
    setInputs(prev => ({
      ...prev,
      [field]: value,
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

  const formatNumber = (num: number, decimals = 1) => {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals
    }).format(num);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return readingMode === 'sepia' ? 'text-green-700' : 'text-green-600 dark:text-green-400';
      case 'medium': return readingMode === 'sepia' ? 'text-yellow-700' : 'text-yellow-600 dark:text-yellow-400';
      case 'high': return readingMode === 'sepia' ? 'text-orange-700' : 'text-orange-600 dark:text-orange-400';
      case 'critical': return readingMode === 'sepia' ? 'text-red-700' : 'text-red-600 dark:text-red-400';
      default: return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Input Form */}
      <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
        <h2 className={cn("font-serif text-3xl italic mb-6 text-center transition-colors duration-300", theme.headings)}>
          {t('founderCalculator.form.title')}
        </h2>
        <p className={cn("text-lg text-center mb-8 transition-colors duration-300", theme.muted)}>
          {t('founderCalculator.form.subtitle')}
        </p>

        {/* Founder Situation */}
        <div className="mb-8">
          <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
            {t('founderCalculator.form.sections.founderSituation')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Funding Stage */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                {t('founderCalculator.form.fields.fundingStage.label')}
              </label>
              <select
                value={inputs.fundingStage}
                onChange={(e) => updateInput('fundingStage', e.target.value as FounderCalculatorInputs['fundingStage'])}
                className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                  currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
              >
                <option value="bootstrapped">{t('founderCalculator.form.fields.fundingStage.options.bootstrapped')}</option>
                <option value="pre-seed">{t('founderCalculator.form.fields.fundingStage.options.pre-seed')}</option>
                <option value="seed">{t('founderCalculator.form.fields.fundingStage.options.seed')}</option>
                <option value="series-a">{t('founderCalculator.form.fields.fundingStage.options.series-a')}</option>
                <option value="series-b+">{t('founderCalculator.form.fields.fundingStage.options.series-b+')}</option>
              </select>
              <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                {t('founderCalculator.form.fields.fundingStage.helpText')}
              </p>
            </div>

            {/* Runway */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                {t('founderCalculator.form.fields.runwayMonths.label')}
              </label>
              <input
                type="number"
                min="3"
                max="48"
                value={inputs.runwayMonths}
                onChange={(e) => updateInput('runwayMonths', parseInt(e.target.value) || 18)}
                className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                  currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
              />
              <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                {t('founderCalculator.form.fields.runwayMonths.helpText')}
              </p>
            </div>

            {/* Monthly Burn */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                {t('founderCalculator.form.fields.monthlyBurn.label')}
              </label>
              <input
                type="number"
                min="5000"
                max="200000"
                step="1000"
                value={inputs.monthlyBurn}
                onChange={(e) => updateInput('monthlyBurn', parseInt(e.target.value) || 25000)}
                className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                  currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
              />
              <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                {t('founderCalculator.form.fields.monthlyBurn.helpText')}
              </p>
            </div>
          </div>
        </div>

        {/* Team & Hiring */}
        <div className="mb-8">
          <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
            {t('founderCalculator.form.sections.teamHiring')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Has Dev Team */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <label className={cn("flex items-center gap-3 cursor-pointer", theme.content)}>
                <input
                  type="checkbox"
                  checked={inputs.hasDevTeam}
                  onChange={(e) => updateInput('hasDevTeam', e.target.checked)}
                  className={cn("w-5 h-5", currentTheme.checkbox)}
                />
                <span className="font-semibold">{t('founderCalculator.form.fields.hasDevTeam.label')}</span>
              </label>
              <p className={cn("text-xs leading-relaxed mt-3 transition-colors duration-300", theme.muted)}>
                {t('founderCalculator.form.fields.hasDevTeam.helpText')}
              </p>
            </div>

            {/* Hiring Plan */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                {t('founderCalculator.form.fields.hiringPlan.label')}
              </label>
              <select
                value={inputs.hiringPlan}
                onChange={(e) => updateInput('hiringPlan', e.target.value as FounderCalculatorInputs['hiringPlan'])}
                className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                  currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
              >
                <option value="none">{t('founderCalculator.form.fields.hiringPlan.options.none')}</option>
                <option value="one">{t('founderCalculator.form.fields.hiringPlan.options.one')}</option>
                <option value="two">{t('founderCalculator.form.fields.hiringPlan.options.two')}</option>
                <option value="team">{t('founderCalculator.form.fields.hiringPlan.options.team')}</option>
              </select>
              <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                {t('founderCalculator.form.fields.hiringPlan.helpText')}
              </p>
            </div>

            {/* Developer Salary */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                {t('founderCalculator.form.fields.developerSalary.label')}
              </label>
              <input
                type="number"
                min="40000"
                max="200000"
                step="5000"
                value={inputs.developerSalary}
                onChange={(e) => updateInput('developerSalary', parseInt(e.target.value) || 80000)}
                className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                  currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
              />
              <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                {t('founderCalculator.form.fields.developerSalary.helpText')}
              </p>
            </div>
          </div>
        </div>

        {/* Product Scope */}
        <div className="mb-8">
          <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
            {t('founderCalculator.form.sections.productScope')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Complexity */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                {t('founderCalculator.form.fields.productComplexity.label')}
              </label>
              <select
                value={inputs.productComplexity}
                onChange={(e) => updateInput('productComplexity', e.target.value as FounderCalculatorInputs['productComplexity'])}
                className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                  currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
              >
                <option value="mvp">{t('founderCalculator.form.fields.productComplexity.options.mvp')}</option>
                <option value="v1">{t('founderCalculator.form.fields.productComplexity.options.v1')}</option>
                <option value="scale">{t('founderCalculator.form.fields.productComplexity.options.scale')}</option>
                <option value="enterprise">{t('founderCalculator.form.fields.productComplexity.options.enterprise')}</option>
              </select>
              <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                {t('founderCalculator.form.fields.productComplexity.helpText')}
              </p>
            </div>
          </div>
        </div>

        {/* Infrastructure Needs */}
        <div className="mb-8">
          <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
            {t('founderCalculator.form.sections.infrastructure')}
          </h3>
          <p className={cn("text-sm mb-4 transition-colors duration-300", theme.muted)}>
            {t('founderCalculator.form.sections.infrastructureSubtitle')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(['needsAuth', 'needsPayments', 'needsEmail', 'needsDatabase', 'needsAdmin', 'needsAI', 'needsFileStorage'] as const).map((field) => (
              <label key={field} className={cn("flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors duration-300",
                currentTheme.taskTile,
                inputs[field] && (readingMode === 'sepia' ? 'bg-amber-200/50 border-amber-500' : 'bg-primary/10 border-primary'))}>
                <input
                  type="checkbox"
                  checked={inputs[field]}
                  onChange={(e) => updateInput(field, e.target.checked)}
                  className={cn("w-5 h-5", currentTheme.checkbox)}
                />
                <div>
                  <div className={cn("font-medium text-sm transition-colors duration-300", theme.content)}>
                    {t(`founderCalculator.form.fields.${field}.label`)}
                  </div>
                  <div className={cn("text-xs transition-colors duration-300", theme.muted)}>
                    {t(`founderCalculator.form.fields.${field}.helpText`)}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-8">
        {/* Time to Launch */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-blue-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-blue-100/80' : 'bg-blue-50 dark:bg-blue-900/20')}>
          <h3 className={cn("text-2xl font-bold mb-6 text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-blue-800' : 'text-blue-600 dark:text-blue-400')}>
            🚀 {t('founderCalculator.results.timeToLaunch.title')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* DIY Timeline */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-red-100/80' : 'bg-red-50 dark:bg-red-900/20')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-red-700' : 'text-red-600 dark:text-red-400')}>
                {t('founderCalculator.results.timeToLaunch.diy')}
              </div>
              <div className={cn("text-4xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-red-800' : 'text-red-700 dark:text-red-300')}>
                {formatNumber(calculations.selfBuildMonths)}
              </div>
              <div className={cn("text-sm transition-colors duration-300",
                readingMode === 'sepia' ? 'text-red-600' : 'text-red-500 dark:text-red-400')}>
                {t('founderCalculator.results.timeToLaunch.months')}
              </div>
              {!inputs.hasDevTeam && (
                <div className={cn("text-xs mt-2 transition-colors duration-300",
                  readingMode === 'sepia' ? 'text-red-600' : 'text-red-500 dark:text-red-400')}>
                  ({t('founderCalculator.results.timeToLaunch.includesHiring')})
                </div>
              )}
            </div>

            {/* Time Saved */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-700' : 'text-green-600 dark:text-green-400')}>
                {t('founderCalculator.results.timeToLaunch.saved')}
              </div>
              <div className={cn("text-4xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-800' : 'text-green-700 dark:text-green-300')}>
                {formatNumber(calculations.monthsSaved)}
              </div>
              <div className={cn("text-sm transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-600' : 'text-green-500 dark:text-green-400')}>
                {t('founderCalculator.results.timeToLaunch.months')}
              </div>
            </div>

            {/* Build Sprint */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-blue-200/80' : 'bg-blue-100 dark:bg-blue-800/30')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-700' : 'text-blue-600 dark:text-blue-400')}>
                {t('founderCalculator.results.timeToLaunch.withBuildSprint')}
              </div>
              <div className={cn("text-4xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-800' : 'text-blue-700 dark:text-blue-300')}>
                {calculations.buildSprintWeeks}
              </div>
              <div className={cn("text-sm transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-600' : 'text-blue-500 dark:text-blue-400')}>
                {t('founderCalculator.results.timeToLaunch.weeks')}
              </div>
            </div>
          </div>
        </div>

        {/* Runway Impact */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-green-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
          <h3 className={cn("text-2xl font-bold mb-6 text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-green-800' : 'text-green-600 dark:text-green-400')}>
            💰 {t('founderCalculator.results.runwayImpact.title')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Burn Saved */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-green-200/80' : 'bg-green-100 dark:bg-green-800/30')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-700' : 'text-green-600 dark:text-green-400')}>
                {t('founderCalculator.results.runwayImpact.burnSaved')}
              </div>
              <div className={cn("text-3xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-800' : 'text-green-700 dark:text-green-300')}>
                {formatCurrency(calculations.burnSavedDuringDelay)}
              </div>
              <div className={cn("text-xs transition-colors duration-300 mt-1",
                readingMode === 'sepia' ? 'text-green-600' : 'text-green-500 dark:text-green-400')}>
                ({formatNumber(calculations.monthsSaved)} {t('founderCalculator.results.timeToLaunch.months')} × {formatCurrency(inputs.monthlyBurn)}/mo)
              </div>
            </div>

            {/* Runway Extension */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-green-200/80' : 'bg-green-100 dark:bg-green-800/30')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-700' : 'text-green-600 dark:text-green-400')}>
                {t('founderCalculator.results.runwayImpact.runwayExtension')}
              </div>
              <div className={cn("text-3xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-800' : 'text-green-700 dark:text-green-300')}>
                +{formatNumber(calculations.runwayExtensionMonths)} {t('founderCalculator.results.timeToLaunch.months')}
              </div>
              <div className={cn("text-xs transition-colors duration-300 mt-1",
                readingMode === 'sepia' ? 'text-green-600' : 'text-green-500 dark:text-green-400')}>
                {t('founderCalculator.results.runwayImpact.effectiveRunway')}: {formatNumber(inputs.runwayMonths + calculations.runwayExtensionMonths)} {t('founderCalculator.results.timeToLaunch.months')}
              </div>
            </div>
          </div>
        </div>

        {/* Hiring vs Build Sprint */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-purple-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-purple-100/80' : 'bg-purple-50 dark:bg-purple-900/20')}>
          <h3 className={cn("text-2xl font-bold mb-6 text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-purple-800' : 'text-purple-600 dark:text-purple-400')}>
            👥 {t('founderCalculator.results.hiringComparison.title')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hiring Cost */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-red-100/80' : 'bg-red-50 dark:bg-red-900/20')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-red-700' : 'text-red-600 dark:text-red-400')}>
                {t('founderCalculator.results.hiringComparison.hiringCost')}
              </div>
              <div className={cn("text-3xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-red-800' : 'text-red-700 dark:text-red-300')}>
                {formatCurrency(calculations.hiringCostAnnual)}
              </div>
              <div className={cn("text-xs transition-colors duration-300",
                readingMode === 'sepia' ? 'text-red-600' : 'text-red-500 dark:text-red-400')}>
                {t('founderCalculator.results.hiringComparison.perYear')}
              </div>
            </div>

            {/* Build Sprint Investment */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-blue-100/80' : 'bg-blue-50 dark:bg-blue-900/20')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-700' : 'text-blue-600 dark:text-blue-400')}>
                {t('founderCalculator.results.hiringComparison.buildSprintCost')}
              </div>
              <div className={cn("text-3xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-800' : 'text-blue-700 dark:text-blue-300')}>
                {formatCurrency(calculations.buildSprintInvestment)}
              </div>
              <div className={cn("text-xs transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-600' : 'text-blue-500 dark:text-blue-400')}>
                {t('founderCalculator.results.hiringComparison.oneTime')}
              </div>
            </div>

            {/* First Year Savings */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-700' : 'text-green-600 dark:text-green-400')}>
                {t('founderCalculator.results.hiringComparison.firstYearSavings')}
              </div>
              <div className={cn("text-3xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-800' : 'text-green-700 dark:text-green-300')}>
                {formatCurrency(calculations.firstYearSavings)}
              </div>
            </div>
          </div>
        </div>

        {/* Competitor Risk */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-orange-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-orange-100/80' : 'bg-orange-50 dark:bg-orange-900/20')}>
          <h3 className={cn("text-2xl font-bold mb-4 text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-orange-800' : 'text-orange-600 dark:text-orange-400')}>
            ⚠️ {t('founderCalculator.results.competitorRisk.title')}
          </h3>
          <p className={cn("text-center mb-6 transition-colors duration-300",
            readingMode === 'sepia' ? 'text-orange-700' : 'text-orange-600 dark:text-orange-400')}>
            {t('founderCalculator.results.competitorRisk.description')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {(t('founderCalculator.results.competitorRisk.activities', { returnObjects: true }) as string[]).map((activity: string, index: number) => (
              <div key={index} className={cn("p-3 rounded-lg text-center text-sm transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-orange-200/60' : 'bg-orange-100/60 dark:bg-orange-800/20')}>
                {activity}
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className={cn("text-sm mb-2 transition-colors duration-300",
              readingMode === 'sepia' ? 'text-orange-700' : 'text-orange-600 dark:text-orange-400')}>
              {t('founderCalculator.results.competitorRisk.riskLevel')}
            </div>
            <div className={cn("text-3xl font-bold transition-colors duration-300", getRiskColor(calculations.competitorRisk))}>
              {t(`founderCalculator.results.competitorRisk.levels.${calculations.competitorRisk}`)}
            </div>
            <div className={cn("text-xs mt-2 transition-colors duration-300",
              readingMode === 'sepia' ? 'text-orange-600' : 'text-orange-500 dark:text-orange-400')}>
              {t('founderCalculator.results.competitorRisk.delayImpact', {
                months: formatNumber(calculations.selfBuildMonths),
                runway: inputs.runwayMonths
              })}
            </div>
          </div>
        </div>

        {/* Total Value */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-emerald-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-emerald-100/80' : 'bg-emerald-50 dark:bg-emerald-900/20')}>
          <h3 className={cn("text-2xl font-bold mb-6 text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-emerald-800' : 'text-emerald-600 dark:text-emerald-400')}>
            📊 {t('founderCalculator.results.totalValue.title')}
          </h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span>{t('founderCalculator.results.totalValue.timeSaved')}</span>
              <span className="font-bold">{formatNumber(calculations.monthsSaved)} {t('founderCalculator.results.timeToLaunch.months')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('founderCalculator.results.totalValue.burnSaved')}</span>
              <span className="font-bold">{formatCurrency(calculations.burnSavedDuringDelay)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('founderCalculator.results.totalValue.hiringAvoided')}</span>
              <span className="font-bold">{formatCurrency(calculations.hiringCostAnnual)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('founderCalculator.results.totalValue.revenueAdvantage')}</span>
              <span className="font-bold">{formatCurrency(calculations.revenueDelay)}</span>
            </div>

            <hr className={cn("transition-colors duration-300",
              readingMode === 'sepia' ? 'border-emerald-400' : 'border-emerald-300 dark:border-emerald-600')} />

            <div className="text-center pt-4">
              <div className={cn("text-sm mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-emerald-700' : 'text-emerald-600 dark:text-emerald-400')}>
                {t('founderCalculator.results.totalValue.totalFirstYear')}
              </div>
              <div className={cn("text-5xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-emerald-800' : 'text-emerald-700 dark:text-emerald-300')}>
                {formatCurrency(calculations.totalFirstYearValue)}
              </div>
              <div className={cn("text-lg font-semibold mt-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-emerald-700' : 'text-emerald-600 dark:text-emerald-400')}>
                {formatNumber(calculations.roiMultiple)}x ROI
              </div>
            </div>
          </div>

          <p className={cn("text-center text-sm transition-colors duration-300",
            readingMode === 'sepia' ? 'text-emerald-700' : 'text-emerald-600 dark:text-emerald-400')}>
            {t('founderCalculator.results.totalValue.description')}
          </p>
        </div>

        {/* Infrastructure Breakdown (Expandable) */}
        <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
          <button
            onClick={() => setExpandedSection(expandedSection === 'breakdown' ? null : 'breakdown')}
            className={cn("w-full text-left transition-colors duration-300", theme.headings)}
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-between">
              {t('founderCalculator.results.infrastructureBreakdown.title')}
              <span className="text-lg">{expandedSection === 'breakdown' ? '−' : '+'}</span>
            </h3>
          </button>

          {expandedSection === 'breakdown' && (
            <div className="space-y-4 mt-6">
              {Object.entries(calculations.infrastructureBreakdown)
                .filter(([, data]) => data.enabled)
                .map(([key, data]) => (
                  <div key={key} className={cn("p-6 rounded-lg transition-colors duration-300", currentTheme.taskTile)}>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className={cn("text-lg font-semibold transition-colors duration-300", theme.headings)}>
                        {t(`founderCalculator.results.infrastructureBreakdown.${key}.label`)}
                      </h4>
                      <div className="text-right">
                        <div className="text-sm font-medium">{formatNumber(data.months * 4)} {t('founderCalculator.results.timeToLaunch.weeks')}</div>
                        <div className={cn("text-sm transition-colors duration-300",
                          readingMode === 'sepia' ? 'text-red-700' : 'text-red-600 dark:text-red-400')}>
                          {formatCurrency(data.hiringCost)}
                        </div>
                      </div>
                    </div>
                    <p className={cn("text-sm mb-4 transition-colors duration-300", theme.muted)}>
                      {t(`founderCalculator.results.infrastructureBreakdown.${key}.description`)}
                    </p>
                    <div className="mb-2">
                      <span className={cn("text-sm font-medium transition-colors duration-300",
                        readingMode === 'sepia' ? 'text-green-700' : 'text-green-600 dark:text-green-400')}>
                        {t('founderCalculator.results.infrastructureBreakdown.whatYouGetLabel')}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {(t(`founderCalculator.results.infrastructureBreakdown.${key}.whatYouGet`, { returnObjects: true }) as string[]).map((item: string, index: number) => (
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
      <div className="text-center space-y-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className={cn("inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium transition-colors",
            currentTheme.button)}
        >
          {t('founderCalculator.cta.primary')}
        </button>
        <div>
          <Link
            href="/build-sprint"
            className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors",
              currentTheme.buttonSecondary)}
          >
            {t('founderCalculator.cta.secondary')}
          </Link>
        </div>
        <p className={cn("text-sm transition-colors duration-300", theme.muted)}>
          {t('founderCalculator.cta.noCommitment')}
        </p>
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <ApplicationModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
