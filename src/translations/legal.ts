// Legal pages translations

export const legalEn = {
  // Common legal elements
  common: {
    lastUpdated: "Last Updated: December 10, 2025",
    relatedDocuments: "Related Legal Documents",
    contactUs: "Contact Us",
    company: {
      name: "Vound Brand UG (haftungsbeschränkt)",
      address: "Am Markt 11",
      city: "17309 Pasewalk",
      country: "Germany",
      email: "info@voundbrand.com",
      vatId: "UST-ID: DE293728593",
    },
  },
  // Footer legal links
  links: {
    privacy: "Privacy",
    terms: "Terms",
    eula: "EULA",
    docs: "Docs",
    support: "Support",
    dpa: "DPA",
    reseller: "Reseller",
    dataDeletion: "Data Deletion",
  },
  // Privacy Policy page
  privacy: {
    title: "Privacy Policy",
    subtitle: "How we collect, use, and protect your data",
    sections: {
      introduction: {
        title: "1. Introduction",
        content: "respects your privacy and is committed to protecting the personal data of our users (\"User\" or \"you\"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you access our services.",
      },
      controller: {
        title: "2. Controller",
        content: "The controller within the meaning of the General Data Protection Regulation (GDPR) and other national data protection laws is:",
        dpo: "Data Protection Officer (DPO): As a small company with a single owner/operator and no core large-scale monitoring or special category data processing, we are not legally required to appoint a Data Protection Officer (Art. 37 GDPR). For all privacy inquiries, please contact us directly at the address above.",
      },
      dataCollected: {
        title: "3. Data We Collect",
        content: "We accumulate certain data to provide our Service effectively:",
        items: {
          identity: "Identity Data: Name, email address, password hash.",
          contact: "Contact Data: Billing address, phone number.",
          financial: "Financial Data: Payment details (processed securely via our payment provider Stripe; we do not store full credit card numbers).",
          technical: "Technical Data: IP address, login data, browser type and version, time zone setting, operating system.",
          usage: "Usage Data: Information on how you use our website and Service, including audit logs of actions taken within the platform.",
          userContent: "User Content: Data input into the Service, including text for AI processing and generated results.",
        },
      },
      purpose: {
        title: "4. Purpose of Processing",
        content: "We process your data for the following purposes:",
        items: [
          "To provide and operate the Service (including AI content generation).",
          "To manage your account and subscription.",
          "To process payments.",
          "To provide customer support.",
          "To improve our Service via analytics.",
          "To detect and prevent fraud and security issues.",
        ],
      },
      legalBasis: {
        title: "5. Legal Basis for Processing",
        content: "We process Personal Data under the following legal bases pursuant to the GDPR:",
        items: {
          consent: "Consent (Art. 6(1)(a) GDPR): Use of cookies/tracking technologies and sending of marketing emails.",
          contract: "Contract (Art. 6(1)(b) GDPR): Processing necessary to perform the contract with you (e.g., providing the service, processing payments).",
          legitimate: "Legitimate Interests (Art. 6(1)(f) GDPR): Network security, product improvement, and fraud prevention.",
        },
      },
      dataSharing: {
        title: "6. Data Sharing and Subprocessors",
        content: "We share data with the following categories of third-party service providers (Subprocessors) to operate our business:",
        items: {
          hosting: "Cloud Hosting: Vercel, Supabase, AWS",
          payment: "Payment Processing: Stripe",
          ai: "AI Models: OpenAI, Anthropic - strictly for content generation request handling",
          analytics: "Analytics: PostHog, Google Analytics",
        },
      },
      international: {
        title: "7. International Data Transfers",
        content: "If we transfer data to countries outside the European Economic Area (EEA), such as to the US for certain AI or cloud services, we ensure appropriate safeguards are in place, primarily through the use of Standard Contractual Clauses (SCCs) or reliance on the EU-US Data Privacy Framework where the provider is certified.",
      },
      retention: {
        title: "8. Data Retention",
        content: "We retain personal data only as long as necessary:",
        items: {
          account: "Account Data: For the duration of your account + transition period relative to deletion.",
          tax: "Tax/Commercial Records: 6 to 10 years as required by German commercial and tax law (§ 257 HGB, § 147 AO).",
          audit: "Audit Logs/Technical Data: 7 to 365 days depending on the tier and security relevance.",
          ai: "AI Input/Output: Retained transiently for generation or as part of your saved Project content until deleted by you.",
        },
      },
      rights: {
        title: "9. Your Data Protection Rights",
        content: "Under the GDPR, you have the following rights:",
        items: {
          withdraw: "Right to Withdraw Consent (Art. 7(3)): You may withdraw your consent at any time (e.g., opting out of marketing).",
          access: "Access, Rectification, Erasure: You can request to access, correct, or delete your data.",
          restriction: "Restriction & Objection: You may restrict processing or object to processing based on legitimate interests.",
          portability: "Data Portability: You may request your data in a structured format.",
          complaint: "Complaint: You have the right to lodge a complaint with a supervisory authority.",
        },
        supervisory: {
          title: "Supervisory Authority:",
          name: "Der Landesbeauftragte für Datenschutz und Informationsfreiheit Mecklenburg-Vorpommern",
          address: "Schloss Schwerin, Lennéstraße 1, 19053 Schwerin",
        },
      },
      security: {
        title: "10. Security (TOMs)",
        content: "We implement appropriate technical and organizational measures (\"TOMs\") including encryption (SSL/TLS), access controls, and regular security reviews to protect your data.",
      },
      changes: {
        title: "11. Changes to This Privacy Policy",
        content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last Updated\" date.",
      },
      contact: {
        title: "12. Contact Us",
        content: "If you have any questions about this Privacy Policy, please contact us at:",
      },
    },
  },
  // Terms of Service page
  terms: {
    title: "Terms of Service",
    subtitle: "The agreement that governs your use of our services",
    sections: {
      introduction: {
        title: "1. Introduction",
        content: "Welcome to the services provided by Vound Brand UG (haftungsbeschränkt) (\"Company\", \"we\", \"us\", or \"our\"). These Terms of Service (\"Terms\") govern your access to and use of our software-as-a-service platform and website (collectively, the \"Service\").",
        agreement: "By registering for a free account or accessing the Service, you (\"User\" or \"you\") agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.",
      },
      definitions: {
        title: "2. Definitions",
        items: {
          account: "\"Account\": The access authorization created by the User to use the Service.",
          content: "\"Content\": Any data, text, files, information, usernames, images, graphics, photos, profiles, audio and video clips, sounds, musical works, works of authorship, applications, links, and other content or materials that you submit, post, or display on or via the Service.",
          service: "\"Service\": The cloud-based software provided by Vound Brand UG (haftungsbeschränkt), including the free tier offering relevant to these Terms.",
        },
      },
      registration: {
        title: "3. Account Registration",
        eligibility: "3.1. Eligibility: You must be at least 18 years old and capable of forming a binding contract to use the Service.",
        information: "3.2. Account Information: You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.",
        security: "3.3. Security: You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.",
      },
      usage: {
        title: "4. Usage Rights",
        license: "4.1. License: Subject to your compliance with these Terms, Vound Brand UG (haftungsbeschränkt) grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Service for your internal business purposes or personal use, strictly in accordance with the features included in the free tier.",
        restrictions: "4.2. Restrictions: You may not:",
        restrictionItems: [
          "Reverse engineer, decompile, or disassemble the Service.",
          "Lease, lend, sell, or sublicense the Service.",
          "Use the Service to build a competitive product.",
          "Violate any applicable laws or regulations.",
        ],
        exception: "Exception for Resellers: The restrictions on leasing, lending, selling, or sublicensing do not apply if you have entered into a separate valid Written Reseller Agreement or White-Label Agreement with Vound Brand UG (haftungsbeschränkt). In such cases, your usage rights are governed by that separate agreement.",
      },
      acceptableUse: {
        title: "5. Acceptable Use Policy",
        content: "You agree not to misuse the Service. Prohibited activities include, but are not limited to:",
        items: [
          "Uploading or sharing content that is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.",
          "Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Service.",
          "Impersonating another person or otherwise misrepresenting your affiliation with a person or entity.",
        ],
      },
      ip: {
        title: "6. Intellectual Property",
        ourRights: "6.1. Our Rights: The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Vound Brand UG (haftungsbeschränkt) and its licensors.",
        yourContent: "6.2. Your Content: You retain ownership of any Content you submit. By submitting Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such Content solely for the purpose of providing, maintaining, and improving the Service.",
      },
      disclaimer: {
        title: "7. Disclaimer of Warranties",
        content: "The Service is provided on an \"AS IS\" and \"AS AVAILABLE\" basis. To the fullest extent permitted by law, appropriate to a free service, we disclaim all warranties.",
      },
      liability: {
        title: "8. Limitation of Liability (Haftungsbeschränkung)",
        unlimited: "8.1. Unlimited Liability: Vound Brand UG (haftungsbeschränkt) shall be liable without limitation for damages caused by intent (Vorsatz) or gross negligence (grobe Fahrlässigkeit), as well as for damages resulting from injury to life, body, or health, or under the Product Liability Act (Produkthaftungsgesetz).",
        limited: "8.2. Limited Liability for Simple Negligence: In cases of simple negligence (leichte Fahrlässigkeit), we shall only be liable for breaches of material contractual obligations (Kardinalspflichten)—obligations whose fulfillment is essential for the proper execution of the contract and on whose observance the user regularly relies. In such cases, liability is limited to the typically foreseeable damage at the time of contract conclusion.",
        freeTier: "8.3. Free Tier: For the free use of the Service, our liability for simple negligence is excluded, except for the cases mentioned in Section 8.1.",
      },
      withdrawal: {
        title: "9. Right of Withdrawal (Widerrufsbelehrung)",
        content: "If you are a consumer (Verbraucher) within the meaning of § 13 BGB, you have a statutory right of withdrawal.",
        boxTitle: "Right of Withdrawal",
        boxContent: "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day of the conclusion of the contract. To exercise the right of withdrawal, you must inform us (Vound Brand UG (haftungsbeschränkt), Am Markt 11, 17309 Pasewalk, info@voundbrand.com) of your decision to withdraw from this contract by an unequivocal statement (e.g., a letter sent by post or e-mail).",
        effectsTitle: "Effects of Withdrawal",
        effectsContent: "If you withdraw from this contract, we shall reimburse to you all payments received from you, including the costs of delivery, without undue delay and in any event not later than 14 days from the day on which we are informed about your decision to withdraw from this contract.",
      },
      dispute: {
        title: "10. Dispute Resolution",
        odr: "10.1. ODR Platform: The European Commission provides a platform for Online Dispute Resolution (ODR), which can be found at http://ec.europa.eu/consumers/odr/. We are generally not willing or obliged to participate in dispute settlement proceedings before a consumer arbitration board.",
        jurisdiction: "10.2. Jurisdiction: If the User is a merchant, a legal entity under public law, or a special fund under public law, the exclusive place of jurisdiction for all disputes arising from this contractual relationship is Pasewalk, Germany. German law applies.",
      },
      termination: {
        title: "11. Termination",
        content: "We may terminate or suspend your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.",
      },
      contact: {
        title: "12. Contact Us",
        content: "If you have any questions about these Terms, please contact us at:",
      },
    },
  },
  // EULA page
  eula: {
    title: "End User License Agreement",
    subtitle: "License terms for using the l4yercak3 platform",
    sections: {
      agreement: {
        title: "1. Agreement to Terms",
        content: "This End User License Agreement (\"EULA\") is a legal agreement between you (\"User\" or \"you\") and Vound Brand UG (haftungsbeschränkt) (\"Company\", \"we\", \"us\", or \"our\") for the use of the l4yercak3 platform and any related integrations, including the Vercel integration (collectively, the \"Software\").",
        acceptance: "By installing, copying, or otherwise using the Software, you agree to be bound by the terms of this EULA. If you do not agree to these terms, do not install or use the Software.",
      },
      license: {
        title: "2. License Grant",
        content: "Subject to the terms of this EULA, we grant you a limited, non-exclusive, non-transferable, revocable license to:",
        items: [
          "Access and use the Software for your personal or internal business purposes",
          "Connect the Software to third-party services (such as Vercel) as permitted by the Software's features",
          "Create and deploy web applications using the Software",
        ],
      },
      restrictions: {
        title: "3. Restrictions",
        content: "You may not:",
        items: [
          "Copy, modify, or distribute the Software except as expressly permitted",
          "Reverse engineer, decompile, or disassemble the Software",
          "Rent, lease, lend, sell, or sublicense the Software",
          "Use the Software to create a competing product or service",
          "Remove or alter any proprietary notices or labels on the Software",
          "Use the Software in any unlawful manner or for any illegal purpose",
          "Bypass or circumvent any security features of the Software",
        ],
      },
      thirdParty: {
        title: "4. Third-Party Integrations",
        content: "The Software may integrate with third-party services such as Vercel, GitHub, and others. Your use of these integrations is subject to:",
        items: [
          "The terms and conditions of the respective third-party services",
          "Any additional permissions or access you grant through OAuth or similar mechanisms",
          "The privacy policies of the respective third parties",
        ],
        disclaimer: "We are not responsible for the availability, accuracy, or functionality of third-party services. Your relationship with third-party service providers is governed by their respective terms.",
      },
      ip: {
        title: "5. Intellectual Property",
        content: "The Software and all copies thereof are proprietary to us and title, ownership rights, and intellectual property rights remain with us. The Software is protected by copyright and other intellectual property laws and treaties.",
        yourContent: "Your Content: You retain ownership of any content you create using the Software. By using the Software, you grant us a limited license to process your content solely for the purpose of providing the Software's features.",
      },
      privacy: {
        title: "6. Privacy and Data",
        content: "Your use of the Software is also governed by our Privacy Policy. When you use integrations like Vercel, certain data may be shared with third parties as necessary to provide the integration functionality.",
        dataShared: {
          title: "Data Shared with Integrations:",
          items: [
            "Project files and configurations for deployment",
            "Environment variables you configure",
            "Account information necessary for authentication",
          ],
        },
      },
      disclaimer: {
        title: "7. Disclaimer of Warranties",
        content: "THE SOFTWARE IS PROVIDED \"AS IS\" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.",
        additional: "We do not warrant that the Software will meet your requirements, operate without interruption, or be error-free. The entire risk as to the quality and performance of the Software is with you.",
      },
      liability: {
        title: "8. Limitation of Liability",
        content: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE SOFTWARE.",
        germanLaw: "This limitation applies under German law (Haftungsbeschränkung) as follows:",
        items: [
          "Unlimited liability for intent and gross negligence, and for injury to life, body, or health",
          "Limited liability for simple negligence only regarding material contractual obligations",
        ],
      },
      termination: {
        title: "9. Termination",
        content: "This EULA is effective until terminated. Your rights under this EULA will terminate automatically without notice if you fail to comply with any of its terms.",
        effects: "Upon termination, you must cease all use of the Software and destroy all copies in your possession. Termination does not affect any rights or obligations that accrued prior to termination.",
      },
      governingLaw: {
        title: "10. Governing Law",
        content: "This EULA shall be governed by and construed in accordance with the laws of the Federal Republic of Germany, without regard to its conflict of law provisions.",
        jurisdiction: "The exclusive place of jurisdiction for all disputes arising from this agreement is Pasewalk, Germany.",
      },
      contact: {
        title: "11. Contact Information",
        content: "For questions about this EULA, please contact:",
      },
    },
  },
  // Support page
  support: {
    title: "Support",
    subtitle: "Get help with l4yercak3 and our integrations",
    sections: {
      howToReach: {
        title: "How to Reach Us",
        email: {
          title: "Email Support",
          content: "For general inquiries, technical issues, or feature requests.",
        },
        call: {
          title: "Book a Call",
          content: "Schedule a call for personalized assistance or partnership discussions.",
        },
      },
      faq: {
        title: "Frequently Asked Questions",
        questions: {
          connectVercel: {
            q: "How do I connect my Vercel account?",
            a: "Navigate to Settings → Integrations in your l4yercak3 dashboard and click \"Connect Vercel\". You'll be redirected to Vercel to authorize the integration.",
          },
          permissions: {
            q: "What permissions does the Vercel integration need?",
            a: "We request permissions to create deployments, read and write projects, read user info, and read team information. See our documentation for full details.",
          },
          disconnect: {
            q: "Can I disconnect the Vercel integration?",
            a: "Yes, you can disconnect at any time from Settings → Integrations. You can also revoke access directly from your Vercel dashboard.",
          },
          security: {
            q: "Is my data secure?",
            a: "Yes. We use encryption (SSL/TLS), secure authentication, and follow GDPR requirements. See our Privacy Policy for details.",
          },
          enterprise: {
            q: "Do you offer enterprise plans?",
            a: "Yes, we offer custom enterprise solutions and white-label partnerships. Contact us for more information.",
          },
          responseTime: {
            q: "What's your response time?",
            a: "We aim to respond to all inquiries within 24-48 business hours. Enterprise customers receive priority support.",
          },
        },
      },
      troubleshooting: {
        title: "Vercel Integration Troubleshooting",
        issues: {
          deployment: {
            title: "Deployment Failed",
            content: "Check your build logs for specific errors. Common issues include missing environment variables or build script errors. Verify your project configuration matches Vercel's requirements.",
          },
          authorization: {
            title: "Authorization Error",
            content: "Try disconnecting and reconnecting the integration. Ensure you have the necessary permissions on your Vercel account or team.",
          },
          envVars: {
            title: "Environment Variables Not Syncing",
            content: "Verify your environment variables are correctly configured in l4yercak3. After making changes, trigger a new deployment for the variables to take effect.",
          },
        },
      },
      companyInfo: {
        title: "Company Information",
      },
      resources: {
        title: "Resources",
        documentation: "Documentation",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
      },
    },
  },
};

export const legalDe = {
  // Common legal elements
  common: {
    lastUpdated: "Zuletzt aktualisiert: 10. Dezember 2025",
    relatedDocuments: "Verwandte Rechtsdokumente",
    contactUs: "Kontakt",
    company: {
      name: "Vound Brand UG (haftungsbeschränkt)",
      address: "Am Markt 11",
      city: "17309 Pasewalk",
      country: "Deutschland",
      email: "info@voundbrand.com",
      vatId: "UST-ID: DE293728593",
    },
  },
  // Footer legal links
  links: {
    privacy: "Datenschutz",
    terms: "AGB",
    eula: "EULA",
    docs: "Dokumentation",
    support: "Support",
    dpa: "AVV",
    reseller: "Reseller",
    dataDeletion: "Datenlöschung",
  },
  // Privacy Policy page
  privacy: {
    title: "Datenschutzerklärung",
    subtitle: "Wie wir Ihre Daten sammeln, verwenden und schützen",
    sections: {
      introduction: {
        title: "1. Einleitung",
        content: "respektiert Ihre Privatsphäre und ist verpflichtet, die personenbezogenen Daten unserer Nutzer (\"Nutzer\" oder \"Sie\") zu schützen. Diese Datenschutzerklärung erläutert, wie wir Ihre Informationen sammeln, verwenden, offenlegen und schützen, wenn Sie auf unsere Dienste zugreifen.",
      },
      controller: {
        title: "2. Verantwortlicher",
        content: "Der Verantwortliche im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler Datenschutzgesetze ist:",
        dpo: "Datenschutzbeauftragter (DSB): Als kleines Unternehmen mit einem einzelnen Eigentümer/Betreiber und ohne umfangreiche Überwachung oder Verarbeitung besonderer Kategorien personenbezogener Daten sind wir nicht gesetzlich verpflichtet, einen Datenschutzbeauftragten zu benennen (Art. 37 DSGVO). Für alle Datenschutzanfragen kontaktieren Sie uns bitte direkt unter der oben angegebenen Adresse.",
      },
      dataCollected: {
        title: "3. Daten, die wir erheben",
        content: "Wir erheben bestimmte Daten, um unseren Dienst effektiv bereitzustellen:",
        items: {
          identity: "Identitätsdaten: Name, E-Mail-Adresse, Passwort-Hash.",
          contact: "Kontaktdaten: Rechnungsadresse, Telefonnummer.",
          financial: "Finanzdaten: Zahlungsdetails (sicher verarbeitet über unseren Zahlungsanbieter Stripe; wir speichern keine vollständigen Kreditkartennummern).",
          technical: "Technische Daten: IP-Adresse, Login-Daten, Browsertyp und -version, Zeitzoneneinstellung, Betriebssystem.",
          usage: "Nutzungsdaten: Informationen darüber, wie Sie unsere Website und unseren Dienst nutzen, einschließlich Audit-Protokolle von Aktionen innerhalb der Plattform.",
          userContent: "Benutzerinhalte: In den Dienst eingegebene Daten, einschließlich Text für KI-Verarbeitung und generierte Ergebnisse.",
        },
      },
      purpose: {
        title: "4. Zweck der Verarbeitung",
        content: "Wir verarbeiten Ihre Daten für folgende Zwecke:",
        items: [
          "Zur Bereitstellung und zum Betrieb des Dienstes (einschließlich KI-Inhaltsgenerierung).",
          "Zur Verwaltung Ihres Kontos und Abonnements.",
          "Zur Verarbeitung von Zahlungen.",
          "Zur Bereitstellung von Kundensupport.",
          "Zur Verbesserung unseres Dienstes durch Analysen.",
          "Zur Erkennung und Verhinderung von Betrug und Sicherheitsproblemen.",
        ],
      },
      legalBasis: {
        title: "5. Rechtsgrundlage der Verarbeitung",
        content: "Wir verarbeiten personenbezogene Daten auf folgenden Rechtsgrundlagen gemäß der DSGVO:",
        items: {
          consent: "Einwilligung (Art. 6(1)(a) DSGVO): Verwendung von Cookies/Tracking-Technologien und Versand von Marketing-E-Mails.",
          contract: "Vertrag (Art. 6(1)(b) DSGVO): Verarbeitung, die zur Erfüllung des Vertrags mit Ihnen erforderlich ist (z.B. Bereitstellung des Dienstes, Zahlungsabwicklung).",
          legitimate: "Berechtigte Interessen (Art. 6(1)(f) DSGVO): Netzwerksicherheit, Produktverbesserung und Betrugsprävention.",
        },
      },
      dataSharing: {
        title: "6. Datenweitergabe und Auftragsverarbeiter",
        content: "Wir teilen Daten mit folgenden Kategorien von Drittanbietern (Auftragsverarbeitern), um unser Geschäft zu betreiben:",
        items: {
          hosting: "Cloud-Hosting: Vercel, Supabase, AWS",
          payment: "Zahlungsabwicklung: Stripe",
          ai: "KI-Modelle: OpenAI, Anthropic - ausschließlich für die Bearbeitung von Inhaltsgenerierungsanfragen",
          analytics: "Analysen: PostHog, Google Analytics",
        },
      },
      international: {
        title: "7. Internationale Datenübermittlungen",
        content: "Wenn wir Daten in Länder außerhalb des Europäischen Wirtschaftsraums (EWR) übertragen, wie z.B. in die USA für bestimmte KI- oder Cloud-Dienste, stellen wir sicher, dass angemessene Schutzmaßnahmen vorhanden sind, hauptsächlich durch die Verwendung von Standardvertragsklauseln (SCCs) oder die Berufung auf das EU-US-Datenschutzrahmenwerk, wenn der Anbieter zertifiziert ist.",
      },
      retention: {
        title: "8. Datenspeicherung",
        content: "Wir speichern personenbezogene Daten nur so lange wie nötig:",
        items: {
          account: "Kontodaten: Für die Dauer Ihres Kontos + Übergangszeitraum bezüglich der Löschung.",
          tax: "Steuer-/Geschäftsunterlagen: 6 bis 10 Jahre gemäß deutschem Handels- und Steuerrecht (§ 257 HGB, § 147 AO).",
          audit: "Audit-Protokolle/Technische Daten: 7 bis 365 Tage je nach Stufe und Sicherheitsrelevanz.",
          ai: "KI-Ein-/Ausgabe: Vorübergehend für die Generierung gespeichert oder als Teil Ihrer gespeicherten Projektinhalte, bis Sie diese löschen.",
        },
      },
      rights: {
        title: "9. Ihre Datenschutzrechte",
        content: "Gemäß der DSGVO haben Sie folgende Rechte:",
        items: {
          withdraw: "Recht auf Widerruf der Einwilligung (Art. 7(3)): Sie können Ihre Einwilligung jederzeit widerrufen (z.B. Abmeldung vom Marketing).",
          access: "Auskunft, Berichtigung, Löschung: Sie können Zugang zu Ihren Daten anfordern, diese korrigieren oder löschen lassen.",
          restriction: "Einschränkung & Widerspruch: Sie können die Verarbeitung einschränken oder der Verarbeitung aufgrund berechtigter Interessen widersprechen.",
          portability: "Datenübertragbarkeit: Sie können Ihre Daten in einem strukturierten Format anfordern.",
          complaint: "Beschwerde: Sie haben das Recht, eine Beschwerde bei einer Aufsichtsbehörde einzureichen.",
        },
        supervisory: {
          title: "Aufsichtsbehörde:",
          name: "Der Landesbeauftragte für Datenschutz und Informationsfreiheit Mecklenburg-Vorpommern",
          address: "Schloss Schwerin, Lennéstraße 1, 19053 Schwerin",
        },
      },
      security: {
        title: "10. Sicherheit (TOMs)",
        content: "Wir implementieren angemessene technische und organisatorische Maßnahmen (\"TOMs\"), einschließlich Verschlüsselung (SSL/TLS), Zugriffskontrollen und regelmäßiger Sicherheitsüberprüfungen, um Ihre Daten zu schützen.",
      },
      changes: {
        title: "11. Änderungen dieser Datenschutzerklärung",
        content: "Wir können unsere Datenschutzerklärung von Zeit zu Zeit aktualisieren. Wir werden Sie über Änderungen informieren, indem wir die neue Datenschutzerklärung auf dieser Seite veröffentlichen und das Datum \"Zuletzt aktualisiert\" aktualisieren.",
      },
      contact: {
        title: "12. Kontakt",
        content: "Wenn Sie Fragen zu dieser Datenschutzerklärung haben, kontaktieren Sie uns bitte unter:",
      },
    },
  },
  // Terms of Service page
  terms: {
    title: "Allgemeine Geschäftsbedingungen",
    subtitle: "Die Vereinbarung, die Ihre Nutzung unserer Dienste regelt",
    sections: {
      introduction: {
        title: "1. Einleitung",
        content: "Willkommen bei den Diensten der Vound Brand UG (haftungsbeschränkt) (\"Unternehmen\", \"wir\", \"uns\" oder \"unser\"). Diese Allgemeinen Geschäftsbedingungen (\"AGB\") regeln Ihren Zugang zu und die Nutzung unserer Software-as-a-Service-Plattform und Website (zusammen der \"Dienst\").",
        agreement: "Mit der Registrierung für ein kostenloses Konto oder dem Zugriff auf den Dienst erklären Sie sich (\"Nutzer\" oder \"Sie\") mit diesen AGB einverstanden. Wenn Sie diesen AGB nicht zustimmen, dürfen Sie nicht auf den Dienst zugreifen oder ihn nutzen.",
      },
      definitions: {
        title: "2. Definitionen",
        items: {
          account: "\"Konto\": Die vom Nutzer erstellte Zugriffsberechtigung zur Nutzung des Dienstes.",
          content: "\"Inhalte\": Alle Daten, Texte, Dateien, Informationen, Benutzernamen, Bilder, Grafiken, Fotos, Profile, Audio- und Videoclips, Töne, musikalische Werke, Werke der Urheberschaft, Anwendungen, Links und andere Inhalte oder Materialien, die Sie über den Dienst einreichen, veröffentlichen oder anzeigen.",
          service: "\"Dienst\": Die von der Vound Brand UG (haftungsbeschränkt) bereitgestellte Cloud-basierte Software, einschließlich des kostenlosen Angebots gemäß diesen AGB.",
        },
      },
      registration: {
        title: "3. Kontoregistrierung",
        eligibility: "3.1. Berechtigung: Sie müssen mindestens 18 Jahre alt sein und in der Lage sein, einen bindenden Vertrag abzuschließen, um den Dienst zu nutzen.",
        information: "3.2. Kontoinformationen: Sie erklären sich damit einverstanden, während des Registrierungsprozesses genaue, aktuelle und vollständige Informationen anzugeben und diese zu aktualisieren, um sie aktuell und vollständig zu halten.",
        security: "3.3. Sicherheit: Sie sind für den Schutz des Passworts verantwortlich, das Sie für den Zugriff auf den Dienst verwenden, sowie für alle Aktivitäten oder Handlungen unter Ihrem Passwort. Sie stimmen zu, Ihr Passwort keiner dritten Partei offenzulegen.",
      },
      usage: {
        title: "4. Nutzungsrechte",
        license: "4.1. Lizenz: Vorbehaltlich Ihrer Einhaltung dieser AGB gewährt Ihnen die Vound Brand UG (haftungsbeschränkt) eine beschränkte, nicht-exklusive, nicht übertragbare, nicht unterlizenzierbare Lizenz zum Zugriff auf und zur Nutzung des Dienstes für Ihre internen Geschäftszwecke oder den persönlichen Gebrauch, streng in Übereinstimmung mit den im kostenlosen Tarif enthaltenen Funktionen.",
        restrictions: "4.2. Einschränkungen: Sie dürfen nicht:",
        restrictionItems: [
          "Den Dienst zurückentwickeln, dekompilieren oder disassemblieren.",
          "Den Dienst vermieten, verleihen, verkaufen oder unterlizenzieren.",
          "Den Dienst verwenden, um ein Konkurrenzprodukt zu erstellen.",
          "Gegen geltende Gesetze oder Vorschriften verstoßen.",
        ],
        exception: "Ausnahme für Reseller: Die Einschränkungen für das Vermieten, Verleihen, Verkaufen oder Unterlizenzieren gelten nicht, wenn Sie eine separate gültige schriftliche Reseller-Vereinbarung oder White-Label-Vereinbarung mit der Vound Brand UG (haftungsbeschränkt) abgeschlossen haben. In solchen Fällen werden Ihre Nutzungsrechte durch diese separate Vereinbarung geregelt.",
      },
      acceptableUse: {
        title: "5. Nutzungsrichtlinien",
        content: "Sie erklären sich damit einverstanden, den Dienst nicht zu missbrauchen. Verbotene Aktivitäten umfassen unter anderem:",
        items: [
          "Das Hochladen oder Teilen von Inhalten, die rechtswidrig, schädlich, bedrohlich, missbräuchlich, belästigend, diffamierend oder anderweitig anstößig sind.",
          "Versuche, die Systemintegrität oder -sicherheit zu beeinträchtigen oder zu kompromittieren oder Übertragungen zu oder von den Servern, die den Dienst betreiben, zu entschlüsseln.",
          "Das Ausgeben als eine andere Person oder das anderweitige Falschdarstellen Ihrer Zugehörigkeit zu einer Person oder Organisation.",
        ],
      },
      ip: {
        title: "6. Geistiges Eigentum",
        ourRights: "6.1. Unsere Rechte: Der Dienst und seine Originalinhalte (ausgenommen von Nutzern bereitgestellte Inhalte), Funktionen und Funktionalitäten sind und bleiben das ausschließliche Eigentum der Vound Brand UG (haftungsbeschränkt) und ihrer Lizenzgeber.",
        yourContent: "6.2. Ihre Inhalte: Sie behalten das Eigentum an allen von Ihnen eingereichten Inhalten. Mit der Einreichung von Inhalten gewähren Sie uns eine weltweite, nicht-exklusive, lizenzfreie Lizenz zur Nutzung, Vervielfältigung, Änderung, Anpassung, Veröffentlichung und Anzeige solcher Inhalte ausschließlich zum Zweck der Bereitstellung, Wartung und Verbesserung des Dienstes.",
      },
      disclaimer: {
        title: "7. Gewährleistungsausschluss",
        content: "Der Dienst wird auf einer \"WIE BESEHEN\"- und \"WIE VERFÜGBAR\"-Basis bereitgestellt. Im größtmöglichen gesetzlich zulässigen Umfang, angemessen für einen kostenlosen Dienst, schließen wir alle Gewährleistungen aus.",
      },
      liability: {
        title: "8. Haftungsbeschränkung",
        unlimited: "8.1. Unbeschränkte Haftung: Die Vound Brand UG (haftungsbeschränkt) haftet unbeschränkt für Schäden, die durch Vorsatz oder grobe Fahrlässigkeit verursacht wurden, sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit oder nach dem Produkthaftungsgesetz.",
        limited: "8.2. Beschränkte Haftung bei leichter Fahrlässigkeit: Bei leichter Fahrlässigkeit haften wir nur für die Verletzung wesentlicher Vertragspflichten (Kardinalspflichten) – Pflichten, deren Erfüllung für die ordnungsgemäße Durchführung des Vertrags wesentlich ist und auf deren Einhaltung der Nutzer regelmäßig vertrauen darf. In solchen Fällen ist die Haftung auf den typischerweise vorhersehbaren Schaden zum Zeitpunkt des Vertragsabschlusses beschränkt.",
        freeTier: "8.3. Kostenloser Tarif: Für die kostenlose Nutzung des Dienstes ist unsere Haftung für leichte Fahrlässigkeit ausgeschlossen, außer in den in Abschnitt 8.1 genannten Fällen.",
      },
      withdrawal: {
        title: "9. Widerrufsbelehrung",
        content: "Wenn Sie ein Verbraucher im Sinne von § 13 BGB sind, haben Sie ein gesetzliches Widerrufsrecht.",
        boxTitle: "Widerrufsrecht",
        boxContent: "Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14 Tage ab dem Tag des Vertragsabschlusses. Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Vound Brand UG (haftungsbeschränkt), Am Markt 11, 17309 Pasewalk, info@voundbrand.com) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.",
        effectsTitle: "Folgen des Widerrufs",
        effectsContent: "Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten, unverzüglich und spätestens binnen 14 Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.",
      },
      dispute: {
        title: "10. Streitbeilegung",
        odr: "10.1. OS-Plattform: Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die unter http://ec.europa.eu/consumers/odr/ zu finden ist. Wir sind grundsätzlich nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        jurisdiction: "10.2. Gerichtsstand: Ist der Nutzer Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertragsverhältnis Pasewalk, Deutschland. Es gilt deutsches Recht.",
      },
      termination: {
        title: "11. Kündigung",
        content: "Wir können Ihr Konto jederzeit und ohne Vorankündigung oder Haftung aus beliebigem Grund kündigen oder sperren, einschließlich, aber nicht beschränkt auf einen Verstoß gegen die AGB. Nach Kündigung erlischt Ihr Recht zur Nutzung des Dienstes sofort.",
      },
      contact: {
        title: "12. Kontakt",
        content: "Wenn Sie Fragen zu diesen AGB haben, kontaktieren Sie uns bitte unter:",
      },
    },
  },
  // EULA page
  eula: {
    title: "Endbenutzer-Lizenzvereinbarung",
    subtitle: "Lizenzbedingungen für die Nutzung der l4yercak3-Plattform",
    sections: {
      agreement: {
        title: "1. Zustimmung zu den Bedingungen",
        content: "Diese Endbenutzer-Lizenzvereinbarung (\"EULA\") ist eine rechtliche Vereinbarung zwischen Ihnen (\"Nutzer\" oder \"Sie\") und der Vound Brand UG (haftungsbeschränkt) (\"Unternehmen\", \"wir\", \"uns\" oder \"unser\") für die Nutzung der l4yercak3-Plattform und aller zugehörigen Integrationen, einschließlich der Vercel-Integration (zusammen die \"Software\").",
        acceptance: "Durch die Installation, das Kopieren oder die anderweitige Nutzung der Software erklären Sie sich mit den Bedingungen dieser EULA einverstanden. Wenn Sie diesen Bedingungen nicht zustimmen, installieren oder nutzen Sie die Software nicht.",
      },
      license: {
        title: "2. Lizenzgewährung",
        content: "Vorbehaltlich der Bedingungen dieser EULA gewähren wir Ihnen eine beschränkte, nicht-exklusive, nicht übertragbare, widerrufliche Lizenz zu:",
        items: [
          "Zugriff auf und Nutzung der Software für Ihre persönlichen oder internen Geschäftszwecke",
          "Verbindung der Software mit Drittanbieterdiensten (wie Vercel) gemäß den Funktionen der Software",
          "Erstellung und Bereitstellung von Webanwendungen mit der Software",
        ],
      },
      restrictions: {
        title: "3. Einschränkungen",
        content: "Sie dürfen nicht:",
        items: [
          "Die Software kopieren, ändern oder verbreiten, außer wie ausdrücklich gestattet",
          "Die Software zurückentwickeln, dekompilieren oder disassemblieren",
          "Die Software vermieten, leasen, verleihen, verkaufen oder unterlizenzieren",
          "Die Software verwenden, um ein Konkurrenzprodukt oder einen Konkurrenzdienst zu erstellen",
          "Eigentumsvermerke oder Kennzeichnungen auf der Software entfernen oder ändern",
          "Die Software in einer rechtswidrigen Weise oder für illegale Zwecke verwenden",
          "Sicherheitsfunktionen der Software umgehen oder aushebeln",
        ],
      },
      thirdParty: {
        title: "4. Drittanbieter-Integrationen",
        content: "Die Software kann mit Drittanbieterdiensten wie Vercel, GitHub und anderen integriert werden. Ihre Nutzung dieser Integrationen unterliegt:",
        items: [
          "Den Geschäftsbedingungen der jeweiligen Drittanbieterdienste",
          "Zusätzlichen Berechtigungen oder Zugriffen, die Sie über OAuth oder ähnliche Mechanismen gewähren",
          "Den Datenschutzrichtlinien der jeweiligen Dritten",
        ],
        disclaimer: "Wir sind nicht verantwortlich für die Verfügbarkeit, Genauigkeit oder Funktionalität von Drittanbieterdiensten. Ihre Beziehung zu Drittanbieter-Dienstleistern wird durch deren jeweilige Bedingungen geregelt.",
      },
      ip: {
        title: "5. Geistiges Eigentum",
        content: "Die Software und alle Kopien davon sind unser Eigentum, und Titel, Eigentumsrechte und geistige Eigentumsrechte verbleiben bei uns. Die Software ist durch Urheberrechts- und andere geistige Eigentumsgesetze und -verträge geschützt.",
        yourContent: "Ihre Inhalte: Sie behalten das Eigentum an allen Inhalten, die Sie mit der Software erstellen. Durch die Nutzung der Software gewähren Sie uns eine beschränkte Lizenz zur Verarbeitung Ihrer Inhalte ausschließlich zum Zweck der Bereitstellung der Softwarefunktionen.",
      },
      privacy: {
        title: "6. Datenschutz und Daten",
        content: "Ihre Nutzung der Software unterliegt auch unserer Datenschutzerklärung. Wenn Sie Integrationen wie Vercel nutzen, können bestimmte Daten mit Dritten geteilt werden, soweit dies zur Bereitstellung der Integrationsfunktionalität erforderlich ist.",
        dataShared: {
          title: "Mit Integrationen geteilte Daten:",
          items: [
            "Projektdateien und Konfigurationen für die Bereitstellung",
            "Von Ihnen konfigurierte Umgebungsvariablen",
            "Für die Authentifizierung erforderliche Kontoinformationen",
          ],
        },
      },
      disclaimer: {
        title: "7. Gewährleistungsausschluss",
        content: "DIE SOFTWARE WIRD \"WIE BESEHEN\" OHNE JEGLICHE GEWÄHRLEISTUNG BEREITGESTELLT, WEDER AUSDRÜCKLICH NOCH STILLSCHWEIGEND, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG.",
        additional: "Wir garantieren nicht, dass die Software Ihren Anforderungen entspricht, unterbrechungsfrei funktioniert oder fehlerfrei ist. Das gesamte Risiko hinsichtlich der Qualität und Leistung der Software liegt bei Ihnen.",
      },
      liability: {
        title: "8. Haftungsbeschränkung",
        content: "IM MAXIMAL GESETZLICH ZULÄSSIGEN UMFANG SIND WIR IN KEINEM FALL FÜR BESONDERE, ZUFÄLLIGE, INDIREKTE ODER FOLGESCHÄDEN HAFTBAR, DIE AUS ODER IN VERBINDUNG MIT IHRER NUTZUNG ODER NICHTNUTZUNG DER SOFTWARE ENTSTEHEN.",
        germanLaw: "Diese Beschränkung gilt nach deutschem Recht (Haftungsbeschränkung) wie folgt:",
        items: [
          "Unbeschränkte Haftung bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung des Lebens, des Körpers oder der Gesundheit",
          "Beschränkte Haftung bei leichter Fahrlässigkeit nur bei wesentlichen Vertragspflichten",
        ],
      },
      termination: {
        title: "9. Kündigung",
        content: "Diese EULA gilt bis zur Kündigung. Ihre Rechte unter dieser EULA erlöschen automatisch ohne Vorankündigung, wenn Sie gegen eine ihrer Bedingungen verstoßen.",
        effects: "Nach Kündigung müssen Sie jede Nutzung der Software einstellen und alle Kopien in Ihrem Besitz vernichten. Die Kündigung berührt keine Rechte oder Pflichten, die vor der Kündigung entstanden sind.",
      },
      governingLaw: {
        title: "10. Anwendbares Recht",
        content: "Diese EULA unterliegt dem Recht der Bundesrepublik Deutschland und wird in Übereinstimmung damit ausgelegt, ohne Berücksichtigung von Kollisionsnormen.",
        jurisdiction: "Ausschließlicher Gerichtsstand für alle Streitigkeiten aus dieser Vereinbarung ist Pasewalk, Deutschland.",
      },
      contact: {
        title: "11. Kontakt",
        content: "Bei Fragen zu dieser EULA kontaktieren Sie uns bitte unter:",
      },
    },
  },
  // Support page
  support: {
    title: "Support",
    subtitle: "Hilfe zu l4yercak3 und unseren Integrationen",
    sections: {
      howToReach: {
        title: "So erreichen Sie uns",
        email: {
          title: "E-Mail-Support",
          content: "Für allgemeine Anfragen, technische Probleme oder Funktionsanfragen.",
        },
        call: {
          title: "Anruf buchen",
          content: "Planen Sie einen Anruf für persönliche Unterstützung oder Partnerschaftsgespräche.",
        },
      },
      faq: {
        title: "Häufig gestellte Fragen",
        questions: {
          connectVercel: {
            q: "Wie verbinde ich mein Vercel-Konto?",
            a: "Navigieren Sie zu Einstellungen → Integrationen in Ihrem l4yercak3-Dashboard und klicken Sie auf \"Vercel verbinden\". Sie werden zu Vercel weitergeleitet, um die Integration zu autorisieren.",
          },
          permissions: {
            q: "Welche Berechtigungen benötigt die Vercel-Integration?",
            a: "Wir fordern Berechtigungen zum Erstellen von Deployments, Lesen und Schreiben von Projekten, Lesen von Benutzerinformationen und Lesen von Team-Informationen an. Siehe unsere Dokumentation für vollständige Details.",
          },
          disconnect: {
            q: "Kann ich die Vercel-Integration trennen?",
            a: "Ja, Sie können die Verbindung jederzeit unter Einstellungen → Integrationen trennen. Sie können den Zugriff auch direkt von Ihrem Vercel-Dashboard widerrufen.",
          },
          security: {
            q: "Sind meine Daten sicher?",
            a: "Ja. Wir verwenden Verschlüsselung (SSL/TLS), sichere Authentifizierung und befolgen DSGVO-Anforderungen. Siehe unsere Datenschutzerklärung für Details.",
          },
          enterprise: {
            q: "Bieten Sie Enterprise-Pläne an?",
            a: "Ja, wir bieten maßgeschneiderte Enterprise-Lösungen und White-Label-Partnerschaften an. Kontaktieren Sie uns für weitere Informationen.",
          },
          responseTime: {
            q: "Wie ist Ihre Antwortzeit?",
            a: "Wir bemühen uns, alle Anfragen innerhalb von 24-48 Geschäftsstunden zu beantworten. Enterprise-Kunden erhalten vorrangigen Support.",
          },
        },
      },
      troubleshooting: {
        title: "Vercel-Integration Fehlerbehebung",
        issues: {
          deployment: {
            title: "Deployment fehlgeschlagen",
            content: "Überprüfen Sie Ihre Build-Protokolle auf spezifische Fehler. Häufige Probleme sind fehlende Umgebungsvariablen oder Build-Skript-Fehler. Stellen Sie sicher, dass Ihre Projektkonfiguration den Anforderungen von Vercel entspricht.",
          },
          authorization: {
            title: "Autorisierungsfehler",
            content: "Versuchen Sie, die Integration zu trennen und erneut zu verbinden. Stellen Sie sicher, dass Sie die erforderlichen Berechtigungen für Ihr Vercel-Konto oder Team haben.",
          },
          envVars: {
            title: "Umgebungsvariablen werden nicht synchronisiert",
            content: "Überprüfen Sie, ob Ihre Umgebungsvariablen in l4yercak3 korrekt konfiguriert sind. Nach Änderungen lösen Sie ein neues Deployment aus, damit die Variablen wirksam werden.",
          },
        },
      },
      companyInfo: {
        title: "Unternehmensinformationen",
      },
      resources: {
        title: "Ressourcen",
        documentation: "Dokumentation",
        privacyPolicy: "Datenschutzerklärung",
        termsOfService: "Allgemeine Geschäftsbedingungen",
      },
    },
  },
};
