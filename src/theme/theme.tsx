





export const Colors = {
  // Primary
  primary: '#5b76fb',
  primaryDark: '#0D47A1',
  primaryLight: '#e3f2fd',

  // Secondary
  secondary: '#D41473',
  secondaryLight: '#FFE3F1',

  // Neutral
  white: '#fff',
  black: '#000',
  background: '#F8F9FB',
  surface: '#f2f2f2',
  
  // Text
  textPrimary: '#1a1a1a',
  textSecondary: '#555',
  textTertiary: '#777',
  textHint: '#999',
  textDisabled: '#ccc',

  // Status
  success: '#81C784',
  error: '#e53935',
  warning: '#FFB74D',
  info: '#29B6F6',

  // UI Elements
  border: '#E0E0E0',
  divider: '#9E9E9E',
  overlay: 'rgba(0,0,0,0.35)',
  overlayDark: 'rgba(0,0,0,0.6)',
  overlayLight: 'rgba(0,0,0,0.4)',

  // Backgrounds
  cardBackground: '#fff',
  disabledBackground: 'rgba(0,0,0,0.5)',
  
  // Tab colors
  tabActive: '#0D47A1',
  tabInactive: 'gray',

  // Specific
  heart: '#FF4D4F',
  star: '#FFD700',
  link: '#4db6e1',
  green: '#4db6e1',
};


export const Strings = {
  // Common
  common: {
    appName: 'SelfLearingApp',
    ok: 'OK',
    cancel: 'Cancel',
    close: 'Close',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    noData: 'No data available',
    noNewsFound: 'No news available',
    tryAgain: 'Try Again',
  },

  // Login Screen
  login: {
    signIn: 'SIGN IN OR JOIN NOW',
    enterPhoneNumber: 'ENTER YOUR PHONE NUMBER',
    helperText: "we'll send you a code and nothing else",
    phonePlaceholder: 'phone number',
    continueBtn: 'Continue',
    privacyPolicy: 'privacy policy',
    termsOfUse: 'terms of use',
    termsText: 'by signing in you agree to our {privacyPolicy} and {termsOfUse}',
  },

  // Home Screen
  home: {
    greeting: 'Hi, David  👋',
    exploreWorld: 'Explore the world',
    searchNews: 'Search news',
    usNews: 'US NEWS',
    indiaNews: 'INDIA NEWS',
    viewAll: 'View All',
    networkError: 'Network error',
    failedToFetchNews: 'Failed to fetch news',
  },

  // Category
  category: {
    business: 'Business',
    sports: 'Sports',
    technology: 'Technology',
    health: 'Health',
  },

  // Profile Screen
  profile: {
    profileTitle: 'Profile',
    personalInformation: 'Personal information',
    notifications: 'Notifications',
    timeSpent: 'Time spent',
    following: 'Following',
    accountSettings: 'Account settings',
    privacyPolicy: 'Privacy policy',
    termsConditions: 'Terms & Conditions',
    faqHelp: 'FAQ & Help',
    helpSupport: 'Help & Support',
    logout: 'Log out',
    becomePublisher: 'Become a publisher',
  },

  // Details Screen
  details: {
    overview: 'Overview',
    detailsTab: 'Details',
    readMore: 'Read More',
    price: 'Price',
  },

  // View All Screen
  viewAll: {
    noNewsAvailable: 'No news available',
  },

  // Button Labels
  buttons: {
    submit: 'Submit',
    next: 'Next',
    back: 'Back',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
  },

  // Error Messages
  errors: {
    networkError: 'Network error. Please check your connection.',
    somethingWentWrong: 'Something went wrong',
    invalidPhoneNumber: 'Invalid phone number',
    apiError: 'API Error',
  },

  // Navigation Tab Labels
  navigation: {
    home: 'Home',
    favorite: 'Favourite',
    profile: 'Profile',
  },
};


export const typography = {
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 13,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 22,
    xxxl: 28,
    heading: 36,
  },

  // Font Weights
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  // Line Heights
  lineHeight: {
    tight: 18,
    normal: 22,
    relaxed: 26,
  },

  // Letter Spacing
  letterSpacing: {
    tight: 0.5,
    normal: 0,
    wide: 1,
  },
};