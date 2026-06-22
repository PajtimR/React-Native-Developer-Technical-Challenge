import { Platform } from 'react-native';

export const colors = {
  ink: '#14202F',
  slate: '#3C4858',
  muted: '#6D7784',
  line: '#D8E1DD',
  paper: '#F6F8F4',
  surface: '#FFFFFF',
  mint: '#74B99A',
  mintSoft: '#E2F2EA',
  coral: '#E66B4F',
  coralSoft: '#FBE4DD',
  blue: '#4B6F9F',
  blueSoft: '#E5ECF6',
  warning: '#B15E23',
  danger: '#B8453F',
  shadow: '#0E1A24',
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
  shadowOpacity: 0.08,
  shadowOffset: { width: 0, height: 8 },
  shadowRadius: 18,
  elevation: 3,
};
