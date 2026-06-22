import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, shadowStyle, spacing, typography } from '../theme';
import { AppButton } from './AppButton';

type EmptyStateProps = {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, body, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.rule} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {actionLabel && onAction ? (
        <AppButton label={actionLabel} onPress={onAction} variant="secondary" style={styles.action} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...shadowStyle,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.xl,
  },
  rule: {
    backgroundColor: colors.blue,
    height: 3,
    marginBottom: spacing.lg,
    width: 52,
  },
  title: {
    color: colors.ink,
    fontFamily: typography.display,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  body: {
    color: colors.muted,
    fontFamily: typography.body,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  action: {
    marginTop: spacing.lg,
  },
});
