# Xcode & Build Instructions (MacBook Pro Migration)

## Overview
This document provides instructions for setting up and building \"Neon-Pong\" onto a fresh Mac environment. It follows the standard workflow for an Expo project with native requirements.

---

## 1. Prerequisites
Ensure your MacBook has the following installed:
- **Node.js**: v18 or higher (LTS recommended).
- **Watchman**: Required for proper file watching in React Native.
- **CocoaPods**: `sudo gem install cocoapods` (or via Homebrew: `brew install cocoapods`).
- **Xcode & Command Line Tools**: Ensure the latest version of Xcode is installed and the command line tools are selected (`xcode-select --switch /Applications/Xcode.cc.tools`).

## 2. Project Setup
Once you have cloned the repository:

```bash
# Navigate to the project directory
cd Neon-Pong

# Install JavaScript dependencies
npm install

# Install and check Expo environment
npx expo install --check
```

## 3. iOS Build Preparation
If common CocoaPods issues arise or if specific native modules are used, run:

```bash
# This installs the pods for the underlying iOS project
cd ios && pod install && cd ..
```

## 4. Running on Device/Simulator
To start development or build locally:

```bash
# Start with a dev build
npx expo start
```
*Press **'i'** to open in the iOS Simulator.*

---

## Troubleshooting Common Issues
- **CocoaPods errors**: Run `pod repo update` and ensure your version of Ruby is compatible.
- **Missing Assets**: If assets don't load, run `npx expo start --clear`.
- **Port Conflicts**: If port 8081 is busy, use `npx expo start --port 8082`.

## Verification Points
The app is considered \"Ready\" when:
1. The Javascript bundle builds successfully on your machine.
2. The app launches in the iOS Simulator without crashing at the splash screen.
\n\n**Notice:** If you encounter specific building errors during the `pod install` phase, please consult the official Expo documentation for "iOS build issues."
