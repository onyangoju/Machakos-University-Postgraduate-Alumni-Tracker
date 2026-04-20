# Machakos University Postgraduate Alumni Tracker

[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A comprehensive web application for Machakos University to track, manage, and engage with postgraduate alumni across all departments and graduation cohorts.

## Overview

The **Machakos University Postgraduate Alumni Tracker** is a modern, responsive web application designed to streamline alumni relationship management. Built with React, TypeScript, and Vite, it provides administrative tools for tracking alumni career progression, organizing reunions, and maintaining institutional connections.

**Developer:** Pauline Onyango  
**Institution:** Machakos University  
**Specialisation:** Artificial Intelligence & Data Science

---

## Original Template Documentation

This project was bootstrapped with the official **React + TypeScript + Vite** template. The following documentation is preserved from the original template setup:

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs/) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
// eslint.config.js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

---

## Features

### Core Functionality
- **Alumni Directory** - Searchable, filterable database of all postgraduate alumni
- **Profile Management** - Detailed profiles with academic history, current employment, and contact information
- **Cohort Tracking** - Organize alumni by graduation year, program, and department
- **Career Progression** - Track professional development and achievements post-graduation
- **Engagement Analytics** - Dashboard insights on alumni participation and event attendance

### Administrative Tools
- **Role-based Access Control** - Different permissions for administrators, department heads, and alumni
- **Bulk Import/Export** - CSV/Excel upload for batch alumni registration
- **Communication Hub** - Email notifications and newsletter management
- **Event Management** - Schedule and track reunions, webinars, and networking events

### User Experience
- **Responsive Design** - Fully functional on desktop, tablet, and mobile devices
- **Advanced Search** - Filter by graduation year, program, location, industry, etc.
- **Real-time Updates** - Live dashboard with recent alumni activities
- **Secure Authentication** - JWT-based auth with password encryption

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18+, TypeScript 5.0+ |
| **Build Tool** | Vite 5.0+ |
| **Styling** | Tailwind CSS / CSS Modules |
| **State Management** | React Context API / Zustand |
| **Routing** | React Router v6 |
| **Forms** | React Hook Form + Zod |
| **HTTP Client** | Axios |
| **Charts** | Recharts / Chart.js |
| **Testing** | Vitest + React Testing Library |
| **Linting** | ESLint + TypeScript ESLint (see template config above) |

## Project Structure

```
machakos-alumni-tracker/
├── public/                  # Static assets
│   └── images/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Buttons, inputs, modals
│   │   ├── layout/         # Header, sidebar, footer
│   │   └── alumni/         # Alumni-specific components
│   ├── pages/              # Route-level pages
│   │   ├── Dashboard/
│   │   ├── AlumniDirectory/
│   │   ├── Profile/
│   │   ├── Events/
│   │   └── Admin/
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React context providers
│   ├── services/           # API integration layer
│   ├── types/              # TypeScript interfaces & types
│   ├── utils/              # Helper functions
│   ├── constants/          # App constants & config
│   └── styles/             # Global styles & Tailwind config
├── tests/                  # Test suites
├── docs/                   # Documentation
├── eslint.config.js        # ESLint config (from template)
└── package.json
```

## Getting Started

### Prerequisites
- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/onyangoju/Machakos-University-Postgraduate-Alumni-Tracker.git
   cd machakos-alumni-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_APP_NAME=Machakos Alumni Tracker
   VITE_APP_VERSION=1.0.0
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:ui` | Run tests with UI coverage report |
| `npm run lint` | Run ESLint (using template config) |
| `npm run lint:fix` | Fix auto-fixable ESLint issues |
| `npm run type-check` | Run TypeScript compiler check |

## API Integration

The frontend connects to the Machakos University Alumni API. Key endpoints:

- `GET /api/alumni` - List all alumni with pagination
- `GET /api/alumni/:id` - Retrieve specific alumni profile
- `POST /api/alumni` - Register new alumni
- `PUT /api/alumni/:id` - Update alumni information
- `DELETE /api/alumni/:id` - Remove alumni record
- `GET /api/cohorts` - Retrieve graduation cohorts
- `GET /api/analytics` - Dashboard statistics

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards
- Follow the existing TypeScript strict mode configurations (see template ESLint setup above)
- Write unit tests for new components and utilities
- Ensure all ESLint rules pass before submitting PR
- Use conventional commit messages

## Roadmap

- [ ] **Phase 1** (Current): Core directory and profile management
- [ ] **Phase 2**: Advanced analytics and reporting
- [ ] **Phase 3**: Mobile application (React Native)
- [ ] **Phase 4**: AI-powered career matching and mentorship platform
- [ ] **Phase 5**: Integration with national alumni networks

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Pauline Onyango, Machakos University

## Live Demo
🔗 https://your-deployment-link.com

## Acknowledgments

- **Machakos University** - For the opportunity to develop this system
- **Postgraduate Studies Department** - For requirements and feedback
- **Vite & React Teams** - For the excellent starter template and documentation
- **Machakos University IT Department** - For technical support and infrastructure

## Contact

**Developer:** Pauline Onyango  
**Email:** paulineakoth2002@gmail.com 
**Department:** Business & Finance, SBETHM, MksU  
**Project Repository:** [https://github.com/onyangoju/Machakos-University-Postgraduate-Alumni-Tracker.git](https://github.com/onyangoju/Machakos-University-Postgraduate-Alumni-Tracker.git)
