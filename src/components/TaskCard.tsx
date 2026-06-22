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
        <View style={styles.statusRow}>
          <View style={[styles.dot, task.completed && styles.completedDot]} />
          <StatusPill completed={task.completed} />
        </View>
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
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  completedCard: {
    backgroundColor: '#FBFDFC',
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statusRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  completedDot: {
    backgroundColor: colors.mint,
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
    fontSize: 21,
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
    lineHeight: 22,
  },
  actions: {
    borderTopColor: colors.line,
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingTop: spacing.md,
  },
});
