import { ApiTaskSuggestion } from '../types';

type JsonPlaceholderTodo = {
  id: number;
  title: string;
  completed: boolean;
};

const SUGGESTIONS_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=8';

function sentenceCase(value: string): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export async function fetchTaskSuggestions(): Promise<ApiTaskSuggestion[]> {
  const response = await fetch(SUGGESTIONS_URL);

  if (!response.ok) {
    throw new Error('Could not load task ideas.');
  }

  const todos = (await response.json()) as JsonPlaceholderTodo[];

  return todos.map((todo) => ({
    id: String(todo.id),
    title: sentenceCase(todo.title),
    description: `Imported idea from JSONPlaceholder item ${todo.id}.`,
  }));
}
