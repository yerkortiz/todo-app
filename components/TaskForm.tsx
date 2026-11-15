import type { SubmitEvent } from "react";

export type TaskFormValues = {
  title: string;
  description?: string;
  deadline?: string;
};

type TaskFormProps = {
  onSubmit: (values: TaskFormValues) => void;
};

const inputClassName =
  "rounded-lg border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-700 dark:[color-scheme:dark]";

function readField(data: FormData, name: string) {
  return String(data.get(name) ?? "").trim();
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = readField(data, "title");
    if (!title) return;

    onSubmit({
      title,
      description: readField(data, "description") || undefined,
      deadline: readField(data, "deadline") || undefined,
    });
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        name="title"
        aria-label="Title"
        placeholder="Task title"
        required
        className={inputClassName}
      />
      <textarea
        name="description"
        aria-label="Description"
        placeholder="Description (optional)"
        rows={2}
        className={inputClassName}
      />
      <div className="flex gap-2">
        <input
          type="datetime-local"
          name="deadline"
          aria-label="Deadline"
          className={`flex-1 ${inputClassName}`}
        />
        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-4 py-2 text-white dark:bg-white dark:text-gray-900"
        >
          Add
        </button>
      </div>
    </form>
  );
}
