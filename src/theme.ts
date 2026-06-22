import { Platform } from 'react-native';

export const colors = {
  ink: '#111827',
  slate: '#384152',
  muted: '#6B7280',
  line: '#DEE6F0',
  paper: '#F4F7FB',
  surface: '#FFFFFF',
  mint: '#2F9E73',
  mintSoft: '#E8F6EF',
  coral: '#E4573D',
  coralSoft: '#FDEAE5',
  blue: '#2F6FED',
  blueSoft: '#EAF1FF',
  warning: '#9A5A18',
  danger: '#C2413B',
  shadow: '#101828',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
};

export const typography = {
  display: Platform.select({ ios: 'Avenir Next', android: 'sans-serif-condensed', default: 'System' }),
  body: Platform.select({ ios: 'Avenir', android: 'sans-serif', default: 'System' }),
  utility: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
};

export const shadowStyle = {
  shadowColor: colors.shadow,
  shadowOpacity: 0.07,
  shadowOffset: { width: 0, height: 10 },
  shadowRadius: 20,
  elevation: 2,
};
