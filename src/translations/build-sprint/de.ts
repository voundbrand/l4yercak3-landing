export const buildSprintDe = {
  // Meta information
  title: "Build Sprint",
  subtitle: "12 Wochen von der Idee zum fertigen Produkt.",

  // Hero section
  hero: {
    headline: "Du bringst die Idee. Wir bringen die Plattform.",
    subheadline: "Shippe dein SaaS-Produkt in 12 Wochen mit produktionsreifer Infrastruktur, die bereits gebaut ist.",
    cta: "Für Build Sprint bewerben"
  },

  // The Problem section
  problem: {
    title: "Das Problem",
    headline: "Die meisten Gründer verbringen 60% ihrer Zeit mit Infrastruktur.",
    story: {
      intro: "Es ist 2 Uhr nachts an einem Dienstag. Alex, ein finanzierter Gründer, debuggt OAuth-Tokens, anstatt das Feature zu bauen, das sein Produkt differenzieren wird.",
      middle: "Drei Monate in der Entwicklung ist das Produkt immer noch fast fertig. Auth hat einen Monat gedauert. Das Datenbankschema drei Wochen. Stripe-Integration zwei Wochen. E-Mail-Templates noch eine Woche. Das eigentliche Produkt—das, was es einzigartig macht—hat vielleicht 30% der Zeit bekommen.",
      conflict: "Währenddessen hat ein Konkurrent mit schlechteren Ideen, aber besseren Tools gerade gelauncht.",
      conclusion: "Alex konfiguriert immer noch Middleware."
    },
    math: {
      title: "Die Rechnung",
      items: [
        { task: "Auth-Integration", time: "2-4 Wochen" },
        { task: "Payment-Setup", time: "2-3 Wochen" },
        { task: "E-Mail-System", time: "1-2 Wochen" },
        { task: "Datenbank + API", time: "3-4 Wochen" },
        { task: "Admin-Dashboard", time: "2-3 Wochen" }
      ],
      total: "Gesamt: 10-16 Wochen, bevor du eine Zeile Produkt-Code schreibst."
    }
  },

  // The Solution section
  solution: {
    title: "Die Lösung",
    headline: "Was, wenn die langweiligen Teile schon erledigt wären?",
    description: "Stell dir vor, du startest dein nächstes Projekt mit:",
    features: [
      "Authentifizierung funktioniert bereits (E-Mail, OAuth, 2FA)",
      "Datenbank bereits konfiguriert (Convex, Echtzeit-Sync)",
      "E-Mail bereits integriert (transaktional, Marketing, Templates)",
      "Payments bereits verbunden (Stripe, Abos, Rechnungen)",
      "KI bereits verfügbar (privates EU-Hosting, sofort einsatzbereit)",
      "Admin-Dashboard bereits gebaut (Nutzerverwaltung, Analytics)"
    ],
    conclusion: "Jetzt stell dir vor, du hast 12 Wochen lang einen Experten an deiner Seite, der dir beim Shippen hilft.",
    tagline: "Das ist Build Sprint."
  },

  // How It Works section
  howItWorks: {
    title: "So funktioniert's",
    phases: [
      {
        name: "Phase 1: Discovery",
        weeks: "Woche 1-2",
        tasks: [
          "Tiefes Eintauchen in deine Produktvision",
          "Technisches Architektur-Design",
          "Timeline und Meilenstein-Planung",
          "Plattform-Onboarding und Setup"
        ]
      },
      {
        name: "Phase 2: Build",
        weeks: "Woche 3-10",
        tasks: [
          "Wöchentliche Entwicklungs-Calls",
          "Plattformzugang und Integrations-Support",
          "Code-Review und Architektur-Guidance",
          "Fortschrittsverfolgung und Accountability"
        ]
      },
      {
        name: "Phase 3: Launch",
        weeks: "Woche 11-12",
        tasks: [
          "Pre-Launch-Testing und Optimierung",
          "Deployment in Produktion",
          "Post-Launch-Monitoring-Setup",
          "Übergabe-Dokumentation"
        ]
      }
    ],
    outcome: "Ergebnis: Du shippst. Wirklich. In 12 Wochen."
  },

  // What's Included section
  whatsIncluded: {
    title: "Was enthalten ist",
    platform: {
      title: "Plattform-Zugang",
      features: [
        { name: "Authentifizierung", description: "E-Mail, OAuth (Google, GitHub, etc.), Magic Links, 2FA" },
        { name: "Datenbank", description: "Convex Echtzeit-Datenbank, automatische Backups" },
        { name: "E-Mail", description: "Transaktionale E-Mails, Marketing-Kampagnen, Templates" },
        { name: "Payments", description: "Stripe-Integration, Abonnements, Rechnungsstellung, Webhooks" },
        { name: "KI-Integration", description: "Private EU-gehostete LLMs, sofort einsatzbereite APIs" },
        { name: "Admin-Dashboard", description: "Nutzerverwaltung, Analytics, Monitoring" },
        { name: "Datei-Speicher", description: "Sichere Datei-Uploads, CDN-Auslieferung" },
        { name: "Edge Functions", description: "Serverless Compute, globales Deployment" }
      ]
    },
    support: {
      title: "Experten-Support",
      levels: [
        { name: "Wöchentliche Calls", description: "1-2 Calls pro Woche je nach Tier" },
        { name: "Async Support", description: "Slack/E-Mail-Zugang für Fragen" },
        { name: "Code Review", description: "Architektur-Guidance und Best Practices" },
        { name: "Launch Support", description: "Deployment, Monitoring, Optimierung" }
      ]
    }
  },

  // Pricing section
  pricing: {
    title: "Preise",
    tiers: [
      {
        name: "Starter",
        price: "7.500",
        currency: "€",
        description: "Für Erstgründer, einfache MVPs",
        features: [
          "12-Wochen-Programm",
          "Wöchentliche Calls (1x pro Woche)",
          "1 Projekt",
          "Voller Plattformzugang",
          "E-Mail-Support"
        ],
        bestFor: "Ideal für: Eine Idee validieren, erste Kunden gewinnen"
      },
      {
        name: "Growth",
        price: "15.000",
        currency: "€",
        description: "Für finanzierte Gründer, komplexe Produkte",
        features: [
          "12-Wochen-Programm",
          "Priority Calls (2x pro Woche)",
          "2 Projekte",
          "Voller Plattformzugang",
          "Priority Slack-Support",
          "Architektur-Deep-Dives"
        ],
        bestFor: "Ideal für: Ein ernsthaftes Produkt mit Funding bauen",
        popular: true
      },
      {
        name: "Scale",
        price: "25.000",
        currency: "€",
        description: "Für Agenturen, Enterprise, Multi-Produkt-Teams",
        features: [
          "12-Wochen-Programm",
          "Unbegrenzte Calls",
          "3+ Projekte",
          "Voller Plattformzugang",
          "Dedizierter Slack-Kanal",
          "Post-Launch-Support (30 Tage)",
          "White-Glove-Onboarding"
        ],
        bestFor: "Ideal für: Agenturen oder Teams, die mehrere Produkte shippen"
      }
    ],
    paymentOptions: {
      title: "Zahlungsoptionen",
      payInFull: {
        title: "Vollzahlung",
        description: "10% Rabatt bei Vorauszahlung."
      },
      splitPayment: {
        title: "Ratenzahlung",
        description: "50% zur Reservierung → 50% in Woche 1."
      }
    }
  },

  // Who This Is For section
  whoIsThisFor: {
    title: "Für wen ist das?",
    ideal: {
      title: "Idealer Kandidat:",
      points: [
        "Du hast eine Produktidee, die du bauen willst",
        "Du hast Funding oder Ressourcen, um in Geschwindigkeit zu investieren",
        "Du kannst 15-20+ Stunden/Woche fürs Bauen aufbringen",
        "Du willst in Wochen shippen, nicht in Monaten",
        "Du bist offen für Guidance, nicht nur Tools"
      ]
    },
    notFor: {
      title: "Nicht für dich, wenn:",
      points: [
        "Du Programmieren lernen willst (das ist für Builder, nicht Anfänger)",
        "Du eine No-Code-Lösung suchst (wir arbeiten mit Code)",
        "Du die Zeit nicht aufbringen kannst (das ist intensiv)",
        "Du erkunden willst, nicht shippen (wir fokussieren uns aufs Launchen)"
      ]
    }
  },

  // Limited Availability section
  availability: {
    title: "Begrenzte Verfügbarkeit",
    why: {
      title: "Warum nur 3 Plätze?",
      description: "Build Sprint ist High-Touch. Ich arbeite persönlich mit jedem Teilnehmer. Das skaliert nicht auf Hunderte von Leuten.",
      emphasis: "3 Plätze pro Quartal. Das war's."
    },
    status: {
      title: "Aktueller Status",
      remaining: "{spots} Plätze verfügbar",
      quarter: "{quarter} {year}"
    }
  },

  // What You Walk Away With section
  outcomes: {
    title: "Was du mitnimmst",
    items: [
      { title: "Ein gelaunchtes Produkt", description: "In Produktion, bereit für Nutzer" },
      { title: "Produktions-Infrastruktur", description: "Auth, Datenbank, Payments, E-Mail, KI" },
      { title: "Technische Dokumentation", description: "Alles, was du brauchst, um zu warten und zu erweitern" },
      { title: "Fortlaufender Plattformzugang", description: "Bau nach dem Sprint weiter" },
      { title: "Eine Beziehung", description: "Kein Anbieter, ein Partner" }
    ]
  },

  // FAQ section
  faq: {
    title: "FAQ",
    items: [
      {
        question: "Was, wenn ich keinen technischen Hintergrund habe?",
        answer: "Build Sprint ist für Builder. Du musst mit Code umgehen können oder einen technischen Co-Founder haben."
      },
      {
        question: "Welchen Tech-Stack nutzt ihr?",
        answer: "React/Next.js, Convex (Echtzeit-Datenbank), TypeScript durchgehend."
      },
      {
        question: "Kann ich das für ein bestehendes Projekt nutzen?",
        answer: "Ja, wenn eine Migration sinnvoll ist. Wir besprechen das im Bewerbungsgespräch."
      },
      {
        question: "Was passiert nach 12 Wochen?",
        answer: "Du behältst den Plattformzugang. Du baust weiter. Laufender Support ist bei Bedarf verfügbar."
      },
      {
        question: "Gibt es eine Geld-zurück-Garantie?",
        answer: "Nein. Aber wir nehmen niemanden an, von dem wir nicht glauben, dass wir helfen können."
      }
    ]
  },

  // Apply section
  apply: {
    title: "Jetzt bewerben",
    process: {
      title: "Prozess",
      steps: [
        { step: "Bewerben", description: "Formular ausfüllen (5 Minuten)" },
        { step: "Review", description: "Wir prüfen innerhalb von 48 Stunden" },
        { step: "Call", description: "30-Minuten Strategie-Gespräch" },
        { step: "Entscheidung", description: "Gegenseitige Entscheidung innerhalb von 48 Stunden" },
        { step: "Start", description: "Platz reservieren, Onboarding beginnen" }
      ]
    }
  },

  // CTA section
  cta: {
    title: "Schluss mit Konfigurieren. Anfangen zu shippen.",
    description: "In 12 Wochen könntest du ein gelaunchtes Produkt haben. Oder du richtest immer noch Auth ein.",
    button: "Für Build Sprint bewerben"
  }
};
