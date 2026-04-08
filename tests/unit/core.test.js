import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';
import LoginScreen from '../../src/screens/LoginScreen';
import HomeScreen from '../../src/screens/HomeScreen';
import { storage } from '../../src/utils/storage';
import { apiClient } from '../../src/utils/api';

jest.mock('../../src/utils/storage');
jest.mock('../../src/utils/api');

function renderWithProviders(ui) {
  return render(
    <AuthProvider>
      <NavigationContainer>{ui}</NavigationContainer>
    </AuthProvider>
  );
}

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders email and password inputs', () => {
    const { getByTestId } = renderWithProviders(<LoginScreen />);
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
  });

  it('shows error when submitting empty form', async () => {
    const { getByTestId, getByText } = renderWithProviders(<LoginScreen />);
    fireEvent.press(getByTestId('login-button'));
    await waitFor(() => {
      expect(getByText('Email is required')).toBeTruthy();
    });
  });

  it('validates email format', async () => {
    const { getByTestId, getByText } = renderWithProviders(<LoginScreen />);
    fireEvent.changeText(getByTestId('email-input'), 'notanemail');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.press(getByTestId('login-button'));
    await waitFor(() => {
      expect(getByText('Invalid email format')).toBeTruthy();
    });
  });

  it('calls API and stores token on successful login', async () => {
    apiClient.post.mockResolvedValue({ data: { token: 'abc123', user: { id: 1, name: 'Test' } } });
    storage.setItem.mockResolvedValue(undefined);

    const { getByTestId } = renderWithProviders(<LoginScreen />);
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      });
      expect(storage.setItem).toHaveBeenCalledWith('authToken', 'abc123');
    });
  });

  it('displays API error message on failed login', async () => {
    apiClient.post.mockRejectedValue({ response: { data: { message: 'Invalid credentials' } } });

    const { getByTestId, getByText } = renderWithProviders(<LoginScreen />);
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'wrongpass');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeTruthy();
    });
  });
});

describe('AuthContext', () => {
  it('initializes as unauthenticated', () => {
    storage.getItem.mockResolvedValue(null);
    let authState;
    function TestComponent() {
      authState = useAuth();
      return null;
    }
    render(<AuthProvider><TestComponent /></AuthProvider>);
    expect(authState.isAuthenticated).toBe(false);
    expect(authState.user).toBeNull();
  });

  it('restores session from stored token', async () => {
    storage.getItem.mockResolvedValue('stored-token');
    apiClient.get.mockResolvedValue({ data: { id: 1, name: 'Restored' } });
    let authState;
    function TestComponent() {
      authState = useAuth();
      return null;
    }
    render(<AuthProvider><TestComponent /></AuthProvider>);
    await waitFor(() => {
      expect(authState.isAuthenticated).toBe(true);
      expect(authState.user.name).toBe('Restored');
    });
  });
});

describe('HomeScreen', () => {
  it('renders welcome message with user name', () => {
    const mockAuth = { user: { name: 'Jane' }, isAuthenticated: true };
    jest.spyOn(require('../../src/context/AuthContext'), 'useAuth').mockReturnValue(mockAuth);

    const { getByText } = renderWithProviders(<HomeScreen />);
    expect(getByText('Welcome, Jane')).toBeTruthy();
  });
});
