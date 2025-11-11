'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useContentTheme, useReadingMode } from '@/components/content-page-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { generateValueReport, type ValueReportRequest } from '@/lib/api-utils/value-report-client';

interface LeadCaptureFormProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorInputs: any;
  calculatedValues: any;
  onSubmitSuccess?: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  organizationName: string;
  jobTitle: string;
  signatureAuthority: string;
  timeline: string;
}

interface SubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  canRetry: boolean;
  attemptCount: number;
}

export function LeadCaptureForm({ 
  isOpen, 
  onClose, 
  calculatorInputs, 
  calculatedValues,
  onSubmitSuccess 
}: LeadCaptureFormProps) {
  const { t, i18n } = useTranslation();
  const theme = useContentTheme();
  const { readingMode } = useReadingMode();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    organizationName: '',
    jobTitle: '',
    signatureAuthority: '',
    timeline: 'within-3-months'
  });

  const [submission, setSubmission] = useState<SubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
    canRetry: false,
    attemptCount: 0
  });

  // Theme classes for inputs and other elements
  const themeClasses = {
    dark: {
      input: "bg-background/80 border-border/30 text-foreground",
      modal: "bg-background border-border",
      button: "bg-primary text-primary-foreground hover:bg-primary/90",
      buttonSecondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    },
    sepia: {
      input: "bg-amber-50/90 border-amber-300/40 text-amber-950 placeholder:text-amber-700/50",
      modal: "bg-amber-50/95 border border-amber-300/60 text-amber-950",
      button: "bg-amber-800 text-amber-50 hover:bg-amber-700",
      buttonSecondary: "bg-amber-700 text-amber-50 hover:bg-amber-600",
    },
  };

  const currentTheme = themeClasses[readingMode];

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submission.isSubmitting) return;

    const currentLanguage = (i18n.language === 'de' ? 'de' : 'en') as 'en' | 'de';
    const newAttemptCount = submission.attemptCount + 1;

    setSubmission(prev => ({
      ...prev,
      isSubmitting: true,
      error: null,
      attemptCount: newAttemptCount
    }));

    // Prepare the request payload
    const requestData: ValueReportRequest = {
      calculatorInputs,
      calculatedValues,
      contactInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        organizationName: formData.organizationName,
        jobTitle: formData.jobTitle,
        signatureAuthority: formData.signatureAuthority ? parseFloat(formData.signatureAuthority) : undefined,
        timeline: formData.timeline,
        language: currentLanguage
      }
    };

    // Log PDF generation start in browser console
    console.log('%c[Value Calculator] Starting PDF report generation', 'color: #8b5cf6; font-weight: bold', {
      email: formData.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'), // Mask email for privacy
      organizationName: formData.organizationName,
      timeline: formData.timeline,
      language: currentLanguage,
      totalValue: calculatedValues.totalValueCreated,
      attemptNumber: newAttemptCount,
      timestamp: new Date().toISOString(),
    });

    // Generate value report with comprehensive error handling
    const result = await generateValueReport(requestData, currentLanguage);

    if (result.success) {
      // Success!
      console.log('%c✓ PDF report generated and sent successfully', 'color: #10b981; font-weight: bold; font-size: 14px', {
        leadId: result.data?.leadId,
        pdfFilename: result.data?.pdfFilename,
        processingTime: result.data?.processingTime,
        totalValue: result.data?.totalValue,
        leadQuality: result.data?.leadQuality,
        emailDelivery: result.data?.emailDelivery,
        language: currentLanguage,
        isPartialSuccess: result.isPartialSuccess,
        warnings: result.data?.warnings,
        timestamp: new Date().toISOString(),
      });

      setSubmission({
        isSubmitting: false,
        isSuccess: true,
        error: null,
        canRetry: false,
        attemptCount: newAttemptCount
      });

      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } else {
      // Handle error or partial success
      console.error('%c✗ PDF report generation failed', 'color: #ef4444; font-weight: bold; font-size: 14px', {
        error: result.error,
        isPartialSuccess: result.isPartialSuccess,
        canRetry: result.canRetry,
        attemptNumber: newAttemptCount,
        language: currentLanguage,
        fallbackInstructions: result.fallbackInstructions,
        timestamp: new Date().toISOString(),
      });

      setSubmission({
        isSubmitting: false,
        isSuccess: false,
        error: result.error || 'Unknown error occurred',
        canRetry: result.canRetry !== false && newAttemptCount < 3,
        attemptCount: newAttemptCount
      });
    }
  };

  const handleRetry = () => {
    // Reset error state and retry
    setSubmission(prev => ({
      ...prev,
      error: null,
      canRetry: false
    }));
    
    // Trigger form submission again
    const form = document.querySelector('form');
    if (form) {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    }
  };

  const handleClose = () => {
    if (!submission.isSubmitting) {
      onClose();
      // Reset form state when closing
      setTimeout(() => {
        setSubmission({
          isSubmitting: false,
          isSuccess: false,
          error: null,
          canRetry: false,
          attemptCount: 0
        });
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cn("fixed inset-0 flex items-center justify-center p-4 z-50 transition-colors duration-300",
      readingMode === 'sepia' ? 'bg-amber-900/60' : 'bg-black/50')}>
      <div className={cn("rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300",
        currentTheme.modal)}>
        
        {submission.isSuccess ? (
          // Success State
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">✅</div>
            <h3 className={cn("text-2xl font-bold transition-colors duration-300", theme.headings)}>
              {t('doMoreWithLess.leadCapture.success.title')}
            </h3>
            <p className={cn("text-lg transition-colors duration-300", theme.content)}>
              {t('doMoreWithLess.leadCapture.success.message')}
            </p>
            <div className={cn("p-4 rounded-lg transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
              <p className={cn("text-sm transition-colors duration-300",
                readingMode === 'sepia' ? 'text-green-800' : 'text-green-700 dark:text-green-300')}>
                📧 {t('doMoreWithLess.leadCapture.success.emailSent')}
              </p>
            </div>
            <Button
              onClick={handleClose}
              className={cn("w-full", currentTheme.button)}
            >
              {t('doMoreWithLess.leadCapture.form.buttons.close')}
            </Button>
          </div>
        ) : (
          // Form State
          <>
            <h3 className={cn("text-2xl font-bold mb-6 transition-colors duration-300", theme.headings)}>
              {t('doMoreWithLess.leadCapture.form.title')}
            </h3>
            <p className={cn("mb-6 transition-colors duration-300", theme.muted)}>
              {t('doMoreWithLess.leadCapture.form.subtitle')}
            </p>

            {submission.error && (
              <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
                <div className="flex items-start gap-2">
                  <span className="text-red-500">⚠️</span>
                  <div className="flex-1">
                    <p className="font-medium">
                      {t('doMoreWithLess.leadCapture.form.errorTitle')}
                    </p>
                    <p className="text-sm mt-1">{submission.error}</p>
                    {submission.canRetry && (
                      <button
                        onClick={handleRetry}
                        className="text-sm underline mt-2 hover:no-underline"
                        disabled={submission.isSubmitting}
                      >
                        {t('doMoreWithLess.leadCapture.form.retryButton')}
                      </button>
                    )}
                    {submission.attemptCount > 1 && (
                      <p className="text-xs mt-1 opacity-75">
                        {t('doMoreWithLess.leadCapture.form.attemptCount', { count: submission.attemptCount })}
                      </p>
                    )}
                  </div>
                </div>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className={cn("transition-colors duration-300", theme.content)}>
                    {t('doMoreWithLess.leadCapture.form.fields.fullName')} *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    className={cn("mt-1", currentTheme.input)}
                    placeholder="Dr. Maria Schmidt"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className={cn("transition-colors duration-300", theme.content)}>
                    {t('doMoreWithLess.leadCapture.form.fields.email')} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className={cn("mt-1", currentTheme.input)}
                    placeholder="maria.schmidt@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className={cn("transition-colors duration-300", theme.content)}>
                    {t('doMoreWithLess.leadCapture.form.fields.phone')}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className={cn("mt-1", currentTheme.input)}
                    placeholder="+49 30 12345678"
                  />
                </div>

                <div>
                  <Label htmlFor="organizationName" className={cn("transition-colors duration-300", theme.content)}>
                    {t('doMoreWithLess.leadCapture.form.fields.organizationName')} *
                  </Label>
                  <Input
                    id="organizationName"
                    type="text"
                    required
                    value={formData.organizationName}
                    onChange={(e) => updateFormData('organizationName', e.target.value)}
                    className={cn("mt-1", currentTheme.input)}
                    placeholder="Medical Association Berlin"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobTitle" className={cn("transition-colors duration-300", theme.content)}>
                    {t('doMoreWithLess.leadCapture.form.fields.jobTitle')} *
                  </Label>
                  <Input
                    id="jobTitle"
                    type="text"
                    required
                    value={formData.jobTitle}
                    onChange={(e) => updateFormData('jobTitle', e.target.value)}
                    className={cn("mt-1", currentTheme.input)}
                    placeholder="Executive Director"
                  />
                </div>

                <div>
                  <Label htmlFor="signatureAuthority" className={cn("transition-colors duration-300", theme.content)}>
                    {t('doMoreWithLess.leadCapture.form.fields.signatureAuthority')}
                  </Label>
                  <Input
                    id="signatureAuthority"
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.signatureAuthority}
                    onChange={(e) => updateFormData('signatureAuthority', e.target.value)}
                    className={cn("mt-1", currentTheme.input)}
                    placeholder="50000"
                  />
                  <p className={cn("text-xs mt-1 transition-colors duration-300", theme.muted)}>
                    {t('doMoreWithLess.leadCapture.form.fields.signatureAuthorityHelp')}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="timeline" className={cn("transition-colors duration-300", theme.content)}>
                  {t('doMoreWithLess.leadCapture.form.fields.timeline')} *
                </Label>
                <select
                  id="timeline"
                  required
                  value={formData.timeline}
                  onChange={(e) => updateFormData('timeline', e.target.value)}
                  className={cn("w-full mt-1 px-4 py-3 rounded-lg border transition-colors duration-300",
                    currentTheme.input, readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary focus:ring-1 focus:ring-primary')}
                >
                  <option value="within-1-month">{t('doMoreWithLess.leadCapture.form.fields.timelineOptions.within1Month')}</option>
                  <option value="within-3-months">{t('doMoreWithLess.leadCapture.form.fields.timelineOptions.within3Months')}</option>
                  <option value="within-6-months">{t('doMoreWithLess.leadCapture.form.fields.timelineOptions.within6Months')}</option>
                  <option value="within-1-year">{t('doMoreWithLess.leadCapture.form.fields.timelineOptions.within1Year')}</option>
                  <option value="just-exploring">{t('doMoreWithLess.leadCapture.form.fields.timelineOptions.justExploring')}</option>
                </select>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  onClick={handleClose}
                  disabled={submission.isSubmitting}
                  className={cn("flex-1", currentTheme.buttonSecondary)}
                >
                  {t('doMoreWithLess.leadCapture.form.buttons.cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={submission.isSubmitting}
                  className={cn("flex-1", currentTheme.button)}
                >
                  {submission.isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                      {t('doMoreWithLess.leadCapture.form.buttons.generating')}
                    </>
                  ) : (
                    t('doMoreWithLess.leadCapture.form.buttons.submit')
                  )}
                </Button>
              </div>
            </form>

            <p className={cn("text-xs text-center mt-4 transition-colors duration-300", theme.muted)}>
              {t('doMoreWithLess.leadCapture.form.privacy')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}