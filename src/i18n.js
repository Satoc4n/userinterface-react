import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "sidebar": {
        "dashboard": "Dashboard",
        "registry": "Patient Registry",
        "search": "Search Directory",
        "settings": "Settings",
        "theme": "Theme",
        "language": "Language"
      },
      "dashboard": {
        "activeCensus": "Active Census",
        "fromYesterday": "from yesterday",
        "newAdmissions": "New Admissions",
        "pendingTriage": "Pending Triage",
        "insuranceRate": "Insurance Verification",
        "recordsAttention": "records require attention"
      }
    }
  },
  de: {
    translation: {
      "sidebar": {
        "dashboard": "Übersicht",
        "registry": "Patientenaufnahme",
        "search": "Verzeichnis",
        "settings": "Einstellungen",
        "theme": "Design",
        "language": "Sprache"
      },
      "dashboard": {
        "activeCensus": "Aktuelle Belegung",
        "fromYesterday": "seit gestern",
        "newAdmissions": "Neuaufnahmen",
        "pendingTriage": "Warten auf Triage",
        "insuranceRate": "Versicherungsstatus",
        "recordsAttention": "Datensätze unvollständig"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;