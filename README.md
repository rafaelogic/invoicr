# Invoicr - Chrome Extension (Standard Development Setup)

A professional Chrome extension for creating and managing invoices built with modern development practices.

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Vite** for fast builds and development
- **ESLint** for code quality
- **Lucide React** for icons
- **Chrome Extensions API** for browser integration

## 🏗️ Modular Architecture

This extension follows a modular architecture pattern for better maintainability:

- **`/src/components/`** - Reusable UI components
- **`/src/hooks/`** - Custom React hooks for data management
- **`/src/types/`** - TypeScript type definitions
- **`/src/utils/`** - Utility functions and helpers
- **`/src/components/options/`** - Options page specific components

Key benefits:
- **Maintainable**: Each component has a single responsibility
- **Reusable**: Components can be used across different parts of the app
- **Type-safe**: Centralized TypeScript definitions
- **Testable**: Individual components can be tested in isolation

See `MODULAR_ARCHITECTURE.md` for detailed documentation.

## 🚀 Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd /Users/rafaelogic/Desktop/projects/chrome-extensions/invoicr

# Install dependencies
npm install

# Build the extension
npm run build
```

### Available Scripts

```bash
# Development build with watch mode
npm run dev

# Production build
npm run build

# Production build (explicit)
npm run build:prod

# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Clean dist folder
npm run clean

# Create distribution package
npm run package
```

## 🔧 Development Workflow

### 1. **Development Mode**
```bash
npm run dev
```
This starts Vite in watch mode - any changes to source files will automatically rebuild.

### 2. **Load Extension in Chrome**
1. Build the project: `npm run build`
2. Open Chrome → `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the project root folder (not the dist folder)

### 3. **Development Cycle**
1. Make changes to source files in `src/`
2. Vite automatically rebuilds (if in dev mode)
3. Reload extension in Chrome extensions page
4. Test changes in options page

### 4. **Production Build**
```bash
npm run build:prod
npm run package
```

## 📁 Project Structure

```
invoicr/
├── src/
│   ├── App.tsx              # Main React component
│   ├── options.tsx          # Entry point for options page
│   ├── options.html         # HTML template
│   ├── background.ts        # Service worker
│   └── index.css           # TailwindCSS imports
├── dist/                   # Build output (auto-generated)
├── icons/                  # Extension icons
├── manifest.json           # Extension configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # TailwindCSS configuration
└── package.json           # Dependencies and scripts
```

## ✨ Features

### Invoice Management
- ✅ Create, edit, and delete invoices
- ✅ Multiple line items with automatic calculations
- ✅ Client information management
- ✅ Status tracking (Draft, Sent, Paid, Overdue)
- ✅ Due date management

### Notifications
- ✅ Schedule reminders for specific dates
- ✅ Browser notifications with invoice details
- ✅ Automatic cleanup of expired reminders

### UI/UX
- ✅ Modern, responsive design with TailwindCSS
- ✅ Beautiful icons from Lucide React
- ✅ Color-coded status indicators
- ✅ Professional form layouts

### Data Management
- ✅ Local storage using Chrome Storage API
- ✅ TypeScript for type safety
- ✅ Persistent data across browser sessions

## 🔍 Code Quality

### TypeScript
- Strict mode enabled
- Type safety for Chrome APIs
- Interface definitions for all data structures

### ESLint
- React hooks rules
- TypeScript recommended rules
- Automatic formatting available

### Build System
- Vite for fast builds
- Tree-shaking for optimal bundle size
- Source maps for development

## 🚢 Deployment

### For Chrome Web Store
1. Run `npm run package`
2. Upload `invoicr-extension.zip` to Chrome Web Store
3. Complete store listing and review process

### For Development Distribution
1. Run `npm run build:prod`
2. Share the entire project folder
3. Recipients can load as unpacked extension

## 🧪 Testing the Extension

1. **Build**: `npm run build`
2. **Load**: Chrome Extensions → Load unpacked → Select project folder
3. **Access**: Right-click extension icon → "Options"
4. **Test Features**:
   - Create an invoice
   - Edit invoice details
   - Set a reminder
   - Check notification functionality

## 🔧 Customization

### Adding New Features
1. Update TypeScript interfaces in `App.tsx`
2. Add new components or modify existing ones
3. Update Chrome permissions in `manifest.json` if needed
4. Rebuild and test

### Styling Changes
- Modify `tailwind.config.js` for theme changes
- Update TailwindCSS classes in components
- Custom CSS can be added to `src/index.css`

## 📝 Notes

- The extension uses Chrome Storage API for data persistence
- All notifications are handled by the background service worker
- The build process creates optimized, production-ready files
- TypeScript ensures type safety across the entire codebase

This setup follows modern web development best practices and provides a solid foundation for building Chrome extensions with React and TypeScript.
