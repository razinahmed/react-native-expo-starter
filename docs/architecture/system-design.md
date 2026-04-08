# Architecture

## Overview

React Native Expo Starter is a production-ready mobile app template built with Expo SDK, React Navigation, and a context-based state management approach. It provides authentication flow, tab navigation, and patterns for data fetching and local storage.

## Project Structure

```
src/
  screens/          # Screen components (LoginScreen, HomeScreen, etc.)
  components/       # Reusable UI components (Button, Card, Avatar, etc.)
  navigation/       # React Navigation configuration (stacks, tabs, linking)
  context/          # React Context providers (AuthContext, ThemeContext)
  hooks/            # Custom hooks (useAuth, useFetch, useForm)
  utils/            # Helpers (storage, apiClient, validators)
  constants/        # App-wide constants (colors, layout, config)
  assets/           # Images, fonts, and animations
app.json            # Expo configuration
```

## Navigation Architecture

Navigation uses React Navigation v6 with a conditional root navigator:

1. **RootNavigator** checks `AuthContext.isAuthenticated`
2. If `false`, renders **AuthStack** (Login, Register screens)
3. If `true`, renders **MainTabs** (Home, Explore, Profile)
4. **ExploreStack** is nested inside MainTabs for list-to-detail push navigation

Deep linking is configured via the `linking` config in `navigation/linking.ts`, supporting both universal links and custom URI schemes.

## Authentication Flow

1. User submits email/password on LoginScreen
2. `AuthContext.login()` calls `POST /auth/login` via `apiClient`
3. On success, the JWT token is stored in `expo-secure-store`
4. `AuthContext` state updates to `{ isAuthenticated: true, user }`, triggering navigation to MainTabs
5. On app launch, `AuthContext` checks secure store for an existing token and calls `GET /auth/me` to validate the session

Token refresh is handled by an Axios response interceptor that catches 401 errors and attempts a silent refresh before retrying the original request.

## State Management

The app uses React Context for global state (auth, theme) and local `useState`/`useReducer` for screen-level state. For data fetching, a custom `useFetch` hook provides loading/error states and caching.

**Why not Redux/Zustand?** The starter template keeps dependencies minimal. The context pattern is sufficient for auth and theme. Consumers can add Redux or Zustand as the app grows.

## Data Fetching

The `apiClient` is an Axios instance configured with:
- Base URL from `EXPO_PUBLIC_API_URL` environment variable
- Request interceptor that attaches the Bearer token from secure store
- Response interceptor for 401 handling and token refresh
- 10-second timeout

The `useFetch(url)` hook wraps `apiClient.get` with automatic loading/error state, caching by URL key, and a `refetch()` function.

## Theming

`ThemeContext` provides light and dark color schemes. The active theme is persisted in async storage so it survives app restarts. Components access colors via the `useTheme()` hook rather than importing constants directly.

## Testing Strategy

| Layer | Tool | Scope |
|-------|------|-------|
| Unit | Jest + React Native Testing Library | Screens, components, hooks, context |
| E2E | Detox | Full user flows on iOS/Android simulators |
| Type checking | TypeScript strict mode | Compile-time type safety |

## Build & Deployment

- **Development**: `expo start` launches the Metro bundler with hot reload
- **Preview**: `eas build --profile preview` creates a shareable build for testers
- **Production**: `eas build --profile production` then `eas submit` to App Store / Play Store
- **OTA Updates**: `eas update` pushes JS bundle updates without a new binary release
