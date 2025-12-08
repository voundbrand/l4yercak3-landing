export const doMoreWithLessDe = {
  // Meta information
  title: "Kosten-Rechner",
  subtitle: "Entdecken Sie, wie viel Wert L4YERCAK3 für Ihr Berufsnetzwerk freisetzen kann",
  
  // Form sections
  form: {
    title: "Berechnen Sie Ihre Wertchance",
    subtitle: "Erzählen Sie uns von Ihrer Organisation, um Ihre potenziellen Einsparungen und Ihr Wachstum zu sehen",
    
    sections: {
      organizationOverview: "Organisationsübersicht",
      administrativeStaff: "Verwaltungspersonal",
      executiveStaff: "Führungskräfte",
      additionalInformation: "Zusätzliche Informationen"
    },
    
    fields: {
      organizationSize: {
        label: "Gesamte Mitarbeiter",
        helpText: "Gesamtzahl der Mitarbeiter in allen Abteilungen"
      },
      adminStaffCount: {
        label: "Verwaltungsmitarbeiter", 
        helpText: "Mitarbeiter für Veranstaltungen, Mitgliederkommunikation, Compliance, Dateneingabe"
      },
      manualHoursPerWeek: {
        label: "Stunden pro Woche für repetitive Aufgaben (pro Admin)",
        helpText: "Zeit für: Veranstaltungsanmeldung, Dateneingabe, E-Mails, Tabellen, Berichte"
      },
      loadedLaborCost: {
        label: "Vollkosten pro Stunde (€)",
        helpText: "Gehalt + Sozialleistungen + Steuern. Typisch €25-35 für Admin, €40-80 für Management"
      },
      annualEvents: {
        label: "Jährliche Veranstaltungen",
        helpText: "Konferenzen, Workshops, Webinare, Mitgliederversammlungen"
      },
      avgMemberValue: {
        label: "Mitgliederwert/Jahr (€)",
        helpText: "Mitgliedsbeiträge + Veranstaltungsgebühren + Sponsoring pro Mitglied pro Jahr"
      },
      adminHoursPerWeek: {
        label: "Manuelle Stunden/Woche",
        helpText: "Stunden pro Admin pro Woche für repetitive Aufgaben"
      },
      adminLaborCost: {
        label: "Arbeitskosten/Stunde (€)",
        helpText: "Gehalt + Sozialleistungen + Steuern für Verwaltungspersonal"
      },
      executiveStaffCount: {
        label: "Anzahl Führungskräfte",
        helpText: "CEOs, Direktoren, Manager die Verwaltungsarbeit machen"
      },
      executiveHoursPerWeek: {
        label: "Manuelle Stunden/Woche",
        helpText: "Stunden pro Führungskraft pro Woche für automatisierbare Aufgaben"
      },
      executiveLaborCost: {
        label: "Arbeitskosten/Stunde (€)",
        helpText: "Gehalt + Sozialleistungen + Steuern für Führungskräfte (typisch €60-150/Stunde)"
      },
      currentRevenue: {
        label: "Jahresumsatz (€) - Optional",
        helpText: "Hilft uns, Ihren Wachstumskontext zu verstehen"
      },
      industryType: {
        label: "Branchentyp",
        helpText: "Hilft uns, Ihren Wertbericht anzupassen",
        options: {
          medical: "Medizin / Gesundheitswesen",
          legal: "Recht / Jura", 
          tax: "Steuerberatung / Buchhaltung",
          engineering: "Ingenieurwesen / Technik",
          other: "Anderes Berufsnetzwerk"
        }
      }
    }
  },

  // Results sections
  results: {
    currentWaste: {
      title: "IHRE VERSTECKTEN KOSTEN",
      subtitle: "jährlich verschwendet für manuelle Arbeit",
      description: "Stunden menschlichen Potentials gefangen in:",
      timeTrapped: "Zeit gefangen in:",
      staffLabel: "Mitarbeiter",
      executives: "Führungskräfte",
      hoursPerWeek: "Stunden/Woche",
      hoursPerYear: "Stunden/Jahr",
      hour: "Stunde",
      year: "Jahr",
      tasks: [
        "Veranstaltungsregistrierung und -koordination",
        "Dateneingabe und Tabellenverwaltung",
        "Repetitive Mitgliederkommunikation",
        "Manuelle Compliance-Berichte",
        "Rechnungserstellung und Zahlungsverfolgung"
      ]
    },

    freedCapacity: {
      title: "STRATEGISCHE KAPAZITÄT FREIGESETZT",
      subtitle: "Stunden pro Jahr für Wachstumsaktivitäten freigesetzt",
      description: "Das sind {weeklyHours} Stunden pro Woche, die Ihr Team verbringen könnte mit:",
      activities: [
        "Mitgliedergewinnung und -bindung",
        "Strategische Partnerschaften",
        "Neue Programmentwicklung", 
        "Umsatzgenerierende Aktivitäten",
        "Strategische Planung auf Vorstandsebene"
      ],
      instead: "Anstatt: Daten kopieren, E-Mails senden, Tabellen erstellen"
    },

    growthRevenue: {
      title: "NEUE UMSATZMÖGLICHKEITEN",
      subtitle: "Mit freigesetzter Kapazität könnte Ihr Team generieren:",
      
      memberGrowth: {
        title: "Mitgliederwachstum:",
        newMembers: "{count} neue Mitglieder gewonnen",
        revenue: "€{amount} neuer Mitgliedsumsatz"
      },
      
      programExpansion: {
        title: "Programmerweiterung:",
        programs: "2-3 neue Premium-Programme",
        revenue: "€{amount} Programmumsatz"
      },
      
      partnerships: {
        title: "Partnerschaftsentwicklung:",
        sponsors: "2 Unternehmenssponsoren",
        revenue: "€{amount} Partnerschaftsumsatz"
      },
      
      retention: {
        title: "Mitgliederbindung:",
        improvement: "5% Abwanderungsreduktion",
        revenue: "€{amount} behaltener Umsatz"
      },
      
      total: "Konservative Summe: €{amount} neuer Jahresumsatz"
    },

    totalValue: {
      title: "IHRE GESAMTE WERTCHANCE",
      laborCostAvoided: "Vermiedene Arbeitskosten: €{amount}/Jahr",
      newRevenuePotential: "Neues Umsatzpotential: €{amount}/Jahr",
      totalAvailable: "VERFÜGBARER GESAMTWERT: €{amount}/Jahr",
      description: "Dieser Wert ist derzeit in manuellen Prozessen eingeschlossen."
    },

    taskBreakdown: {
      title: "Wo Ihre Zeit hingeht",
      
      eventCoordination: {
        label: "Veranstaltungskoordination",
        description: "Anmeldungsverfolgung, Bestätigungen, Kalenderkoordination, Check-in, Nachbereitung",
        automationPotential: "90%",
        whatGetsAutomated: [
          "Automatisierte Anmeldeformulare (kein Excel)",
          "Ausgelöste E-Mail-Bestätigungen", 
          "QR-Code Anwesenheitsverfolgung",
          "Automatisch generierte Veranstaltungsseiten"
        ]
      },
      
      memberCommunication: {
        label: "Mitgliederkommunikation",
        description: "Fragen beantworten, Newsletter, Website-Updates, Social Media",
        automationPotential: "85%",
        whatGetsAutomated: [
          "KI-gestützter Mitgliedersupport (24/7)",
          "Automatisch generierte Newsletter",
          "Geplante Social Media Posts",
          "Sofortige Veranstaltungsinformationen"
        ]
      },
      
      complianceReporting: {
        label: "Compliance & Berichtswesen", 
        description: "CME-Verfolgung, Zertifikate, Regulierungsberichte, Vorstandsmaterialien",
        automationPotential: "95%",
        whatGetsAutomated: [
          "Automatisch generierte CME-Zertifikate",
          "Compliance-Tracking-Dashboards",
          "Ein-Klick-Regulierungsberichte", 
          "Automatisierte Vorstandspräsentationen"
        ]
      },
      
      financialAdmin: {
        label: "Finanzverwaltung",
        description: "Rechnungsstellung, Zahlungsverfolgung, Abstimmung, Spesenabrechnung",
        automationPotential: "90%",
        whatGetsAutomated: [
          "Automatisierte Rechnungsgenerierung",
          "Integrierte Zahlungsabwicklung",
          "Echtzeit-Finanz-Dashboards",
          "Automatisierte Zahlungserinnerungen"
        ]
      },
      
      dataManagement: {
        label: "Dateneingabe & -verwaltung",
        description: "Datenbankupdates, Kopieren zwischen Systemen, Dateiorganisation", 
        automationPotential: "95%",
        whatGetsAutomated: [
          "Einzige Datenquelle (keine Tabellen)",
          "Echtzeit-Datensynchronisation",
          "Automatisierte Backups und Organisation",
          "KI-gestützte Datenvalidierung"
        ]
      }
    }
  },

  // Lead capture
  leadCapture: {
    primaryCta: "Holen Sie sich Ihren individuellen Wertbericht",
    secondaryCta: "Terminieren Sie ein Wertbewertungsgespräch",
    
    form: {
      title: "Holen Sie sich Ihren individuellen Wertbericht",
      subtitle: "Wir senden Ihnen ein detailliertes PDF mit:",
      benefits: [
        "Ihrer spezifischen Wertaufschlüsselung nach Abteilungen",
        "Pilot-Erfolgsmetriken für Ihr Netzwerk", 
        "Implementierungs-Roadmap für Ihre Organisation",
        "Branchenbenchmarks für Netzwerke wie Ihres"
      ],
      noCommitment: "Keine Verpflichtung erforderlich. Nur Erkenntnisse.",
      
      fields: {
        fullName: "Vollständiger Name",
        email: "Geschäftliche E-Mail",
        phone: "Telefonnummer",
        organizationName: "Organisationsname",
        jobTitle: "Ihre Rolle",
        signatureAuthority: "Zeichnungsberechtigung (€)",
        signatureAuthorityHelp: "Welchen Betrag können Sie ohne zusätzliche Genehmigungen bewilligen?",
        timeline: "Wann möchten Sie implementieren?",
        timelineOptions: {
          within1Month: "Innerhalb von 1 Monat",
          within3Months: "Innerhalb von 3 Monaten",
          within6Months: "Innerhalb von 6 Monaten",
          within1Year: "Innerhalb von 1 Jahr",
          justExploring: "Erkunde nur Optionen"
        }
      },
      
      buttons: {
        submit: "Meinen individuellen Wertbericht erhalten",
        generating: "Bericht wird erstellt...",
        cancel: "Abbrechen",
        close: "Schließen"
      },
      
      privacy: "Ihre Daten werden sicher behandelt und nicht an Dritte weitergegeben.",
      errorTitle: "Fehler beim Erstellen Ihres Berichts",
      retryButton: "Erneut versuchen",
      attemptCount: "Versuch {{count}}"
    },
    
    success: {
      title: "Ihr Wertbericht wurde erstellt!",
      message: "Wir haben Ihren individuellen Wertbericht an Ihre E-Mail-Adresse gesendet.",
      emailSent: "Prüfen Sie Ihr Postfach (auch den Spam-Ordner) für Ihren detaillierten Bericht."
    }
  },

  // Navigation and meta
  navigation: {
    backToHome: "Zurück zur Startseite",
    title: "Kosten-Rechner"
  },

  // Call to action
  cta: {
    title: "Bereit, Ihren Wert freizusetzen?",
    description: "Sehen Sie, wie L4YERCAK3 Ihr Berufsnetzwerk vom Chaos zu zusammengesetztem Wachstum transformieren kann.",
    buttons: {
      getStarted: "Loslegen",
      scheduleDemo: "Demo terminieren",
      learnMore: "Mehr erfahren"
    }
  }
};