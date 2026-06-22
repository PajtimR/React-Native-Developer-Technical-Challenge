import { NewTaskInput, Task, TaskStatusFilter } from '../types';

export type TaskDraftErrors = {
  title?: string;
  description?: string;
};

export type ValidTaskDraft = {
  title: string;
  description: string;
};

export function createTask(input: NewTaskInput): Task {
  return {
    id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: input.title.trim(),
    description: input.description.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    source: input.source ?? 'manual',
  };
}

export function validateTaskDraft(input: NewTaskInput): { errors: TaskDraftErrors; value?: ValidTaskDraft } {
  const title = input.title.trim();
  const description = input.description.trim();
  const errors: TaskDraftErrors = {};

  if (!title) {
    errors.title = 'Enter a task title.';
  } else if (title.length < 3) {
    errors.title = 'Use at least 3 characters.';
  } else if (title.length > 80) {
    errors.title = 'Keep the title under 80 characters.';
  }

  if (description.length > 280) {
    errors.description = 'Keep the description under 280 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return { errors, value: { title, description } };
}

export function filterTasks(tasks: Task[], query: string, status: TaskStatusFilter): Task[] {
  const normalizedQuery = query.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch =
      normalizedQuery.length === 0 ||
      task.title.toLowerCase().includes(normalizedQuery) ||
      task.description.toLowerCase().includes(normalizedQuery);
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && task.completed) ||
      (status === 'open' && !task.completed);

    return matchesSearch && matchesStatus;
  });
}

export function formatCreatedDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown date';
  }

  const dateText = date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timeText = date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `${dateText} at ${timeText}`;
}
