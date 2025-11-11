"use client";

import { Form, FormControl, FormField, FormItem, FormMessage, FormStateMessage } from "./ui/form";
import type { NewsletterSchema } from "@/lib/schema";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema } from "@/lib/schema";
import type { SubscribeResult } from "@/lib/subscribe";
import { useEffect, useState } from "react";
import { ActionResult, cn } from "@/lib/utils";
import { AlertTitle, alertVariants } from "./ui/alert";
import { motion } from "framer-motion";
import { SPRING_BUTTON } from "@/lib/animations";
import { useTranslation } from 'react-i18next';

// Icons - we'll need to install these
const CheckCircledIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1576 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1576 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM10.1589 6.04845L6.99991 9.20745L4.84091 7.04845C4.64565 6.85319 4.64565 6.53661 4.84091 6.34134C5.03617 6.14608 5.35276 6.14608 5.54802 6.34134L6.99991 7.79323L9.45179 5.34134C9.64706 5.14608 9.96364 5.14608 10.1589 5.34134C10.3542 5.53661 10.3542 5.85319 10.1589 6.04845Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const CrossCircledIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1576 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1576 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM5.54802 5.54802C5.35276 5.35276 5.03617 5.35276 4.84091 5.54802C4.64565 5.74329 4.64565 6.05987 4.84091 6.25513L6.58579 7.99991L4.84091 9.74479C4.64565 9.94005 4.64565 10.2566 4.84091 10.4519C5.03617 10.6472 5.35276 10.6472 5.54802 10.4519L7.29289 8.70703L9.03777 10.4519C9.23303 10.6472 9.54962 10.6472 9.74488 10.4519C9.94014 10.2566 9.94014 9.94005 9.74488 9.74479L8 7.99991L9.74488 6.25513C9.94014 6.05987 9.94014 5.74329 9.74488 5.54802C9.54962 5.35276 9.23303 5.35276 9.03777 5.54802L7.29289 7.29289L5.54802 5.54802Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);


const getDefaultValues = () => {
  // Always return default values on server to prevent hydration mismatch
  // Default to 'both' since we removed the selection UI
  return { email: '', name: '', subscriptionType: 'both' as const };
}

export const FormNewsletter = ({
  input,
  submit,
}: {
  input: (props: React.ComponentProps<"input">) => React.ReactNode;
  submit: (props: React.ComponentProps<"button"> & { isSuccess?: boolean }) => React.ReactNode;
}) => {
  const { t } = useTranslation();
  const [submissionState, setSubmissionState] =
    useState<SubscribeResult | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<NewsletterSchema>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: getDefaultValues()
  });

  // Load saved values from localStorage after hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('l4yercak3-email');
      const name = localStorage.getItem('l4yercak3-name');

      if (email || name) {
        form.reset({
          email: email || '',
          name: name || '',
          subscriptionType: 'both', // Always default to 'both'
        });
      }
    }
  }, [form]);

  useEffect(() => {
    return () => {
      const values = form.getValues();

      if (values.email) {
        localStorage.setItem('l4yercak3-email', values.email);
      }
      if (values.name) {
        localStorage.setItem('l4yercak3-name', values.name);
      }
      // No need to store subscriptionType since it's always 'both'
    }
  }, [form]);

  async function onSubmit(values: NewsletterSchema) {
    // Get current language from i18n
    const currentLanguage = (localStorage.getItem('language') || 'en') as 'en' | 'de';

    // Log submission start in browser console
    console.log('%c[Newsletter] Starting subscription', 'color: #3b82f6; font-weight: bold', {
      email: values.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'), // Mask email for privacy
      subscriptionType: values.subscriptionType,
      hasName: !!values.name,
      language: currentLanguage,
      timestamp: new Date().toISOString(),
    });

    // Call API route instead of server action (API routes serialize properly in Next.js 16)
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: values.email,
        subscriptionType: values.subscriptionType,
        name: values.name,
        language: currentLanguage,
      }),
    });

    const state: SubscribeResult = await response.json();

    setSubmissionState(state);

    if (state.success === true) {
      // Log success in browser console with CRM sync info
      console.log('%c✓ Newsletter subscription successful', 'color: #10b981; font-weight: bold; font-size: 14px', {
        subscriptionType: values.subscriptionType,
        language: currentLanguage,
        message: state.message,
        crmSyncScheduled: state.crmSyncScheduled,
        emailsScheduled: state.emailsScheduled,
        timestamp: new Date().toISOString(),
      });

      // Log CRM sync status if scheduled
      if (state.crmSyncScheduled) {
        console.log('%c📊 CRM Sync scheduled to L4YERCAK3 backend', 'color: #8b5cf6; font-weight: bold', {
          backend: 'https://agreeable-lion-828.convex.site',
          action: 'Creating contact in backend CRM',
          email: values.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
          subscriptionType: values.subscriptionType,
          note: 'Contact will appear in L4YERCAK3 app CRM within seconds',
        });
      }

      setShowSuccess(true);
      // Keep success state visible for 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      form.reset({ email: '', name: '', subscriptionType: 'both' });
      // Clear localStorage on successful submission
      localStorage.removeItem('l4yercak3-email');
      localStorage.removeItem('l4yercak3-name');
      // No need to remove subscription type since we don't store it anymore
    }

    if (state.success === false) {
      // Log error in browser console
      console.error('%c✗ Newsletter subscription failed', 'color: #ef4444; font-weight: bold; font-size: 14px', {
        error: state.message,
        subscriptionType: values.subscriptionType,
        language: currentLanguage,
        timestamp: new Date().toISOString(),
      });

      form.setError("email", { message: state.message });
      setShowSuccess(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative pt-4 lg:pt-6">
        <div className="space-y-4">
          {/* Helper Text */}
          <div className="text-center">
            <p className="text-sm font-medium text-foreground/80">
              {t('newsletter.helperText')}
            </p>
          </div>

          {/* Email Input */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormMessage>
                  {(error: string) => (
                    <motion.div
                      key={error}
                      className={cn(
                        alertVariants({ variant: "destructive" }),
                        "absolute top-0 left-0 right-0 mx-auto w-max"
                      )}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={SPRING_BUTTON}
                    >
                      <CrossCircledIcon />
                      <AlertTitle>{error}</AlertTitle>
                    </motion.div>
                  )}
                </FormMessage>
                <FormControl>
                  <div className="relative">
                    {input({
                      ...field,
                      placeholder: t('newsletter.emailPlaceholder')
                    })}
                    <div className="absolute right-1 top-1/2 -translate-y-1/2">
                      {submit({
                        type: "submit",
                        disabled: form.formState.isSubmitting,
                        isSuccess: showSuccess,
                      })}
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};