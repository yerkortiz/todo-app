import { Check, RotateCcw, Trash2 } from "lucide-react";
import type { Task } from "@/lib/tasks";

function formatDeadline(deadline: string) {
  return new Date(deadline).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const buttonClassName =
  "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const isCompleted = task.status === "completed";

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <dl className="flex flex-col gap-2">
        <div>
          <dt className="text-xs text-gray-500">Title</dt>
          <dd
            className={
              isCompleted
                ? "font-medium text-gray-500 line-through"
                : "font-medium"
            }
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
      <div className="flex items-center justify-between">
        <button
          type="button"
          className={`${buttonClassName} ${
            isCompleted
              ? "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              : "border-green-600 text-green-700 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-950"
          }`}
          onClick={() => onToggle(task.id)}
        >
          {isCompleted ? (
            <RotateCcw size={16} aria-hidden="true" />
          ) : (
            <Check size={16} aria-hidden="true" />
          )}
          {isCompleted ? "Mark as pending" : "Mark as completed"}
        </button>
        <button
          type="button"
          className={`${buttonClassName} border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950`}
          onClick={() => onDelete(task.id)}
        >
          <Trash2 size={16} aria-hidden="true" />
          Delete
        </button>
      </div>
    </li>
  );
}

type TaskListProps = {
  title: string;
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({
  title,
  tasks,
  onToggle,
  onDelete,
}: TaskListProps) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="font-semibold">
        {title} <span className="text-gray-500">({tasks.length})</span>
      </h2>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
