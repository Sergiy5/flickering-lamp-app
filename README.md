React Native Template
A modern React Native template with TypeScript, NativeWind (Tailwind CSS), and essential navigation libraries pre-configured.
Features

⚡ React Native 0.82.1 with React 19.1.1
🎨 NativeWind - Tailwind CSS for React Native
🧭 React Navigation - Bottom tabs & native stack navigation
📅 React Native Calendars - Calendar components
🎭 FontAwesome Icons - Comprehensive icon library
🎨 Linear Gradients - Beautiful gradient support
⚙️ Reanimated - Smooth animations
🏪 Zustand - Lightweight state management
🌐 Axios - HTTP client
📱 TypeScript - Type-safe development

Prerequisites

Node.js >= 20
React Native CLI
Android Studio (for Android development)
Xcode (for iOS development, macOS only)

Installation
bash# Install dependencies
npm install

# iOS only - Install pods
cd ios && pod install && cd ..
Available Scripts
Development
bash# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run tests
npm test

# Lint code
npm run lint
Build & Release
bash# Clean project (clears caches, builds, etc.)
npm run clean

# Build Android APK (Release)
npm run apk

# Build Android App Bundle (Release)
npm run aab
Project Structure
├── android/          # Android native code
├── ios/             # iOS native code
├── src/             # Application source code
│   ├── components/  # Reusable components
│   ├── screens/     # Screen components
│   ├── navigation/  # Navigation configuration
│   ├── store/       # Zustand state management
│   └── utils/       # Utility functions
├── package.json
└── README.md
Key Dependencies
UI & Styling

NativeWind - Utility-first styling with Tailwind CSS
React Native SVG - SVG support
React Native Linear Gradient - Gradient backgrounds

Navigation

React Navigation - Native stack & bottom tabs navigation
React Native Screens - Native screen optimization
React Native Safe Area Context - Safe area handling

Icons & Assets

FontAwesome - Free solid, regular, and brand icons

State & Data

Zustand - Minimal state management
Axios - Promise-based HTTP client

Animation

React Native Reanimated - Performant animations
React Native Worklets - JavaScript worklets for animations

Development Tools

TypeScript - Static type checking
ESLint - Code linting
Prettier - Code formatting (with Tailwind plugin)
Jest - Testing framework
React Native Testing Library - Component testing

Configuration
NativeWind Setup
The project uses NativeWind 4.x for Tailwind CSS styling. Configuration is in tailwind.config.js.
Metro Configuration
SVG transformer is configured in metro.config.js to handle SVG imports.
TypeScript
TypeScript configuration extends @tsconfig/react-native with project-specific settings.
Building for Production
Android
bash# Generate release APK
npm run apk
# Output: android/app/build/outputs/apk/release/app-release.apk

# Generate release AAB (for Play Store)
npm run aab
# Output: android/app/build/outputs/bundle/release/app-release.aab
iOS
bash# Open Xcode
open ios/YourAppName.xcworkspace

# Then use Xcode to archive and distribute
Troubleshooting
Clear caches and rebuild
bashnpm run clean
Reset Metro bundler
bashnpm start -- --reset-cache
Android build issues
bashcd android && ./gradlew clean && cd ..
License
Private project - see package.json
Support
For issues and questions, please refer to:

React Native Documentation
NativeWind Documentation
React Navigation Documentation
