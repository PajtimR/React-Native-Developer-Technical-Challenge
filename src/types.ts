export type TaskSource = 'manual' | 'api';

export type TaskStatusFilter = 'all' | 'open' | 'completed';

export type ScreenRoute =
  | { name: 'list' }
  | { name: 'add'; draft?: Partial<NewTaskInput> }
  | { name: 'details'; taskId: string };

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  source: TaskSource;
};

export type NewTaskInput = {
  title: string;
  description: string;
  source?: TaskSource;
};

export type ApiTaskSuggestion = {
  id: string;
  title: string;
  description: string;
};
