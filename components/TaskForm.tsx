import type { SubmitEvent } from "react";

export type TaskFormValues = {
  title: string;
};

type TaskFormProps = {
  onSubmit: (values: TaskFormValues) => void;
};

export default function TaskForm({ onSubmit }: TaskFormProps) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim();
    if (!title) return;

    onSubmit({ title });
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        name="title"
        aria-label="Title"
        placeholder="Task title"
        required
        className="flex-1 rounded-lg border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-700"
      />
      <button
        type="submit"
        className="rounded-lg bg-gray-900 px-4 py-2 text-white dark:bg-white dark:text-gray-900"
      >
        Add
      </button>
    </form>
  );
}
