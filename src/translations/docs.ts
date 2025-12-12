// Documentation pages translations

export const docsEn = {
  // Common docs elements
  common: {
    documentation: "Documentation",
    onThisPage: "On this page",
    nextSteps: "Next Steps",
    readyToStart: "Ready to get started? Check out our quick start guide or connect your first integration.",
    quickStartGuide: "Quick Start Guide",
    comingSoon: "Coming Soon",
    new: "New",
  },
  // Sidebar navigation
  nav: {
    gettingStarted: "Getting Started",
    introduction: "Introduction",
    quickStart: "Quick Start",
    integrations: "Integrations",
    vercel: "Vercel",
    github: "GitHub",
    microsoft: "Microsoft",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    eula: "EULA",
    dpa: "DPA",
    resellerAgreement: "Reseller Agreement",
    support: "Support",
    helpCenter: "Help Center",
    contactUs: "Contact Us",
  },
  // Main docs landing page
  landing: {
    title: "Documentation",
    subtitle: "Welcome to the l4yercak3 documentation. Learn how to use our platform, set up integrations, and deploy your web applications.",
    cards: {
      vercel: {
        title: "Vercel Integration",
        description: "Deploy your web apps to Vercel with one click",
      },
      quickStart: {
        title: "Quick Start",
        description: "Get up and running in under 5 minutes",
      },
      github: {
        title: "GitHub Integration",
        description: "Connect your repositories for seamless workflows",
      },
      support: {
        title: "Support",
        description: "Get help and find answers to common questions",
      },
    },
    about: {
      title: "About l4yercak3",
      content1: "l4yercak3 is a retro desktop-style workflow platform that enables users to build, manage, and deploy web applications with ease. Our platform combines nostalgic design with modern capabilities.",
      content2: "Perfect for freelancers, agencies, and teams who want streamlined deployment workflows with the familiarity of a retro desktop interface.",
    },
    features: {
      title: "Key Features",
      items: {
        deployments: {
          title: "One-Click Deployments",
          description: "Deploy to Vercel, Netlify, or your own infrastructure with a single click.",
        },
        envManagement: {
          title: "Environment Management",
          description: "Securely manage environment variables across all your projects.",
        },
        collaboration: {
          title: "Team Collaboration",
          description: "Work together with your team on projects with role-based access control.",
        },
        monitoring: {
          title: "Real-Time Monitoring",
          description: "Track deployment status, logs, and analytics in real-time.",
        },
      },
    },
  },
  // Quick Start page
  quickStart: {
    title: "Quick Start Guide",
    subtitle: "Get up and running with l4yercak3 in under 5 minutes.",
    sections: {
      createAccount: {
        title: "1. Create an Account",
        content: "Visit app.l4yercak3.com and sign up for a free account.",
        note: "You can sign up with your email or use social authentication (Google, GitHub).",
      },
      createProject: {
        title: "2. Create Your First Project",
        content: "Once logged in, click \"New Project\" from the dashboard. Choose from:",
        options: {
          blank: "Blank Project - Start from scratch",
          template: "Template - Use a pre-built template",
          import: "Import - Import an existing project from GitHub",
        },
        instruction: "Give your project a name and description, then click \"Create\".",
      },
      connectIntegration: {
        title: "3. Connect an Integration",
        content: "To deploy your app, you'll need to connect a deployment platform:",
        steps: [
          "Go to Settings → Integrations",
          "Click \"Connect\" next to your preferred platform (e.g., Vercel)",
          "Authorize the integration when prompted",
        ],
        recommendation: {
          title: "Recommended",
          content: "We recommend starting with the Vercel integration for the smoothest deployment experience.",
        },
      },
      deploy: {
        title: "4. Deploy Your App",
        content: "With an integration connected, deploying is easy:",
        steps: [
          "Open your project in l4yercak3",
          "Click the \"Deploy\" button in the top right",
          "Select your deployment target",
          "Click \"Deploy Now\"",
        ],
        result: "Your app will be live in seconds! You'll receive a URL where you can view your deployed application.",
      },
    },
    nextSteps: {
      vercel: {
        title: "Vercel Integration →",
        description: "Learn more about deploying to Vercel",
      },
      help: {
        title: "Get Help →",
        description: "Contact support or browse FAQs",
      },
    },
  },
  // Vercel Integration page
  vercel: {
    title: "Vercel Integration",
    subtitle: "Deploy your web applications to Vercel directly from l4yercak3. Our official Vercel integration enables seamless deployments, environment syncing, and project management.",
    overview: {
      title: "Overview",
      content: "The l4yercak3 Vercel integration allows you to:",
      features: [
        "Deploy projects to Vercel with a single click",
        "Sync environment variables automatically",
        "Manage multiple Vercel projects from one dashboard",
        "View deployment status and logs in real-time",
      ],
    },
    permissions: {
      title: "Required Permissions",
      intro: "When connecting the Vercel integration, you'll be asked to grant the following permissions:",
      table: {
        headers: {
          permission: "Permission",
          description: "Description",
        },
        rows: [
          { permission: "Create Deployments", description: "Deploy your projects to Vercel" },
          { permission: "Read/Write Projects", description: "Access and manage your Vercel projects" },
          { permission: "Read User", description: "Identify your Vercel account" },
          { permission: "Read Team", description: "Access team information if applicable" },
        ],
      },
    },
    setup: {
      title: "Setting Up the Integration",
      steps: [
        "Navigate to Settings → Integrations in your l4yercak3 dashboard",
        "Click \"Connect Vercel\"",
        "You'll be redirected to Vercel to authorize the integration",
        "Select the account or team you want to connect",
        "Grant the required permissions",
        "You'll be redirected back to l4yercak3",
      ],
    },
    deployment: {
      title: "Deploying a Project",
      content: "Once connected, deploying to Vercel is simple:",
      steps: [
        "Open your project in l4yercak3",
        "Click the \"Deploy\" button",
        "Select \"Vercel\" as your deployment target",
        "Configure any deployment-specific settings",
        "Click \"Deploy Now\"",
      ],
    },
    envVars: {
      title: "Environment Variables",
      content: "Environment variables configured in l4yercak3 are automatically synced to your Vercel project. You can:",
      features: [
        "Set variables for Production, Preview, and Development",
        "Use encrypted secrets for sensitive values",
        "Bulk import variables from .env files",
      ],
    },
    troubleshooting: {
      title: "Troubleshooting",
      issues: {
        deployment: {
          title: "Deployment Failed",
          content: "Check your build logs for specific errors. Common issues include missing dependencies or build script errors.",
        },
        permissions: {
          title: "Permission Denied",
          content: "Ensure you have the correct permissions on your Vercel account or team. Try disconnecting and reconnecting the integration.",
        },
        notSyncing: {
          title: "Variables Not Syncing",
          content: "Verify your environment variables are correctly configured. After making changes, trigger a new deployment.",
        },
      },
    },
    support: {
      title: "Need Help?",
      content: "If you're having issues with the Vercel integration, contact our support team or check out the FAQs.",
    },
  },
  // GitHub Integration page
  github: {
    title: "GitHub Integration",
    subtitle: "Connect your l4yercak3 platform to GitHub for seamless web app deployment. Enables automatic repository creation, code synchronization, and integration with Vercel for one-click deployments.",
    overview: {
      title: "Overview",
      content: "The l4yercak3 GitHub integration allows you to connect your GitHub account for seamless repository management and deployment workflows. Combined with our Vercel integration, you can achieve a complete CI/CD pipeline.",
      features: [
        "Automatically create repositories for new projects",
        "Sync code between l4yercak3 and GitHub",
        "Trigger deployments from GitHub pushes",
        "Manage repository settings from the l4yercak3 dashboard",
      ],
    },
    permissions: {
      title: "Required Permissions",
      intro: "When connecting the GitHub integration, you'll be asked to grant the following permissions:",
      table: {
        headers: {
          permission: "Permission",
          description: "Description",
        },
        rows: [
          { permission: "Repository Access", description: "Create and manage repositories" },
          { permission: "Contents", description: "Read and write repository contents" },
          { permission: "Webhooks", description: "Create webhooks for deployment triggers" },
          { permission: "User Info", description: "Identify your GitHub account" },
        ],
      },
    },
    setup: {
      title: "Setting Up the Integration",
      steps: [
        "Navigate to Settings → Integrations in your l4yercak3 dashboard",
        "Click \"Connect GitHub\"",
        "You'll be redirected to GitHub to authorize the l4yercak3 GitHub App",
        "Select the account or organization you want to connect",
        "Choose which repositories to grant access to (all or selected)",
        "Grant the required permissions",
        "You'll be redirected back to l4yercak3",
      ],
      tip: "You can install the GitHub App directly from github.com/apps/l4yercak3-platform",
    },
    features: {
      title: "Features",
      items: {
        autoRepo: {
          title: "Automatic Repository Creation",
          description: "Create a new GitHub repository directly from l4yercak3 when starting a new project.",
        },
        codeSync: {
          title: "Code Synchronization",
          description: "Keep your l4yercak3 projects in sync with GitHub repositories automatically.",
        },
        vercelIntegration: {
          title: "Vercel Integration",
          description: "Combine with our Vercel integration for one-click deployments directly from GitHub.",
        },
        repoManagement: {
          title: "Repository Management",
          description: "Manage repository settings and configurations from your l4yercak3 dashboard.",
        },
      },
    },
    troubleshooting: {
      title: "Troubleshooting",
      issues: {
        authFailed: {
          title: "Authorization Failed",
          content: "Ensure you have the necessary permissions on your GitHub account. If you're part of an organization, you may need admin approval to install GitHub Apps.",
        },
        notSyncing: {
          title: "Repository Not Syncing",
          content: "Check that the repository is included in the GitHub App's access list. Go to your GitHub settings and verify the l4yercak3 app has access to the repository.",
        },
        permissionDenied: {
          title: "Permission Denied",
          content: "Try disconnecting and reconnecting the integration. You can also reinstall the GitHub App from github.com/apps/l4yercak3-platform.",
        },
      },
    },
    relatedIntegrations: {
      title: "Related Integrations",
      content: "Get the most out of l4yercak3 by combining GitHub with our other integrations:",
    },
  },
  // Microsoft Integration page
  microsoft: {
    title: "Microsoft Integration",
    subtitle: "Connect your l4yercak3 platform to Microsoft 365 and Azure services for enterprise-grade authentication, file management, and team collaboration. Powered by Microsoft Entra ID (formerly Azure AD).",
    overview: {
      title: "Overview",
      content: "The l4yercak3 Microsoft integration enables seamless connectivity with Microsoft 365 services and Azure infrastructure. This enterprise-grade integration is powered by Microsoft Entra ID and provides secure authentication and authorization.",
      features: [
        "Sign in with your Microsoft account or organization credentials",
        "Access Microsoft 365 services (SharePoint, OneDrive, Teams)",
        "Deploy to Azure cloud infrastructure",
        "Sync files and documents across platforms",
        "Leverage enterprise single sign-on (SSO)",
      ],
    },
    permissions: {
      title: "Required Permissions",
      intro: "When connecting the Microsoft integration, you'll be asked to grant the following permissions:",
      table: {
        headers: {
          permission: "Permission",
          description: "Description",
        },
        rows: [
          { permission: "User.Read", description: "Sign in and read your profile" },
          { permission: "Files.ReadWrite", description: "Access and manage your OneDrive files" },
          { permission: "Sites.ReadWrite.All", description: "Access SharePoint sites and content" },
          { permission: "offline_access", description: "Maintain access to data you've granted access to" },
        ],
      },
      appId: "App ID",
    },
    setup: {
      title: "Setting Up the Integration",
      steps: [
        "Navigate to Settings → Integrations in your l4yercak3 dashboard",
        "Click \"Connect Microsoft\"",
        "You'll be redirected to Microsoft to sign in with your account",
        "Review the requested permissions and click \"Accept\"",
        "If you're part of an organization, admin consent may be required",
        "You'll be redirected back to l4yercak3",
      ],
      enterpriseTip: {
        title: "Enterprise Users",
        content: "If your organization requires admin consent, contact your IT administrator to approve the l4yercak3 Backoffice Software app in your Microsoft Entra admin center.",
      },
    },
    features: {
      title: "Features",
      items: {
        signIn: {
          title: "Microsoft Account Sign-In",
          description: "Sign in to l4yercak3 using your Microsoft personal or work account for seamless authentication.",
        },
        oneDrive: {
          title: "OneDrive Integration",
          description: "Access and sync files from OneDrive directly within your l4yercak3 projects.",
        },
        sharePoint: {
          title: "SharePoint Connectivity",
          description: "Connect to SharePoint sites for document management and team collaboration.",
        },
        azure: {
          title: "Azure Deployment",
          description: "Deploy your web applications to Azure App Service and Azure Static Web Apps.",
        },
        sso: {
          title: "Enterprise SSO",
          description: "Leverage your organization's single sign-on for secure, passwordless access.",
        },
      },
    },
    troubleshooting: {
      title: "Troubleshooting",
      issues: {
        adminConsent: {
          title: "Admin Consent Required",
          content: "If you see \"Need admin approval\", your organization requires an administrator to approve the app. Contact your IT admin to grant consent in the Microsoft Entra admin center.",
        },
        signInFailed: {
          title: "Sign-In Failed",
          content: "Ensure you're using the correct Microsoft account. If you have multiple accounts, try signing out of all Microsoft services first, then reconnect.",
        },
        permissionDenied: {
          title: "Permission Denied",
          content: "Try disconnecting and reconnecting the integration. Ensure you accept all requested permissions during the authorization flow.",
        },
        filesNotSyncing: {
          title: "Files Not Syncing",
          content: "Verify you have the Files.ReadWrite permission granted. Check that your OneDrive storage isn't full and that the files aren't protected by additional security policies.",
        },
      },
    },
    relatedIntegrations: {
      title: "Related Integrations",
      content: "Get the most out of l4yercak3 by combining Microsoft with our other integrations:",
    },
  },
};

export const docsDe = {
  // Common docs elements
  common: {
    documentation: "Dokumentation",
    onThisPage: "Auf dieser Seite",
    nextSteps: "Nächste Schritte",
    readyToStart: "Bereit loszulegen? Schauen Sie sich unsere Schnellstartanleitung an oder verbinden Sie Ihre erste Integration.",
    quickStartGuide: "Schnellstartanleitung",
    comingSoon: "Demnächst",
    new: "Neu",
  },
  // Sidebar navigation
  nav: {
    gettingStarted: "Erste Schritte",
    introduction: "Einführung",
    quickStart: "Schnellstart",
    integrations: "Integrationen",
    vercel: "Vercel",
    github: "GitHub",
    microsoft: "Microsoft",
    legal: "Rechtliches",
    privacyPolicy: "Datenschutzerklärung",
    termsOfService: "Allgemeine Geschäftsbedingungen",
    eula: "EULA",
    dpa: "AVV",
    resellerAgreement: "Reseller-Vereinbarung",
    support: "Support",
    helpCenter: "Hilfecenter",
    contactUs: "Kontakt",
  },
  // Main docs landing page
  landing: {
    title: "Dokumentation",
    subtitle: "Willkommen zur l4yercak3-Dokumentation. Erfahren Sie, wie Sie unsere Plattform nutzen, Integrationen einrichten und Ihre Webanwendungen bereitstellen.",
    cards: {
      vercel: {
        title: "Vercel-Integration",
        description: "Deployen Sie Ihre Web-Apps mit einem Klick zu Vercel",
      },
      quickStart: {
        title: "Schnellstart",
        description: "Legen Sie in unter 5 Minuten los",
      },
      github: {
        title: "GitHub-Integration",
        description: "Verbinden Sie Ihre Repositories für nahtlose Workflows",
      },
      support: {
        title: "Support",
        description: "Erhalten Sie Hilfe und finden Sie Antworten auf häufige Fragen",
      },
    },
    about: {
      title: "Über l4yercak3",
      content1: "l4yercak3 ist eine Workflow-Plattform im Retro-Desktop-Stil, die es Benutzern ermöglicht, Webanwendungen einfach zu erstellen, zu verwalten und bereitzustellen. Unsere Plattform kombiniert nostalgisches Design mit modernen Funktionen.",
      content2: "Perfekt für Freelancer, Agenturen und Teams, die optimierte Deployment-Workflows mit der Vertrautheit einer Retro-Desktop-Oberfläche wünschen.",
    },
    features: {
      title: "Hauptfunktionen",
      items: {
        deployments: {
          title: "Ein-Klick-Deployments",
          description: "Deployen Sie zu Vercel, Netlify oder Ihrer eigenen Infrastruktur mit einem einzigen Klick.",
        },
        envManagement: {
          title: "Umgebungsverwaltung",
          description: "Verwalten Sie Umgebungsvariablen sicher über alle Ihre Projekte.",
        },
        collaboration: {
          title: "Team-Zusammenarbeit",
          description: "Arbeiten Sie mit Ihrem Team an Projekten mit rollenbasierter Zugriffskontrolle.",
        },
        monitoring: {
          title: "Echtzeit-Überwachung",
          description: "Verfolgen Sie Deployment-Status, Protokolle und Analysen in Echtzeit.",
        },
      },
    },
  },
  // Quick Start page
  quickStart: {
    title: "Schnellstartanleitung",
    subtitle: "Starten Sie mit l4yercak3 in unter 5 Minuten.",
    sections: {
      createAccount: {
        title: "1. Konto erstellen",
        content: "Besuchen Sie app.l4yercak3.com und registrieren Sie sich für ein kostenloses Konto.",
        note: "Sie können sich mit Ihrer E-Mail registrieren oder Social Authentication (Google, GitHub) verwenden.",
      },
      createProject: {
        title: "2. Ihr erstes Projekt erstellen",
        content: "Nach der Anmeldung klicken Sie auf \"Neues Projekt\" im Dashboard. Wählen Sie aus:",
        options: {
          blank: "Leeres Projekt - Von Grund auf beginnen",
          template: "Vorlage - Eine vorgefertigte Vorlage verwenden",
          import: "Importieren - Ein bestehendes Projekt von GitHub importieren",
        },
        instruction: "Geben Sie Ihrem Projekt einen Namen und eine Beschreibung, dann klicken Sie auf \"Erstellen\".",
      },
      connectIntegration: {
        title: "3. Eine Integration verbinden",
        content: "Um Ihre App zu deployen, müssen Sie eine Deployment-Plattform verbinden:",
        steps: [
          "Gehen Sie zu Einstellungen → Integrationen",
          "Klicken Sie auf \"Verbinden\" neben Ihrer bevorzugten Plattform (z.B. Vercel)",
          "Autorisieren Sie die Integration, wenn Sie dazu aufgefordert werden",
        ],
        recommendation: {
          title: "Empfohlen",
          content: "Wir empfehlen, mit der Vercel-Integration zu beginnen für das reibungsloseste Deployment-Erlebnis.",
        },
      },
      deploy: {
        title: "4. Ihre App deployen",
        content: "Mit einer verbundenen Integration ist das Deployen einfach:",
        steps: [
          "Öffnen Sie Ihr Projekt in l4yercak3",
          "Klicken Sie auf die \"Deploy\"-Schaltfläche oben rechts",
          "Wählen Sie Ihr Deployment-Ziel",
          "Klicken Sie auf \"Jetzt deployen\"",
        ],
        result: "Ihre App ist in Sekunden live! Sie erhalten eine URL, unter der Sie Ihre bereitgestellte Anwendung ansehen können.",
      },
    },
    nextSteps: {
      vercel: {
        title: "Vercel-Integration →",
        description: "Erfahren Sie mehr über das Deployen zu Vercel",
      },
      help: {
        title: "Hilfe erhalten →",
        description: "Kontaktieren Sie den Support oder durchsuchen Sie die FAQs",
      },
    },
  },
  // Vercel Integration page
  vercel: {
    title: "Vercel-Integration",
    subtitle: "Deployen Sie Ihre Webanwendungen direkt von l4yercak3 zu Vercel. Unsere offizielle Vercel-Integration ermöglicht nahtlose Deployments, Umgebungssynchronisierung und Projektverwaltung.",
    overview: {
      title: "Übersicht",
      content: "Die l4yercak3 Vercel-Integration ermöglicht Ihnen:",
      features: [
        "Projekte mit einem Klick zu Vercel deployen",
        "Umgebungsvariablen automatisch synchronisieren",
        "Mehrere Vercel-Projekte von einem Dashboard verwalten",
        "Deployment-Status und Protokolle in Echtzeit anzeigen",
      ],
    },
    permissions: {
      title: "Erforderliche Berechtigungen",
      intro: "Beim Verbinden der Vercel-Integration werden Sie aufgefordert, folgende Berechtigungen zu gewähren:",
      table: {
        headers: {
          permission: "Berechtigung",
          description: "Beschreibung",
        },
        rows: [
          { permission: "Deployments erstellen", description: "Ihre Projekte zu Vercel deployen" },
          { permission: "Projekte lesen/schreiben", description: "Auf Ihre Vercel-Projekte zugreifen und sie verwalten" },
          { permission: "Benutzer lesen", description: "Ihr Vercel-Konto identifizieren" },
          { permission: "Team lesen", description: "Falls zutreffend, auf Team-Informationen zugreifen" },
        ],
      },
    },
    setup: {
      title: "Integration einrichten",
      steps: [
        "Navigieren Sie zu Einstellungen → Integrationen in Ihrem l4yercak3-Dashboard",
        "Klicken Sie auf \"Vercel verbinden\"",
        "Sie werden zu Vercel weitergeleitet, um die Integration zu autorisieren",
        "Wählen Sie das Konto oder Team, das Sie verbinden möchten",
        "Gewähren Sie die erforderlichen Berechtigungen",
        "Sie werden zurück zu l4yercak3 weitergeleitet",
      ],
    },
    deployment: {
      title: "Ein Projekt deployen",
      content: "Nach der Verbindung ist das Deployen zu Vercel einfach:",
      steps: [
        "Öffnen Sie Ihr Projekt in l4yercak3",
        "Klicken Sie auf die \"Deploy\"-Schaltfläche",
        "Wählen Sie \"Vercel\" als Deployment-Ziel",
        "Konfigurieren Sie alle deployment-spezifischen Einstellungen",
        "Klicken Sie auf \"Jetzt deployen\"",
      ],
    },
    envVars: {
      title: "Umgebungsvariablen",
      content: "In l4yercak3 konfigurierte Umgebungsvariablen werden automatisch mit Ihrem Vercel-Projekt synchronisiert. Sie können:",
      features: [
        "Variablen für Produktion, Vorschau und Entwicklung setzen",
        "Verschlüsselte Geheimnisse für sensible Werte verwenden",
        "Variablen aus .env-Dateien massenhaft importieren",
      ],
    },
    troubleshooting: {
      title: "Fehlerbehebung",
      issues: {
        deployment: {
          title: "Deployment fehlgeschlagen",
          content: "Überprüfen Sie Ihre Build-Protokolle auf spezifische Fehler. Häufige Probleme sind fehlende Abhängigkeiten oder Build-Skript-Fehler.",
        },
        permissions: {
          title: "Zugriff verweigert",
          content: "Stellen Sie sicher, dass Sie die richtigen Berechtigungen für Ihr Vercel-Konto oder Team haben. Versuchen Sie, die Integration zu trennen und erneut zu verbinden.",
        },
        notSyncing: {
          title: "Variablen werden nicht synchronisiert",
          content: "Überprüfen Sie, ob Ihre Umgebungsvariablen korrekt konfiguriert sind. Nach Änderungen lösen Sie ein neues Deployment aus.",
        },
      },
    },
    support: {
      title: "Brauchen Sie Hilfe?",
      content: "Bei Problemen mit der Vercel-Integration kontaktieren Sie unser Support-Team oder schauen Sie in die FAQs.",
    },
  },
  // GitHub Integration page
  github: {
    title: "GitHub-Integration",
    subtitle: "Verbinden Sie Ihre l4yercak3-Plattform mit GitHub für nahtloses Web-App-Deployment. Ermöglicht automatische Repository-Erstellung, Code-Synchronisierung und Integration mit Vercel für Ein-Klick-Deployments.",
    overview: {
      title: "Übersicht",
      content: "Die l4yercak3 GitHub-Integration ermöglicht es Ihnen, Ihr GitHub-Konto für nahtloses Repository-Management und Deployment-Workflows zu verbinden. In Kombination mit unserer Vercel-Integration können Sie eine vollständige CI/CD-Pipeline erreichen.",
      features: [
        "Automatisch Repositories für neue Projekte erstellen",
        "Code zwischen l4yercak3 und GitHub synchronisieren",
        "Deployments von GitHub-Pushes auslösen",
        "Repository-Einstellungen vom l4yercak3-Dashboard verwalten",
      ],
    },
    permissions: {
      title: "Erforderliche Berechtigungen",
      intro: "Beim Verbinden der GitHub-Integration werden Sie aufgefordert, folgende Berechtigungen zu gewähren:",
      table: {
        headers: {
          permission: "Berechtigung",
          description: "Beschreibung",
        },
        rows: [
          { permission: "Repository-Zugriff", description: "Repositories erstellen und verwalten" },
          { permission: "Inhalte", description: "Repository-Inhalte lesen und schreiben" },
          { permission: "Webhooks", description: "Webhooks für Deployment-Auslöser erstellen" },
          { permission: "Benutzerinfo", description: "Ihr GitHub-Konto identifizieren" },
        ],
      },
    },
    setup: {
      title: "Integration einrichten",
      steps: [
        "Navigieren Sie zu Einstellungen → Integrationen in Ihrem l4yercak3-Dashboard",
        "Klicken Sie auf \"GitHub verbinden\"",
        "Sie werden zu GitHub weitergeleitet, um die l4yercak3 GitHub App zu autorisieren",
        "Wählen Sie das Konto oder die Organisation, die Sie verbinden möchten",
        "Wählen Sie, auf welche Repositories Zugriff gewährt werden soll (alle oder ausgewählte)",
        "Gewähren Sie die erforderlichen Berechtigungen",
        "Sie werden zurück zu l4yercak3 weitergeleitet",
      ],
      tip: "Sie können die GitHub App direkt von github.com/apps/l4yercak3-platform installieren",
    },
    features: {
      title: "Funktionen",
      items: {
        autoRepo: {
          title: "Automatische Repository-Erstellung",
          description: "Erstellen Sie ein neues GitHub-Repository direkt aus l4yercak3 beim Starten eines neuen Projekts.",
        },
        codeSync: {
          title: "Code-Synchronisierung",
          description: "Halten Sie Ihre l4yercak3-Projekte automatisch mit GitHub-Repositories synchron.",
        },
        vercelIntegration: {
          title: "Vercel-Integration",
          description: "Kombinieren Sie mit unserer Vercel-Integration für Ein-Klick-Deployments direkt von GitHub.",
        },
        repoManagement: {
          title: "Repository-Verwaltung",
          description: "Verwalten Sie Repository-Einstellungen und Konfigurationen von Ihrem l4yercak3-Dashboard.",
        },
      },
    },
    troubleshooting: {
      title: "Fehlerbehebung",
      issues: {
        authFailed: {
          title: "Autorisierung fehlgeschlagen",
          content: "Stellen Sie sicher, dass Sie die erforderlichen Berechtigungen für Ihr GitHub-Konto haben. Wenn Sie Teil einer Organisation sind, benötigen Sie möglicherweise Admin-Genehmigung zur Installation von GitHub Apps.",
        },
        notSyncing: {
          title: "Repository wird nicht synchronisiert",
          content: "Überprüfen Sie, ob das Repository in der Zugriffsliste der GitHub App enthalten ist. Gehen Sie zu Ihren GitHub-Einstellungen und überprüfen Sie, ob die l4yercak3-App Zugriff auf das Repository hat.",
        },
        permissionDenied: {
          title: "Zugriff verweigert",
          content: "Versuchen Sie, die Integration zu trennen und erneut zu verbinden. Sie können die GitHub App auch von github.com/apps/l4yercak3-platform neu installieren.",
        },
      },
    },
    relatedIntegrations: {
      title: "Verwandte Integrationen",
      content: "Holen Sie das Beste aus l4yercak3 heraus, indem Sie GitHub mit unseren anderen Integrationen kombinieren:",
    },
  },
  // Microsoft Integration page
  microsoft: {
    title: "Microsoft-Integration",
    subtitle: "Verbinden Sie Ihre l4yercak3-Plattform mit Microsoft 365 und Azure-Diensten für unternehmensgerechte Authentifizierung, Dateiverwaltung und Team-Zusammenarbeit. Unterstützt von Microsoft Entra ID (ehemals Azure AD).",
    overview: {
      title: "Übersicht",
      content: "Die l4yercak3 Microsoft-Integration ermöglicht nahtlose Konnektivität mit Microsoft 365-Diensten und Azure-Infrastruktur. Diese unternehmensgerechte Integration wird von Microsoft Entra ID unterstützt und bietet sichere Authentifizierung und Autorisierung.",
      features: [
        "Mit Ihrem Microsoft-Konto oder Organisationsanmeldedaten anmelden",
        "Zugriff auf Microsoft 365-Dienste (SharePoint, OneDrive, Teams)",
        "Bereitstellung auf Azure-Cloud-Infrastruktur",
        "Dateien und Dokumente plattformübergreifend synchronisieren",
        "Enterprise Single Sign-On (SSO) nutzen",
      ],
    },
    permissions: {
      title: "Erforderliche Berechtigungen",
      intro: "Beim Verbinden der Microsoft-Integration werden Sie aufgefordert, folgende Berechtigungen zu gewähren:",
      table: {
        headers: {
          permission: "Berechtigung",
          description: "Beschreibung",
        },
        rows: [
          { permission: "User.Read", description: "Anmelden und Ihr Profil lesen" },
          { permission: "Files.ReadWrite", description: "Auf Ihre OneDrive-Dateien zugreifen und sie verwalten" },
          { permission: "Sites.ReadWrite.All", description: "Auf SharePoint-Websites und Inhalte zugreifen" },
          { permission: "offline_access", description: "Zugriff auf Daten beibehalten, auf die Sie Zugriff gewährt haben" },
        ],
      },
      appId: "App-ID",
    },
    setup: {
      title: "Integration einrichten",
      steps: [
        "Navigieren Sie zu Einstellungen → Integrationen in Ihrem l4yercak3-Dashboard",
        "Klicken Sie auf \"Microsoft verbinden\"",
        "Sie werden zu Microsoft weitergeleitet, um sich mit Ihrem Konto anzumelden",
        "Überprüfen Sie die angeforderten Berechtigungen und klicken Sie auf \"Akzeptieren\"",
        "Wenn Sie Teil einer Organisation sind, ist möglicherweise Admin-Zustimmung erforderlich",
        "Sie werden zurück zu l4yercak3 weitergeleitet",
      ],
      enterpriseTip: {
        title: "Unternehmensbenutzer",
        content: "Wenn Ihre Organisation Admin-Zustimmung erfordert, kontaktieren Sie Ihren IT-Administrator, um die l4yercak3 Backoffice Software-App im Microsoft Entra Admin Center zu genehmigen.",
      },
    },
    features: {
      title: "Funktionen",
      items: {
        signIn: {
          title: "Microsoft-Konto-Anmeldung",
          description: "Melden Sie sich bei l4yercak3 mit Ihrem persönlichen oder beruflichen Microsoft-Konto für nahtlose Authentifizierung an.",
        },
        oneDrive: {
          title: "OneDrive-Integration",
          description: "Greifen Sie auf OneDrive-Dateien direkt in Ihren l4yercak3-Projekten zu und synchronisieren Sie sie.",
        },
        sharePoint: {
          title: "SharePoint-Konnektivität",
          description: "Verbinden Sie sich mit SharePoint-Websites für Dokumentenverwaltung und Team-Zusammenarbeit.",
        },
        azure: {
          title: "Azure-Bereitstellung",
          description: "Stellen Sie Ihre Webanwendungen auf Azure App Service und Azure Static Web Apps bereit.",
        },
        sso: {
          title: "Enterprise SSO",
          description: "Nutzen Sie das Single Sign-On Ihrer Organisation für sicheren, passwortlosen Zugang.",
        },
      },
    },
    troubleshooting: {
      title: "Fehlerbehebung",
      issues: {
        adminConsent: {
          title: "Admin-Zustimmung erforderlich",
          content: "Wenn Sie \"Admin-Genehmigung erforderlich\" sehen, erfordert Ihre Organisation, dass ein Administrator die App genehmigt. Kontaktieren Sie Ihren IT-Admin, um die Zustimmung im Microsoft Entra Admin Center zu erteilen.",
        },
        signInFailed: {
          title: "Anmeldung fehlgeschlagen",
          content: "Stellen Sie sicher, dass Sie das richtige Microsoft-Konto verwenden. Wenn Sie mehrere Konten haben, versuchen Sie, sich zuerst von allen Microsoft-Diensten abzumelden und dann erneut zu verbinden.",
        },
        permissionDenied: {
          title: "Zugriff verweigert",
          content: "Versuchen Sie, die Integration zu trennen und erneut zu verbinden. Stellen Sie sicher, dass Sie alle angeforderten Berechtigungen während des Autorisierungsablaufs akzeptieren.",
        },
        filesNotSyncing: {
          title: "Dateien werden nicht synchronisiert",
          content: "Überprüfen Sie, ob Sie die Files.ReadWrite-Berechtigung erteilt haben. Stellen Sie sicher, dass Ihr OneDrive-Speicher nicht voll ist und dass die Dateien nicht durch zusätzliche Sicherheitsrichtlinien geschützt sind.",
        },
      },
    },
    relatedIntegrations: {
      title: "Verwandte Integrationen",
      content: "Holen Sie das Beste aus l4yercak3 heraus, indem Sie Microsoft mit unseren anderen Integrationen kombinieren:",
    },
  },
};
