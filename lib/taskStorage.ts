import type { Task } from "@/lib/tasks";

const STORAGE_KEY = "tasks";
const listeners = new Set<() => void>();

const SAMPLE_TASKS: Task[] = [
  {
    id: "1",
    title: "Buy bread",
    status: "pending",
  },
  {
    id: "2",
    title: "Finish the challenge",
    description: "To-do list in Next.js",
    deadline: "2026-11-20T18:00",
    status: "completed",
  },
];

export function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY);
}

export function getServerSnapshot() {
  return undefined;
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  listeners.forEach((listener) => listener());
}

export function parseTasks(stored: string | null | undefined): Task[] {
  if (!stored) return SAMPLE_TASKS;
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}
