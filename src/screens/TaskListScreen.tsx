import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppButton } from '../components/AppButton';
import { EmptyState } from '../components/EmptyState';
import { FilterPill } from '../components/FilterPill';
import { SuggestionCard } from '../components/SuggestionCard';
import { TaskCard } from '../components/TaskCard';
import { colors, spacing, typography } from '../theme';
import { ApiTaskSuggestion, Task, TaskStatusFilter } from '../types';
import { filterTasks } from '../utils/tasks';

type TaskListScreenProps = {
  tasks: Task[];
  storageReady: boolean;
  storageError: string | null;
  suggestions: ApiTaskSuggestion[];
  suggestionsLoading: boolean;
  suggestionsError: string | null;
  onAddTask: () => void;
  onOpenTask: (taskId: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUseSuggestion: (suggestion: ApiTaskSuggestion) => void;
  onRefreshSuggestions: () => void;
};

const filters: Array<{ label: string; value: TaskStatusFilter }> = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Completed', value: 'completed' },
];

export function TaskListScreen({
  tasks,
  storageReady,
  storageError,
  suggestions,
  suggestionsLoading,
  suggestionsError,
  onAddTask,
  onOpenTask,
  onToggleTask,
  onDeleteTask,
  onUseSuggestion,
  onRefreshSuggestions,
}: TaskListScreenProps) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>('all');
  const filteredTasks = useMemo(() => filterTasks(tasks, query, statusFilter), [tasks, query, statusFilter]);
  const completedCount = tasks.filter((task) => task.completed).length;
  const openCount = tasks.length - completedCount;

  return (
    <FlatList
      data={filteredTasks}
      keyExtractor={(task) => task.id}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={suggestionsLoading} onRefresh={onRefreshSuggestions} />}
      ListHeaderComponent={
        <View>
          <View style={styles.ledgerHeader}>
            <View>
              <Text style={styles.eyebrow}>Task Manager</Text>
              <Text style={styles.title}>My Tasks</Text>
            </View>
            <AppButton label="Add" onPress={onAddTask} small />
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>{tasks.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>{openCount}</Text>
              <Text style={styles.statLabel}>Open</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>{completedCount}</Text>
              <Text style={styles.statLabel}>Done</Text>
            </View>
          </View>

          {storageError ? <Text style={styles.warningText}>{storageError}</Text> : null}

          <TextInput
            accessibilityLabel="Search tasks"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            onChangeText={setQuery}
            placeholder="Search by title or description"
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
            value={query}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
            {filters.map((filter) => (
              <FilterPill
                key={filter.value}
                active={filter.value === statusFilter}
                label={filter.label}
                onPress={() => setStatusFilter(filter.value)}
              />
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionKicker}>Public API</Text>
              <Text style={styles.sectionTitle}>Starter ideas</Text>
            </View>
            <AppButton label="Reload" onPress={onRefreshSuggestions} small variant="ghost" />
          </View>

          {suggestionsLoading ? (
            <View style={styles.apiState}>
              <ActivityIndicator color={colors.coral} />
              <Text style={styles.apiText}>Loading ideas...</Text>
            </View>
          ) : suggestionsError ? (
            <View style={styles.apiState}>
              <Text style={styles.apiText}>{suggestionsError}</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestions}>
              {suggestions.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  onUse={() => onUseSuggestion(suggestion)}
                />
              ))}
            </ScrollView>
          )}

          <View style={styles.taskSectionHeader}>
            <Text style={styles.sectionTitle}>Task list</Text>
            <Text style={styles.resultText}>
              {filteredTasks.length} {filteredTasks.length === 1 ? 'entry' : 'entries'}
            </Text>
          </View>
        </View>
      }
      ListEmptyComponent={
        storageReady ? (
          tasks.length === 0 ? (
            <EmptyState
              title="No tasks yet"
              body="Start with one clear entry and build the list from there."
              actionLabel="Add first task"
              onAction={onAddTask}
            />
          ) : (
            <EmptyState title="No matches" body="Adjust the search text or switch the status filter." />
          )
        ) : (
          <View style={styles.loadingBlock}>
            <ActivityIndicator color={colors.ink} />
            <Text style={styles.apiText}>Loading tasks...</Text>
          </View>
        )
      }
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          onOpen={() => onOpenTask(item.id)}
          onToggle={() => onToggleTask(item.id)}
          onDelete={() => onDeleteTask(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  ledgerHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  eyebrow: {
    color: colors.coral,
    fontFamily: typography.utility,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    fontFamily: typography.display,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 38,
  },
  statsRow: {
    backgroundColor: colors.ink,
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  statBlock: {
    borderRightColor: 'rgba(255,255,255,0.14)',
    borderRightWidth: 1,
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  statValue: {
    color: colors.surface,
    fontFamily: typography.display,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0,
  },
  statLabel: {
    color: '#BFD3CB',
    fontFamily: typography.utility,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    marginTop: spacing.xs,
    textTransform: 'uppercase',
  },
  warningText: {
    backgroundColor: colors.coralSoft,
    borderRadius: 8,
    color: colors.warning,
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.ink,
    fontFamily: typography.body,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  filters: {
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  sectionKicker: {
    color: colors.muted,
    fontFamily: typography.utility,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: colors.ink,
    fontFamily: typography.display,
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: 0,
  },
  apiState: {
    alignItems: 'center',
    backgroundColor: colors.blueSoft,
    borderRadius: 8,
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    padding: spacing.md,
  },
  apiText: {
    color: colors.slate,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 20,
  },
  suggestions: {
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
  },
  taskSectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  resultText: {
    color: colors.muted,
    fontFamily: typography.utility,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  loadingBlock: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
  },
});
