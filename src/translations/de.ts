import { manifestoDe } from './manifesto';
import { learnMoreDe } from './learn-more';
import { doMoreWithLessDe } from './go-to-market';
import { buildSprintDe } from './build-sprint';
import { founderCalculatorDe } from './founder-calculator';

export const de = {
  common: {
    backToHome: "Zurück zur Startseite",
    readMore: "Das vollständige Manifest lesen",
    darkMode: "Dunkler Modus",
    sepiaMode: "Sepia-Modus",
    getEarlyAccess: "Frühen Zugang erhalten",
    english: "English",
    german: "Deutsch",
    bookCall: "Anruf buchen",
    bookCallTitle: "Anruf buchen",
    letsConnect: "Mit uns in Kontakt treten",
    goToApp: "Zur App",
    availableTimes: "Verfügbare Zeiten",
    selectDate: "Wählen Sie ein Datum, um verfügbare Zeiten zu sehen",
    bookCallButton: "Anruf buchen",
    selectDateTime: "Wählen Sie Datum und Uhrzeit aus, um fortzufahren",
  },
  navigation: {
    home: "Startseite",
    manifesto: "Manifest",
    learnMore: "Schnell Shippen",
    valueCalculator: "Go to Market",
    buildSprint: "Build Sprint",
    toggleMenu: "Menü umschalten",
    closeMenu: "Menü schließen",
    switchToEnglish: "Zu Englisch wechseln",
    switchToGerman: "Zu Deutsch wechseln"
  },
  newsletter: {
    title: "l4yercak3",
    subtitle: "Dein Backend. Bereits gebaut. Shippe dieses Quartal.",
    urgency: "🔥 3 Build Sprint Plätze für {quarter} {year} — Jetzt bewerben",
    description: "Schluss mit dem Neubauen von Auth, Datenbank, E-Mail und Payments für jedes Projekt. Wir haben die Infrastruktur gebaut. Du baust, was dein Produkt einzigartig macht.",
    helperText: "Updates zu l4yercak3 erhalten — neue Features, Builder-Ressourcen, Launch-Stories",
    emailPlaceholder: "E-Mail-Adresse eingeben",
    manifesto: "Manifest",
    learnMore: "Schnell Shippen",
    calculateROI: "Go to Market",
    subscriptionTypes: {
      newsletter: "Updates erhalten",
      privateAccess: "Zugang beantragen",
      both: "Beides"
    },
    subscriptionDescriptions: {
      newsletter: "Updates erhalten, über L4YERCAK3 informiert bleiben",
      privateAccess: "Für Private Beta bewerben – Begrenzte Plätze, wer zuerst kommt, mahlt zuerst",
      both: "Updates erhalten UND für Private Beta bewerben"
    },
    successMessages: {
      newsletter: "Sie haben unseren Newsletter abonniert. Bleiben Sie dran für Updates!",
      privateAccess: "Sie stehen auf der Liste für privaten Zugang. Wir benachrichtigen Sie, wenn es soweit ist!",
      both: "Alles erledigt! Newsletter + privater Zugang. Schauen Sie in Ihre E-Mails!",
      updated: "Aktualisiert! "
    }
  },
  application: {
    title: "Für Build Sprint bewerben",
    subtitle: "Reservieren Sie Ihren Platz für {quarter} {year}",
    fields: {
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail-Adresse",
      phone: "Telefonnummer",
      company: "Firma / Projektname",
      role: "Ihre Position",
      fundingStage: "Finanzierungsphase",
      techTeamSize: "Technische Teamgröße",
      primaryGoal: "Hauptziel",
      timelineUrgency: "Zeitrahmen",
      currentStack: "Aktueller Tech-Stack (optional)",
      whatYouWantToBuild: "Was möchten Sie bauen?"
    },
    placeholders: {
      firstName: "Geben Sie Ihren Vornamen ein",
      lastName: "Geben Sie Ihren Nachnamen ein",
      email: "Geben Sie Ihre E-Mail-Adresse ein",
      phone: "Geben Sie Ihre Telefonnummer ein",
      company: "Ihr Startup- oder Projektname",
      role: "z.B. Gründer, CTO, Technischer Mitgründer",
      currentStack: "z.B. React, Node.js, PostgreSQL, oder 'Von Grund auf neu'",
      whatYouWantToBuild: "Beschreiben Sie Ihre Produktidee, das Problem das Sie lösen, und was Sie zum Launch benötigen..."
    },
    options: {
      fundingStage: {
        placeholder: "Finanzierungsphase auswählen",
        "bootstrapped": "Bootstrapped / Eigenfinanziert",
        "pre-seed": "Pre-Seed",
        "seed": "Seed",
        "series-a": "Series A",
        "series-b+": "Series B+"
      },
      techTeamSize: {
        placeholder: "Teamgröße auswählen",
        "solo": "Solo-Gründer (noch keine Entwickler)",
        "1-2": "1-2 Entwickler",
        "3-5": "3-5 Entwickler",
        "6-10": "6-10 Entwickler",
        "10+": "10+ Entwickler"
      },
      primaryGoal: {
        placeholder: "Ihr Hauptziel auswählen",
        "mvp": "MVP von Grund auf bauen",
        "v1-launch": "v1.0 in Produktion bringen",
        "scale": "Bestehendes Produkt skalieren",
        "pivot": "Pivot / Neue Richtung",
        "rebuild": "Legacy-System neu aufbauen"
      },
      timelineUrgency: {
        placeholder: "Zeitrahmen auswählen",
        "asap": "ASAP - Musste gestern fertig sein",
        "1-2-months": "1-2 Monate",
        "this-quarter": "Dieses Quartal",
        "next-quarter": "Nächstes Quartal",
        "exploring": "Nur Optionen erkunden"
      }
    },
    buttons: {
      cancel: "Abbrechen",
      submit: "Bewerbung einreichen",
      submitting: "Wird eingereicht...",
      close: "Schließen"
    },
    success: {
      title: "Bewerbung eingegangen!",
      message: "Remington Splettstoesser, Gründer von L4YERCAK3, wird Ihre Bewerbung prüfen und sich innerhalb von 24 Stunden melden.",
      scheduleMessage: "Möchten Sie nicht warten? Buchen Sie direkt einen Anruf:",
      scheduleButton: "Anruf buchen"
    }
  },
  manifesto: manifestoDe,
  learnMore: learnMoreDe,
  doMoreWithLess: doMoreWithLessDe,
  buildSprint: buildSprintDe,
  founderCalculator: founderCalculatorDe,
  footer: {
    copyright: "© 2024 l4yercak3. Alle Rechte vorbehalten."
  }
};