import { describe, expect, it } from "vitest";
import { addTask, deleteTask, toggleTaskStatus, type Task } from "./tasks";

const pending: Task = { id: "1", title: "Buy bread", status: "pending" };
const completed: Task = { id: "2", title: "Write tests", status: "completed" };

describe("addTask", () => {
  it("appends the task to the end", () => {
    expect(addTask([pending], completed)).toEqual([pending, completed]);
  });

  it("does not mutate the original list", () => {
    const tasks = [pending];
    addTask(tasks, completed);
    expect(tasks).toEqual([pending]);
  });
});

describe("toggleTaskStatus", () => {
  it("marks a pending task as completed", () => {
    const [task] = toggleTaskStatus([pending], "1");
    expect(task.status).toBe("completed");
  });

  it("marks a completed task as pending", () => {
    const [task] = toggleTaskStatus([completed], "2");
    expect(task.status).toBe("pending");
  });

  it("leaves the other tasks untouched", () => {
    const result = toggleTaskStatus([pending, completed], "1");
    expect(result[1]).toBe(completed);
  });

  it("does not mutate the original task", () => {
    toggleTaskStatus([pending], "1");
    expect(pending.status).toBe("pending");
  });
});

describe("deleteTask", () => {
  it("removes the task with the given id", () => {
    expect(deleteTask([pending, completed], "1")).toEqual([completed]);
  });

  it("returns the same tasks when the id does not exist", () => {
    expect(deleteTask([pending], "missing")).toEqual([pending]);
  });
});
