# 🛡️ Security Checker

A modern web application that checks mobile devices for clickjacking vulnerabilities and provides security patching capabilities.

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)

## 📋 Overview

Security Checker is a demo application that simulates vulnerability scanning for mobile devices. Users can enter their phone number to check if their device is protected against clickjacking attacks. If a vulnerability is detected, the app provides an option to apply a security patch.

## ✨ Features

- **Phone Number Validation** - Validates input to ensure at least 10 digits
- **Security Scanning** - Simulates device vulnerability assessment
- **One-Click Security Patch** - Apply protection with a single click
- **Responsive Design** - Works seamlessly on all devices
- **Modern UI** - Beautiful glassmorphism design with smooth animations
- **Real-time Feedback** - Visual indicators for scan status and results

## 🖥️ Screenshots

| Security Check | Vulnerability Detected | Device Secured |
|----------------|------------------------|----------------|
| Enter phone number and run scan | Warning shown with fix option | Success confirmation |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/vishnusonu2004/Security-check.git
   cd Security-check
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Frontend UI library |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Lucide React** | Beautiful icons |
| **Express.js** | Backend API server |
| **Vite** | Fast development & build tool |

## 📁 Project Structure

```
Security-Checker/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── server.ts            # Express backend server
├── index.html           # HTML template
├── package.json         # Dependencies & scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # Project documentation
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/check` | Check device security status |
| POST | `/api/secure` | Apply security patch to device |

### Request/Response Examples

**Check Security Status**
```json
// POST /api/check
// Request
{ "phoneNumber": "1234567890" }

// Response (Secured)
{
  "status": "success",
  "message": "Phone XXXXXX7890 is Secured ✅",
  "details": "No clickjacking vulnerabilities detected on this device."
}

// Response (Vulnerable)
{
  "status": "vulnerable", 
  "message": "Phone XXXXXX7890 is Not Secured ⚠️",
  "details": "Potential clickjacking vulnerability detected."
}
```

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run TypeScript type checking |

## 🎨 Design Features

- **Glassmorphism UI** - Modern frosted glass effect
- **Gradient Backgrounds** - Dynamic color gradients
- **Micro-interactions** - Smooth hover and click animations
- **Responsive Layout** - Mobile-first design approach
- **Accessibility** - Semantic HTML and keyboard navigation

## ⚠️ Disclaimer

This is a **demo application** for educational purposes. It does not perform actual security scans or vulnerability assessments. The security status results are simulated for demonstration purposes only.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Vishnu Sonu**

- GitHub: [@vishnusonu2004](https://github.com/vishnusonu2004)

---

<p align="center">
  Made with ❤️ using React & TypeScript
</p>
