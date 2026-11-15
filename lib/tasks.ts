export type TaskStatus = "pending" | "completed";

export type Task = {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  status: TaskStatus;
};

export function addTask(tasks: Task[], task: Task): Task[] {
  return [...tasks, task];
}

export function toggleTaskStatus(tasks: Task[], id: string): Task[] {
  return tasks.map((task): Task =>
    task.id === id
      ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
      : task,
  );
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id);
}
