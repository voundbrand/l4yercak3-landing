'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { useTranslation } from 'react-i18next';
import { useLanguage } from './language-provider';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { CalendarBookingModal } from './calendar-booking-modal';

// Apprenticeship application form schema
const apprenticeshipSchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required').min(10, 'Please enter a valid phone number'),
  // Apprenticeship-specific fields
  currentSkillLevel: z.string().min(1, 'Please select your current skill level'),
  primarySkill: z.string().min(1, 'Please select your primary skill'),
  availableHoursPerWeek: z.string().min(1, 'Please select your availability'),
  portfolio: z.string().optional(),
  whyApprenticeship: z.string().min(1, 'Please tell us why you want to join').min(20, 'Please provide more details (at least 20 characters)'),
  whatYouHopeToLearn: z.string().min(1, 'Please tell us what you hope to learn').min(20, 'Please provide more details (at least 20 characters)'),
});

type ApprenticeshipFormData = z.infer<typeof apprenticeshipSchema>;

// Close Icon
const Cross2Icon = ({ className }: { className?: string }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

interface ApprenticeshipModalProps {
  onClose: () => void;
}

export function ApprenticeshipModal({ onClose }: ApprenticeshipModalProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const form = useForm<ApprenticeshipFormData>({
    resolver: zodResolver(apprenticeshipSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      currentSkillLevel: '',
      primarySkill: '',
      availableHoursPerWeek: '',
      portfolio: '',
      whyApprenticeship: '',
      whatYouHopeToLearn: '',
    },
  });

  const onSubmit = async (data: ApprenticeshipFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/apprenticeship/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          language: language as 'en' | 'de',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(result.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  const inputClassName = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";

  const modalContent = (
    <AnimatePresence>
      <div key="apprenticeship-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          key="apprenticeship-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          key="apprenticeship-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="text-left">
              <h2 className="text-2xl font-serif italic text-foreground">
                {t('landing.apprenticeship.modal.title')}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t('landing.apprenticeship.modal.subtitle')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <Cross2Icon className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {t('landing.apprenticeship.modal.success.title')}
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
                  {t('landing.apprenticeship.modal.success.message')}
                </p>

                {/* Schedule Call Option */}
                <div className="mb-8">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('landing.apprenticeship.modal.success.scheduleMessage')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => setIsCalendarOpen(true)}
                      variant="outline"
                      size="lg"
                    >
                      {t('landing.apprenticeship.modal.success.scheduleButton')}
                    </Button>
                    <Button onClick={onClose} size="lg">
                      {t('landing.apprenticeship.modal.buttons.close')}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Error Message */}
                  {errorMessage && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
                    </div>
                  )}

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-left block">{t('landing.apprenticeship.modal.fields.firstName')}</FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              className={inputClassName}
                              placeholder={t('landing.apprenticeship.modal.placeholders.firstName')}
                            />
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-left block">{t('landing.apprenticeship.modal.fields.lastName')}</FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              className={inputClassName}
                              placeholder={t('landing.apprenticeship.modal.placeholders.lastName')}
                            />
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left block">{t('landing.apprenticeship.modal.fields.email')}</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="email"
                            className={inputClassName}
                            placeholder={t('landing.apprenticeship.modal.placeholders.email')}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left block">{t('landing.apprenticeship.modal.fields.phone')}</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <select className="flex h-10 w-32 rounded-l-md border border-r-0 border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 transition-colors">
                              <option value="+49">+49</option>
                              <option value="+1">+1</option>
                              <option value="+44">+44</option>
                              <option value="+33">+33</option>
                              <option value="+39">+39</option>
                              <option value="+34">+34</option>
                              <option value="+31">+31</option>
                              <option value="+41">+41</option>
                              <option value="+43">+43</option>
                            </select>
                            <input
                              {...field}
                              type="tel"
                              className="flex h-10 w-full rounded-r-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                              placeholder={t('landing.apprenticeship.modal.placeholders.phone')}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />

                  {/* Apprenticeship-Specific Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currentSkillLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-left block">{t('landing.apprenticeship.modal.fields.currentSkillLevel')}</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className={inputClassName}
                            >
                              <option value="">{t('landing.apprenticeship.modal.options.skillLevel.placeholder')}</option>
                              <option value="beginner">{t('landing.apprenticeship.modal.options.skillLevel.beginner')}</option>
                              <option value="intermediate">{t('landing.apprenticeship.modal.options.skillLevel.intermediate')}</option>
                              <option value="advanced">{t('landing.apprenticeship.modal.options.skillLevel.advanced')}</option>
                            </select>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="primarySkill"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-left block">{t('landing.apprenticeship.modal.fields.primarySkill')}</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className={inputClassName}
                            >
                              <option value="">{t('landing.apprenticeship.modal.options.primarySkill.placeholder')}</option>
                              <option value="frontend">{t('landing.apprenticeship.modal.options.primarySkill.frontend')}</option>
                              <option value="backend">{t('landing.apprenticeship.modal.options.primarySkill.backend')}</option>
                              <option value="fullstack">{t('landing.apprenticeship.modal.options.primarySkill.fullstack')}</option>
                              <option value="design">{t('landing.apprenticeship.modal.options.primarySkill.design')}</option>
                              <option value="marketing">{t('landing.apprenticeship.modal.options.primarySkill.marketing')}</option>
                            </select>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="availableHoursPerWeek"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left block">{t('landing.apprenticeship.modal.fields.availableHours')}</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className={inputClassName}
                          >
                            <option value="">{t('landing.apprenticeship.modal.options.hours.placeholder')}</option>
                            <option value="5-10">{t('landing.apprenticeship.modal.options.hours.5-10')}</option>
                            <option value="10-20">{t('landing.apprenticeship.modal.options.hours.10-20')}</option>
                            <option value="20-30">{t('landing.apprenticeship.modal.options.hours.20-30')}</option>
                            <option value="30+">{t('landing.apprenticeship.modal.options.hours.30+')}</option>
                          </select>
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="portfolio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left block">{t('landing.apprenticeship.modal.fields.portfolio')}</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            className={inputClassName}
                            placeholder={t('landing.apprenticeship.modal.placeholders.portfolio')}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whyApprenticeship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left block">{t('landing.apprenticeship.modal.fields.whyApprenticeship')}</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            rows={3}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            placeholder={t('landing.apprenticeship.modal.placeholders.whyApprenticeship')}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatYouHopeToLearn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left block">{t('landing.apprenticeship.modal.fields.whatYouHopeToLearn')}</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            rows={3}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            placeholder={t('landing.apprenticeship.modal.placeholders.whatYouHopeToLearn')}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      {t('landing.apprenticeship.modal.buttons.cancel')}
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-w-[120px]"
                    >
                      {isSubmitting ? t('landing.apprenticeship.modal.buttons.submitting') : t('landing.apprenticeship.modal.buttons.submit')}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Calendar Booking Modal */}
      {isCalendarOpen && (
        <CalendarBookingModal
          onClose={() => setIsCalendarOpen(false)}
        />
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
