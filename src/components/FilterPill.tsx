import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type FilterPillProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function FilterPill({ label, active, onPress }: FilterPillProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [styles.base, active && styles.active, pressed && styles.pressed]}
    >
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.sm,
    borderWidth: 1,
    minHeight: 38,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  active: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  pressed: {
    opacity: 0.78,
  },
  label: {
    color: colors.slate,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
  },
  activeLabel: {
    color: colors.surface,
  },
});
