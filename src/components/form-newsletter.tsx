"use client";

import { Form, FormControl, FormField, FormItem, FormMessage, FormStateMessage } from "./ui/form";
import type { NewsletterSchema } from "@/lib/schema";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema } from "@/lib/schema";
import { subscribe } from "@/lib/subscribe";
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

const SubmissionStateMessage = ({ value, reset }: { value: ActionResult<string> | null, reset: () => void }) => {
  const form = useFormContext<NewsletterSchema>();

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      reset();
    }
  }, [form.formState.errors, reset]);

  return (
    <FormStateMessage>
      {value?.success === true && (
        <motion.div
          key={value.id}
          className={cn(
            alertVariants({ variant: "success" }),
            "absolute top-0 left-0 right-0 mx-auto w-max"
          )}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={SPRING_BUTTON}
        >
          <CheckCircledIcon />
          <AlertTitle>{value.data}</AlertTitle>
        </motion.div>
      )}
    </FormStateMessage>
  )
}

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
  submit: (props: React.ComponentProps<"button">) => React.ReactNode;
}) => {
  const { t } = useTranslation();
  const [submissionState, setSubmissionState] =
    useState<ActionResult<string> | null>(null);

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
    const state = await subscribe(values.email, values.subscriptionType, values.name);

    setSubmissionState(state);

    if (state.success === true) {
      form.reset({ email: '', name: '', subscriptionType: 'both' });
      // Clear localStorage on successful submission
      localStorage.removeItem('l4yercak3-email');
      localStorage.removeItem('l4yercak3-name');
      // No need to remove subscription type since we don't store it anymore
    }

    if (state.success === false) {
      form.setError("email", { message: state.message });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative pt-4 lg:pt-6">
        <SubmissionStateMessage value={submissionState} reset={() => setSubmissionState(null)} />

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