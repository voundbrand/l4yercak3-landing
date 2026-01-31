export const founderCalculatorEn = {
  // Meta information
  title: "Founder Value Calculator",
  subtitle: "See how Build Sprint impacts your runway, time-to-market, and bottom line",

  // Form sections
  form: {
    title: "Calculate Your Founder Advantage",
    subtitle: "Tell us about your startup to see how Build Sprint changes your trajectory",

    sections: {
      founderSituation: "Your Situation",
      teamHiring: "Team & Hiring",
      productScope: "Product Scope",
      infrastructure: "Infrastructure Needs",
      infrastructureSubtitle: "Select what your product requires:"
    },

    fields: {
      fundingStage: {
        label: "Funding Stage",
        helpText: "Your current funding stage determines recommended Build Sprint tier",
        options: {
          "bootstrapped": "Bootstrapped / Self-funded",
          "pre-seed": "Pre-seed",
          "seed": "Seed",
          "series-a": "Series A",
          "series-b+": "Series B+"
        }
      },
      runwayMonths: {
        label: "Current Runway (months)",
        helpText: "How many months until you need more funding or revenue?"
      },
      monthlyBurn: {
        label: "Monthly Burn Rate (€)",
        helpText: "Total monthly expenses (salaries, tools, operations)"
      },
      hasDevTeam: {
        label: "I have developers on my team",
        helpText: "Uncheck if you're a non-technical founder or solo founder without devs"
      },
      hiringPlan: {
        label: "Hiring Plan",
        helpText: "How many developers would you hire without Build Sprint?",
        options: {
          none: "Not planning to hire",
          one: "Hire 1 developer",
          two: "Hire 2 developers",
          team: "Build a dev team (3-4)"
        }
      },
      developerSalary: {
        label: "Expected Developer Salary (€/year)",
        helpText: "Average annual salary for the developers you'd hire"
      },
      productComplexity: {
        label: "Product Complexity",
        helpText: "What are you building?",
        options: {
          mvp: "Simple MVP (1-2 core features)",
          v1: "Full v1.0 (3-5 core features)",
          scale: "Scale-ready product (6+ features)",
          enterprise: "Enterprise (multi-tenant, compliance)"
        }
      },
      needsAuth: {
        label: "Authentication",
        helpText: "Login, OAuth, 2FA"
      },
      needsPayments: {
        label: "Payments",
        helpText: "Stripe, subscriptions"
      },
      needsEmail: {
        label: "Email System",
        helpText: "Transactional, campaigns"
      },
      needsDatabase: {
        label: "Database & API",
        helpText: "Real-time, backups"
      },
      needsAdmin: {
        label: "Admin Dashboard",
        helpText: "User mgmt, analytics"
      },
      needsAI: {
        label: "AI Integration",
        helpText: "LLMs, embeddings"
      },
      needsFileStorage: {
        label: "File Storage",
        helpText: "Uploads, CDN"
      }
    }
  },

  // Results sections
  results: {
    timeToLaunch: {
      title: "TIME TO LAUNCH",
      diy: "DIY / Hire & Build",
      withBuildSprint: "With Build Sprint",
      saved: "TIME SAVED",
      months: "months",
      weeks: "weeks",
      includesHiring: "includes ~2 months hiring time"
    },

    runwayImpact: {
      title: "RUNWAY IMPACT",
      burnSaved: "Burn Rate Saved",
      runwayExtension: "Effective Runway Extension",
      effectiveRunway: "Effective runway"
    },

    hiringComparison: {
      title: "HIRING vs BUILD SPRINT",
      hiringCost: "Hiring Cost",
      buildSprintCost: "Build Sprint Investment",
      firstYearSavings: "First Year Savings",
      perYear: "per year",
      oneTime: "one-time investment"
    },

    competitorRisk: {
      title: "MARKET TIMING RISK",
      description: "Every month you spend building infrastructure, your competitors are:",
      activities: [
        "Acquiring customers",
        "Learning from users",
        "Iterating on product",
        "Raising their next round"
      ],
      riskLevel: "Your Delay Risk Level",
      levels: {
        low: "LOW RISK",
        medium: "MODERATE RISK",
        high: "HIGH RISK",
        critical: "CRITICAL RISK"
      },
      delayImpact: "{{months}} months delay = {{runway}}% of your runway"
    },

    totalValue: {
      title: "YOUR TOTAL FIRST-YEAR VALUE",
      timeSaved: "Time Saved",
      burnSaved: "Burn Rate Saved",
      hiringAvoided: "Hiring Costs Avoided",
      revenueAdvantage: "Revenue Head Start",
      totalFirstYear: "TOTAL FIRST-YEAR VALUE",
      description: "This is the value you capture by launching faster with Build Sprint instead of building infrastructure yourself"
    },

    infrastructureBreakdown: {
      title: "Infrastructure You Skip Building",
      whatYouGetLabel: "What you get instead:",

      auth: {
        label: "Authentication",
        description: "Email/password, OAuth, magic links, 2FA, session management, password reset flows",
        whatYouGet: [
          "Production-ready auth system",
          "OAuth providers pre-configured",
          "2FA and magic links ready",
          "Session management handled"
        ]
      },

      payments: {
        label: "Payments & Billing",
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

  // Call to action
  cta: {
    primary: "Apply for Build Sprint",
    secondary: "Learn More About Build Sprint",
    noCommitment: "Quick intro call. No commitment required."
  }
};
