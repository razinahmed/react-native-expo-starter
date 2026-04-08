# Screen & Component API Reference

## Screens

### LoginScreen

Entry screen for unauthenticated users.

| Prop | Type | Description |
|------|------|-------------|
| `navigation` | `NavigationProp` | Provided by React Navigation |

**Test IDs:** `login-screen`, `email-input`, `password-input`, `login-button`

### HomeScreen

Main dashboard after authentication.

| Prop | Type | Description |
|------|------|-------------|
| `navigation` | `NavigationProp` | Provided by React Navigation |

**Test IDs:** `home-screen`, `welcome-text`, `featured-list`

### ExploreScreen

Scrollable list of items with search.

| Prop | Type | Description |
|------|------|-------------|
| `navigation` | `NavigationProp` | Provided by React Navigation |

**Test IDs:** `explore-screen`, `search-input`, `list-item-{index}`

### DetailScreen

Full detail view for a selected item.

| Route Params | Type | Description |
|-------------|------|-------------|
| `id` | `string` | Item identifier |

**Test IDs:** `detail-screen`, `back-button`, `detail-title`, `detail-body`

### ProfileScreen

Displays current user info and settings.

**Test IDs:** `profile-screen`, `logout-button`, `avatar`, `edit-profile-button`

## Context Providers

### AuthProvider

Wraps the app and manages authentication state.

```jsx
<AuthProvider>
  <App />
</AuthProvider>
```

**Exposed via `useAuth()` hook:**

| Property | Type | Description |
|----------|------|-------------|
| `isAuthenticated` | `boolean` | Whether user is logged in |
| `user` | `User \| null` | Current user object |
| `login(email, password)` | `Promise<void>` | Authenticate and store token |
| `logout()` | `Promise<void>` | Clear token and reset state |
| `loading` | `boolean` | True during session restore |

## Navigation Structure

```
RootNavigator
  ├── AuthStack (unauthenticated)
  │   ├── LoginScreen
  │   └── RegisterScreen
  └── MainTabs (authenticated)
      ├── HomeScreen (tab-home)
      ├── ExploreStack (tab-explore)
      │   ├── ExploreScreen
      │   └── DetailScreen
      └── ProfileScreen (tab-profile)
```

## Utility Modules

### storage

Async key-value storage wrapper around `expo-secure-store`.

| Method | Signature | Description |
|--------|-----------|-------------|
| `getItem` | `(key: string) => Promise<string \| null>` | Retrieve stored value |
| `setItem` | `(key: string, value: string) => Promise<void>` | Store a value |
| `removeItem` | `(key: string) => Promise<void>` | Delete a stored value |

### apiClient

Pre-configured Axios instance with base URL and auth interceptor.

| Config | Value |
|--------|-------|
| Base URL | `process.env.EXPO_PUBLIC_API_URL` |
| Auth | Attaches `Authorization: Bearer <token>` header automatically |
| Timeout | 10000ms |
