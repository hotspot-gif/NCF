export type Language = "en" | "it";

export interface Translations {
  common: {
    required: string;
    optional: string;
  };
  header: {
    timNetwork: string;
    title: string;
    subtitle: string;
    submitReport: string;
    viewResults: string;
    languageEn: string;
    languageIt: string;
  };
  footer: {
    copyright: string;
    version: string;
  };
  form: {
    stepLabels: [string, string, string];
    selectYourName: string;
    searchNamePlaceholder: string;
    noUsersFound: string;
    management: string;
    change: string;
    coverageLocation: string;
    region: string;
    selectRegion: string;
    cityArea: string;
    cityPlaceholder: string;
    addressStreet: string;
    addressPlaceholder: string;
    addressHint: string;
    postCode: string;
    postCodePlaceholder: string;
    continueToRatings: string;
    networkPerformance: string;
    rateEachHint: string;
    signalStrength: string;
    signalStrengthDesc: string;
    dataSpeed: string;
    dataSpeedDesc: string;
    callQuality: string;
    callQualityDesc: string;
    smsReliability: string;
    smsReliabilityDesc: string;
    networkStability: string;
    networkStabilityDesc: string;
    back: string;
    continue: string;
    overallAssessment: string;
    overallSatisfaction: string;
    overallSatisfactionDesc: string;
    comparedToBefore: string;
    muchBetter: string;
    better: string;
    aboutSame: string;
    worse: string;
    muchWorse: string;
    issueDetails: string;
    primaryIssue: string;
    selectIssue: string;
    howOften: string;
    selectFrequency: string;
    affectedLocations: string;
    affectedLocationsPlaceholder: string;
    customerComplaints: string;
    additionalNotes: string;
    additionalNotesPlaceholder: string;
    submitFeedback: string;
    submitting: string;
    successTitle: string;
    successMessage1: string;
    successMessage2: string;
    submitAnother: string;
    ratingLabels: [string, string, string, string, string, string];
    issueTypes: string[];
    frequencies: string[];
    errors: {
      submissionFailed: string;
      somethingWentWrong: string;
    };
  };
  dashboard: {
    loading: string;
    refresh: string;
    totalResponses: string;
    totalResponsesSubtitle: string;
    satisfaction: string;
    dataSpeed: string;
    outOfFive: string;
    averageRatings: string;
    aggregatedFrom: string;
    avgSignalStrength: string;
    avgDataSpeed: string;
    avgCallQuality: string;
    avgSmsReliability: string;
    avgNetworkStability: string;
    recentFeedback: string;
    noFeedback: string;
    noFeedbackSubtitle: string;
    signal: string;
    data: string;
    call: string;
    sms: string;
    stability: string;
    vsBefore: string;
    comparisonLabels: {
      muchBetter: string;
      better: string;
      same: string;
      worse: string;
      muchWorse: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      required: "*",
      optional: "Optional",
    },
    header: {
      timNetwork: "TIM Network",
      title: "Network Coverage Feedback",
      subtitle: "Sales Team — Post-Migration Report",
      submitReport: "Submit Report",
      viewResults: "View Results",
      languageEn: "EN",
      languageIt: "IT",
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Lycamobile Italy — Internal Use Only`,
      version: "Network Coverage Feedback System v1.0",
    },
    form: {
      stepLabels: ["Your Info", "Ratings", "Submit"],
      selectYourName: "Select Your Name",
      searchNamePlaceholder: "Search by name, role, or office...",
      noUsersFound: "No users found",
      management: "🏢 Management",
      change: "Change",
      coverageLocation: "Coverage Location",
      region: "Region",
      selectRegion: "Select region",
      cityArea: "City / Area",
      cityPlaceholder: "e.g., Milano, Roma Centro, Napoli Vomero",
      addressStreet: "Address / Street",
      addressPlaceholder: "e.g., Via Roma 123, Piazza del Duomo, Centro Commerciale...",
      addressHint: "Specific street or landmark where coverage was tested",
      postCode: "Post Code / CAP",
      postCodePlaceholder: "e.g., 20121",
      continueToRatings: "Continue to Ratings →",
      networkPerformance: "Network Performance",
      rateEachHint: "Rate each aspect from 1 (Poor) to 5 (Excellent)",
      signalStrength: "📶 Signal Strength",
      signalStrengthDesc: "Overall mobile signal reception in your area",
      dataSpeed: "🌐 Data Speed",
      dataSpeedDesc: "4G/LTE internet speed performance",
      callQuality: "📞 Call Quality",
      callQualityDesc: "Voice clarity and call connection reliability",
      smsReliability: "💬 SMS Reliability",
      smsReliabilityDesc: "Text message delivery speed and reliability",
      networkStability: "⚡ Network Stability",
      networkStabilityDesc: "Connection consistency without drops",
      back: "← Back",
      continue: "Continue →",
      overallAssessment: "Overall Assessment",
      overallSatisfaction: "⭐ Overall Satisfaction",
      overallSatisfactionDesc: "Your overall experience with the TIM network",
      comparedToBefore: "Compared to Before Migration",
      muchBetter: "Much Better",
      better: "Better",
      aboutSame: "About the Same",
      worse: "Worse",
      muchWorse: "Much Worse",
      issueDetails: "Issue Details",
      primaryIssue: "Primary Issue",
      selectIssue: "Select an issue",
      howOften: "How Often?",
      selectFrequency: "Select frequency",
      affectedLocations: "Affected Locations",
      affectedLocationsPlaceholder: "e.g., Underground, Shopping malls, Suburbs",
      customerComplaints: "Receiving customer complaints about network",
      additionalNotes: "Additional Notes",
      additionalNotesPlaceholder: "Share any additional observations about the network after TIM migration...",
      submitFeedback: "Submit Feedback",
      submitting: "Submitting...",
      successTitle: "Grazie! Thank You!",
      successMessage1: "Your feedback has been submitted successfully.",
      successMessage2: "Your input helps us improve network quality across Italy.",
      submitAnother: "Submit Another Report",
      ratingLabels: ["", "Poor", "Fair", "Good", "Very Good", "Excellent"],
      issueTypes: [
        "No issues",
        "Poor signal in buildings",
        "Dropped calls",
        "Slow data speeds",
        "No data connection",
        "SMS delivery delays",
        "Network not available",
        "Frequent disconnections",
        "Poor VoLTE quality",
        "Roaming issues",
        "Other",
      ],
      frequencies: [
        "Rarely (once a week)",
        "Sometimes (2-3 times/week)",
        "Often (daily)",
        "Very often (multiple times/day)",
        "Constantly",
      ],
      errors: {
        submissionFailed: "Submission failed",
        somethingWentWrong: "Something went wrong",
      },
    },
    dashboard: {
      loading: "Loading dashboard...",
      refresh: "Refresh",
      totalResponses: "Total Responses",
      totalResponsesSubtitle: "feedback reports submitted",
      satisfaction: "Satisfaction",
      dataSpeed: "Data Speed",
      outOfFive: "out of 5.0",
      averageRatings: "Average Ratings",
      aggregatedFrom: "Aggregated from all responses",
      avgSignalStrength: "Signal Strength",
      avgDataSpeed: "Data Speed",
      avgCallQuality: "Call Quality",
      avgSmsReliability: "SMS Reliability",
      avgNetworkStability: "Network Stability",
      recentFeedback: "Recent Feedback",
      noFeedback: "No feedback yet",
      noFeedbackSubtitle: "Responses will appear here once submitted",
      signal: "Signal",
      data: "Data",
      call: "Call",
      sms: "SMS",
      stability: "Stability",
      vsBefore: "vs. Before",
      comparisonLabels: {
        muchBetter: "Much Better",
        better: "Better",
        same: "Same",
        worse: "Worse",
        muchWorse: "Much Worse",
      },
    },
  },
  it: {
    common: {
      required: "*",
      optional: "Opzionale",
    },
    header: {
      timNetwork: "Rete TIM",
      title: "Feedback Copertura Rete",
      subtitle: "Team Vendite — Rapporto Post-Migrazione",
      submitReport: "Invia Rapporto",
      viewResults: "Vedi Risultati",
      languageEn: "EN",
      languageIt: "IT",
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Lycamobile Italy — Uso Interno`,
      version: "Sistema Feedback Copertura Rete v1.0",
    },
    form: {
      stepLabels: ["I Tuoi Dati", "Valutazioni", "Invia"],
      selectYourName: "Seleziona il Tuo Nome",
      searchNamePlaceholder: "Cerca per nome, ruolo o ufficio...",
      noUsersFound: "Nessun utente trovato",
      management: "🏢 Direzione",
      change: "Cambia",
      coverageLocation: "Località Copertura",
      region: "Regione",
      selectRegion: "Seleziona regione",
      cityArea: "Città / Zona",
      cityPlaceholder: "es. Milano, Roma Centro, Napoli Vomero",
      addressStreet: "Indirizzo / Via",
      addressPlaceholder: "es. Via Roma 123, Piazza del Duomo, Centro Commerciale...",
      addressHint: "Via specifica o punto di riferimento dove è stata testata la copertura",
      postCode: "Codice Postale / CAP",
      postCodePlaceholder: "es. 20121",
      continueToRatings: "Continua alle Valutazioni →",
      networkPerformance: "Prestazioni Rete",
      rateEachHint: "Valuta ogni aspetto da 1 (Scarso) a 5 (Eccellente)",
      signalStrength: "📶 Potenza Segnale",
      signalStrengthDesc: "Ricezione generale del segnale mobile nella tua zona",
      dataSpeed: "🌐 Velocità Dati",
      dataSpeedDesc: "Prestazioni della velocità internet 4G/LTE",
      callQuality: "📞 Qualità Chiamate",
      callQualityDesc: "Chiarezza vocale e affidabilità della connessione chiamata",
      smsReliability: "💬 Affidabilità SMS",
      smsReliabilityDesc: "Velocità di consegna e affidabilità dei messaggi di testo",
      networkStability: "⚡ Stabilità Rete",
      networkStabilityDesc: "Coerenza della connessione senza interruzioni",
      back: "← Indietro",
      continue: "Continua →",
      overallAssessment: "Valutazione Generale",
      overallSatisfaction: "⭐ Soddisfazione Generale",
      overallSatisfactionDesc: "La tua esperienza complessiva con la rete TIM",
      comparedToBefore: "Rispetto a Prima della Migrazione",
      muchBetter: "Molto Migliore",
      better: "Migliore",
      aboutSame: "Circa Uguale",
      worse: "Peggiore",
      muchWorse: "Molto Peggiore",
      issueDetails: "Dettagli Problemi",
      primaryIssue: "Problema Principale",
      selectIssue: "Seleziona un problema",
      howOften: "Quanto Spesso?",
      selectFrequency: "Seleziona frequenza",
      affectedLocations: "Località Interessate",
      affectedLocationsPlaceholder: "es. Metropolitana, Centri Commerciali, Periferie",
      customerComplaints: "Ricezione reclami clienti sulla rete",
      additionalNotes: "Note Aggiuntive",
      additionalNotesPlaceholder: "Condividi eventuali osservazioni aggiuntive sulla rete dopo la migrazione TIM...",
      submitFeedback: "Invia Feedback",
      submitting: "Invio in corso...",
      successTitle: "Grazie! Grazie!",
      successMessage1: "Il tuo feedback è stato inviato con successo.",
      successMessage2: "Il tuo contributo ci aiuta a migliorare la qualità della rete in tutta Italia.",
      submitAnother: "Invia un Altro Rapporto",
      ratingLabels: ["", "Scarso", "Sufficiente", "Buono", "Molto Buono", "Eccellente"],
      issueTypes: [
        "Nessun problema",
        "Segnale scarso negli edifici",
        "Chiamate interrotte",
        "Velocità dati lente",
        "Nessuna connessione dati",
        "Ritardi consegna SMS",
        "Rete non disponibile",
        "Disconnessioni frequenti",
        "Scarsa qualità VoLTE",
        "Problemi roaming",
        "Altro",
      ],
      frequencies: [
        "Raramente (una volta a settimana)",
        "A volte (2-3 volte/settimana)",
        "Spesso (quotidiano)",
        "Molto spesso (più volte al giorno)",
        "Costantemente",
      ],
      errors: {
        submissionFailed: "Invio fallito",
        somethingWentWrong: "Qualcosa è andato storto",
      },
    },
    dashboard: {
      loading: "Caricamento cruscotto...",
      refresh: "Aggiorna",
      totalResponses: "Risposte Totali",
      totalResponsesSubtitle: "rapporti di feedback inviati",
      satisfaction: "Soddisfazione",
      dataSpeed: "Velocità Dati",
      outOfFive: "su 5.0",
      averageRatings: "Valutazioni Medie",
      aggregatedFrom: "Aggregate da tutte le risposte",
      avgSignalStrength: "Potenza Segnale",
      avgDataSpeed: "Velocità Dati",
      avgCallQuality: "Qualità Chiamate",
      avgSmsReliability: "Affidabilità SMS",
      avgNetworkStability: "Stabilità Rete",
      recentFeedback: "Feedback Recenti",
      noFeedback: "Nessun feedback ancora",
      noFeedbackSubtitle: "Le risposte appariranno qui una volta inviate",
      signal: "Segnale",
      data: "Dati",
      call: "Chiamate",
      sms: "SMS",
      stability: "Stabilità",
      vsBefore: "risp. a Prima",
      comparisonLabels: {
        muchBetter: "Molto Migliore",
        better: "Migliore",
        same: "Uguale",
        worse: "Peggiore",
        muchWorse: "Molto Peggiore",
      },
    },
  },
};
