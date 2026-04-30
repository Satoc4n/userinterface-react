[Auf Deutsch](#deutsche-version)

## English Version

This guide outlines the complete process for setting up and running the 
WebUI prototype.
---
### Prerequisites
Before you begin, ensure you have the following installed on your system:
* **Node.js** (Version 18.0 or higher) - [Download here](https://nodejs.org/)
  * Windows users can directly download the prebuilt Node.js. 
  * Linux (Ubuntu/Debian) choose nvm and npm:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
    . "$HOME/.nvm/nvm.sh"
    nvm install 24
    ```
    * If done correctly you should see v24.x when you run ```node -v``` and 11.x when you run ```npm -v```.
* **Git** - [Download here](https://git-scm.com/)
  * ***You can also directly copy the source file to your local machine.***
  * Linux (Ubuntu/Debian): If Git is not installed, run the following commands:
    ```bash
    sudo apt update
    sudo apt install git
    
  * Note: If you receive "404 Not Found" during installation, run ```sudo apt update```
  again to refresh your package lists.
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
git clone https://gitlab.reutlingen-university.de/ss2026-mis-triage-project/userinterfacebrowser.git userinterfacebrowser
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

(Tested on Vivaldi Browser, Chrome 146) Windows 10, Build 19045

(Tested on Firefox Browser, Firefox 125.0.2) Ubuntu 24.04 LTS

---

---
[English Version](#english-version)
## Deutsche Version

Diese Anleitung beschreibt den Ablauf zur Einrichtung und Ausführung des Apps
auf ihrem lokalen Computer.
---
### Voraussetzungen
Bevor Sie beginnen, müssen Sie die folgenden Softwares installieren:
* **Node.js** (Version 18.0 or höher) - [Download here](https://nodejs.org/)
* * Windows Nutzer können den Installer für Node.js direkt herunterladen. 
  * Linux (Ubuntu/Debian) nvm und npm installieren:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
    . "$HOME/.nvm/nvm.sh"
    nvm install 24
    ```
    * Wenn Sie ```node -v``` ausführen, muss v24.x angezeigt werden und 11.x wenn Sie ```npm -v``` ausführen.
* **Git** - [Download here](https://git-scm.com/)
  * ***Sie können die Source-Datei auch direkt auf Ihren lokalen Computer kopieren.***
  * Linux (Ubuntu/Debian): Falls git nicht installiert ist, führen Sie die folgenden Befehle aus:
    ```bash
    sudo apt update
    sudo apt install git
    
  * Hinweis: Falls Sie während der Installation einen "404 Not Found" Fehler erhalten, führen Sie 
  ```sudo apt update``` aus, um Ihre Paketlisten neu zu aktualisieren.
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
git clone https://gitlab.reutlingen-university.de/ss2026-mis-triage-project/userinterfacebrowser.git userinterfacebrowser
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

(Getested on Vivaldi Browser, Chrome 146) Windows 10, Build 19045

(Getested on Firefox Browser, Firefox 125.0.2) Ubuntu 24.04 LTS