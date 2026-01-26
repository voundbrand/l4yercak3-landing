import { manifestoEn } from './manifesto';
import { learnMoreEn } from './learn-more';
import { doMoreWithLessEn } from './go-to-market';
import { buildSprintEn } from './build-sprint';
import { founderCalculatorEn } from './founder-calculator';
import { legalEn } from './legal';
import { docsEn } from './docs';
import { landingEn } from './landing';

export const en = {
  common: {
    backToHome: "Back to Home",
    readMore: "Read the full manifesto",
    darkMode: "Dark mode",
    sepiaMode: "Sepia mode",
    getEarlyAccess: "Get Early Access",
    english: "English",
    german: "German",
    bookCall: "Book a Call",
    bookCallTitle: "Book a Call",
    letsConnect: "Let's Connect",
    goToApp: "Go to App",
    availableTimes: "Available Times",
    selectDate: "Select a date to see available times",
    bookCallButton: "Book Call",
    selectDateTime: "Select a date and time to continue",
  },
  navigation: {
    home: "Home",
    manifesto: "Manifesto",
    learnMore: "Ship Fast",
    valueCalculator: "Go to Market",
    buildSprint: "Build Sprint",
    toggleMenu: "Toggle menu",
    closeMenu: "Close menu",
    switchToEnglish: "Switch to English",
    switchToGerman: "Switch to German"
  },
  newsletter: {
    title: "l4yercak3",
    subtitle: "Your Backend. Already Built. Ship This Quarter.",
    urgency: "🔥 3 Build Sprint Spots for {quarter} {year} — Apply Now",
    description: "Stop rebuilding auth, database, email, and payments for every project. We built the infrastructure. You build what makes your product unique.",
    helperText: "Get updates on l4yercak3 — new features, builder resources, launch stories",
    emailPlaceholder: "Enter your email",
    manifesto: "Manifesto",
    learnMore: "Ship Fast",
    calculateROI: "Go to Market",
    subscriptionTypes: {
      newsletter: "Get Updates",
      privateAccess: "Apply for Access",
      both: "Both"
    },
    subscriptionDescriptions: {
      newsletter: "Get updates, stay informed about L4YERCAK3",
      privateAccess: "Apply for Private Beta Access – Limited spots, first-come first-served",
      both: "Get updates AND apply for Private Beta Access"
    },
    successMessages: {
      newsletter: "You're subscribed to our newsletter. Stay tuned for updates!",
      privateAccess: "You're on the private access list. We'll notify you when it's ready!",
      both: "You're all set! Newsletter + private access. Check your email!",
      updated: "Updated! "
    }
  },
  application: {
    title: "Apply for Build Sprint",
    subtitle: "Reserve your spot for {quarter} {year}",
    fields: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      company: "Company / Project Name",
      role: "Your Role",
      fundingStage: "Funding Stage",
      techTeamSize: "Technical Team Size",
      primaryGoal: "Primary Goal",
      timelineUrgency: "Timeline",
      currentStack: "Current Tech Stack (optional)",
      whatYouWantToBuild: "What do you want to build?"
    },
    placeholders: {
      firstName: "Enter your first name",
      lastName: "Enter your last name",
      email: "Enter your email address",
      phone: "Enter your phone number",
      company: "Your startup or project name",
      role: "e.g., Founder, CTO, Technical Co-founder",
      currentStack: "e.g., React, Node.js, PostgreSQL, or 'Starting fresh'",
      whatYouWantToBuild: "Describe your product idea, the problem you're solving, and what you need to launch..."
    },
    options: {
      fundingStage: {
        placeholder: "Select funding stage",
        "bootstrapped": "Bootstrapped / Self-funded",
        "pre-seed": "Pre-seed",
        "seed": "Seed",
        "series-a": "Series A",
        "series-b+": "Series B+"
      },
      techTeamSize: {
        placeholder: "Select team size",
        "solo": "Solo founder (no devs yet)",
        "1-2": "1-2 developers",
        "3-5": "3-5 developers",
        "6-10": "6-10 developers",
        "10+": "10+ developers"
      },
      primaryGoal: {
        placeholder: "Select your primary goal",
        "mvp": "Build MVP from scratch",
        "v1-launch": "Ship v1.0 to production",
        "scale": "Scale existing product",
        "pivot": "Pivot / New direction",
        "rebuild": "Rebuild legacy system"
      },
      timelineUrgency: {
        placeholder: "Select timeline",
        "asap": "ASAP - Need to ship yesterday",
        "1-2-months": "1-2 months",
        "this-quarter": "This quarter",
        "next-quarter": "Next quarter",
        "exploring": "Just exploring options"
      }
    },
    buttons: {
      cancel: "Cancel",
      submit: "Submit Application",
      submitting: "Submitting...",
      close: "Close"
    },
    success: {
      title: "Application received!",
      message: "Remington Splettstoesser, founder of L4YERCAK3, will review your application and reach out within 24 hours.",
      scheduleMessage: "Want to skip the wait? Book a call directly:",
      scheduleButton: "Book a Call"
    }
  },
  manifesto: manifestoEn,
  learnMore: learnMoreEn,
  doMoreWithLess: doMoreWithLessEn,
  buildSprint: buildSprintEn,
  founderCalculator: founderCalculatorEn,
  legal: legalEn,
  docs: docsEn,
  landing: landingEn,
  footer: {
    copyright: "© 2024 l4yercak3. All rights reserved.",
    vcBatch: "L4YERCAK3 is a vc83-batch-1 startup"
  }
};