import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

test("adds and saves a task with its priority and due date", () => {
  const { unmount } = render(<App />);

  fireEvent.change(screen.getByLabelText("Task name"), {
    target: { value: "Prepare presentation" },
  });
  fireEvent.change(screen.getByLabelText("Priority"), {
    target: { value: "high" },
  });
  fireEvent.change(screen.getByLabelText("Due date"), {
    target: { value: "2030-01-15" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Add task" }));

  expect(screen.getByText("Prepare presentation")).toBeInTheDocument();
  expect(screen.getByText("high priority")).toBeInTheDocument();
  expect(screen.getByText("Due Jan 15, 2030")).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem("todos"))[0]).toMatchObject({
    text: "Prepare presentation",
    priority: "high",
    dueDate: "2030-01-15",
    completed: false,
  });

  unmount();
  render(<App />);
  expect(screen.getByText("Prepare presentation")).toBeInTheDocument();
});

test("filters tasks by active and completed status", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText("Task name"), {
    target: { value: "First task" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Add task" }));
  fireEvent.change(screen.getByLabelText("Task name"), {
    target: { value: "Second task" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Add task" }));
  fireEvent.click(screen.getByLabelText("Mark First task as complete"));

  fireEvent.click(screen.getByRole("button", { name: /Active/ }));
  expect(screen.getByText("Second task")).toBeInTheDocument();
  expect(screen.queryByText("First task")).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /Completed/ }));
  expect(screen.getByText("First task")).toBeInTheDocument();
  expect(screen.queryByText("Second task")).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /^All/ }));
  expect(screen.getByText("First task")).toBeInTheDocument();
  expect(screen.getByText("Second task")).toBeInTheDocument();
});

test("shows overdue dates only for incomplete tasks and supports older saved tasks", () => {
  localStorage.setItem(
    "todos",
    JSON.stringify([
      { id: 1, text: "Legacy task", completed: false },
      {
        id: 2,
        text: "Past deadline",
        completed: false,
        priority: "low",
        dueDate: "2000-01-01",
      },
    ])
  );
  render(<App />);

  expect(screen.getByText("medium priority")).toBeInTheDocument();
  expect(screen.getByText("Overdue · Jan 1, 2000")).toBeInTheDocument();

  fireEvent.click(screen.getByLabelText("Mark Past deadline as complete"));
  expect(screen.getByText("Due Jan 1, 2000")).toBeInTheDocument();
  expect(screen.queryByText("Overdue · Jan 1, 2000")).not.toBeInTheDocument();
});
