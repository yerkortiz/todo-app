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
  {
    id: "3",
    title: "Crear el proyecto",
  },
];

export default function Home() {
  const tasks = SAMPLE_TASKS;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Mis tareas</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Pendientes ({tasks.length})
          </h2>
          <ul className="flex flex-col gap-2">
            {tasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
