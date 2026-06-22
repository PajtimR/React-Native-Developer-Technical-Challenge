import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';

import { fetchTaskSuggestions } from './src/services/suggestionsApi';
import { loadStoredTasks, saveStoredTasks } from './src/storage/tasksStorage';
import { colors } from './src/theme';
import { ApiTaskSuggestion, NewTaskInput, ScreenRoute, Task } from './src/types';
import { createTask } from './src/utils/tasks';
import { TaskDetailsScreen } from './src/screens/TaskDetailsScreen';
import { TaskFormScreen } from './src/screens/TaskFormScreen';
import { TaskListScreen } from './src/screens/TaskListScreen';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [route, setRoute] = useState<ScreenRoute>({ name: 'list' });
  const [storageReady, setStorageReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<ApiTaskSuggestion[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function hydrateTasks() {
      try {
        const storedTasks = await loadStoredTasks();
        if (mounted) {
          setTasks(storedTasks);
        }
      } catch {
        if (mounted) {
          setStorageError('Tasks could not be loaded from this device.');
        }
      } finally {
        if (mounted) {
          setStorageReady(true);
        }
      }
    }

    hydrateTasks();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }

    saveStoredTasks(tasks).catch(() => {
      setStorageError('Tasks could not be saved on this device.');
    });
  }, [storageReady, tasks]);

  const loadSuggestions = useCallback(async () => {
    setSuggestionsLoading(true);
    setSuggestionsError(null);

    try {
      const nextSuggestions = await fetchTaskSuggestions();
      setSuggestions(nextSuggestions);
    } catch {
      setSuggestionsError('Task ideas are unavailable right now.');
    } finally {
      setSuggestionsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);

  const selectedTask = useMemo(
    () => (route.name === 'details' ? tasks.find((task) => task.id === route.taskId) : undefined),
    [route, tasks],
  );

  const handleCreateTask = (input: NewTaskInput) => {
    const nextTask = createTask(input);
    setTasks((currentTasks) => [nextTask, ...currentTasks]);
    setRoute({ name: 'details', taskId: nextTask.id });
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));

    if (route.name === 'details' && route.taskId === taskId) {
      setRoute({ name: 'list' });
    }
  };

  const requestDeleteTask = (taskId: string) => {
    const task = tasks.find((currentTask) => currentTask.id === taskId);

    Alert.alert('Delete task?', task?.title ?? 'This task will be removed.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTask(taskId) },
    ]);
  };

  const handleUseSuggestion = (suggestion: ApiTaskSuggestion) => {
    setRoute({
      name: 'add',
      draft: {
        title: suggestion.title,
        description: suggestion.description,
        source: 'api',
      },
    });
  };

  const renderScreen = () => {
    if (route.name === 'add') {
      return (
        <TaskFormScreen
          draft={route.draft}
          onCancel={() => setRoute({ name: 'list' })}
          onCreate={handleCreateTask}
        />
      );
    }

    if (route.name === 'details') {
      return (
        <TaskDetailsScreen
          task={selectedTask}
          onBack={() => setRoute({ name: 'list' })}
          onToggle={handleToggleTask}
          onDelete={requestDeleteTask}
        />
      );
    }

    return (
      <TaskListScreen
        tasks={tasks}
        storageReady={storageReady}
        storageError={storageError}
        suggestions={suggestions}
        suggestionsLoading={suggestionsLoading}
        suggestionsError={suggestionsError}
        onAddTask={() => setRoute({ name: 'add' })}
        onOpenTask={(taskId) => setRoute({ name: 'details', taskId })}
        onToggleTask={handleToggleTask}
        onDeleteTask={requestDeleteTask}
        onUseSuggestion={handleUseSuggestion}
        onRefreshSuggestions={loadSuggestions}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      <View style={styles.appShell}>{renderScreen()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.paper,
    flex: 1,
  },
  appShell: {
    backgroundColor: colors.paper,
    flex: 1,
  },
});
