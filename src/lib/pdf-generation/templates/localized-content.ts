/**
 * Localized content for PDF templates
 * Based on the do-more-with-less translations
 */

import { Language } from '../../value-calculator/types';

export interface PDFContent {
  // Page titles and headers
  reportTitle: string;
  reportSubtitle: string;
  companyName: string;
  
  // Page 1: Executive Summary
  page1: {
    title: string;
    subtitle: string;
    preparedFor: string;
    totalValueLabel: string;
    laborCostLabel: string;
    newRevenueLabel: string;
    executiveSummaryTitle: string;
    executiveSummaryText: (data: {
      annualWaste: string;
      potentialFreedHours: string;
      conservativeNewRevenue: string;
      companyName: string;
    }) => string;
    keyMetrics: {
      hoursFreedLabel: string;
      newMembersLabel: string;
      automationLabel: string;
    };
  };
  
  // Page 2: Current Waste Analysis
  page2: {
    title: string;
    subtitle: string;
    wasteOverview: {
      title: string;
      subtitle: string;
      description: string;
    };
    taskBreakdown: {
      title: string;
      eventCoordination: string;
      memberCommunication: string;
      complianceReporting: string;
      financialAdmin: string;
      dataManagement: string;
      automationPotential: string;
      hoursAnnually: string;
      percentOfWork: string;
    };
    impactStatement: {
      title: string;
      description: (hours: string) => string;
      activities: string[];
    };
  };
  
  // Page 3: Next Steps
  page3: {
    title: string;
    subtitle: string;
    readyTitle: string;
    readyDescription: (data: { timeline: string; totalValue: string }) => string;
    ctaTitle: string;
    ctaDescription: string;
    contactLabels: {
      website: string;
      email: string;
    };
  };
  
  // Common labels
  common: {
    year: string;
    hours: string;
    percent: string;
    currency: string;
    reportDate: string;
  };
}

export const englishContent: PDFContent = {
  reportTitle: "Value Assessment Report",
  reportSubtitle: "Your Hidden Value Opportunity",
  companyName: "L4YERCAK3",
  
  page1: {
    title: "Your Hidden Value Opportunity",
    subtitle: "Total Annual Value Opportunity",
    preparedFor: "Prepared for",
    totalValueLabel: "Total Annual Value Opportunity",
    laborCostLabel: "Labor Cost Avoided",
    newRevenueLabel: "New Revenue Potential",
    executiveSummaryTitle: "Executive Summary",
    executiveSummaryText: (data) => 
      `Your organization is currently losing ${data.annualWaste} annually to manual processes that could be automated. This represents ${data.potentialFreedHours} hours of strategic capacity locked away in repetitive tasks.\n\nBy implementing ${data.companyName}'s automation platform, your team could redirect this capacity toward revenue-generating activities, potentially creating ${data.conservativeNewRevenue} in new annual revenue.`,
    keyMetrics: {
      hoursFreedLabel: "Hours/Week Freed",
      newMembersLabel: "New Members Possible",
      automationLabel: "Automation Potential",
    },
  },
  
  page2: {
    title: "Where Your Value Is Hidden",
    subtitle: "Analysis of manual processes consuming your team's strategic capacity",
    wasteOverview: {
      title: "Annual Cost of Manual Work",
      subtitle: "hours trapped in repetitive tasks",
      description: "Your hidden costs",
    },
    taskBreakdown: {
      title: "Task Breakdown Analysis",
      eventCoordination: "Event Coordination",
      memberCommunication: "Member Communication", 
      complianceReporting: "Compliance & Reporting",
      financialAdmin: "Financial Administration",
      dataManagement: "Data Management",
      automationPotential: "automation potential",
      hoursAnnually: "hours annually",
      percentOfWork: "of total manual work",
    },
    impactStatement: {
      title: "The Strategic Impact",
      description: (hours) => 
        `These ${hours} hours represent more than cost savings—they're your pathway to growth. Instead of copying data and managing spreadsheets, your team could focus on:`,
      activities: [
        "Member recruitment and retention strategies",
        "Strategic partnership development",
        "New program creation and expansion",
        "Revenue optimization initiatives",
        "Board-level strategic planning",
      ],
    },
  },
  
  page3: {
    title: "Your Path to Value Realization",
    subtitle: "Strategic implementation roadmap for your organization",
    readyTitle: "Ready to Get Started?",
    readyDescription: (data) => 
      `Your ${data.timeline} timeline aligns perfectly with our implementation approach. Let's discuss how to unlock your ${data.totalValue} value opportunity.`,
    ctaTitle: "Schedule Your Strategy Session",
    ctaDescription: "30-minute consultation to map your specific implementation plan",
    contactLabels: {
      website: "Website",
      email: "Email",
    },
  },
  
  common: {
    year: "/year",
    hours: "hours",
    percent: "%",
    currency: "€",
    reportDate: "Report Date",
  },
};

export const germanContent: PDFContent = {
  reportTitle: "Wertbewertungsbericht",
  reportSubtitle: "Ihre versteckte Wertchance",
  companyName: "L4YERCAK3",
  
  page1: {
    title: "Ihre versteckte Wertchance",
    subtitle: "Jährliche Gesamtwertchance",
    preparedFor: "Erstellt für",
    totalValueLabel: "Jährliche Gesamtwertchance",
    laborCostLabel: "Vermiedene Arbeitskosten",
    newRevenueLabel: "Neues Umsatzpotential",
    executiveSummaryTitle: "Zusammenfassung",
    executiveSummaryText: (data) => 
      `Ihre Organisation verliert derzeit ${data.annualWaste} jährlich durch manuelle Prozesse, die automatisiert werden könnten. Das entspricht ${data.potentialFreedHours} Stunden strategischer Kapazität, die in repetitiven Aufgaben gefangen sind.\n\nDurch die Implementierung von ${data.companyName}s Automatisierungsplattform könnte Ihr Team diese Kapazität auf umsatzgenerierende Aktivitäten umleiten und möglicherweise ${data.conservativeNewRevenue} neuen Jahresumsatz schaffen.`,
    keyMetrics: {
      hoursFreedLabel: "Stunden/Woche freigesetzt",
      newMembersLabel: "Neue Mitglieder möglich",
      automationLabel: "Automatisierungspotential",
    },
  },
  
  page2: {
    title: "Wo Ihr Wert versteckt ist",
    subtitle: "Analyse manueller Prozesse, die die strategische Kapazität Ihres Teams verbrauchen",
    wasteOverview: {
      title: "Jährliche Kosten manueller Arbeit",
      subtitle: "Stunden in repetitiven Aufgaben gefangen",
      description: "Ihre versteckten Kosten",
    },
    taskBreakdown: {
      title: "Aufgabenanalyse",
      eventCoordination: "Veranstaltungskoordination",
      memberCommunication: "Mitgliederkommunikation",
      complianceReporting: "Compliance & Berichtswesen",
      financialAdmin: "Finanzverwaltung", 
      dataManagement: "Datenverwaltung",
      automationPotential: "Automatisierungspotential",
      hoursAnnually: "Stunden jährlich",
      percentOfWork: "der gesamten manuellen Arbeit",
    },
    impactStatement: {
      title: "Die strategische Auswirkung",
      description: (hours) => 
        `Diese ${hours} Stunden bedeuten mehr als Kosteneinsparungen—sie sind Ihr Weg zum Wachstum. Anstatt Daten zu kopieren und Tabellen zu verwalten, könnte sich Ihr Team konzentrieren auf:`,
      activities: [
        "Mitgliedergewinnung und -bindungsstrategien",
        "Strategische Partnerschaftsentwicklung",
        "Neue Programmerstellung und -erweiterung",
        "Umsatzoptimierungsinitiativen",
        "Strategische Planung auf Vorstandsebene",
      ],
    },
  },
  
  page3: {
    title: "Ihr Weg zur Wertrealisierung",
    subtitle: "Strategische Implementierungs-Roadmap für Ihre Organisation",
    readyTitle: "Bereit anzufangen?",
    readyDescription: (data) => 
      `Ihr ${data.timeline} Zeitplan passt perfekt zu unserem Implementierungsansatz. Lassen Sie uns besprechen, wie Sie Ihre ${data.totalValue} Wertchance freisetzen können.`,
    ctaTitle: "Terminieren Sie Ihre Strategiesitzung",
    ctaDescription: "30-minütige Beratung zur Erstellung Ihres spezifischen Implementierungsplans",
    contactLabels: {
      website: "Website",
      email: "E-Mail",
    },
  },
  
  common: {
    year: "/Jahr",
    hours: "Stunden",
    percent: "%",
    currency: "€",
    reportDate: "Berichtsdatum",
  },
};

export function getLocalizedContent(language: Language): PDFContent {
  return language === 'de' ? germanContent : englishContent;
}