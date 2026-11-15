"use client";

type Task = {
  id: string;
  title: string;
  description?: string;
  dueAt?: string;
};

const SAMPLE_TASKS: Task[] = [
  {
    id: "1",
    title: "Comprar pan",
  },
  {
    id: "2",
    title: "Terminar el challenge",
    description: "To-do list en Next.js",
    dueAt: "2026-11-20T18:00",
  },
];

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
            {task.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  const tasks = SAMPLE_TASKS;

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-bold mb-6">Mis tareas</h1>
      <TaskList title="Tareas" tasks={tasks} />
    </main>
  );
}
