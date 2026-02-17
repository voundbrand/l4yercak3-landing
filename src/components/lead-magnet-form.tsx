'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  street: string;
  city: string;
  stateRegion: string;
  countryRegion: string;
  zip: string;
  clientCount: string;
  monthlyRevenue: string;
  teamSize: string;
}

interface SubmissionState {
  isSubmitting: boolean;
  error: string | null;
}

interface LeadMagnetFormProps {
  onSubmitSuccess: (agencyStage: string, downloadUrl?: string) => void;
}

const COUNTRY_CODES = [
  { code: '+1', label: '+1 (US/CA)' },
  { code: '+44', label: '+44 (UK)' },
  { code: '+49', label: '+49 (DE)' },
  { code: '+43', label: '+43 (AT)' },
  { code: '+41', label: '+41 (CH)' },
  { code: '+33', label: '+33 (FR)' },
  { code: '+31', label: '+31 (NL)' },
  { code: '+34', label: '+34 (ES)' },
  { code: '+39', label: '+39 (IT)' },
  { code: '+46', label: '+46 (SE)' },
  { code: '+47', label: '+47 (NO)' },
  { code: '+45', label: '+45 (DK)' },
  { code: '+48', label: '+48 (PL)' },
  { code: '+351', label: '+351 (PT)' },
  { code: '+353', label: '+353 (IE)' },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors text-base';

const selectClasses =
  'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors text-base appearance-none';

const labelClasses = 'block text-white/70 text-sm mb-1.5';

export function LeadMagnetForm({ onSubmitSuccess }: LeadMagnetFormProps) {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+49',
    phone: '',
    street: '',
    city: '',
    stateRegion: '',
    countryRegion: '',
    zip: '',
    clientCount: '0',
    monthlyRevenue: 'pre-revenue',
    teamSize: 'solo',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [submission, setSubmission] = useState<SubmissionState>({
    isSubmitting: false,
    error: null,
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goNext = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.firstName.trim().length > 0 && formData.lastName.trim().length > 0;
      case 2:
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 3:
        return formData.phone.trim().length > 0;
      case 4:
        return (
          formData.street.trim().length > 0 &&
          formData.city.trim().length > 0 &&
          formData.countryRegion.trim().length > 0 &&
          formData.zip.trim().length > 0
        );
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleContinue = () => {
    if (validateStep(currentStep)) {
      goNext();
    }
  };

  const handleSubmit = async () => {
    if (submission.isSubmitting) return;

    setSubmission({ isSubmitting: true, error: null });

    const language = (i18n.language === 'de' ? 'de' : 'en') as 'en' | 'de';

    try {
      const response = await fetch('/api/lead-magnet/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language }),
      });

      const result = await response.json();

      if (result.success || response.status === 207) {
        onSubmitSuccess(
          result.data?.agencyStage || result.agencyStage || 'growing',
          result.data?.downloadUrl,
        );
      } else {
        setSubmission({
          isSubmitting: false,
          error: result.error || t('landing.blueprint.form.error'),
        });
      }
    } catch {
      setSubmission({
        isSubmitting: false,
        error: t('landing.blueprint.form.error'),
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentStep < 5 && validateStep(currentStep)) {
        handleContinue();
      } else if (currentStep === 5) {
        handleSubmit();
      }
    }
  };

  const clientCountOptions = t('landing.blueprint.form.step5.clientCountOptions', { returnObjects: true }) as Record<string, string>;
  const monthlyRevenueOptions = t('landing.blueprint.form.step5.monthlyRevenueOptions', { returnObjects: true }) as Record<string, string>;
  const teamSizeOptions = t('landing.blueprint.form.step5.teamSizeOptions', { returnObjects: true }) as Record<string, string>;

  return (
    <form className="w-full" onKeyDown={handleKeyDown} onSubmit={(e) => e.preventDefault()} autoComplete="on">
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-6">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              step <= currentStep ? 'bg-white' : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Step 1: Name */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2
                className="text-xl sm:text-2xl font-bold text-white text-center mb-6"
                dangerouslySetInnerHTML={{
                  __html: t('landing.blueprint.form.step1.question'),
                }}
              />
              <div>
                <label htmlFor="firstName" className={labelClasses}>
                  {t('landing.blueprint.form.step1.firstName')}
                </label>
                <input
                  id="firstName"
                  name="given-name"
                  type="text"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  placeholder={t('landing.blueprint.form.step1.firstNamePlaceholder')}
                  className={inputClasses}
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClasses}>
                  {t('landing.blueprint.form.step1.lastName')}
                </label>
                <input
                  id="lastName"
                  name="family-name"
                  type="text"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  placeholder={t('landing.blueprint.form.step1.lastNamePlaceholder')}
                  className={inputClasses}
                />
              </div>
              <button
                onClick={handleContinue}
                disabled={!validateStep(1)}
                className="w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-wide text-base transition-opacity disabled:opacity-40"
              >
                {t('landing.blueprint.form.step1.cta')}
              </button>
            </div>
          )}

          {/* Step 2: Email */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2
                className="text-xl sm:text-2xl font-bold text-white text-center mb-6"
                dangerouslySetInnerHTML={{
                  __html: t('landing.blueprint.form.step2.question'),
                }}
              />
              <div>
                <label htmlFor="email" className={labelClasses}>
                  {t('landing.blueprint.form.step2.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder={t('landing.blueprint.form.step2.emailPlaceholder')}
                  className={inputClasses}
                  autoFocus
                />
              </div>
              <button
                onClick={handleContinue}
                disabled={!validateStep(2)}
                className="w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-wide text-base transition-opacity disabled:opacity-40"
              >
                {t('landing.blueprint.form.step2.cta')}
              </button>
              <button
                onClick={goPrev}
                className="w-full text-center text-white/50 text-sm hover:text-white/70 transition-colors"
              >
                {t('landing.blueprint.form.previous')}
              </button>
            </div>
          )}

          {/* Step 3: Phone */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2
                className="text-xl sm:text-2xl font-bold text-white text-center mb-6"
                dangerouslySetInnerHTML={{
                  __html: t('landing.blueprint.form.step3.question'),
                }}
              />
              <div className="flex gap-3">
                <div className="w-32 flex-shrink-0">
                  <label htmlFor="countryCode" className={labelClasses}>
                    {t('landing.blueprint.form.step3.countryCode')}
                  </label>
                  <select
                    id="countryCode"
                    name="country-code"
                    autoComplete="tel-country-code"
                    value={formData.countryCode}
                    onChange={(e) => updateField('countryCode', e.target.value)}
                    className={selectClasses}
                  >
                    {COUNTRY_CODES.map((cc) => (
                      <option key={cc.code} value={cc.code} className="bg-gray-900 text-white">
                        {cc.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="phone" className={labelClasses}>
                    {t('landing.blueprint.form.step3.phone')}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel-national"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder={t('landing.blueprint.form.step3.phonePlaceholder')}
                    className={inputClasses}
                    autoFocus
                  />
                </div>
              </div>
              <button
                onClick={handleContinue}
                disabled={!validateStep(3)}
                className="w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-wide text-base transition-opacity disabled:opacity-40"
              >
                {t('landing.blueprint.form.step3.cta')}
              </button>
              <button
                onClick={goPrev}
                className="w-full text-center text-white/50 text-sm hover:text-white/70 transition-colors"
              >
                {t('landing.blueprint.form.previous')}
              </button>
            </div>
          )}

          {/* Step 4: Address */}
          {currentStep === 4 && (
            <div className="space-y-3">
              <h2
                className="text-xl sm:text-2xl font-bold text-white text-center mb-5"
                dangerouslySetInnerHTML={{
                  __html: t('landing.blueprint.form.step4.question'),
                }}
              />
              <div>
                <label htmlFor="street" className={labelClasses}>
                  {t('landing.blueprint.form.step4.street')}
                </label>
                <input
                  id="street"
                  name="street-address"
                  type="text"
                  autoComplete="street-address"
                  value={formData.street}
                  onChange={(e) => updateField('street', e.target.value)}
                  placeholder={t('landing.blueprint.form.step4.streetPlaceholder')}
                  className={inputClasses}
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="city" className={labelClasses}>
                    {t('landing.blueprint.form.step4.city')}
                  </label>
                  <input
                    id="city"
                    name="address-level2"
                    type="text"
                    autoComplete="address-level2"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder={t('landing.blueprint.form.step4.cityPlaceholder')}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="stateRegion" className={labelClasses}>
                    {t('landing.blueprint.form.step4.stateRegion')}
                  </label>
                  <input
                    id="stateRegion"
                    name="address-level1"
                    type="text"
                    autoComplete="address-level1"
                    value={formData.stateRegion}
                    onChange={(e) => updateField('stateRegion', e.target.value)}
                    placeholder={t('landing.blueprint.form.step4.stateRegionPlaceholder')}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="countryRegion" className={labelClasses}>
                    {t('landing.blueprint.form.step4.countryRegion')}
                  </label>
                  <input
                    id="countryRegion"
                    name="country-name"
                    type="text"
                    autoComplete="country-name"
                    value={formData.countryRegion}
                    onChange={(e) => updateField('countryRegion', e.target.value)}
                    placeholder={t('landing.blueprint.form.step4.countryRegionPlaceholder')}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="zip" className={labelClasses}>
                    {t('landing.blueprint.form.step4.zip')}
                  </label>
                  <input
                    id="zip"
                    name="postal-code"
                    type="text"
                    autoComplete="postal-code"
                    value={formData.zip}
                    onChange={(e) => updateField('zip', e.target.value)}
                    placeholder={t('landing.blueprint.form.step4.zipPlaceholder')}
                    className={inputClasses}
                  />
                </div>
              </div>
              <button
                onClick={handleContinue}
                disabled={!validateStep(4)}
                className="w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-wide text-base transition-opacity disabled:opacity-40"
              >
                {t('landing.blueprint.form.step4.cta')}
              </button>
              <button
                onClick={goPrev}
                className="w-full text-center text-white/50 text-sm hover:text-white/70 transition-colors"
              >
                {t('landing.blueprint.form.previous')}
              </button>
            </div>
          )}

          {/* Step 5: Agency Journey */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h2
                className="text-xl sm:text-2xl font-bold text-white text-center mb-6"
                dangerouslySetInnerHTML={{
                  __html: t('landing.blueprint.form.step5.question'),
                }}
              />

              <div>
                <label className={labelClasses}>
                  {t('landing.blueprint.form.step5.clientCount')}
                </label>
                <select
                  value={formData.clientCount}
                  onChange={(e) => updateField('clientCount', e.target.value)}
                  className={selectClasses}
                >
                  {Object.entries(clientCountOptions).map(([value, label]) => (
                    <option key={value} value={value} className="bg-gray-900 text-white">
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClasses}>
                  {t('landing.blueprint.form.step5.monthlyRevenue')}
                </label>
                <select
                  value={formData.monthlyRevenue}
                  onChange={(e) => updateField('monthlyRevenue', e.target.value)}
                  className={selectClasses}
                >
                  {Object.entries(monthlyRevenueOptions).map(([value, label]) => (
                    <option key={value} value={value} className="bg-gray-900 text-white">
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClasses}>
                  {t('landing.blueprint.form.step5.teamSize')}
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => updateField('teamSize', e.target.value)}
                  className={selectClasses}
                >
                  {Object.entries(teamSizeOptions).map(([value, label]) => (
                    <option key={value} value={value} className="bg-gray-900 text-white">
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {submission.error && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
                  {submission.error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submission.isSubmitting}
                className="w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-wide text-base transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submission.isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
                    {t('landing.blueprint.form.submitting')}
                  </>
                ) : (
                  t('landing.blueprint.form.step5.cta')
                )}
              </button>
              <button
                onClick={goPrev}
                className="w-full text-center text-white/50 text-sm hover:text-white/70 transition-colors"
              >
                {t('landing.blueprint.form.previous')}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </form>
  );
}
