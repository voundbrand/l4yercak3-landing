"use client";

import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { FormNewsletter } from "./form-newsletter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatePresenceWrapper } from "./animate-presence-wrapper";
import { DURATION, DELAY, EASE_OUT, EASE_OUT_OPACITY, SPRING } from "@/lib/animations";
import Link from "next/link";
import { useTranslation } from 'react-i18next';

// Arrow Right Icon
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8.5 3L13.5 8L8.5 13M13 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Check Icon for success state
const CheckIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Icons
const Cross1Icon = ({ className }: { className?: string }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

// Utility function to get quarter and year 3 months ahead
const getTargetQuarterAndYear = () => {
  const today = new Date();
  const threeMonthsAhead = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
  
  const month = threeMonthsAhead.getMonth();
  const year = threeMonthsAhead.getFullYear();
  
  const quarter = Math.floor(month / 3) + 1;
  
  return {
    quarter: `Q${quarter}`,
    year: year.toString()
  };
};

export const Newsletter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isInitialRender = useRef(true);
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      isInitialRender.current = false;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex overflow-hidden relative flex-col gap-2 md:gap-4 justify-center items-center pt-7 md:pt-1 w-full h-full pb-footer-safe-area px-4 md:px-sides">
      <motion.div
        layout="position"
        transition={{ duration: DURATION, ease: EASE_OUT }}
        style={{ willChange: 'transform' }}
        className="text-center"
      >
        <h1 className="font-serif text-4xl md:text-8xl lg:text-9xl italic text-foreground leading-tight">
          {t('newsletter.title')}
        </h1>
        <p className="text-base md:text-lg font-medium text-foreground/80 mt-2 md:mt-3 max-w-md md:max-w-none mx-auto">
          {t('newsletter.subtitle')}
        </p>
      </motion.div>

      <div className="flex flex-col items-center min-h-0 shrink">
        <AnimatePresenceWrapper mode="popLayout">
          {!isOpen && (
            <motion.div
              key="newsletter"
              initial={isInitialRender.current ? false : "hidden"}
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  scale: 1,
                  transition: {
                    delay: DELAY,
                    duration: DURATION,
                    ease: EASE_OUT,
                  },
                },
                hidden: {
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
                exit: {
                  y: -150,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
              }}
            >
              <div className="flex flex-col w-full max-w-xl px-4 md:px-0">
                {/* Short Description with Dynamic Quarter/Year */}
                <motion.div
                  initial={isInitialRender.current ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                  }}
                  transition={{
                    duration: DURATION,
                    ease: EASE_OUT,
                    delay: DELAY,
                  }}
                  className="text-center px-4 md:px-0"
                >
                  <p className="text-sm md:text-base lg:text-lg font-medium text-foreground/90 text-pretty max-w-lg mx-auto mb-2">
                    {(() => {
                      const { quarter, year } = getTargetQuarterAndYear();
                      return t('newsletter.description')
                        .replace('{quarter}', quarter)
                        .replace('{year}', year);
                    })()}
                  </p>
                </motion.div>

                <FormNewsletter
                  input={(props) => (
                    <motion.input
                      autoCapitalize="off"
                      autoComplete="email"
                      placeholder={t('newsletter.emailPlaceholder')}
                      className="flex w-full rounded-full transition-[background-color,box-shadow] backdrop-blur-sm duration-200 ease-out bg-primary/20 shadow-sm ring-1 ring-transparent focus-visible:bg-primary/20 focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-black/10 disabled:cursor-not-allowed disabled:opacity-50 text-sm md:text-base text-white border-2 border-white/50 h-12 md:h-11 placeholder:text-white/80 focus:outline-none px-4"
                      initial={isInitialRender.current ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: DURATION,
                          ease: EASE_OUT_OPACITY,
                        },
                      }}
                      transition={{
                        duration: DURATION,
                        ease: EASE_OUT,
                        delay: DELAY,
                      }}
                      {...(props as any)}
                    />
                  )}
                  submit={(props) => {
                    const { isSuccess, ...buttonProps } = props as any;
                    return (
                      <motion.button
                        className={cn(
                          buttonVariants({
                            variant: "iconButton",
                            size: "icon-xl",
                          }),
                          "h-10 w-10 md:h-9 md:w-9 transition-colors duration-300",
                          isSuccess && "bg-green-500 hover:bg-green-600"
                        )}
                        {...buttonProps}
                        initial={isInitialRender.current ? false : { opacity: 0 }}
                        animate={{
                          opacity: 1,
                          scale: isSuccess ? [1, 1.1, 1] : 1
                        }}
                        exit={{
                          opacity: 0,
                          transition: {
                            duration: DURATION,
                            ease: EASE_OUT_OPACITY,
                          },
                        }}
                        transition={{
                          duration: DURATION,
                          ease: EASE_OUT,
                          delay: DELAY,
                          scale: { duration: 0.3 }
                        }}
                      >
                        <AnimatePresenceWrapper mode="wait">
                          {isSuccess ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              transition={{ duration: 0.3, ease: EASE_OUT }}
                            >
                              <CheckIcon className="w-4 h-4 text-white" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="arrow"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              transition={{ duration: 0.3, ease: EASE_OUT }}
                            >
                              <ArrowRightIcon className="w-4 h-4 text-current" />
                            </motion.div>
                          )}
                        </AnimatePresenceWrapper>
                      </motion.button>
                    );
                  }}
                />
              </div>
            </motion.div>
          )}

          <motion.div
            layout="position"
            transition={SPRING}
            key="buttons"
            className={isOpen ? "my-4" : "mt-4"}
          >
            <div className="flex flex-col md:flex-row gap-3 items-center px-4 md:px-0">
              <Button
                className={cn("relative px-6 md:px-8 w-full md:w-auto text-sm md:text-base")}
                onClick={() => setIsOpen(!isOpen)}
                shine={!isOpen}
              >
                <motion.span
                  animate={{ x: isOpen ? -16 : 0 }}
                  transition={{ duration: DURATION, ease: EASE_OUT }}
                  className="inline-block"
                >
                  {t('newsletter.manifesto')}
                </motion.span>

                {isOpen && (
                  <motion.div
                    className={cn(
                      buttonVariants({ variant: "iconButton", size: "icon" }),
                      "absolute -top-px -right-px aspect-square"
                    )}
                    initial={{ opacity: 0, scale: 0.8, rotate: -40 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      duration: DURATION,
                      ease: EASE_OUT,
                      delay: DELAY,
                    }}
                  >
                    <Cross1Icon className="size-5 text-primary-foreground" />
                  </motion.div>
                )}
              </Button>
              
              <Link href="/learn-more" className="w-full md:w-auto">
                <Button
                  variant="outline"
                  className="px-6 md:px-8 w-full md:w-auto text-sm md:text-base bg-background/20 border-border/50 hover:bg-background/10 hover:border-border/30 text-foreground hover:text-foreground/80 transition-colors"
                  shine={!isOpen}
                >
                  {t('newsletter.learnMore')}
                </Button>
              </Link>
              
              <Link href="/do-more-with-less" className="w-full md:w-auto">
                <Button
                  variant="outline"
                  className="px-6 md:px-8 w-full md:w-auto text-sm md:text-base bg-background/20 border-border/50 hover:bg-background/10 hover:border-border/30 text-foreground hover:text-foreground/80 transition-colors"
                  shine={!isOpen}
                >
                  {t('newsletter.calculateROI')}
                </Button>
              </Link>
            </div>
          </motion.div>

          {isOpen && (
            <motion.div
              key="manifesto"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: DELAY,
                    duration: DURATION,
                    ease: EASE_OUT,
                  },
                },
                hidden: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
                exit: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                },
              }}
              className="relative flex min-h-0 flex-shrink overflow-hidden text-sm md:text-base max-h-[calc(70dvh-var(--footer-safe-area))] flex-col gap-8 text-center backdrop-blur-xl text-balance border-2 border-border/50 bg-primary/20 max-w-3xl text-foreground rounded-2xl md:rounded-3xl ring-1 ring-offset-primary/10 ring-border/10 ring-offset-2 shadow-button z-20 mx-4 md:mx-0"
            >
              <article className="relative overflow-y-auto italic p-4 md:p-6 h-full [&_p]:my-4">
                <div className="whitespace-pre-line">
                  {t('manifesto.preview')}
                </div>
                <div className="mt-6 pt-4 border-t border-border/20">
                  <Link 
                    href="/manifesto"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium not-italic"
                  >
                    {t('manifesto.readMore')}
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            </motion.div>
          )}
        </AnimatePresenceWrapper>
      </div>
    </div>
  );
};