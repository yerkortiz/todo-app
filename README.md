# To-do list

A to-do list built with Next.js and React. Tasks can be created, edited, completed and deleted, and are persisted in `localStorage`.

## 1. Dependencies

- [Node.js](https://nodejs.org/) LTS and npm
- **Runtime:** `next`, `react`, `react-dom`, `lucide-react` (icons)
- **Development:** `typescript`, `tailwindcss`, `eslint`, `vitest`

## 2. How to run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 3. How to test

```bash
npm test
```

Tests just cover the task domain logic in `lib/tasks.ts`.

## 4. Data model (tasks)

```ts
type TaskStatus = "pending" | "completed";

type Task = {
  id: string;           // crypto.randomUUID()
  title: string;        // required
  description?: string; // optional
  deadline?: string;    // optional, local date and time, e.g. "2026-11-20T18:00"
  status: TaskStatus;   // pending | completed
};
```

- Tasks are stored as a JSON array under the `tasks` key in `localStorage`.
- `status` is a union instead of a boolean so new states can be added in one place.
- `deadline` keeps the value of `<input type="datetime-local">` as is (local time, no timezone), which is enough for a single-device app.
- Deleting removes the task from the list; there is no soft delete.

## 5. Dir structure

```
app/
  page.tsx           Page: columns by status, dialog state, delete confirmation
components/
  TaskDialog.tsx     Native <dialog> used to create and edit tasks
  TaskForm.tsx       Title, description and deadline fields
  TaskList.tsx       A column of tasks (TaskItem is internal to this file)
lib/
  tasks.ts           Task types and pure state transitions
  tasks.test.ts      Unit tests for the transitions
  useTasks.ts        Hook that reads and saves tasks in localStorage
```
