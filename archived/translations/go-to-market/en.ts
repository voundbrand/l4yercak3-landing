export const doMoreWithLessEn = {
  // Meta information
  title: "Ship Faster Calculator",
  subtitle: "See how much time and money you save by starting with infrastructure already built",

  // Form sections
  form: {
    title: "Calculate Your Time-to-Market Advantage",
    subtitle: "Tell us about your project to see your potential savings",

    sections: {
      teamSetup: "Your Team",
      projectScope: "Project Scope",
      currentApproach: "If You Build It Yourself"
    },

    fields: {
      teamSize: {
        label: "Team Size",
        helpText: "How many developers working on this project?",
        options: {
          solo: "Solo Founder",
          small: "2-3 Person Team",
          medium: "4-6 Person Team",
          large: "7+ Person Team"
        }
      },
      technicalLevel: {
        label: "Technical Experience",
        helpText: "Your team's experience with full-stack development",
        options: {
          junior: "Junior (< 2 years)",
          mid: "Mid-level (2-5 years)",
          senior: "Senior (5+ years)",
          expert: "Expert / Architect"
        }
      },
      developerRate: {
        label: "Developer Hourly Rate (€)",
        helpText: "Average cost per developer hour (salary + overhead)"
      },
      monthlyBurn: {
        label: "Monthly Burn Rate (€)",
        helpText: "Total monthly expenses while building"
      },
      productComplexity: {
        label: "Product Complexity",
        helpText: "How complex is your core product (excluding infrastructure)?",
        options: {
          simple: "Simple MVP (1-2 core features)",
          moderate: "Moderate (3-5 core features)",
          complex: "Complex (6+ features, integrations)",
          enterprise: "Enterprise (multi-tenant, compliance)"
        }
      },
      needsAuth: {
        label: "Authentication",
        helpText: "User login, OAuth, magic links, 2FA"
      },
      needsPayments: {
        label: "Payments",
        helpText: "Stripe, subscriptions, invoicing"
      },
      needsEmail: {
        label: "Email System",
        helpText: "Transactional, marketing, templates"
      },
      needsDatabase: {
        label: "Database & API",
        helpText: "Schema design, real-time sync, backups"
      },
      needsAdmin: {
        label: "Admin Dashboard",
        helpText: "User management, analytics, monitoring"
      },
      needsAI: {
        label: "AI Integration",
        helpText: "LLM APIs, embeddings, AI features"
      },
      needsFileStorage: {
        label: "File Storage",
        helpText: "Uploads, CDN, file management"
      }
    }
  },

  // Results sections
  results: {
    timeComparison: {
      title: "TIME TO MARKET",
      withoutUs: "Building Everything Yourself",
      withUs: "With Build Sprint",
      weeks: "weeks",
      saved: "WEEKS SAVED",
      breakdown: "Infrastructure Breakdown"
    },

    infrastructureCosts: {
      title: "INFRASTRUCTURE COST",
      selfBuild: {
        title: "If You Build It",
        subtitle: "Developer time to build infrastructure from scratch"
      },
      withUs: {
        title: "With Build Sprint",
        subtitle: "Platform access + expert guidance included"
      },
      saved: "COST AVOIDED"
    },

    opportunityCost: {
      title: "OPPORTUNITY COST",
      subtitle: "What delayed launch really costs you",
      description: "Every week you spend on infrastructure is a week your competitors are:",
      activities: [
        "Talking to customers",
        "Iterating on product",
        "Generating revenue",
        "Building market share"
      ],
      burnRate: "Burn rate during extended development",
      lostRevenue: "Potential revenue during delay",
      competitorAdvantage: "Competitor head start"
    },

    totalValue: {
      title: "YOUR TOTAL SAVINGS",
      timeSaved: "Time Saved",
      costAvoided: "Development Cost Avoided",
      burnSaved: "Burn Rate Saved",
      totalValue: "TOTAL VALUE",
      perWeek: "/week",
      description: "This is value you capture by shipping faster with Build Sprint"
    },

    infrastructureBreakdown: {
      title: "What You Skip Building",

      auth: {
        label: "Authentication",
        selfBuildWeeks: "2-4 weeks",
        description: "Email/password, OAuth, magic links, 2FA, session management, password reset",
        whatYouGet: [
          "Production-ready auth system",
          "OAuth providers pre-configured",
          "2FA and magic links ready",
          "Session management handled"
        ]
      },

      payments: {
        label: "Payments & Billing",
        selfBuildWeeks: "2-3 weeks",
        description: "Stripe integration, subscriptions, invoicing, webhooks, tax handling",
        whatYouGet: [
          "Stripe fully integrated",
          "Subscription logic built",
          "Invoicing automated",
          "Webhook handlers ready"
        ]
      },

      email: {
        label: "Email System",
        selfBuildWeeks: "1-2 weeks",
        description: "Transactional emails, templates, deliverability, marketing campaigns",
        whatYouGet: [
          "Email provider configured",
          "Templates ready to customize",
          "Deliverability optimized",
          "Triggered emails built"
        ]
      },

      database: {
        label: "Database & API",
        selfBuildWeeks: "3-4 weeks",
        description: "Schema design, migrations, API routes, real-time sync, backups",
        whatYouGet: [
          "Convex real-time database",
          "Type-safe API layer",
          "Automatic backups",
          "Real-time sync built-in"
        ]
      },

      admin: {
        label: "Admin Dashboard",
        selfBuildWeeks: "2-3 weeks",
        description: "User management, analytics, monitoring, content management",
        whatYouGet: [
          "User management UI",
          "Analytics dashboard",
          "Monitoring tools",
          "Admin controls ready"
        ]
      },

      ai: {
        label: "AI Integration",
        selfBuildWeeks: "1-2 weeks",
        description: "LLM provider setup, prompt management, EU-compliant hosting",
        whatYouGet: [
          "EU-hosted LLMs ready",
          "API integration complete",
          "Prompt patterns established",
          "GDPR compliant by default"
        ]
      },

      fileStorage: {
        label: "File Storage",
        selfBuildWeeks: "1 week",
        description: "Upload handling, CDN delivery, file management, security",
        whatYouGet: [
          "Secure upload system",
          "CDN delivery configured",
          "File management UI",
          "Access control built-in"
        ]
      }
    }
  },

  // Lead capture
  leadCapture: {
    primaryCta: "Apply for Build Sprint",
    secondaryCta: "Book a Strategy Call",

    form: {
      title: "Ready to Ship Faster?",
      subtitle: "Apply for Build Sprint and get:",
      benefits: [
        "Custom project assessment",
        "Technical architecture review",
        "Timeline and milestone planning",
        "Platform access discussion"
      ],
      noCommitment: "15-minute intro call. No commitment required.",

      fields: {
        fullName: "Full Name",
        email: "Email",
        projectDescription: "What are you building?",
        projectDescriptionPlaceholder: "Describe your product idea in 2-3 sentences...",
        timeline: "When do you want to launch?",
        timelineOptions: {
          asap: "ASAP - within 4 weeks",
          soon: "Soon - within 8 weeks",
          quarter: "This quarter",
          exploring: "Just exploring"
        }
      },

      buttons: {
        submit: "Apply for Build Sprint",
        submitting: "Submitting...",
        cancel: "Cancel",
        close: "Close"
      },

      privacy: "We respect your privacy. No spam, ever."
    },

    success: {
      title: "Application Received!",
      message: "We'll review your application and get back to you within 48 hours.",
      nextSteps: "Check your email for confirmation and next steps."
    }
  },

  // Navigation and meta
  navigation: {
    backToHome: "Back to Home",
    title: "Ship Faster Calculator"
  },

  // Call to action
  cta: {
    title: "Ready to Skip the Boring Parts?",
    description: "Stop building infrastructure. Start building your product.",
    buttons: {
      apply: "Apply for Build Sprint",
      scheduleDemo: "Book a Strategy Call",
      learnMore: "Learn More About Build Sprint"
    }
  }
};
