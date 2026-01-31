export const founderCalculatorDe = {
  // Meta information
  title: "Founder Value Calculator",
  subtitle: "Sieh, wie Build Sprint deine Runway, Time-to-Market und dein Ergebnis beeinflusst",

  // Form sections
  form: {
    title: "Berechne deinen Gründer-Vorteil",
    subtitle: "Erzähl uns von deinem Startup, um zu sehen wie Build Sprint deine Entwicklung verändert",

    sections: {
      founderSituation: "Deine Situation",
      teamHiring: "Team & Hiring",
      productScope: "Produktumfang",
      infrastructure: "Infrastruktur-Bedarf",
      infrastructureSubtitle: "Wähle aus, was dein Produkt benötigt:"
    },

    fields: {
      fundingStage: {
        label: "Finanzierungsphase",
        helpText: "Deine aktuelle Phase bestimmt das empfohlene Build Sprint Paket",
        options: {
          "bootstrapped": "Bootstrapped / Eigenfinanziert",
          "pre-seed": "Pre-Seed",
          "seed": "Seed",
          "series-a": "Series A",
          "series-b+": "Series B+"
        }
      },
      runwayMonths: {
        label: "Aktuelle Runway (Monate)",
        helpText: "Wie viele Monate bis du mehr Funding oder Umsatz brauchst?"
      },
      monthlyBurn: {
        label: "Monatliche Burn Rate (€)",
        helpText: "Gesamte monatliche Ausgaben (Gehälter, Tools, Operations)"
      },
      hasDevTeam: {
        label: "Ich habe Entwickler in meinem Team",
        helpText: "Deaktivieren wenn du ein nicht-technischer Gründer oder Solo-Gründer ohne Devs bist"
      },
      hiringPlan: {
        label: "Hiring-Plan",
        helpText: "Wie viele Entwickler würdest du ohne Build Sprint einstellen?",
        options: {
          none: "Keine Einstellungen geplant",
          one: "1 Entwickler einstellen",
          two: "2 Entwickler einstellen",
          team: "Dev-Team aufbauen (3-4)"
        }
      },
      developerSalary: {
        label: "Erwartetes Entwickler-Gehalt (€/Jahr)",
        helpText: "Durchschnittliches Jahresgehalt für die Entwickler die du einstellen würdest"
      },
      productComplexity: {
        label: "Produktkomplexität",
        helpText: "Was baust du?",
        options: {
          mvp: "Einfaches MVP (1-2 Kernfeatures)",
          v1: "Volles v1.0 (3-5 Kernfeatures)",
          scale: "Scale-ready Produkt (6+ Features)",
          enterprise: "Enterprise (Multi-Tenant, Compliance)"
        }
      },
      needsAuth: {
        label: "Authentifizierung",
        helpText: "Login, OAuth, 2FA"
      },
      needsPayments: {
        label: "Payments",
        helpText: "Stripe, Abos"
      },
      needsEmail: {
        label: "E-Mail-System",
        helpText: "Transaktional, Kampagnen"
      },
      needsDatabase: {
        label: "Datenbank & API",
        helpText: "Echtzeit, Backups"
      },
      needsAdmin: {
        label: "Admin-Dashboard",
        helpText: "User-Mgmt, Analytics"
      },
      needsAI: {
        label: "KI-Integration",
        helpText: "LLMs, Embeddings"
      },
      needsFileStorage: {
        label: "Dateispeicher",
        helpText: "Uploads, CDN"
      }
    }
  },

  // Results sections
  results: {
    timeToLaunch: {
      title: "TIME TO LAUNCH",
      diy: "DIY / Hiring & Bauen",
      withBuildSprint: "Mit Build Sprint",
      saved: "ZEIT GESPART",
      months: "Monate",
      weeks: "Wochen",
      includesHiring: "inkl. ~2 Monate Hiring-Zeit"
    },

    runwayImpact: {
      title: "RUNWAY-AUSWIRKUNG",
      burnSaved: "Burn Rate gespart",
      runwayExtension: "Effektive Runway-Verlängerung",
      effectiveRunway: "Effektive Runway"
    },

    hiringComparison: {
      title: "HIRING vs BUILD SPRINT",
      hiringCost: "Hiring-Kosten",
      buildSprintCost: "Build Sprint Investment",
      firstYearSavings: "Ersparnis im ersten Jahr",
      perYear: "pro Jahr",
      oneTime: "einmalige Investition"
    },

    competitorRisk: {
      title: "MARKT-TIMING-RISIKO",
      description: "Jeden Monat, den du mit Infrastruktur verbringst, sind deine Konkurrenten dabei:",
      activities: [
        "Kunden zu gewinnen",
        "Von Nutzern zu lernen",
        "Am Produkt zu iterieren",
        "Die nächste Runde zu raisen"
      ],
      riskLevel: "Dein Verzögerungsrisiko",
      levels: {
        low: "NIEDRIGES RISIKO",
        medium: "MODERATES RISIKO",
        high: "HOHES RISIKO",
        critical: "KRITISCHES RISIKO"
      },
      delayImpact: "{{months}} Monate Verzögerung = {{runway}}% deiner Runway"
    },

    totalValue: {
      title: "DEIN GESAMTWERT IM ERSTEN JAHR",
      timeSaved: "Zeit gespart",
      burnSaved: "Burn Rate gespart",
      hiringAvoided: "Hiring-Kosten vermieden",
      revenueAdvantage: "Umsatz-Vorsprung",
      totalFirstYear: "GESAMTWERT ERSTES JAHR",
      description: "Das ist der Wert, den du durch schnelleren Launch mit Build Sprint gewinnst, statt Infrastruktur selbst zu bauen"
    },

    infrastructureBreakdown: {
      title: "Infrastruktur, die du nicht bauen musst",
      whatYouGetLabel: "Was du stattdessen bekommst:",

      auth: {
        label: "Authentifizierung",
        description: "E-Mail/Passwort, OAuth, Magic Links, 2FA, Session-Management, Passwort-Reset-Flows",
        whatYouGet: [
          "Produktionsreifes Auth-System",
          "OAuth-Provider vorkonfiguriert",
          "2FA und Magic Links bereit",
          "Session-Management erledigt"
        ]
      },

      payments: {
        label: "Payments & Billing",
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

  // Call to action
  cta: {
    primary: "Für Build Sprint bewerben",
    secondary: "Mehr über Build Sprint erfahren",
    noCommitment: "Kurzes Intro-Gespräch. Keine Verpflichtung."
  }
};
