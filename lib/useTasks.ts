import { useSyncExternalStore } from "react";
import { addTask, deleteTask, toggleTaskStatus, type Task } from "@/lib/tasks";

const STORAGE_KEY = "tasks";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return undefined;
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  listeners.forEach((listener) => listener());
}

function parseTasks(stored: string | null | undefined): Task[] {
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

type NewTaskValues = Omit<Task, "id" | "status">;

export function useTasks() {
  const stored = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const tasks = parseTasks(stored);

  return {
    tasks,
    isLoading: stored === undefined,
    createTask: (values: NewTaskValues) =>
      saveTasks(
        addTask(tasks, {
          id: crypto.randomUUID(),
          ...values,
          status: "pending",
        }),
      ),
    toggleTask: (id: string) => saveTasks(toggleTaskStatus(tasks, id)),
    deleteTask: (id: string) => saveTasks(deleteTask(tasks, id)),
  };
}
