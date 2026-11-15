"use client";

type TaskStatus = "pending" | "completed";

type Task = {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  status: TaskStatus;
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pending",
  completed: "Completed",
};

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

function formatDeadline(deadline: string) {
  return new Date(deadline).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

type TaskListProps = {
  title: string;
  tasks: Task[];
};

function TaskList({ title, tasks }: TaskListProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
      <h2>{title}</h2>
      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
          >
            <dl className="flex flex-col gap-2">
              <div>
                <dt className="text-xs text-gray-500">Title</dt>
                <dd className="font-medium">{task.title}</dd>
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
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  const tasks = SAMPLE_TASKS;
  const statuses = Object.keys(STATUS_LABELS) as TaskStatus[];

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-bold">My tasks</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {statuses.map((status) => (
          <TaskList
            key={status}
            title={STATUS_LABELS[status]}
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}
      </div>
    </main>
  );
}
