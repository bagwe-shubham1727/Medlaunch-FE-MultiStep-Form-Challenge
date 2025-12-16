# DNV Healthcare Stroke Certification Form

A multi-step healthcare enrollment form built with React for DNV Healthcare stroke certification applications. This application guides healthcare facilities through a comprehensive 6-step certification process.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?logo=jest)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat&logo=react-hook-form&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=flat&logo=css3&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-0081CB?style=flat&logo=material-ui&logoColor=white)


## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Running the App](#-running-the-app)
- [Testing](#-testing)
- [Development Approach](#-development-approach)
- [Project Structure](#-project-structure)
- [Assumptions](#-assumptions)
- [Known Issues & Limitations](#-known-issues--limitations)

## ✨ Features

- **6-Step Form Wizard** - Guided multi-step form with progress tracking
- **Form Validation** - Real-time validation with react-hook-form
- **PDF Export** - Generate and download completed applications as PDF
- **CSV Export** - Export form data in CSV format
- **Auto-save** - Form data persisted in browser session
- **Responsive Design** - Works on desktop and tablet devices
- **Accessibility** - ARIA labels and keyboard navigation support

## 🛠 Tech Stack

### Core

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.2.0 | UI library |
| [Vite](https://vite.dev/) | 7.2.4 | Build tool & dev server |
| [React Hook Form](https://react-hook-form.com/) | 7.68.0 | Form state management & validation |

### UI Components

| Technology | Version | Purpose |
|------------|---------|---------|
| [MUI Material](https://mui.com/) | 7.3.6 | UI component library |
| [MUI Icons](https://mui.com/material-ui/material-icons/) | 7.3.6 | Icon library |

### Utilities

| Technology | Version | Purpose |
|------------|---------|---------|
| [jsPDF](https://github.com/parallax/jsPDF) | 3.0.4 | PDF generation |

### Testing

| Technology | Version | Purpose |
|------------|---------|---------|
| [Jest](https://jestjs.io/) | 30.2.0 | Test runner |
| [React Testing Library](https://testing-library.com/react) | 16.3.1 | Component testing |
| [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) | 6.9.1 | Custom DOM matchers |
| [@testing-library/user-event](https://github.com/testing-library/user-event) | 14.6.1 | User interaction simulation |

### Development

| Technology | Version | Purpose |
|------------|---------|---------|
| [ESLint](https://eslint.org/) | 9.39.1 | Code linting |
| [Babel](https://babeljs.io/) | 7.28.5 | JavaScript transpilation |

## 📦 Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or yarn/pnpm)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dnv-healthcare-form.git
   cd dnv-healthcare-form
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🚀 Running the App

### Development Server

```bash
npm run dev
```

Opens the app at [http://localhost:5173](http://localhost:5173) with hot module replacement (HMR).

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Watch Mode (Development)

```bash
npm run test:watch
```

### Coverage Report

```bash
npm run test:coverage
```

Generates a coverage report in the `coverage/` folder.

### CI Mode

```bash
npm run test:ci
```

Runs tests with coverage in non-interactive mode (for CI/CD pipelines).

### Current Coverage

| Metric | Coverage |
|--------|----------|
| Statements | 89.47% |
| Branches | 84.66% |
| Functions | 80.46% |
| Lines | 89.48% |

## 💻 Development Approach

### Architecture

1. **Component-Based Design**
   - Modular components with single responsibility
   - Reusable common components (Header, Navigation, ProgressBar)
   - Step-specific components for each form section

2. **State Management**
   - React Context API for global form state (`FormContext`)
   - `react-hook-form` for form validation and field management
   - Controlled components with `mode: "onChange"` for real-time validation

3. **Styling Strategy**
   - CSS Modules for component-scoped styles
   - Consistent naming conventions (`.component.module.css`)
   - Mobile-first responsive design approach

### Form Flow

```
Step 1: Organization Details
    ↓
Step 2: Stroke Certification Standards
    ↓
Step 3: Program Leadership & Contacts
    ↓
Step 4: Stroke Data & Metrics
    ↓
Step 5: Certification & Signatures
    ↓
Step 6: Review & Submit
```

### Key Design Decisions

1. **React Hook Form** - Chosen for its minimal re-renders and built-in validation
2. **CSS Modules** - Prevents style conflicts without runtime overhead
3. **Context API** - Sufficient for this form's state complexity (no Redux needed)
4. **jsPDF** - Client-side PDF generation without server dependency
5. **Vite** - Fast development server and optimized production builds

### Testing Strategy

- **Unit Tests** - Individual component functionality
- **Integration Tests** - Form flow and context interactions
- **User Event Testing** - Simulating real user interactions
- **Coverage Thresholds** - Minimum 80% across all metrics

## 📁 Project Structure

```
src/
├── App.jsx                 # Root component
├── main.jsx                # Entry point
├── index.css               # Global styles
├── components/
│   ├── common/             # Reusable components
│   │   ├── Header/         # App header with logo
│   │   ├── Navigation/     # Next/Back navigation buttons
│   │   ├── ProgressBar/    # Step progress indicator
│   │   └── SupportChat/    # Support chat widget
│   ├── MultiStepForm/      # Main form container
│   └── Steps/              # Form step components
│       ├── Step1/          # Organization Details
│       ├── Step2/          # Certification Standards
│       ├── Step3/          # Program Leadership
│       ├── Step4/          # Stroke Data
│       ├── Step5/          # Signatures
│       └── Step6/          # Review & Submit
└── contexts/
    └── FormContext.jsx     # Global form state
```

## 📝 Assumptions

### Business Assumptions

1. **Single Session Completion** - Users are expected to complete the form in one session
2. **US Healthcare Facilities** - Form is designed for US-based facilities (US states, ZIP codes)
3. **Desktop Primary** - Primary use case is desktop; tablet supported, mobile limited
4. **English Only** - No internationalization/localization requirements
5. **No Authentication** - Form is publicly accessible without login

### Technical Assumptions

1. **Modern Browsers** - Chrome, Firefox, Safari, Edge (latest 2 versions)
2. **JavaScript Enabled** - Application requires JavaScript
3. **Client-Side Only** - No backend server; all processing is client-side
4. **PDF Client Generation** - PDFs generated in browser (no server-side rendering)
5. **Session Storage** - Form data not persisted after browser close

### Data Assumptions

1. **Data Accuracy** - Users provide accurate facility information
2. **Date Formats** - All dates in MM/DD/YYYY format (US standard)
3. **Phone Format** - US phone numbers (10 digits)
4. **No Data Encryption** - Form data not encrypted (no sensitive PHI)

## ⚠️ Known Issues & Limitations

### Current Limitations

| Issue | Description | Workaround |
|-------|-------------|------------|
| **Mobile Responsiveness** | Limited optimization for mobile screens | Use desktop or tablet |
| **PDF Styling** | PDF export has basic formatting | Manual formatting may be needed |
| **No Persistence** | Form data lost on browser refresh/close | Complete in one session |
| **No Backend** | No server-side validation or storage | Client-side only |
| **Browser Print** | Print functionality uses browser default | Use PDF export for consistent output |

### Browser Compatibility Notes

- **Safari**: Minor CSS flexbox differences in some form layouts
- **Firefox**: PDF download may prompt save location each time
- **Mobile**: Navigation buttons may require scrolling

### Future Improvements

- [ ] Add backend API integration for data persistence
- [ ] Implement user authentication
- [ ] Add mobile-responsive design
- [ ] Server-side PDF generation for better formatting
- [ ] Multi-language support (i18n)
- [ ] Auto-save with localStorage
- [ ] Form data encryption for sensitive fields
- [ ] Offline support with service workers

## 📄 Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start development server |
| `build` | `npm run build` | Create production build |
| `preview` | `npm run preview` | Preview production build |
| `lint` | `npm run lint` | Run ESLint |
| `test` | `npm test` | Run test suite |
| `test:watch` | `npm run test:watch` | Run tests in watch mode |
| `test:coverage` | `npm run test:coverage` | Generate coverage report |
| `test:ci` | `npm run test:ci` | Run tests for CI pipeline |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


---

Built with ❤️ for DNV Healthcare
