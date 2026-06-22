import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, shadowStyle, spacing, typography } from '../theme';
import { Task } from '../types';
import { formatCreatedDate } from '../utils/tasks';
import { AppButton } from './AppButton';
import { StatusPill } from './StatusPill';

type TaskCardProps = {
  task: Task;
  onOpen: () => void;
  onToggle: () => void;
  onDelete: () => void;
};

export function TaskCard({ task, onOpen, onToggle, onDelete }: TaskCardProps) {
  return (
    <View style={[styles.card, task.completed && styles.completedCard]}>
      <View style={styles.topRow}>
        <StatusPill completed={task.completed} />
        <Text style={styles.date}>{formatCreatedDate(task.createdAt)}</Text>
      </View>
      <Text style={[styles.title, task.completed && styles.completedTitle]} numberOfLines={2}>
        {task.title}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {task.description || 'No description added.'}
      </Text>
      <View style={styles.actions}>
        <AppButton label="Details" onPress={onOpen} small variant="ghost" />
        <AppButton
          label={task.completed ? 'Reopen' : 'Complete'}
          onPress={onToggle}
          small
          variant={task.completed ? 'ghost' : 'secondary'}
        />
        <AppButton label="Delete" onPress={onDelete} small variant="danger" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...shadowStyle,
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderLeftColor: colors.coral,
    borderLeftWidth: 4,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  completedCard: {
    borderLeftColor: colors.mint,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  date: {
    color: colors.muted,
    flexShrink: 1,
    fontFamily: typography.utility,
    fontSize: 11,
    letterSpacing: 0,
    marginLeft: spacing.sm,
    textAlign: 'right',
  },
  title: {
    color: colors.ink,
    fontFamily: typography.display,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 25,
    marginBottom: spacing.sm,
  },
  completedTitle: {
    color: colors.muted,
    textDecorationLine: 'line-through',
  },
  description: {
    color: colors.slate,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 21,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
});
