'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { CalendarBookingModal } from './calendar-booking-modal';

// Application form schema
const applicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required').min(10, 'Please enter a valid phone number'),
  company: z.string().min(1, 'Company name is required').min(2, 'Company name must be at least 2 characters'),
  role: z.string().min(1, 'Role is required').min(2, 'Role must be at least 2 characters'),
  teamSize: z.string().min(1, 'Please select team size'),
  currentChallenges: z.string().min(1, 'Please describe your current challenges').min(10, 'Please provide more details (at least 10 characters)'),
  monthlySpend: z.string().min(1, 'Please select monthly software spend'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

// Close Icon
const Cross2Icon = ({ className }: { className?: string }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

interface ApplicationModalProps {
  onClose: () => void;
}

export function ApplicationModal({ onClose }: ApplicationModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      role: '',
      teamSize: '',
      currentChallenges: '',
      monthlySpend: '',
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual submission logic
      console.log('Application submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="text-left">
              <h2 className="text-2xl font-serif italic text-foreground">
                {t('application.title')}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {(() => {
                  const getTargetQuarterAndYear = () => {
                    const today = new Date();
                    const threeMonthsAhead = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
                    const month = threeMonthsAhead.getMonth();
                    const year = threeMonthsAhead.getFullYear();
                    const quarter = Math.floor(month / 3) + 1;
                    return { quarter: `Q${quarter}`, year: year.toString() };
                  };
                  const { quarter, year } = getTargetQuarterAndYear();
                  return t('application.subtitle')
                    .replace('{quarter}', quarter)
                    .replace('{year}', year);
                })()}
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
                  {t('application.success.title')}
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
                  {t('application.success.message')}
                </p>
                
                {/* Schedule Call Option */}
                <div className="mb-8">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('application.success.scheduleMessage')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      onClick={() => setIsCalendarOpen(true)}
                      variant="outline"
                      size="lg"
                    >
                      {t('application.success.scheduleButton')}
                    </Button>
                    <Button onClick={onClose} size="lg">
                      {t('application.buttons.close')}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-left block">{t('application.fields.firstName')}</FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                              placeholder={t('application.placeholders.firstName')}
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
                          <FormLabel className="text-left block">{t('application.fields.lastName')}</FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                              placeholder={t('application.placeholders.lastName')}
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
                        <FormLabel className="text-left block">{t('application.fields.email')}</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            placeholder={t('application.placeholders.email')}
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
                        <FormLabel className="text-left block">{t('application.fields.phone')}</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <select className="flex h-10 w-32 rounded-l-md border border-r-0 border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 transition-colors">
                              <option value="+49">🇩🇪 +49</option>
                              <option value="+1">🇺🇸 +1</option>
                              <option value="+44">🇬🇧 +44</option>
                              <option value="+33">🇫🇷 +33</option>
                              <option value="+39">🇮🇹 +39</option>
                              <option value="+34">🇪🇸 +34</option>
                              <option value="+31">🇳🇱 +31</option>
                              <option value="+41">🇨🇭 +41</option>
                              <option value="+43">🇦🇹 +43</option>
                            </select>
                            <input
                              {...field}
                              type="tel"
                              className="flex h-10 w-full rounded-r-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                              placeholder={t('application.placeholders.phone')}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />

                  {/* Company Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-left block">{t('application.fields.company')}</FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                              placeholder={t('application.placeholders.company')}
                            />
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-left block">{t('application.fields.role')}</FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                              placeholder={t('application.placeholders.role')}
                            />
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Business Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-left block">{t('application.fields.teamSize')}</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            >
                              <option value="">{t('application.options.teamSize.placeholder')}</option>
                              <option value="1-5">{t('application.options.teamSize.1-5')}</option>
                              <option value="6-20">{t('application.options.teamSize.6-20')}</option>
                              <option value="21-50">{t('application.options.teamSize.21-50')}</option>
                              <option value="51-100">{t('application.options.teamSize.51-100')}</option>
                              <option value="100+">{t('application.options.teamSize.100+')}</option>
                            </select>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="monthlySpend"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-left block">{t('application.fields.monthlySpend')}</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            >
                              <option value="">{t('application.options.monthlySpend.placeholder')}</option>
                              <option value="<500">{t('application.options.monthlySpend.<500')}</option>
                              <option value="500-1000">{t('application.options.monthlySpend.500-1000')}</option>
                              <option value="1000-2500">{t('application.options.monthlySpend.1000-2500')}</option>
                              <option value="2500-5000">{t('application.options.monthlySpend.2500-5000')}</option>
                              <option value="5000+">{t('application.options.monthlySpend.5000+')}</option>
                            </select>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="currentChallenges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left block">{t('application.fields.currentChallenges')}</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            rows={4}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            placeholder={t('application.placeholders.currentChallenges')}
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
                      {t('application.buttons.cancel')}
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-w-[120px]"
                    >
                      {isSubmitting ? t('application.buttons.submitting') : t('application.buttons.submit')}
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
}