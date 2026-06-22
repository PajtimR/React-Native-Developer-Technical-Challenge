import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  small?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  small = false,
  accessibilityLabel,
  style,
}: AppButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        small && styles.small,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, labelStyles[variant], small && styles.smallLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: radius.sm,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  primary: {
    backgroundColor: colors.coral,
    borderColor: colors.coral,
  },
  secondary: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: colors.line,
  },
  danger: {
    backgroundColor: colors.coralSoft,
    borderColor: colors.coralSoft,
  },
  small: {
    minHeight: 36,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.46,
  },
  pressed: {
    transform: [{ translateY: 1 }],
    opacity: 0.86,
  },
  label: {
    fontFamily: typography.body,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
  },
  smallLabel: {
    fontSize: 13,
  },
});

const labelStyles = StyleSheet.create({
  primary: {
    color: colors.surface,
  },
  secondary: {
    color: colors.surface,
  },
  ghost: {
    color: colors.ink,
  },
  danger: {
    color: colors.danger,
  },
});
