"use client";

import { useSyncExternalStore } from "react";
import TaskForm, { type TaskFormValues } from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
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
  type TaskStatus,
} from "@/lib/tasks";

const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pending",
  completed: "Completed",
};

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
