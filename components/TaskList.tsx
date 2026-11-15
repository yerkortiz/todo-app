import { Trash2 } from "lucide-react";
import type { Task } from "@/lib/tasks";

function formatDeadline(deadline: string) {
  return new Date(deadline).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const isCompleted = task.status === "completed";

  return (
    <li className="card flex flex-col gap-3">
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
        <label className="btn cursor-pointer">
          <input
            type="checkbox"
            className="accent-green-600"
            checked={isCompleted}
            onChange={() => onToggle(task.id)}
          />
          {isCompleted ? "Completed" : "Mark as completed"}
        </label>
        <button
          type="button"
          className="btn text-red-500"
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
    <section className="panel flex flex-col gap-3">
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
