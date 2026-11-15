import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import TaskForm, { type TaskFormValues } from "@/components/TaskForm";

type TaskDialogProps = {
  onSubmit: (values: TaskFormValues) => void;
  onClose: () => void;
};

export default function TaskDialog({ onSubmit, onClose }: TaskDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog ref={dialogRef} onClose={onClose} className="dialog">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">New task</h2>
        <button
          type="button"
          aria-label="Close"
          onClick={() => dialogRef.current?.close()}
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <TaskForm onSubmit={onSubmit} />
    </dialog>
  );
}
