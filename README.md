# DeepGuard AI — Intelligent Media & Document Verification System

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini 3.8 Flash](https://img.shields.io/badge/Gemini_3.8_Flash-8E75C2?style=flat-square&logo=google&logoColor=white)](https://aistudio.google.com/)

**DeepGuard AI** is a digital forensic verification platform designed to detect AI-generated synthetic images, deepfake video streams, and tampered documents (certificates, IDs, marksheets, and legal records).

The system integrates multi-stage neural heuristics (inspired by **EfficientNet-B4**), **Error Level Analysis (ELA)**, temporal keyframe optical flow tracking, OCR typographic layout inspection, and an interactive **AI Forensic Chatbot** powered by **Gemini 3.8 Flash**.

---

## 🌟 Key Features

### 1. 🖼️ Image Authenticity Detection
- **Multi-Source Ingestion**: Upload images via standard browser dialog, drag-and-drop, global clipboard paste (`Ctrl+V`), or direct live webcam capture.
- **Classification Verdict**: Categorizes images as `REAL`, `FAKE`, or `UNCERTAIN` with calibrated confidence scores (0–100%).
- **Interactive Multi-Mode Canvas**:
  - **Original Mode**: Native high-definition pixel view.
  - **ELA Mode (Error Level Analysis)**: Visualizes localized JPEG compression rate differences to expose copy-move splicing and generative patching.
  - **Landmarks Mesh Mode**: Tracks facial geometry and biometric symmetry points.
- **Detailed Forensic Gauges**: ELA anomaly score, sensor noise uniformity, facial artifact probability, and high-frequency Fourier discontinuity.

### 2. 🎬 Video Deepfake Detection
- **Temporal Keyframe Extraction**: Decomposes uploaded video files (MP4, WebM, MOV) into representative keyframes.
- **Interactive Timeline Scrubber**: Displays color-coded frame markers (green = authentic, red = suspicious, yellow = uncertain) with per-frame timestamps, confidence, and diagnostic anomaly tags (e.g., eye blink cadence, facial warp boundaries).
- **Stream Metrics**: Duration, sampling FPS, total analyzed keyframes, and flagged frame count.

### 3. 📄 Document Authenticity Verification
- **Credential Support**: Scanned PDFs, JPG/PNG certificates, university degrees, marksheets, employment records, and ID cards.
- **OCR & Typographic Analysis**: Extracts key metadata fields (name, dates, issuing body), checks font kerning consistency, and detects baseline displacement.
- **Suspicious Region Overlays**: Renders clickable bounding boxes highlighting flagged alteration zones (e.g., altered recipient name, stamp alpha cutout, date re-compression).
- **Legal Compliance Notice**: Transparently indicates that automated visual inspection does not query official government registries or constitute a legal certification.

### 4. 🤖 AI Verification Chatbot
- **Grounded Reasoning**: Uses the active verification report as context to explain confidence scores, describe what ELA detected, and provide actionable next steps.
- **Non-Hallucinatory Principles**: Adheres to strict forensic standards without claiming 100% false certainty.

### 5. 📑 PDF Verification Report Export
- Downloadable official PDF audit reports (`jsPDF`) including case IDs, timestamps, file specifications, confidence meters, anomaly findings, and NIST/C2PA limitation notices.

### 6. 🕒 Local Audit History & Privacy
- In-session audit trail with 1-click report re-opening, PDF generation, or deletion. Payloads are processed in local session memory without persistent cloud storage.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion |
| **Backend** | Express 4, Node.js, `tsx` runtime |
| **Build Tool** | Vite 8 with Express dev middleware integration |
| **AI / Multimodal** | `@google/genai` TypeScript SDK (Gemini 3.8 Flash) |
| **Document Export** | `jsPDF` for client-side forensic audit reports |
| **IDE Configuration** | Pre-configured `.vscode/` with F5 debugging, settings, and extensions |

---

## 🚀 Running Locally in Visual Studio Code (VS Code)

### Prerequisites
Make sure you have installed on your computer:
1. **Node.js**: version `18.0.0` or higher (Node 20 or 22 LTS recommended) — download from [nodejs.org](https://nodejs.org/)
2. **Git**: download from [git-scm.com](https://git-scm.com/)
3. **VS Code**: download from [code.visualstudio.com](https://code.visualstudio.com/)

---

### Step-by-Step Local Setup

#### Step 1: Open the Project in VS Code
1. Open **VS Code**.
2. Click **File** > **Open Folder...** (or press `Ctrl+K Ctrl+O` on Windows / `Cmd+O` on Mac).
3. Select this project's folder.

#### Step 2: Open the Integrated Terminal
- Press `Ctrl + ~` (or `Cmd + ~` on Mac) to open the terminal inside VS Code, or go to **Terminal** > **New Terminal**.

#### Step 3: Configure Environment Variables
1. In the terminal or file explorer, copy `.env.example` to a new `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and insert your Gemini API Key:
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key_here"
   APP_URL="http://localhost:3000"
   ```
   > 💡 **Tip:** You can obtain a free Gemini API key in under 1 minute from [Google AI Studio](https://aistudio.google.com/).

#### Step 4: Install Dependencies
In the VS Code terminal, run:
```bash
npm install
```

#### Step 5: Start the Development Server
Run:
```bash
npm run dev
```

You should see:
```text
DeepGuard AI server running at http://0.0.0.0:3000
```

#### Step 6: Open the Application
Open your browser and navigate to:
```text
http://localhost:3000
```

#### ⚡ 1-Click VS Code Debugging (F5)
This repository includes a pre-configured `.vscode/launch.json`. You can simply press **F5** in VS Code to start the server in debug mode with integrated terminal output!

---

## 📦 How to Publish This Project on GitHub

Follow these steps to upload your project to your GitHub account:

### 1. Create a New Repository on GitHub
1. Log into your account at [github.com](https://github.com/).
2. In the top-right corner, click **+** and select **New repository**.
3. Name your repository (e.g., `deepguard-ai` or `deepguard-verification-system`).
4. Choose **Public** or **Private**.
5. **Do NOT** check "Add a README file" or ".gitignore" (these are already present in this project).
6. Click **Create repository**.

### 2. Push Your Local Code to GitHub
In your VS Code terminal (inside the project root), run the following commands:

```bash
# Initialize git (if not already initialized)
git init

# Stage all files
git add .

# Create the initial commit
git commit -m "feat: initial commit of DeepGuard AI verification system"

# Rename branch to main
git branch -M main

# Link your local repository to your GitHub repository
# Replace YOUR_USERNAME with your actual GitHub username!
git remote add origin https://github.com/YOUR_USERNAME/deepguard-ai.git

# Push the code to GitHub
git push -u origin main
```

Your code is now published on GitHub! 🎉

---

## 📁 Project Directory Structure

```text
├── .env.example            # Template for environment variables (GEMINI_API_KEY)
├── .gitignore              # Ignores node_modules, .env, and build artifacts
├── .vscode/                # VS Code configuration
│   ├── extensions.json     # Recommended VS Code plugins (Tailwind, ESLint)
│   ├── launch.json         # F5 debug launch profile
│   └── settings.json       # Workspace formatting & Tailwind configuration
├── index.html              # HTML entry point with Plus Jakarta Sans & JetBrains Mono
├── metadata.json           # AI Studio applet metadata & capabilities
├── package.json            # Project dependencies and dev/start scripts
├── server.ts               # Express backend handling Gemini AI & verification endpoints
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build & bundling configuration
└── src/
    ├── App.tsx             # Main dashboard controller & tab state
    ├── main.tsx            # React DOM root entry
    ├── index.css           # Tailwind CSS imports & custom typography
    ├── types/
    │   └── index.ts        # TypeScript interfaces for reports, frames, and chat
    ├── utils/
    │   └── pdfGenerator.ts # Client-side jsPDF verification report generator
    ├── assets/
    │   └── images/         # Benchmark test assets (AI face, diploma, certificate)
    └── components/
        ├── Navbar.tsx                   # Top bar navigation
        ├── Sidebar.tsx                  # Dashboard sidebar
        ├── OverviewSection.tsx          # System hero, dropzone & benchmark cards
        ├── ImageVerificationSection.tsx # Image deepfake detector & ELA canvas
        ├── VideoVerificationSection.tsx # Video keyframe timeline scrubber
        ├── DocumentVerificationSection.tsx # OCR text & suspicious region overlays
        ├── ChatbotSection.tsx           # Context-aware forensic AI chatbot
        ├── HistorySection.tsx           # Session audit log & report reopen
        └── AboutSection.tsx             # Academic methodologies & legal notices
```

---

## 🧪 Available NPM Scripts

- `npm run dev` — Starts the full-stack Express + Vite dev server on port 3000.
- `npm run build` — Compiles production-ready client bundles into `dist/`.
- `npm run lint` — Runs TypeScript compiler checks (`tsc --noEmit`).
- `npm run clean` — Removes build artifacts.

---

## ⚖️ Legal & Ethical Notice

DeepGuard AI provides algorithmic forensic analysis and heuristic likelihood assessments. Automated visual inspection alone **CANNOT** establish whether an official certificate, identity card, or legal instrument is genuinely issued, certified, or legally binding. DeepGuard does not verify against government or national databases. This report does not constitute a certified legal notarization. Always verify high-stakes credentials with the issuing organization directly.

---

## 📄 License
This project is licensed under the Apache 2.0 License.
