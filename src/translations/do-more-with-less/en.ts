export const doMoreWithLessEn = {
  // Meta information
  title: "Value Calculator",
  subtitle: "Discover how much value L4YERCAK3 can unlock for your professional network",
  
  // Form sections
  form: {
    title: "Calculate Your Value Opportunity",
    subtitle: "Tell us about your organization to see your potential savings and growth",
    
    sections: {
      organizationOverview: "Organization Overview",
      administrativeStaff: "Administrative Staff",
      executiveStaff: "Executive Staff",
      additionalInformation: "Additional Information"
    },
    
    fields: {
      organizationSize: {
        label: "Total Employees",
        helpText: "Total staff count across all departments"
      },
      adminStaffCount: {
        label: "Admin Staff Count", 
        helpText: "Staff handling events, member communications, compliance, data entry"
      },
      manualHoursPerWeek: {
        label: "Hours per week spent on repetitive tasks (per admin)",
        helpText: "Time on: event registration, data entry, emails, spreadsheets, reporting"
      },
      loadedLaborCost: {
        label: "Loaded labor cost per hour (€)",
        helpText: "Salary + benefits + taxes. Typically €25-35 for admin, €40-80 for management"
      },
      annualEvents: {
        label: "Annual Events",
        helpText: "Conferences, workshops, webinars, member meetings"
      },
      avgMemberValue: {
        label: "Member Value/Year (€)",
        helpText: "Member dues + event fees + sponsorships per member per year"
      },
      adminHoursPerWeek: {
        label: "Manual Hours/Week",
        helpText: "Hours per admin per week on repetitive tasks"
      },
      adminLaborCost: {
        label: "Labor Cost/Hour (€)",
        helpText: "Salary + benefits + taxes for administrative staff"
      },
      executiveStaffCount: {
        label: "Staff Count",
        helpText: "CEOs, directors, managers doing administrative work"
      },
      executiveHoursPerWeek: {
        label: "Manual Hours/Week",
        helpText: "Hours per executive per week on tasks that could be automated"
      },
      executiveLaborCost: {
        label: "Labor Cost/Hour (€)",
        helpText: "Salary + benefits + taxes for executives (typically €60-150/hour)"
      },
      currentRevenue: {
        label: "Annual Revenue (€) - Optional",
        helpText: "Helps us understand your growth context"
      },
      industryType: {
        label: "Industry Type",
        helpText: "Helps us customize your value report",
        options: {
          medical: "Medical / Healthcare",
          legal: "Legal / Law", 
          tax: "Tax Advisory / Accounting",
          engineering: "Engineering / Technical",
          other: "Other Professional Network"
        }
      }
    }
  },

  // Results sections
  results: {
    currentWaste: {
      title: "YOUR HIDDEN COST",
      subtitle: "wasted annually on manual work",
      description: "hours of human potential trapped in:",
      tasks: [
        "Event registration and coordination",
        "Data entry and spreadsheet management", 
        "Repetitive member communications",
        "Manual compliance reporting",
        "Invoice creation and payment tracking"
      ]
    },

    freedCapacity: {
      title: "STRATEGIC CAPACITY UNLOCKED",
      subtitle: "hours per year freed for growth activities",
      description: "That's {weeklyHours} hours per week your team could spend on:",
      activities: [
        "Member recruitment and retention",
        "Strategic partnerships",
        "New program development", 
        "Revenue-generating activities",
        "Board-level strategic planning"
      ],
      instead: "Instead of: copying data, sending emails, creating spreadsheets"
    },

    growthRevenue: {
      title: "NEW REVENUE OPPORTUNITIES",
      subtitle: "With freed capacity, your team could generate:",
      
      memberGrowth: {
        title: "Member Growth:",
        newMembers: "{count} new members acquired",
        revenue: "€{amount} in new member revenue"
      },
      
      programExpansion: {
        title: "Program Expansion:",
        programs: "2-3 new premium programs",
        revenue: "€{amount} in program revenue"
      },
      
      partnerships: {
        title: "Partnership Development:",
        sponsors: "2 corporate sponsorships",
        revenue: "€{amount} in partnership revenue"
      },
      
      retention: {
        title: "Member Retention:",
        improvement: "5% churn reduction",
        revenue: "€{amount} retained revenue"
      },
      
      total: "Conservative Total: €{amount} in new annual revenue"
    },

    totalValue: {
      title: "YOUR TOTAL VALUE OPPORTUNITY",
      laborCostAvoided: "Labor Cost Avoided: €{amount}/year",
      newRevenuePotential: "New Revenue Potential: €{amount}/year",
      totalAvailable: "TOTAL VALUE AVAILABLE: €{amount}/year",
      description: "This value is currently locked away in manual processes."
    },

    taskBreakdown: {
      title: "Where Your Time Is Going",
      
      eventCoordination: {
        label: "Event Coordination",
        description: "Registration tracking, confirmations, calendar coordination, check-in, follow-up",
        automationPotential: "90%",
        whatGetsAutomated: [
          "Automated registration forms (no Excel)",
          "Triggered email confirmations", 
          "QR code attendance tracking",
          "Auto-generated event pages"
        ]
      },
      
      memberCommunication: {
        label: "Member Communication",
        description: "Answering questions, newsletters, website updates, social media",
        automationPotential: "85%",
        whatGetsAutomated: [
          "AI-powered member support (24/7)",
          "Auto-generated newsletters",
          "Scheduled social media posts",
          "Instant event information"
        ]
      },
      
      complianceReporting: {
        label: "Compliance & Reporting", 
        description: "CME tracking, certificates, regulatory reports, board materials",
        automationPotential: "95%",
        whatGetsAutomated: [
          "Auto-generated CME certificates",
          "Compliance tracking dashboards",
          "One-click regulatory reports", 
          "Automated board presentations"
        ]
      },
      
      financialAdmin: {
        label: "Financial Administration",
        description: "Invoicing, payment tracking, reconciliation, expense processing",
        automationPotential: "90%",
        whatGetsAutomated: [
          "Automated invoice generation",
          "Integrated payment processing",
          "Real-time financial dashboards",
          "Automated payment reminders"
        ]
      },
      
      dataManagement: {
        label: "Data Entry & Management",
        description: "Database updates, copying between systems, file organization", 
        automationPotential: "95%",
        whatGetsAutomated: [
          "Single source of truth (no spreadsheets)",
          "Real-time data synchronization",
          "Automated backups and organization",
          "AI-powered data validation"
        ]
      }
    }
  },

  // Lead capture
  leadCapture: {
    primaryCta: "Get Your Custom Value Report",
    secondaryCta: "Schedule a Value Assessment Call",
    
    form: {
      title: "Get Your Custom Value Report",
      subtitle: "We'll send you a detailed PDF showing:",
      benefits: [
        "Your specific value breakdown by department",
        "Pilot success metrics tailored to your network", 
        "Implementation roadmap for your organization",
        "Industry benchmarks for networks like yours"
      ],
      noCommitment: "No commitment required. Just insights.",
      
      fields: {
        fullName: "Full Name",
        email: "Work Email",
        phone: "Phone Number",
        organizationName: "Organization Name",
        jobTitle: "Your Role",
        signatureAuthority: "Signature Authority (€)",
        signatureAuthorityHelp: "What amount can you approve without additional sign-offs?",
        timeline: "When are you looking to implement?",
        timelineOptions: {
          within1Month: "Within 1 month",
          within3Months: "Within 3 months",
          within6Months: "Within 6 months",
          within1Year: "Within 1 year",
          justExploring: "Just exploring options"
        }
      },
      
      buttons: {
        submit: "Get My Custom Value Report",
        generating: "Generating Report...",
        cancel: "Cancel",
        close: "Close"
      },
      
      privacy: "Your information is handled securely and will not be shared with third parties.",
      errorTitle: "Error generating your report",
      retryButton: "Try again",
      attemptCount: "Attempt {{count}}"
    },
    
    success: {
      title: "Your Value Report Has Been Created!",
      message: "We've sent your custom value report to your email address.",
      emailSent: "Check your inbox (and spam folder) for your detailed report."
    }
  },

  // Navigation and meta
  navigation: {
    backToHome: "Back to Home",
    title: "Value Calculator"
  },

  // Call to action
  cta: {
    title: "Ready to Unlock Your Value?",
    description: "See how L4YERCAK3 can transform your professional network from chaos to compound growth.",
    buttons: {
      getStarted: "Get Started",
      scheduleDemo: "Schedule Demo",
      learnMore: "Learn More"
    }
  }
};