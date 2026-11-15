import type { SubmitEvent } from "react";

export type TaskFormValues = {
  title: string;
  description?: string;
  deadline?: string;
};

type TaskFormProps = {
  onSubmit: (values: TaskFormValues) => void;
};

function readField(data: FormData, name: string) {
  return String(data.get(name) ?? "").trim();
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = readField(data, "title");
    if (!title) return;

    onSubmit({
      title,
      description: readField(data, "description") || undefined,
      deadline: readField(data, "deadline") || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        name="title"
        aria-label="Title"
        placeholder="Task title"
        required
        autoFocus
        className="input"
      />
      <textarea
        name="description"
        aria-label="Description"
        placeholder="Description (optional)"
        rows={3}
        className="input"
      />
      <div className="flex gap-2">
        <input
          type="datetime-local"
          name="deadline"
          aria-label="Deadline"
          className="input flex-1"
        />
        <button type="submit" className="btn-primary">
          Add
        </button>
      </div>
    </form>
  );
}
