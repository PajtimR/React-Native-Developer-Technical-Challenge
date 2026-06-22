import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../components/AppButton';
import { EmptyState } from '../components/EmptyState';
import { StatusPill } from '../components/StatusPill';
import { colors, radius, shadowStyle, spacing, typography } from '../theme';
import { Task } from '../types';
import { formatCreatedDate } from '../utils/tasks';

type TaskDetailsScreenProps = {
  task?: Task;
  onBack: () => void;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
};

export function TaskDetailsScreen({ task, onBack, onToggle, onDelete }: TaskDetailsScreenProps) {
  if (!task) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <AppButton label="Back" onPress={onBack} small variant="ghost" style={styles.backButton} />
        <EmptyState title="Task not found" body="This task is no longer in the list." actionLabel="Return" onAction={onBack} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <AppButton label="Back" onPress={onBack} small variant="ghost" />
        <StatusPill completed={task.completed} />
      </View>

      <View style={styles.headerBlock}>
        <Text style={styles.kicker}>Task details</Text>
        <Text style={[styles.title, task.completed && styles.completedTitle]}>{task.title}</Text>
      </View>

      <View style={styles.detailBlock}>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Created</Text>
          <Text style={styles.metaValue}>{formatCreatedDate(task.createdAt)}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Source</Text>
          <Text style={styles.metaValue}>{task.source === 'api' ? 'Public API idea' : 'Manual entry'}</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.description}>{task.description || 'No description added.'}</Text>
      </View>

      <View style={styles.actions}>
        <AppButton
          label={task.completed ? 'Mark as open' : 'Mark complete'}
          onPress={() => onToggle(task.id)}
          variant="secondary"
          fullWidth
        />
        <AppButton label="Delete task" onPress={() => onDelete(task.id)} variant="danger" fullWidth />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.xl,
  },
  kicker: {
    color: colors.blue,
    fontFamily: typography.utility,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    fontFamily: typography.display,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 39,
  },
  headerBlock: {
    marginBottom: spacing.xl,
  },
  completedTitle: {
    color: colors.muted,
    textDecorationLine: 'line-through',
  },
  detailBlock: {
    ...shadowStyle,
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  metaLabel: {
    color: colors.muted,
    fontFamily: typography.utility,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  metaValue: {
    color: colors.ink,
    flex: 1,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'right',
  },
  divider: {
    backgroundColor: colors.line,
    height: 1,
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  descriptionLabel: {
    color: colors.ink,
    fontFamily: typography.body,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.slate,
    fontFamily: typography.body,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});
