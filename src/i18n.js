import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// js for the translations. https://i18ns.com/languagecode.html we probably only need en and de but its good to know

const resources = {
    en: {
        translation: {
            "common": {
                "appName": "Clinical Curator",
                "processing": "Processing..."
            },
            "login": {
                "subtitle": "Sign in to access your workspace.",
                "email": "Email or Provider ID",
                "password": "Password",
                "forgot": "Forgot Password?",
                "signIn": "Sign In",
                "simulate": "Simulate Login"
            },
            "sidebar": {
                "unit": "Our Project Name",
                "dashboard": "Dashboard",
                "registry": "Patient Registry",
                "search": "Search Directory",
                "settings": "Settings",
                "theme": "Theme",
                "language": "Language"
            },
            "dashboard": {
                "title": "Dashboard Overview",
                "systemNormal": "System Normal",
                "activeCensus": "Active Census",
                "fromYesterday": "from yesterday",
                "newAdmissions": "New Admissions",
                "pendingTriage": "Pending Triage",
                "insuranceRate": "Insurance Verification",
                "recordsAttention": "records require attention",
                "regVelocity": "Registration Velocity",
                "trailingDays": "Trailing 7 days admission volume",
                "demographics": "Demographics",
                "years": "Years",
                "recentActivity": "Recent Activity",
                "activityPending": "Activity feed will be implemented here. (Pending data)",
                "quickActions": "Quick Actions",
                "actionsPending": "Quick action buttons will be implemented here."
            },
            "registry": {
                "title": "Patient Registry",
                "subtitle": "Enter Identification Data (IDAT) to generate a new Patient Identifier (PID).",
                "success": "Successfully registered patient:",
                "coreIdentity": "Core Identity",
                "firstName": "First Name*",
                "lastName": "Last Name*",
                "dob": "Date of Birth*",
                "gender": "Gender*",
                "selectGender": "Select Gender",
                "male": "Male",
                "female": "Female",
                "diverse": "Diverse / Other",
                "contactInfo": "Contact Information",
                "street": "Street",
                "houseNo": "House No.",
                "postalCode": "Postal Code",
                "city": "City",
                "phone": "Phone",
                "email": "Email",
                "insurance": "Insurance",
                "insuranceNumber": "Insurance Number (KVNR) *",
                "button": "Register Patient",
                "warningTitle": "Missing Contact Information",
                "warningDesc": "You have not provided an address, phone number, or email. This patient will be unreachable. Do you want to proceed anyway?",
                "proceed": "Yes, Proceed",
                "cancel": "No, Go Back",
                "errors": {
                    "noNumberFirst": "First name cannot contain numbers.",
                    "noNumberLast": "Last name cannot contain numbers.",
                    "dobFuture": "Date of birth cannot be in the future.",
                    "dobOld": "Date of birth cannot be older than 120 years.",
                    "insuranceFormat": "Incomplete format. Must be exactly 12 characters.",
                    "mustBeNumber": "Position {{pos}} must be a number.",
                    "mustBeLetter": "Position 9 must be a letter."
                }
            },
            "search": {
                "title": "Patient Directory",
                "subtitle": "Search the clinical registry by patient name or identifier.",
                "placeholder": "Search by First Name, Last Name, or PID...",
                "results": "Search Results",
                "found": "Found",
                "colPid": "PID",
                "colName": "Full Name",
                "colDob": "DOB",
                "colIns": "Insurance KVNR",
                "colStatus": "Status",
                "colAction": "Action",
                "viewFile": "View File",
                "noMatch": "No matching patients",
                "noMatchDesc": "We couldn't find any records matching your search. Check the spelling or try searching by a different criteria.",
                "searchLastName": "Last Name",
                "searchDob": "Date of Birth",
                "searchButton": "Search Database",
                "searching": "Searching...",
            },
            "settings": {
                "title": "System Settings",
                "subtitle": "Manage your account preferences and application configuration.",
                "tabProfile": "Account Profile",
                "tabNotifs": "Notifications",
                "tabSecurity": "Security",
                "secProfile": "Profile Information",
                "uploadAvatar": "Upload New Avatar",
                "avatarDesc": "JPG, GIF or PNG. Max size of 800K",
                "fullName": "Full Name",
                "providerId": "Provider ID",
                "secAlerts": "Alerts & Notifications",
                "emailNotifs": "Email Notifications",
                "emailDesc": "Receive daily census summaries via email.",
                "smsNotifs": "SMS Critical Alerts",
                "smsDesc": "Get text messages for triage escalations.",
                "sec2fa": "Two-Factor Authentication",
                "2faDesc": "Add an extra layer of security to your account."
            },
            "profile": {
                "back": "Back to Directory",
                "loading": "Loading patient record...",
                "notFound": "Patient not found",
                "vitals": "Vitals & Biometrics",
                "bloodType": "Blood Type",
                "height": "Height",
                "weight": "Weight",
                "allergies": "Allergies",
                "none": "No known allergies",
                "medications": "Current Medications",
                "history": "Clinical History"
            },
        }
    },
    de: {
        translation: {
            "common": {
                "appName": "Clinical Curator",
                "processing": "Wird bearbeitet..."
            },
            "login": {
                "subtitle": "Melden Sie sich an, um auf Ihren Arbeitsbereich zuzugreifen.",
                "email": "E-Mail oder Provider-ID",
                "password": "Passwort",
                "forgot": "Passwort vergessen?",
                "signIn": "Anmelden",
                "simulate": "Anmeldung simulieren"
            },
            "sidebar": {
                "unit": "Project Name",
                "dashboard": "Übersicht",
                "registry": "Patientenaufnahme",
                "search": "Verzeichnis",
                "settings": "Einstellungen",
                "theme": "Design",
                "language": "Sprache"
            },
            "dashboard": {
                "title": "Dashboard Übersicht",
                "systemNormal": "System Normal",
                "activeCensus": "Aktuelle Census",
                "fromYesterday": "seit gestern",
                "newAdmissions": "Neuaufnahmen",
                "pendingTriage": "Warten auf Triage",
                "insuranceRate": "Versicherungsstatus",
                "recordsAttention": "Datensätze unvollständig",
                "regVelocity": "Aufnahmegeschwindigkeit",
                "trailingDays": "Aufnahmevolumen der letzten 7 Tage",
                "demographics": "Demografie",
                "years": "Jahre",
                "recentActivity": "Letzte Aktivität",
                "activityPending": "Aktivitätsfeed wird hier implementiert.",
                "quickActions": "Schnell-Aktionen",
                "actionsPending": "Schnellaktionsschaltflächen werden hier implementiert."
            },
            "registry": {
                "title": "Patientenaufnahme",
                "subtitle": "Geben Sie Identifikationsdaten (IDAT) ein, um eine neue PID zu generieren.",
                "success": "Patient erfolgreich registriert:",
                "coreIdentity": "Kernidentität",
                "firstName": "Vorname *",
                "lastName": "Name *",
                "dob": "Geburtsdatum *",
                "gender": "Geschlecht *",
                "selectGender": "Geschlecht wählen",
                "male": "Männlich",
                "female": "Weiblich",
                "diverse": "Divers / Andere",
                "contactInfo": "Kontaktinformationen",
                "street": "Straße",
                "houseNo": "HausNr.",
                "postalCode": "PLZ",
                "city": "Stadt",
                "phone": "Telefonnummer",
                "email": "E-Mail",
                "insurance": "Versicherung",
                "insuranceNumber": "Versichertennummer (KVNR) *",
                "button": "Patient registrieren",
                "warningTitle": "Fehlende Kontaktinformationen",
                "warningDesc": "Sie haben weder Adresse, Telefonnummer noch E-Mail angegeben. Dieser Patient ist nicht erreichbar. Möchten Sie trotzdem fortfahren?",
                "proceed": "Ja, weiter",
                "cancel": "Nein, zurück",
                "errors": {
                    "noNumberFirst": "Der Vorname darf keine Zahlen enthalten.",
                    "noNumberLast": "Der Nachname darf keine Zahlen enthalten.",
                    "dobFuture": "Das Geburtsdatum darf nicht in der Zukunft liegen.",
                    "dobOld": "Das Geburtsdatum darf nicht älter als 120 Jahre sein.",
                    "insuranceFormat": "Unvollständiges Format. Muss genau 12 Zeichen lang sein.",
                    "mustBeNumber": "Position {{pos}} muss eine Zahl sein.",
                    "mustBeLetter": "Position 9 muss ein Buchstabe sein."
                }
            },
            "search": {
                "title": "Patientenverzeichnis",
                "subtitle": "Durchsuchen Sie das klinische Register nach Name oder ID.",
                "placeholder": "Suche nach Vorname, Nachname oder PID...",
                "results": "Suchergebnisse",
                "found": "Gefunden",
                "colPid": "PID",
                "colName": "Vollständiger Name",
                "colDob": "Geburtsdatum",
                "colIns": "KVNR",
                "colStatus": "Status",
                "colAction": "Aktion",
                "viewFile": "Akte ansehen",
                "noMatch": "Keine passenden Patienten",
                "noMatchDesc": "Wir konnten keine passenden Datensätze finden. Überprüfen Sie die Schreibweise oder versuchen Sie ein anderes Suchkriterium.",
                "searchLastName": "Nachname",
                "searchDob": "Geburtsdatum",
                "searchButton": "Datenbank durchsuchen",
                "searching": "Sucht...",
            },
            "settings": {
                "title": "Systemeinstellungen",
                "subtitle": "Verwalten Sie Ihre Kontoeinstellungen und Anwendungskonfigurationen.",
                "tabProfile": "Kontoprofil",
                "tabNotifs": "Benachrichtigungen",
                "tabSecurity": "Sicherheit",
                "secProfile": "Profilinformationen",
                "uploadAvatar": "Neuen Avatar hochladen",
                "avatarDesc": "JPG, GIF oder PNG. Maximale Größe 800K",
                "fullName": "Vollständiger Name",
                "providerId": "Provider-ID",
                "secAlerts": "Alarme & Benachrichtigungen",
                "emailNotifs": "E-Mail-Benachrichtigungen",
                "emailDesc": "Erhalten Sie tägliche Belegungszusammenfassungen per E-Mail.",
                "smsNotifs": "SMS-Benachrichtigungen",
                "smsDesc": "Erhalten Sie Textnachrichten für Triage-Eskalationen.",
                "sec2fa": "Zwei-Faktor-Authentifizierung",
                "2faDesc": "Fügen Sie Ihrem Konto eine zusätzliche Sicherheitsebene hinzu."
            },
            "profile": {
                "back": "Zurück zum Verzeichnis",
                "loading": "Patientenakte wird geladen...",
                "notFound": "Patient nicht gefunden",
                "vitals": "Vitalwerte",
                "bloodType": "Blutgruppe",
                "height": "Größe",
                "weight": "Gewicht",
                "allergies": "Allergien & Warnungen",
                "none": "Keine bekannten Allergien",
                "medications": "Aktuelle Medikamente",
                "history": "Klinische Historie"
            },
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {escapeValue: false}
    });

export default i18n;