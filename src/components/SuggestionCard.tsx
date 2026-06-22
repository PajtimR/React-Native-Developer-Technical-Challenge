import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, shadowStyle, spacing, typography } from '../theme';
import { ApiTaskSuggestion } from '../types';
import { AppButton } from './AppButton';

type SuggestionCardProps = {
  suggestion: ApiTaskSuggestion;
  onUse: () => void;
};

export function SuggestionCard({ suggestion, onUse }: SuggestionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>API idea</Text>
      <Text style={styles.title} numberOfLines={2}>
        {suggestion.title}
      </Text>
      <AppButton label="Use" onPress={onUse} small variant="ghost" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...shadowStyle,
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderTopColor: colors.blue,
    borderTopWidth: 3,
    borderRadius: radius.md,
    borderWidth: 1,
    marginRight: spacing.md,
    minHeight: 132,
    padding: spacing.md,
    width: 184,
  },
  kicker: {
    color: colors.blue,
    fontFamily: typography.utility,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    flex: 1,
    fontFamily: typography.body,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 20,
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: spacing.md,
  },
});
