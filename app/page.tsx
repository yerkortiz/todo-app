"use client";

import { Trash2 } from "lucide-react";
import { useSyncExternalStore, type SubmitEvent } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  parseTasks,
  saveTasks,
  subscribe,
} from "@/lib/taskStorage";
import {
  addTask,
  deleteTask,
  toggleTaskStatus,
  type Task,
  type TaskStatus,
} from "@/lib/tasks";

const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pending",
  completed: "Completed",
};

function formatDeadline(deadline: string) {
  return new Date(deadline).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

type TaskFormValues = {
  title: string;
};

type TaskFormProps = {
  onSubmit: (values: TaskFormValues) => void;
};

function TaskForm({ onSubmit }: TaskFormProps) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const title = String(new FormData(form).get("title") ?? "").trim();
    if (!title) return;

    onSubmit({ title });
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        name="title"
        aria-label="Title"
        placeholder="Task title"
        required
        pattern=".*\S.*"
        title="The title can't be empty"
        className="flex-1 rounded-lg border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-700"
      />
      <button
        type="submit"
        className="rounded-lg bg-gray-900 px-4 py-2 text-white dark:bg-white dark:text-gray-900"
      >
        Add
      </button>
    </form>
  );
}

type TaskListProps = {
  title: string;
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function TaskList({ title, tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
      <h2>{title}</h2>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
            >
              <dl className="flex flex-col gap-2">
                <div>
                  <dt className="text-xs text-gray-500">Title</dt>
                  <dd
                    className={`font-medium ${
                      task.status === "completed"
                        ? "text-gray-500 line-through"
                        : ""
                    }`}
                  >
                    {task.title}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Description</dt>
                  <dd className="text-sm">{task.description ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Deadline</dt>
                  <dd className="text-sm">
                    {task.deadline ? formatDeadline(task.deadline) : "—"}
                  </dd>
                </div>
              </dl>
              <div className="flex flex-col items-start gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-green-600"
                    checked={task.status === "completed"}
                    onChange={() => onToggle(task.id)}
                  />
                  Completed
                </label>
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm text-red-600 hover:underline"
                  onClick={() => onDelete(task.id)}
                >
                  <Trash2 size={16} aria-hidden="true" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Home() {
  const stored = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const isLoading = stored === undefined;
  const tasks = parseTasks(stored);
  const statuses = Object.keys(STATUS_LABELS) as TaskStatus[];

  function handleCreate(values: TaskFormValues) {
    saveTasks(
      addTask(tasks, { id: crypto.randomUUID(), ...values, status: "pending" }),
    );
  }

  function handleToggle(id: string) {
    saveTasks(toggleTaskStatus(tasks, id));
  }

  function handleDelete(id: string) {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    const needsConfirmation = task.status !== "completed";
    if (
      needsConfirmation &&
      !window.confirm(`"${task.title}" is not completed. Delete it anyway?`)
    ) {
      return;
    }

    saveTasks(deleteTask(tasks, id));
  }

  return (
    <main className="mx-auto w-full max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-bold">My tasks</h1>
      <div className="mb-6">
        <TaskForm onSubmit={handleCreate} />
      </div>
      {!isLoading && (
        <div className="grid gap-6 md:grid-cols-2">
          {statuses.map((status) => (
            <TaskList
              key={status}
              title={STATUS_LABELS[status]}
              tasks={tasks.filter((task) => task.status === status)}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
}
