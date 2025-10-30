/**
 * German content for PDF generation
 * Based on requirements 1.5, 7.1, 7.2
 */

import { LocalizedContent } from '../../value-calculator/types';

export const DE_CONTENT: LocalizedContent = {
  pdf: {
    title: 'Wertanalyse-Bericht',
    executiveSummary: {
      title: 'Zusammenfassung',
      valueOpportunity: '{{totalValueCreated}} Jährliches Wertpotenzial',
      currentSituation: [
        '{{potentialFreedHours}} Stunden jährlich in manuellen Prozessen verschwendet',
        'Begrenzte Kapazitäten für strategische Wachstumsinitiativen',
        'Operative Ineffizienzen beeinträchtigen die Mitgliedererfahrung'
      ],
      withL4yercak3: [
        'Automatisierte Workflows sparen {{potentialFreedHours}} Stunden jährlich',
        'Strategische Kapazitäten für umsatzgenerierende Aktivitäten',
        'Verbesserte Mitgliedererfahrung durch optimierte Abläufe'
      ],
      pricingRedacted: '{{pricingRedacted}}',
      callToAction: 'Strategiegespräch vereinbaren'
    },
    taskBreakdown: {
      title: 'WO IHRE ZEIT HINGEHT',
      categories: {
        eventCoordination: 'Veranstaltungskoordination & -management',
        memberCommunication: 'Mitgliederkommunikation & Outreach',
        complianceReporting: 'Compliance & Berichtswesen',
        financialAdmin: 'Finanzverwaltung',
        dataManagement: 'Dateneingabe & -verwaltung'
      }
    },
    growthScenarios: {
      title: 'STRATEGISCHE KAPAZITÄTEN FREIGESETZT',
      opportunities: [
        'Mitgliedergewinnungsprogramme',
        'Entwicklung von Unternehmenspartnerschaften',
        'Premium-Service-Angebote',
        'Mitgliederbindungsinitiativen'
      ]
    },
    pilotMetrics: {
      title: 'ERST BEWEISEN: 90-TAGE-PILOT-RAHMEN',
      phases: {
        baseline: 'Baseline-Messung (Tage 1-14)',
        automation: 'Kern-Automatisierung Implementierung (Tage 15-60)',
        validation: 'Ergebnisvalidierung & Optimierung (Tage 61-90)'
      }
    }
  },
  email: {
    customer: {
      subject: 'Ihr Wertanalyse-Bericht ist bereit',
      greeting: 'Vielen Dank für Ihr Interesse an L4YERCAK3!',
      highlights: [
        'Ihre personalisierte Wertanalyse zeigt erhebliches Automatisierungspotenzial',
        'Wir haben spezifische Bereiche identifiziert, in denen Sie Verwaltungszeit zurückgewinnen können',
        'Der beigefügte Bericht skizziert einen klaren Weg zur operativen Effizienz'
      ],
      nextSteps: 'Nächste Schritte: Vereinbaren Sie ein 30-minütiges Strategiegespräch, um Ihre spezifischen Bedürfnisse zu besprechen und Pilot-Optionen zu erkunden.',
      cta: 'Strategiegespräch vereinbaren',
      signature: 'Mit freundlichen Grüßen,\nDas L4YERCAK3 Team',
      ps: 'P.S. Wir bieten Pilot-Programme an, die auf Ihrer aktuellen Zeichnungsberechtigung genehmigt werden können.'
    },
    sales: {
      subject: 'Neuer Value Calculator Lead',
      leadQuality: 'Lead-Qualitätsbewertung',
      talkingPoints: [
        'Fokus auf Zeitersparnis und operative Effizienz',
        'Pilot-Programm zur Risikominderung betonen',
        'ROI-Potenzial und Verbesserungen der Mitgliedererfahrung hervorheben'
      ],
      signatureAlert: 'Zeichnungsberechtigungs-Warnung'
    }
  }
};