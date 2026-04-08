const { device, element, by, expect: detoxExpect } = require('detox');

describe('React Native Expo Starter - E2E Tests', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('Authentication Flow', () => {
    it('shows login screen on first launch', async () => {
      await detoxExpect(element(by.id('login-screen'))).toBeVisible();
      await detoxExpect(element(by.id('email-input'))).toBeVisible();
      await detoxExpect(element(by.id('password-input'))).toBeVisible();
    });

    it('shows validation errors for empty fields', async () => {
      await element(by.id('login-button')).tap();
      await detoxExpect(element(by.text('Email is required'))).toBeVisible();
      await detoxExpect(element(by.text('Password is required'))).toBeVisible();
    });

    it('navigates to home screen after successful login', async () => {
      await element(by.id('email-input')).typeText('test@example.com');
      await element(by.id('password-input')).typeText('password123');
      await element(by.id('login-button')).tap();
      await detoxExpect(element(by.id('home-screen'))).toBeVisible();
    });

    it('persists session across app restart', async () => {
      await element(by.id('email-input')).typeText('test@example.com');
      await element(by.id('password-input')).typeText('password123');
      await element(by.id('login-button')).tap();
      await device.launchApp({ newInstance: false });
      await detoxExpect(element(by.id('home-screen'))).toBeVisible();
    });
  });

  describe('Tab Navigation', () => {
    beforeEach(async () => {
      await element(by.id('email-input')).typeText('test@example.com');
      await element(by.id('password-input')).typeText('password123');
      await element(by.id('login-button')).tap();
    });

    it('switches between bottom tabs', async () => {
      await element(by.id('tab-home')).tap();
      await detoxExpect(element(by.id('home-screen'))).toBeVisible();
      await element(by.id('tab-explore')).tap();
      await detoxExpect(element(by.id('explore-screen'))).toBeVisible();
      await element(by.id('tab-profile')).tap();
      await detoxExpect(element(by.id('profile-screen'))).toBeVisible();
    });

    it('navigates to detail screen from list item', async () => {
      await element(by.id('tab-explore')).tap();
      await element(by.id('list-item-0')).tap();
      await detoxExpect(element(by.id('detail-screen'))).toBeVisible();
      await element(by.id('back-button')).tap();
      await detoxExpect(element(by.id('explore-screen'))).toBeVisible();
    });
  });

  describe('Profile & Logout', () => {
    it('logs out and returns to login screen', async () => {
      await element(by.id('email-input')).typeText('test@example.com');
      await element(by.id('password-input')).typeText('password123');
      await element(by.id('login-button')).tap();
      await element(by.id('tab-profile')).tap();
      await element(by.id('logout-button')).tap();
      await detoxExpect(element(by.id('login-screen'))).toBeVisible();
    });
  });
});
