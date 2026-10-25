# QUE Solutions — Enterprise Full-Stack Ecosystem
> **People • Process • Progress**

Production-oriented monorepo for **QUE Solutions**, encompassing responsive React.js web platforms, React Native CLI mobile applications, and a secure Firebase cloud infrastructure powered by Google Gemini AI.

---

## 📁 Repository Structure

```text
├── apps/
│   ├── web/                     # React.js Public Website & Super Admin Console
│   │   ├── src/pages/           # Landing page (/), Super Admin login (/que) & console
│   │   ├── src/components/      # Corporate UI components & Recharts analytics
│   │   └── package.json
│   │
│   └── mobile/                  # React Native CLI Mobile Application
│       ├── android/             # Android native configuration (com.que.aiapp)
│       ├── ios/                 # iOS native project
│       ├── src/screens/         # Splash, 3-step Onboarding, Auth, Home, Gemini AI, Profile
│       └── package.json
│
├── backend/                     # Cloud Backend Infrastructure
│   ├── firebase.json            # Firebase emulators and deployment configs
│   ├── firestore.rules          # Production RBAC security rules (Immutable logs)
│   ├── firestore.indexes.json   # Composite indexing configuration
│   ├── storage.rules            # Media upload access rules
│   └── functions/               # Gen 2 Cloud Functions & Gemini 2.5 Flash gateway
│       ├── src/api/             # Privileged Admin and AI endpoints
│       └── src/services/        # Token usage tracking, budget caps, audit logger
│
├── packages/
│   └── shared/                  # Unified Design System & Business Logic
│       ├── assets/logo/         # Official QUE Solutions logos and branding
│       └── src/theme/           # Forest Green, Olive Green, and Off-White design tokens
│
├── .gitignore                   # Enterprise gitignore protecting all secrets
└── package.json                 # Monorepo workspaces configuration
```

---

## 🎨 Branding & Design System
- **Dark Forest Green** (`#122919`): Executive headers, high-authority text, sidebars
- **Brand Olive Green** (`#5B7052`): Primary call-to-actions, active highlights, badges
- **Soft Off-White** (`#F8F9F5`): Canvas background (zero eye fatigue)
- **Pure White** (`#FFFFFF`): Card and modal surfaces
- **Neutral Grey** (`#5A655C` / `#E3E7DE`): Subtitles, borders, dividers

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- Java OpenJDK 17 (for React Native Android builds)
- Android SDK (for mobile emulation)

### 2. Environment Setup
Copy the example environment files and supply your credentials:
```bash
# Web application configuration
cp apps/web/.env.example apps/web/.env

# Backend cloud functions configuration
cp backend/functions/.env.example backend/functions/.env

# Mobile environment configuration
cp apps/mobile/src/config/env.example.js apps/mobile/src/config/env.js
cp google-services.json.example apps/mobile/android/app/google-services.json
```

### 3. Running Web Application
```bash
# Start Vite development server
npm run web
```
- Public Site: `http://localhost:3000/`
- Super Admin Console: `http://localhost:3000/que`

### 4. Running Mobile Application (Android)
```bash
cd apps/mobile
npm run android
```

---

## 🔒 Security Principles
- **Zero Exposed Secrets**: All API keys and tokens are strictly excluded from version control via `.gitignore`.
- **Server-Side AI Gateway**: Google Gemini API is accessed exclusively through authenticated Cloud Functions with rate limits and quota monitoring.
- **Append-Only Audit Logs**: Privileged security events are written exclusively through the Firebase Admin SDK.

---
© 2026 QUE Solutions. All rights reserved.
