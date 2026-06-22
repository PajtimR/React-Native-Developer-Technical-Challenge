import AsyncStorage from '@react-native-async-storage/async-storage';

import { Task } from '../types';

const TASKS_STORAGE_KEY = '@pritech-task-ledger/tasks';

function isStoredTask(value: unknown): value is Task {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const task = value as Partial<Task>;

  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    typeof task.completed === 'boolean' &&
    typeof task.createdAt === 'string' &&
    (task.source === 'manual' || task.source === 'api')
  );
}

export async function loadStoredTasks(): Promise<Task[]> {
  const value = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

  if (!value) {
    return [];
  }

  const parsed = JSON.parse(value) as unknown;

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.filter(isStoredTask);
}

export async function saveStoredTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}
