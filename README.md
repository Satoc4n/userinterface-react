# Clinical Curator - Frontend Prototype

A modern, high-performance Single Page Application (SPA) prototype for a clinical management system. This project was
migrated from a traditional Django backend-rendered application to a decoupled React frontend, prioritizing instant
state updates, robust client-side validation, and localized user experiences.

---

## Tech Stack

Framework: React 18 (via Vite)

Routing: React Router v6 (Master Layout / Outlet Architecture)

Styling: Tailwind CSS

Internationalization: react-i18next (English / German)

Icons/Typography: Google Material Symbols & Google Fonts (Inter / Manrope)

---

## Key Features

Master Layout Architecture: Uses React Router's Outlet to persist the Sidebar navigation state across page loads,
ensuring zero-reload navigation and drastically reducing network overhead.

Bento Grid Dashboard: A responsive, data-dense clinical overview featuring simulated asynchronous data fetching and
dynamic CSS-driven progress bars.

Real-Time Patient Registry: A secure IDAT intake form featuring strict, event-driven regex validation for the German
Health Insurance Number (KVNR), blocking invalid keystrokes in real-time. Auto-formats data into a JSON DTO payload
ready for Interface Layer transmission.

Instant Directory Search: A client-side, real-time filtering mask that updates the patient list instantly on every
keystroke.

Seamless i18n Localization: Fully integrated translation engine allowing instant toggling between English (EN) and
German (DE) without page reloads.

Theme Management: Integrated Dark/Light mode toggle leveraging Tailwind's dark classes and local storage persistence.

---

## Project Structure

``` text
src/
├── components/
│   └── Layout.jsx           # Master wrapper containing Sidebar & Topbar
├── pages/
│   ├── Login.jsx            # Entry point
│   ├── Dashboard.jsx        # Overview
│   ├── PatientRegistry.jsx  # Complex form with real-time regex validation
│   ├── PatientSearch.jsx    # Instant-filter directory mask
│   └── Settings.jsx         # User preferences and UI toggles
├── App.jsx                  # React Router configuration
├── main.jsx                 # React DOM injection point
├── i18n.js                  # Centralized translation dictionary
└── index.css                # Tailwind directives and base styles
```

---

# Getting Started

## Prerequisites

Make sure you have Node.js installed on your machine.

## Installation

1. Clone the repository and navigate into the project folder.

2. Install the required dependencies: npm install

3. Install the localization engine: npm install i18next react-i18next

4. Running the Development Server

Start the local server via Vite by running: npm run dev

Open http://localhost:5173 in your browser. The application defaults to the /login route.

---

## Managing Translations

All text strings are decoupled from the UI components to support easy scaling. To add or modify text:

Open src/i18n.js.

Add your new key-value pair to both the en and de resource objects.

In your React component, import the hook: import { useTranslation } from 'react-i18next';

Initialize it: const { t } = useTranslation();

Render the text: {t('your.new.key')}