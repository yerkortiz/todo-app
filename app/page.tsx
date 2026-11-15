"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import TaskDialog from "@/components/TaskDialog";
import type { TaskFormValues } from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import type { TaskStatus } from "@/lib/tasks";
import { useTasks } from "@/lib/useTasks";

const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pending",
  completed: "Completed",
};

export default function Home() {
  const { tasks, isLoading, createTask, toggleTask, deleteTask } = useTasks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const statuses = Object.keys(STATUS_LABELS) as TaskStatus[];

  function handleCreate(values: TaskFormValues) {
    createTask(values);
    setIsDialogOpen(false);
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

    deleteTask(id);
  }

  return (
    <main className="mx-auto w-full max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My tasks</h1>
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white dark:bg-white dark:text-gray-900"
        >
          <Plus size={16} aria-hidden="true" />
          New task
        </button>
      </div>
      {!isLoading && (
        <div className="grid gap-6 md:grid-cols-2">
          {statuses.map((status) => (
            <TaskList
              key={status}
              title={STATUS_LABELS[status]}
              tasks={tasks.filter((task) => task.status === status)}
              onToggle={toggleTask}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      {isDialogOpen && (
        <TaskDialog
          onSubmit={handleCreate}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </main>
  );
}
