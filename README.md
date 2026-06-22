# PRITECH Tasks

This is a small task manager app built with React Native and Expo for the PRITECH technical challenge.

The app lets a user create personal tasks, keep track of what is still open, mark tasks as completed, delete tasks, and open a simple details screen for each task. I also added the bonus features from the brief: search, filtering by status, local storage, and simple navigation between screens.

The project is using Expo SDK 54 so it can run on older Expo Go versions more reliably.

## Running the project

First install the dependencies:

```bash
npm install
```

Then start Expo:

```bash
npm start
```

After Metro starts, scan the QR code with Expo Go on your phone.

If Expo Go shows an SDK warning or the app does not refresh correctly, restart Expo with a clean cache:

```bash
npx expo start -c
```

## Features

- View all tasks in a clean task list.
- Add a task with a title and description.
- Validate the form before saving.
- Mark tasks as completed or open again.
- Delete tasks with a confirmation alert.
- Open a task details screen.
- Search tasks by title or description.
- Filter tasks by all, open, or completed status.
- Show empty states when there are no tasks or no search results.
- Save tasks locally on the device with AsyncStorage.
- Fetch starter task ideas from a public API.

## Public API

The app uses JSONPlaceholder to load a few starter task ideas:

```text
https://jsonplaceholder.typicode.com/todos?_limit=8
```

When the user taps `Use`, the idea is copied into the add task form. After saving it, the task details screen shows that it came from the public API.

## Project structure

Most of the app code is inside `src`.

```text
src/components  reusable UI components
src/screens     list, add, and details screens
src/services    public API request
src/storage     AsyncStorage helpers
src/utils       task validation and filtering helpers
```

## Checks

I used TypeScript for the project and verified it with:

```bash
npm run typecheck
```

Expo dependencies can be checked with:

```bash
npx expo install --check
```
