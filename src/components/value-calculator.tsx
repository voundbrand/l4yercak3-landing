'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useContentTheme, useReadingMode } from '@/components/content-page-layout';
import { CalendarBookingModal } from '@/components/calendar-booking-modal';
import Link from 'next/link';

interface CalculatorInputs {
  teamSize: 'solo' | 'small' | 'medium' | 'large';
  technicalLevel: 'junior' | 'mid' | 'senior' | 'expert';
  developerRate: number;
  monthlyBurn: number;
  productComplexity: 'simple' | 'moderate' | 'complex' | 'enterprise';
  needsAuth: boolean;
  needsPayments: boolean;
  needsEmail: boolean;
  needsDatabase: boolean;
  needsAdmin: boolean;
  needsAI: boolean;
  needsFileStorage: boolean;
}

interface CalculatedValues {
  // Time calculations
  selfBuildWeeks: number;
  buildSprintWeeks: number;
  weeksSaved: number;

  // Cost calculations
  selfBuildCost: number;
  buildSprintCost: number;
  costSaved: number;

  // Opportunity cost
  burnDuringDelay: number;

  // Total value
  totalValue: number;

  // Breakdown by infrastructure
  infrastructureBreakdown: {
    [key: string]: {
      weeks: number;
      cost: number;
      enabled: boolean;
    };
  };
}

const defaultInputs: CalculatorInputs = {
  teamSize: 'small',
  technicalLevel: 'mid',
  developerRate: 75,
  monthlyBurn: 15000,
  productComplexity: 'moderate',
  needsAuth: true,
  needsPayments: true,
  needsEmail: true,
  needsDatabase: true,
  needsAdmin: true,
  needsAI: false,
  needsFileStorage: false,
};

// Base weeks for each infrastructure component (for mid-level developer)
const baseWeeks = {
  auth: 3,
  payments: 2.5,
  email: 1.5,
  database: 3.5,
  admin: 2.5,
  ai: 1.5,
  fileStorage: 1,
};

// Multipliers based on experience
const experienceMultipliers = {
  junior: 1.8,
  mid: 1.0,
  senior: 0.7,
  expert: 0.5,
};

// Build Sprint pricing tiers
const buildSprintPricing = {
  starter: 7500,
  growth: 15000,
  scale: 25000,
};

export function ValueCalculator() {
  const { t } = useTranslation();
  const theme = useContentTheme();
  const { readingMode } = useReadingMode();
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Theme classes for inputs and other elements
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

  const calculations = useMemo((): CalculatedValues => {
    const expMultiplier = experienceMultipliers[inputs.technicalLevel];

    // Calculate infrastructure breakdown
    const infrastructureBreakdown: CalculatedValues['infrastructureBreakdown'] = {
      auth: {
        weeks: inputs.needsAuth ? baseWeeks.auth * expMultiplier : 0,
        cost: inputs.needsAuth ? baseWeeks.auth * expMultiplier * 40 * inputs.developerRate : 0,
        enabled: inputs.needsAuth,
      },
      payments: {
        weeks: inputs.needsPayments ? baseWeeks.payments * expMultiplier : 0,
        cost: inputs.needsPayments ? baseWeeks.payments * expMultiplier * 40 * inputs.developerRate : 0,
        enabled: inputs.needsPayments,
      },
      email: {
        weeks: inputs.needsEmail ? baseWeeks.email * expMultiplier : 0,
        cost: inputs.needsEmail ? baseWeeks.email * expMultiplier * 40 * inputs.developerRate : 0,
        enabled: inputs.needsEmail,
      },
      database: {
        weeks: inputs.needsDatabase ? baseWeeks.database * expMultiplier : 0,
        cost: inputs.needsDatabase ? baseWeeks.database * expMultiplier * 40 * inputs.developerRate : 0,
        enabled: inputs.needsDatabase,
      },
      admin: {
        weeks: inputs.needsAdmin ? baseWeeks.admin * expMultiplier : 0,
        cost: inputs.needsAdmin ? baseWeeks.admin * expMultiplier * 40 * inputs.developerRate : 0,
        enabled: inputs.needsAdmin,
      },
      ai: {
        weeks: inputs.needsAI ? baseWeeks.ai * expMultiplier : 0,
        cost: inputs.needsAI ? baseWeeks.ai * expMultiplier * 40 * inputs.developerRate : 0,
        enabled: inputs.needsAI,
      },
      fileStorage: {
        weeks: inputs.needsFileStorage ? baseWeeks.fileStorage * expMultiplier : 0,
        cost: inputs.needsFileStorage ? baseWeeks.fileStorage * expMultiplier * 40 * inputs.developerRate : 0,
        enabled: inputs.needsFileStorage,
      },
    };

    // Total self-build time
    const selfBuildWeeks = Object.values(infrastructureBreakdown).reduce(
      (sum, item) => sum + item.weeks, 0
    );

    // Build Sprint is fixed at 12 weeks, but you're building product not infrastructure
    const buildSprintWeeks = 12;
    const weeksSaved = Math.max(0, selfBuildWeeks);

    // Self-build cost (developer time)
    const selfBuildCost = Object.values(infrastructureBreakdown).reduce(
      (sum, item) => sum + item.cost, 0
    );

    // Build Sprint cost (recommend Growth tier for most)
    const buildSprintCost = buildSprintPricing.growth;
    const costSaved = Math.max(0, selfBuildCost - buildSprintCost);

    // Burn rate during delay (weeks saved * weekly burn)
    const weeklyBurn = inputs.monthlyBurn / 4;
    const burnDuringDelay = weeksSaved * weeklyBurn;

    // Total value = development cost saved + burn saved during faster launch
    const totalValue = costSaved + burnDuringDelay;

    return {
      selfBuildWeeks,
      buildSprintWeeks,
      weeksSaved,
      selfBuildCost,
      buildSprintCost,
      costSaved,
      burnDuringDelay,
      totalValue,
      infrastructureBreakdown,
    };
  }, [inputs]);

  const updateInput = <K extends keyof CalculatorInputs>(field: K, value: CalculatorInputs[K]) => {
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(num);
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

        {/* Team Setup */}
        <div className="mb-8">
          <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
            {t('doMoreWithLess.form.sections.teamSetup')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team Size */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                {t('doMoreWithLess.form.fields.teamSize.label')}
              </label>
              <select
                value={inputs.teamSize}
                onChange={(e) => updateInput('teamSize', e.target.value as CalculatorInputs['teamSize'])}
                className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                  currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
              >
                <option value="solo">{t('doMoreWithLess.form.fields.teamSize.options.solo')}</option>
                <option value="small">{t('doMoreWithLess.form.fields.teamSize.options.small')}</option>
                <option value="medium">{t('doMoreWithLess.form.fields.teamSize.options.medium')}</option>
                <option value="large">{t('doMoreWithLess.form.fields.teamSize.options.large')}</option>
              </select>
              <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                {t('doMoreWithLess.form.fields.teamSize.helpText')}
              </p>
            </div>

            {/* Technical Level */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                {t('doMoreWithLess.form.fields.technicalLevel.label')}
              </label>
              <select
                value={inputs.technicalLevel}
                onChange={(e) => updateInput('technicalLevel', e.target.value as CalculatorInputs['technicalLevel'])}
                className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                  currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
              >
                <option value="junior">{t('doMoreWithLess.form.fields.technicalLevel.options.junior')}</option>
                <option value="mid">{t('doMoreWithLess.form.fields.technicalLevel.options.mid')}</option>
                <option value="senior">{t('doMoreWithLess.form.fields.technicalLevel.options.senior')}</option>
                <option value="expert">{t('doMoreWithLess.form.fields.technicalLevel.options.expert')}</option>
              </select>
              <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                {t('doMoreWithLess.form.fields.technicalLevel.helpText')}
              </p>
            </div>

            {/* Developer Rate */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                {t('doMoreWithLess.form.fields.developerRate.label')}
              </label>
              <input
                type="number"
                min="30"
                max="200"
                step="5"
                value={inputs.developerRate}
                onChange={(e) => updateInput('developerRate', parseInt(e.target.value) || 75)}
                className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                  currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
              />
              <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                {t('doMoreWithLess.form.fields.developerRate.helpText')}
              </p>
            </div>

            {/* Monthly Burn */}
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", currentTheme.taskTile)}>
              <label className={cn("block text-sm font-semibold mb-3 transition-colors duration-300", theme.content)}>
                {t('doMoreWithLess.form.fields.monthlyBurn.label')}
              </label>
              <input
                type="number"
                min="5000"
                max="100000"
                step="1000"
                value={inputs.monthlyBurn}
                onChange={(e) => updateInput('monthlyBurn', parseInt(e.target.value) || 15000)}
                className={cn("w-full px-4 py-3 rounded-lg border transition-colors duration-300 mb-2",
                  currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
              />
              <p className={cn("text-xs leading-relaxed transition-colors duration-300", theme.muted)}>
                {t('doMoreWithLess.form.fields.monthlyBurn.helpText')}
              </p>
            </div>
          </div>
        </div>

        {/* Infrastructure Needs */}
        <div className="mb-8">
          <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
            {t('doMoreWithLess.form.sections.currentApproach')}
          </h3>
          <p className={cn("text-sm mb-4 transition-colors duration-300", theme.muted)}>
            Select what infrastructure you need for your product:
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
                      {t(`doMoreWithLess.form.fields.${field}.label`)}
                    </div>
                    <div className={cn("text-xs transition-colors duration-300", theme.muted)}>
                      {t(`doMoreWithLess.form.fields.${field}.helpText`)}
                    </div>
                  </div>
                </label>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-8">
        {/* Time Comparison */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-blue-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-blue-100/80' : 'bg-blue-50 dark:bg-blue-900/20')}>
          <h3 className={cn("text-2xl font-bold mb-6 text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-blue-800' : 'text-blue-600 dark:text-blue-400')}>
            ⏱️ {t('doMoreWithLess.results.timeComparison.title')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Self-build time */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-red-100/80' : 'bg-red-50 dark:bg-red-900/20')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-red-700' : 'text-red-600 dark:text-red-400')}>
                {t('doMoreWithLess.results.timeComparison.withoutUs')}
              </div>
              <div className={cn("text-4xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-red-800' : 'text-red-700 dark:text-red-300')}>
                {formatNumber(calculations.selfBuildWeeks)}
              </div>
              <div className={cn("text-sm transition-colors duration-300",
                readingMode === 'sepia' ? 'text-red-600' : 'text-red-500 dark:text-red-400')}>
                {t('doMoreWithLess.results.timeComparison.weeks')}
              </div>
            </div>

            {/* Weeks saved */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-700' : 'text-green-600 dark:text-green-400')}>
                {t('doMoreWithLess.results.timeComparison.saved')}
              </div>
              <div className={cn("text-4xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-800' : 'text-green-700 dark:text-green-300')}>
                {formatNumber(calculations.weeksSaved)}
              </div>
              <div className={cn("text-sm transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-600' : 'text-green-500 dark:text-green-400')}>
                {t('doMoreWithLess.results.timeComparison.weeks')}
              </div>
            </div>

            {/* Build Sprint time */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-blue-200/80' : 'bg-blue-100 dark:bg-blue-800/30')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-700' : 'text-blue-600 dark:text-blue-400')}>
                {t('doMoreWithLess.results.timeComparison.withUs')}
              </div>
              <div className={cn("text-4xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-800' : 'text-blue-700 dark:text-blue-300')}>
                {calculations.buildSprintWeeks}
              </div>
              <div className={cn("text-sm transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-600' : 'text-blue-500 dark:text-blue-400')}>
                {t('doMoreWithLess.results.timeComparison.weeks')} (to launched product)
              </div>
            </div>
          </div>
        </div>

        {/* Cost Comparison */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-green-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
          <h3 className={cn("text-2xl font-bold mb-6 text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-green-800' : 'text-green-600 dark:text-green-400')}>
            💰 {t('doMoreWithLess.results.infrastructureCosts.title')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Self-build cost */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-red-100/80' : 'bg-red-50 dark:bg-red-900/20')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-red-700' : 'text-red-600 dark:text-red-400')}>
                {t('doMoreWithLess.results.infrastructureCosts.selfBuild.title')}
              </div>
              <div className={cn("text-3xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-red-800' : 'text-red-700 dark:text-red-300')}>
                {formatCurrency(calculations.selfBuildCost)}
              </div>
              <div className={cn("text-xs transition-colors duration-300",
                readingMode === 'sepia' ? 'text-red-600' : 'text-red-500 dark:text-red-400')}>
                {t('doMoreWithLess.results.infrastructureCosts.selfBuild.subtitle')}
              </div>
            </div>

            {/* Cost saved */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-green-200/80' : 'bg-green-100 dark:bg-green-800/30')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-700' : 'text-green-600 dark:text-green-400')}>
                {t('doMoreWithLess.results.infrastructureCosts.saved')}
              </div>
              <div className={cn("text-3xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-800' : 'text-green-700 dark:text-green-300')}>
                {formatCurrency(calculations.costSaved)}
              </div>
            </div>

            {/* Build Sprint cost */}
            <div className={cn("p-6 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-blue-100/80' : 'bg-blue-50 dark:bg-blue-900/20')}>
              <div className={cn("text-sm font-medium mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-700' : 'text-blue-600 dark:text-blue-400')}>
                {t('doMoreWithLess.results.infrastructureCosts.withUs.title')}
              </div>
              <div className={cn("text-3xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-800' : 'text-blue-700 dark:text-blue-300')}>
                {formatCurrency(calculations.buildSprintCost)}
              </div>
              <div className={cn("text-xs transition-colors duration-300",
                readingMode === 'sepia' ? 'text-blue-600' : 'text-blue-500 dark:text-blue-400')}>
                {t('doMoreWithLess.results.infrastructureCosts.withUs.subtitle')}
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity Cost */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-orange-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-orange-100/80' : 'bg-orange-50 dark:bg-orange-900/20')}>
          <h3 className={cn("text-2xl font-bold mb-4 text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-orange-800' : 'text-orange-600 dark:text-orange-400')}>
            ⚠️ {t('doMoreWithLess.results.opportunityCost.title')}
          </h3>
          <p className={cn("text-center mb-6 transition-colors duration-300",
            readingMode === 'sepia' ? 'text-orange-700' : 'text-orange-600 dark:text-orange-400')}>
            {t('doMoreWithLess.results.opportunityCost.description')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {(t('doMoreWithLess.results.opportunityCost.activities', { returnObjects: true }) as string[]).map((activity: string, index: number) => (
              <div key={index} className={cn("p-3 rounded-lg text-center text-sm transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-orange-200/60' : 'bg-orange-100/60 dark:bg-orange-800/20')}>
                {activity}
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className={cn("text-sm mb-2 transition-colors duration-300",
              readingMode === 'sepia' ? 'text-orange-700' : 'text-orange-600 dark:text-orange-400')}>
              {t('doMoreWithLess.results.opportunityCost.burnRate')}
            </div>
            <div className={cn("text-3xl font-bold transition-colors duration-300",
              readingMode === 'sepia' ? 'text-orange-800' : 'text-orange-700 dark:text-orange-300')}>
              {formatCurrency(calculations.burnDuringDelay)}
            </div>
            <div className={cn("text-xs transition-colors duration-300",
              readingMode === 'sepia' ? 'text-orange-600' : 'text-orange-500 dark:text-orange-400')}>
              ({formatNumber(calculations.weeksSaved)} weeks × {formatCurrency(inputs.monthlyBurn / 4)}/week)
            </div>
          </div>
        </div>

        {/* Total Value */}
        <div className={cn("rounded-2xl p-8 border-l-4 border-purple-500 transition-colors duration-300",
          readingMode === 'sepia' ? 'bg-purple-100/80' : 'bg-purple-50 dark:bg-purple-900/20')}>
          <h3 className={cn("text-2xl font-bold mb-6 text-center transition-colors duration-300",
            readingMode === 'sepia' ? 'text-purple-800' : 'text-purple-600 dark:text-purple-400')}>
            📊 {t('doMoreWithLess.results.totalValue.title')}
          </h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span>{t('doMoreWithLess.results.totalValue.timeSaved')}</span>
              <span className="font-bold">{formatNumber(calculations.weeksSaved)} {t('doMoreWithLess.results.timeComparison.weeks')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('doMoreWithLess.results.totalValue.costAvoided')}</span>
              <span className="font-bold">{formatCurrency(calculations.costSaved)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('doMoreWithLess.results.totalValue.burnSaved')}</span>
              <span className="font-bold">{formatCurrency(calculations.burnDuringDelay)}</span>
            </div>

            <hr className={cn("transition-colors duration-300",
              readingMode === 'sepia' ? 'border-purple-400' : 'border-purple-300 dark:border-purple-600')} />

            <div className="text-center pt-4">
              <div className={cn("text-sm mb-2 transition-colors duration-300",
                readingMode === 'sepia' ? 'text-purple-700' : 'text-purple-600 dark:text-purple-400')}>
                {t('doMoreWithLess.results.totalValue.totalValue')}
              </div>
              <div className={cn("text-5xl font-bold transition-colors duration-300",
                readingMode === 'sepia' ? 'text-purple-800' : 'text-purple-700 dark:text-purple-300')}>
                {formatCurrency(calculations.totalValue)}
              </div>
            </div>
          </div>

          <p className={cn("text-center text-sm transition-colors duration-300",
            readingMode === 'sepia' ? 'text-purple-700' : 'text-purple-600 dark:text-purple-400')}>
            {t('doMoreWithLess.results.totalValue.description')}
          </p>
        </div>

        {/* Infrastructure Breakdown (Expandable) */}
        <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
          <button
            onClick={() => setExpandedSection(expandedSection === 'breakdown' ? null : 'breakdown')}
            className={cn("w-full text-left transition-colors duration-300", theme.headings)}
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-between">
              {t('doMoreWithLess.results.infrastructureBreakdown.title')}
              <span className="text-lg">{expandedSection === 'breakdown' ? '−' : '+'}</span>
            </h3>
          </button>

          {expandedSection === 'breakdown' && (
            <div className="space-y-4 mt-6">
              {Object.entries(calculations.infrastructureBreakdown)
                .filter(([_, data]) => data.enabled)
                .map(([key, data]) => (
                  <div key={key} className={cn("p-6 rounded-lg transition-colors duration-300", currentTheme.taskTile)}>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className={cn("text-lg font-semibold transition-colors duration-300", theme.headings)}>
                        {t(`doMoreWithLess.results.infrastructureBreakdown.${key}.label`)}
                      </h4>
                      <div className="text-right">
                        <div className="text-sm font-medium">{formatNumber(data.weeks)} weeks</div>
                        <div className={cn("text-sm transition-colors duration-300",
                          readingMode === 'sepia' ? 'text-red-700' : 'text-red-600 dark:text-red-400')}>
                          {formatCurrency(data.cost)}
                        </div>
                      </div>
                    </div>
                    <p className={cn("text-sm mb-4 transition-colors duration-300", theme.muted)}>
                      {t(`doMoreWithLess.results.infrastructureBreakdown.${key}.description`)}
                    </p>
                    <div className="mb-2">
                      <span className={cn("text-sm font-medium transition-colors duration-300",
                        readingMode === 'sepia' ? 'text-green-700' : 'text-green-600 dark:text-green-400')}>
                        What you get instead:
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {(t(`doMoreWithLess.results.infrastructureBreakdown.${key}.whatYouGet`, { returnObjects: true }) as string[]).map((item: string, index: number) => (
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
          {t('doMoreWithLess.leadCapture.primaryCta')}
        </button>
        <div>
          <Link
            href="/build-sprint"
            className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors",
              currentTheme.buttonSecondary)}
          >
            {t('doMoreWithLess.cta.buttons.learnMore')}
          </Link>
        </div>
        <p className={cn("text-sm transition-colors duration-300", theme.muted)}>
          {t('doMoreWithLess.leadCapture.form.noCommitment')}
        </p>
      </div>

      {/* Calendar Modal */}
      {isModalOpen && (
        <CalendarBookingModal
          onClose={() => setIsModalOpen(false)}
          readingMode={readingMode}
        />
      )}
    </div>
  );
}
