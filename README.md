[Deutsche Version](#deutsche-version)

## English Version

This guide outlines the complete process for setting up and running the 
WebUI prototype, including both the React frontend and the Node.js backend server, 
on your local machine. 
---
### Prerequisites
Before you begin, ensure you have the following installed on your system:
* **Node.js** (Version 18.0 or higher) - [Download here](https://nodejs.org/)
* **Git** - [Download here](https://git-scm.com/)
---
### Project Structure

```text
userinterface-react/             # Project Root 
├── public/                      # Static assets that bypass the Vite bundler (e.g., favicon and logos)
├── src/                         # Contains all React source code
│   ├── components/              # Reusable UI building blocks
│   │   └── Layout.jsx           # Master wrapper containing the Sidebar and Topbar
│   ├── pages/                   # Full application screens connected to routes
│   │   ├── Dashboard.jsx        # Overview page
│   │   ├── Login.jsx            # Entry point and authentication screen
│   │   ├── PatientProfile.jsx   # Detailed view of a single patient's medical history
│   │   ├── PatientRegistry.jsx  
│   │   ├── PatientSearch.jsx    # Search directory
│   │   └── Settings.jsx         # User preferences
│   ├── App.jsx                  # React Router configuration connecting URLs to specific Pages
│   ├── i18n.js                  # Centralized dictionary for bilingual (EN/DE) translations
│   ├── index.css                # Global stylesheet containing Tailwind directives and custom CSS
│   └── main.jsx                 # The absolute starting point: injects the React app into index.html
├── index.html                   # The single HTML file that hosts the entire Single Page Application
├── package.json                 # Lists project metadata, npm scripts (like 'npm run dev') and dependencies
├── README.md                    # Your bilingual project documentation and installation guide
├── tailwind.config.js           # Configuration for Tailwind CSS (custom colors, fonts, and themes)
└── vite.config.js               # Configuration for the Vite development server and build tool
```
---
### Step-by-Step Installation
#### 1. Clone the repo
Open your terminal or command prompt and clone the project to your local machine:
```bash
git clone https://gitlab.reutlingen-university.de/ss2026-mis-triage-project/userinterfacebrowser.git
```
#### 2. Navigate to project root that we just cloned
```bash
cd userinterfacebrowser
```
#### 3. Install the dependencies
You need to install the dependencies first. 

Do that by opening a new terminal and run the following command in the project root.
```bash
npm install
```
---
### Running the application
#### 1. Start the dev server
From the project root directory, run the development script.
```bash
npm run dev
```
#### 2. Access the app
Once the server is running, Vite will display the local address in the terminal (usually http://localhost:5173).

Open your preferred web browser and navigate to this address. 

(Tested on Vivaldi Browser, Chrome 146)

---

---
[English Version](#english-version)
## Deutsche Version

Diese Anleitung beschreibt den Ablauf zur Einrichtung und Ausführung des Apps (Frontend)
auf ihrem lokalen Computer.
---
### Voraussetzungen
Bevor Sie beginnen, müssen Sie die folgenden Softwares installieren:
* **Node.js** (Version 18.0 or höher) - [Download here](https://nodejs.org/)
* **Git** - [Download here](https://git-scm.com/)
---
### Projektstruktur
Deutsche Version folgt in Kürze
```text
userinterface-react/             # Project Root 
├── public/                      # Static assets that bypass the Vite bundler (e.g., favicon and logos)
├── src/                         # Contains all React source code
│   ├── components/              # Reusable UI building blocks
│   │   └── Layout.jsx           # Master wrapper containing the Sidebar and Topbar
│   ├── pages/                   # Full application screens connected to routes
│   │   ├── Dashboard.jsx        # Overview page
│   │   ├── Login.jsx            # Entry point and authentication screen
│   │   ├── PatientProfile.jsx   # Detailed view of a single patient's medical history
│   │   ├── PatientRegistry.jsx  
│   │   ├── PatientSearch.jsx    # Search directory
│   │   └── Settings.jsx         # User preferences
│   ├── App.jsx                  # React Router configuration connecting URLs to specific Pages
│   ├── i18n.js                  # Centralized dictionary for bilingual (EN/DE) translations
│   ├── index.css                # Global stylesheet containing Tailwind directives and custom CSS
│   └── main.jsx                 # The absolute starting point: injects the React app into index.html
├── index.html                   # The single HTML file that hosts the entire Single Page Application
├── package.json                 # Lists project metadata, npm scripts (like 'npm run dev') and dependencies
├── README.md                    # Your bilingual project documentation and installation guide
├── tailwind.config.js           # Configuration for Tailwind CSS (custom colors, fonts, and themes)
└── vite.config.js               # Configuration for the Vite development server and build tool
```
---
### Installation
#### 1. Repo klonen
In terminal:
```bash
git clone https://gitlab.reutlingen-university.de/ss2026-mis-triage-project/userinterfacebrowser.git
```
#### 2. Ins Stammverzeichnis (Root directory) wechseln
```bash
cd userinterfacebrowser
```
#### 3. Abhängigkeiten installieren
Installieren Sie alle benötigte Pakete (dependencies) für die React Anwendung.

Sie können den folgenden Befehl ausführen.
```bash
npm install
```
---
### Ausführen des Apps
#### 1. Server starten
Im Stammverzeichnis (Root) das Entwicklungs-Skript ausführen.
```bash
npm run dev
```
#### 2. App öffnen
Wenn ```npm run dev``` erfolgreich läuft, wird die lokale Adresse in der Konsole angezeigt. (Häufig http://localhost:5173).

Öffnen Sie Ihren Browser und rufen Sie diese Adresse auf. 

(Getestet mit Vivaldi Browser, Chrome 146)