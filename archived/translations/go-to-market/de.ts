export const doMoreWithLessDe = {
  // Meta information
  title: "Schneller Shippen Rechner",
  subtitle: "Sieh, wie viel Zeit und Geld du sparst, wenn die Infrastruktur schon gebaut ist",

  // Form sections
  form: {
    title: "Berechne deinen Time-to-Market Vorteil",
    subtitle: "Erzähl uns von deinem Projekt, um deine Ersparnis zu sehen",

    sections: {
      teamSetup: "Dein Team",
      projectScope: "Projektumfang",
      currentApproach: "Wenn du es selbst baust"
    },

    fields: {
      teamSize: {
        label: "Teamgröße",
        helpText: "Wie viele Entwickler arbeiten an diesem Projekt?",
        options: {
          solo: "Solo-Gründer",
          small: "2-3 Personen Team",
          medium: "4-6 Personen Team",
          large: "7+ Personen Team"
        }
      },
      technicalLevel: {
        label: "Technische Erfahrung",
        helpText: "Erfahrung deines Teams mit Full-Stack-Entwicklung",
        options: {
          junior: "Junior (< 2 Jahre)",
          mid: "Mid-Level (2-5 Jahre)",
          senior: "Senior (5+ Jahre)",
          expert: "Expert / Architekt"
        }
      },
      developerRate: {
        label: "Entwickler-Stundensatz (€)",
        helpText: "Durchschnittliche Kosten pro Entwicklerstunde (Gehalt + Overhead)"
      },
      monthlyBurn: {
        label: "Monatliche Burn Rate (€)",
        helpText: "Gesamte monatliche Ausgaben während der Entwicklung"
      },
      productComplexity: {
        label: "Produktkomplexität",
        helpText: "Wie komplex ist dein Kernprodukt (ohne Infrastruktur)?",
        options: {
          simple: "Einfaches MVP (1-2 Kernfeatures)",
          moderate: "Moderat (3-5 Kernfeatures)",
          complex: "Komplex (6+ Features, Integrationen)",
          enterprise: "Enterprise (Multi-Tenant, Compliance)"
        }
      },
      needsAuth: {
        label: "Authentifizierung",
        helpText: "User-Login, OAuth, Magic Links, 2FA"
      },
      needsPayments: {
        label: "Payments",
        helpText: "Stripe, Abonnements, Rechnungen"
      },
      needsEmail: {
        label: "E-Mail-System",
        helpText: "Transaktional, Marketing, Templates"
      },
      needsDatabase: {
        label: "Datenbank & API",
        helpText: "Schema-Design, Echtzeit-Sync, Backups"
      },
      needsAdmin: {
        label: "Admin-Dashboard",
        helpText: "Nutzerverwaltung, Analytics, Monitoring"
      },
      needsAI: {
        label: "KI-Integration",
        helpText: "LLM APIs, Embeddings, KI-Features"
      },
      needsFileStorage: {
        label: "Dateispeicher",
        helpText: "Uploads, CDN, Dateiverwaltung"
      }
    }
  },

  // Results sections
  results: {
    timeComparison: {
      title: "TIME TO MARKET",
      withoutUs: "Alles selbst bauen",
      withUs: "Mit Build Sprint",
      weeks: "Wochen",
      saved: "WOCHEN GESPART",
      breakdown: "Infrastruktur-Aufschlüsselung"
    },

    infrastructureCosts: {
      title: "INFRASTRUKTUR-KOSTEN",
      selfBuild: {
        title: "Wenn du es selbst baust",
        subtitle: "Entwicklerzeit für Infrastruktur von Grund auf"
      },
      withUs: {
        title: "Mit Build Sprint",
        subtitle: "Plattformzugang + Experten-Guidance inklusive"
      },
      saved: "KOSTEN VERMIEDEN"
    },

    opportunityCost: {
      title: "OPPORTUNITÄTSKOSTEN",
      subtitle: "Was ein verzögerter Launch wirklich kostet",
      description: "Jede Woche, die du mit Infrastruktur verbringst, ist eine Woche, in der deine Konkurrenten:",
      activities: [
        "Mit Kunden sprechen",
        "Am Produkt iterieren",
        "Umsatz generieren",
        "Marktanteile aufbauen"
      ],
      burnRate: "Burn Rate während verlängerter Entwicklung",
      lostRevenue: "Potenzieller Umsatz während Verzögerung",
      competitorAdvantage: "Vorsprung der Konkurrenz"
    },

    totalValue: {
      title: "DEINE GESAMTE ERSPARNIS",
      timeSaved: "Zeit gespart",
      costAvoided: "Entwicklungskosten vermieden",
      burnSaved: "Burn Rate gespart",
      totalValue: "GESAMTWERT",
      perWeek: "/Woche",
      description: "Das ist der Wert, den du durch schnelleres Shippen mit Build Sprint gewinnst"
    },

    infrastructureBreakdown: {
      title: "Was du nicht bauen musst",

      auth: {
        label: "Authentifizierung",
        selfBuildWeeks: "2-4 Wochen",
        description: "E-Mail/Passwort, OAuth, Magic Links, 2FA, Session-Management, Passwort-Reset",
        whatYouGet: [
          "Produktionsreifes Auth-System",
          "OAuth-Provider vorkonfiguriert",
          "2FA und Magic Links bereit",
          "Session-Management erledigt"
        ]
      },

      payments: {
        label: "Payments & Billing",
        selfBuildWeeks: "2-3 Wochen",
        description: "Stripe-Integration, Abonnements, Rechnungen, Webhooks, Steuerhandling",
        whatYouGet: [
          "Stripe vollständig integriert",
          "Abo-Logik gebaut",
          "Rechnungen automatisiert",
          "Webhook-Handler bereit"
        ]
      },

      email: {
        label: "E-Mail-System",
        selfBuildWeeks: "1-2 Wochen",
        description: "Transaktionale E-Mails, Templates, Zustellbarkeit, Marketing-Kampagnen",
        whatYouGet: [
          "E-Mail-Provider konfiguriert",
          "Templates anpassungsbereit",
          "Zustellbarkeit optimiert",
          "Getriggerte E-Mails gebaut"
        ]
      },

      database: {
        label: "Datenbank & API",
        selfBuildWeeks: "3-4 Wochen",
        description: "Schema-Design, Migrationen, API-Routes, Echtzeit-Sync, Backups",
        whatYouGet: [
          "Convex Echtzeit-Datenbank",
          "Typsichere API-Schicht",
          "Automatische Backups",
          "Echtzeit-Sync eingebaut"
        ]
      },

      admin: {
        label: "Admin-Dashboard",
        selfBuildWeeks: "2-3 Wochen",
        description: "Nutzerverwaltung, Analytics, Monitoring, Content-Management",
        whatYouGet: [
          "Nutzerverwaltungs-UI",
          "Analytics-Dashboard",
          "Monitoring-Tools",
          "Admin-Controls bereit"
        ]
      },

      ai: {
        label: "KI-Integration",
        selfBuildWeeks: "1-2 Wochen",
        description: "LLM-Provider-Setup, Prompt-Management, EU-konformes Hosting",
        whatYouGet: [
          "EU-gehostete LLMs bereit",
          "API-Integration komplett",
          "Prompt-Patterns etabliert",
          "DSGVO-konform by default"
        ]
      },

      fileStorage: {
        label: "Dateispeicher",
        selfBuildWeeks: "1 Woche",
        description: "Upload-Handling, CDN-Auslieferung, Dateiverwaltung, Sicherheit",
        whatYouGet: [
          "Sicheres Upload-System",
          "CDN-Auslieferung konfiguriert",
          "Dateiverwaltungs-UI",
          "Zugriffskontrolle eingebaut"
        ]
      }
    }
  },

  // Lead capture
  leadCapture: {
    primaryCta: "Für Build Sprint bewerben",
    secondaryCta: "Strategie-Gespräch buchen",

    form: {
      title: "Bereit, schneller zu shippen?",
      subtitle: "Bewirb dich für Build Sprint und erhalte:",
      benefits: [
        "Individuelle Projektbewertung",
        "Technisches Architektur-Review",
        "Timeline- und Meilenstein-Planung",
        "Plattformzugang-Besprechung"
      ],
      noCommitment: "15-Minuten Intro-Call. Keine Verpflichtung.",

      fields: {
        fullName: "Vollständiger Name",
        email: "E-Mail",
        projectDescription: "Was baust du?",
        projectDescriptionPlaceholder: "Beschreibe deine Produktidee in 2-3 Sätzen...",
        timeline: "Wann willst du launchen?",
        timelineOptions: {
          asap: "ASAP - innerhalb von 4 Wochen",
          soon: "Bald - innerhalb von 8 Wochen",
          quarter: "Dieses Quartal",
          exploring: "Nur am Erkunden"
        }
      },

      buttons: {
        submit: "Für Build Sprint bewerben",
        submitting: "Wird gesendet...",
        cancel: "Abbrechen",
        close: "Schließen"
      },

      privacy: "Wir respektieren deine Privatsphäre. Kein Spam, niemals."
    },

    success: {
      title: "Bewerbung eingegangen!",
      message: "Wir prüfen deine Bewerbung und melden uns innerhalb von 48 Stunden.",
      nextSteps: "Schau in deine E-Mails für Bestätigung und nächste Schritte."
    }
  },

  // Navigation and meta
  navigation: {
    backToHome: "Zurück zur Startseite",
    title: "Schneller Shippen Rechner"
  },

  // Call to action
  cta: {
    title: "Bereit, die langweiligen Teile zu überspringen?",
    description: "Hör auf, Infrastruktur zu bauen. Fang an, dein Produkt zu bauen.",
    buttons: {
      apply: "Für Build Sprint bewerben",
      scheduleDemo: "Strategie-Gespräch buchen",
      learnMore: "Mehr über Build Sprint erfahren"
    }
  }
};
