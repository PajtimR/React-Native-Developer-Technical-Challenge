import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type StatusPillProps = {
  completed: boolean;
};

export function StatusPill({ completed }: StatusPillProps) {
  return (
    <View style={[styles.base, completed ? styles.completed : styles.open]}>
      <Text style={[styles.label, completed ? styles.completedLabel : styles.openLabel]}>
        {completed ? 'Completed' : 'Open'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  completed: {
    backgroundColor: colors.mintSoft,
  },
  open: {
    backgroundColor: colors.blueSoft,
  },
  label: {
    fontFamily: typography.utility,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  completedLabel: {
    color: colors.mint,
  },
  openLabel: {
    color: colors.blue,
  },
});
