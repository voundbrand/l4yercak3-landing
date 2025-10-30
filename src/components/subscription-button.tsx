"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import type { SubscriptionType } from "@/lib/schema";

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 3L13.5 8L8.5 13M13 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface SubscriptionOption {
  type: SubscriptionType;
  label: string;
  description: string;
  icon: string;
}

const subscriptionOptions: SubscriptionOption[] = [
  {
    type: "newsletter",
    label: "Newsletter",
    description: "Updates & insights",
    icon: "📧",
  },
  {
    type: "private-access",
    label: "Private Access",
    description: "Exclusive early access",
    icon: "🔑",
  },
  {
    type: "both",
    label: "Both",
    description: "Everything included",
    icon: "✨",
  },
];

interface SubscriptionButtonProps {
  onSubmit: (type: SubscriptionType) => void;
  isSubmitting: boolean;
  disabled?: boolean;
}

export function SubscriptionButton({ onSubmit, isSubmitting, disabled }: SubscriptionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedType, setSelectedType] = useState<SubscriptionType>("both");

  const handleOptionSelect = (type: SubscriptionType) => {
    setSelectedType(type);
    setIsExpanded(false);
    onSubmit(type);
  };

  const selectedOption = subscriptionOptions.find(opt => opt.type === selectedType);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="button"
              onClick={() => setIsExpanded(true)}
              disabled={disabled || isSubmitting}
              className="h-12 px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
            >
              <span className="mr-2">{selectedOption?.icon}</span>
              <span className="font-medium">Subscribe</span>
              <ArrowRightIcon />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-2 p-3 bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg"
            style={{ willChange: 'transform, opacity' }}
          >
            {subscriptionOptions.map((option, index) => (
              <motion.button
                key={option.type}
                type="button"
                onClick={() => handleOptionSelect(option.type)}
                disabled={isSubmitting}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.2 }}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                  "hover:bg-accent/50 focus:bg-accent/50 focus:outline-none",
                  "text-left w-full min-w-[200px]",
                  selectedType === option.type && "bg-accent/30"
                )}
              >
                <span className="text-lg">{option.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </div>
                {selectedType === option.type && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckIcon />
                  </motion.div>
                )}
              </motion.button>
            ))}
            
            <motion.button
              type="button"
              onClick={() => setIsExpanded(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors p-2"
            >
              Cancel
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}