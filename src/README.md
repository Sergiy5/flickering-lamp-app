my-react-native-app/
├── android/                     # Native Android code (auto-generated)
├── ios/                         # Native iOS code (auto-generated)
├── src/                         # Main app source code
│   ├── api/                     # API calls, axios configs, etc.
│   │   └── index.ts
│   ├── assets/                  # Images, fonts, SVGs, etc.
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/              # Reusable UI components
│   │   ├── common/              # Buttons, inputs, etc.
│   │   ├── layout/              # Layout components
│   │   └── index.ts
│   ├── hooks/                   # Custom React hooks
│   │   ├── useTheme.ts
│   │   └── useAuth.ts
│   ├── navigation/              # React Navigation stacks
│   │   ├── AppNavigator.tsx
│   │   └── types.ts
│   ├── screens/                 # App screens
│   │   ├── Home/
│   │   │   ├── HomeScreen.tsx
│   │   │   └── styles.ts
│   │   ├── Login/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── styles.ts
│   │   └── index.ts
│   ├── store/                   # Zustand/Redux store
│   │   ├── slices/
│   │   ├── index.ts
│   │   └── types.ts
│   ├── styles/                  # Global styles or tailwind setup
│   │   ├── tailwind.css
│   │   └── theme.ts
│   ├── utils/                   # Helper functions
│   │   ├── constants.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── App.tsx                  # Root component
│   └── main.tsx                 # Entry file (registered in index.js)
├── .gitignore
├── app.json
├── babel.config.js
├── metro.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── index.js  


🧩 1. Open VS Code settings (JSON)

Press
Ctrl + Shift + P → type “Preferences: Open Settings (JSON)” → hit Enter.

Then add or edit these lines:

{
  // ✅ Controls how VS Code adds auto-imports
  "typescript.preferences.importModuleSpecifier": "relative", 
  "javascript.preferences.importModuleSpecifier": "relative",
  
  // ✅ Prefer single quotes, optional
  "typescript.preferences.quoteStyle": "single",
  "javascript.preferences.quoteStyle": "single",

  // ✅ Enable auto-imports for RN projects
  "typescript.suggest.autoImports": true,
  "javascript.suggest.autoImports": true,

  // ✅ Make suggestions more predictable
  "typescript.preferences.importModuleSpecifierEnding": "minimal",
  "javascript.preferences.importModuleSpecifierEnding": "minimal"
}