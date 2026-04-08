<div align="center">

<img src="https://placehold.co/900x200/0a0a23/61dafb.png?text=React+Native+Expo+Starter&font=Montserrat" alt="React Native Expo Starter Banner" width="100%" />

# React Native Expo Starter

**A feature-rich React Native Expo starter template — TypeScript, NativeWind styling, React Navigation, authentication boilerplate, and pre-configured CI/CD for cross-platform mobile development.**

[![React Native](https://img.shields.io/badge/React_Native-0.73-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo_SDK_50-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://www.nativewind.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

[Getting Started](#-getting-started) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Project Structure](#-project-structure) · [Contributing](#-contributing)

</div>

---

## :sparkles: Features

| Feature | Description |
|---|---|
| :compass: **Expo Router Navigation** | File-based routing with nested layouts, deep linking, and typed routes |
| :shield: **TypeScript Strict Mode** | End-to-end type safety with strict compiler options and path aliases |
| :art: **NativeWind (Tailwind for RN)** | Utility-first styling with Tailwind CSS classes compiled to native styles |
| :lock: **Auth Flow** | Complete Login, Register, and Forgot Password screens with token management |
| :crescent_moon: **Dark Mode** | System-aware theme switching with persisted user preference |
| :bell: **Push Notifications** | Expo Notifications API with permission handling and token registration |
| :rocket: **OTA Updates** | Instant over-the-air updates via EAS Update without app store review |
| :gear: **CI/CD Ready** | GitHub Actions workflows for linting, testing, and EAS Build/Submit |

---

## :hammer_and_wrench: Tech Stack

| Technology | Purpose |
|---|---|
| ![React Native](https://img.shields.io/badge/React_Native-61dafb?style=flat-square&logo=react&logoColor=black) | Cross-platform mobile framework |
| ![Expo](https://img.shields.io/badge/Expo_SDK_50-000020?style=flat-square&logo=expo&logoColor=white) | Managed workflow and native APIs |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white) | Static type checking |
| ![NativeWind](https://img.shields.io/badge/NativeWind-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white) | Tailwind CSS for React Native |
| ![React Navigation](https://img.shields.io/badge/React_Navigation-6b21a8?style=flat-square&logo=react&logoColor=white) | Screen navigation and deep linking |
| ![AsyncStorage](https://img.shields.io/badge/AsyncStorage-444?style=flat-square&logo=react&logoColor=white) | Persistent key-value storage |

---

## :package: Installation

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn** >= 1.22
- **Expo CLI** — `npm install -g expo-cli`
- **iOS Simulator** (macOS) or **Android Emulator**

### Quickstart

```bash
# Clone the repository
git clone https://github.com/razinahmed/react-native-expo-starter.git

# Navigate to the project
cd react-native-expo-starter

# Install dependencies
npm install

# Start the development server
npx expo start

# Run on iOS Simulator
npx expo run:ios

# Run on Android Emulator
npx expo run:android
```

---

## :open_file_folder: Project Structure

```
react-native-expo-starter/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── explore.tsx
│   │   └── profile.tsx
│   └── _layout.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   └── shared/
│       ├── Header.tsx
│       └── ThemeToggle.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useTheme.ts
│   └── useNotifications.ts
├── services/
│   ├── api.ts
│   ├── auth.ts
│   └── storage.ts
├── constants/
│   ├── colors.ts
│   └── config.ts
├── assets/
├── app.json
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## :zap: Usage

### Authentication Flow

```tsx
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    await login({ email: 'user@example.com', password: 'secure123' });
  };

  return <Button onPress={handleLogin} loading={isLoading} title="Sign In" />;
}
```

### Theme Switching

```tsx
import { useTheme } from '@/hooks/useTheme';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return <ThemeToggle currentTheme={theme} onToggle={toggleTheme} />;
}
```

### Environment Variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

---

## :handshake: Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch — `git checkout -b feature/amazing-feature`
3. **Commit** your changes — `git commit -m "feat: add amazing feature"`
4. **Push** to the branch — `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please read the [Contributing Guidelines](CONTRIBUTING.md) before submitting a PR.

---

## :scroll: License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with :heart: by [Razin Ahmed](https://github.com/razinahmed)**

`React Native` `Expo` `Mobile Development` `TypeScript` `iOS` `Android` `Cross-Platform` `Starter Template`

</div>
