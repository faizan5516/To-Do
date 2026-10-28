import "./TodoItem.css";

function formatDueDate(date) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const priority = todo.priority || "medium";
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  const isOverdue = todo.dueDate && todo.dueDate < todayString && !todo.completed;

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        aria-label={`Mark ${todo.text} as complete`}
        onChange={() => toggleTodo(todo.id)}
      />
      <div className="todo-details">
        <span className="todo-text">{todo.text}</span>
        <div className="todo-meta">
          <span className={`priority-badge priority-${priority}`}>
            {priority} priority
          </span>
          {todo.dueDate && (
            <time
              className={`todo-due-date ${isOverdue ? "overdue" : ""}`}
              dateTime={todo.dueDate}
            >
              {isOverdue ? "Overdue · " : "Due "}
              {formatDueDate(todo.dueDate)}
            </time>
          )}
        </div>
      </div>
      <button
        className="delete-btn"
        onClick={() => deleteTodo(todo.id)}
        title="Delete"
        aria-label={`Delete ${todo.text}`}
      >
        ✕
      </button>
    </li>
  );
}

export default TodoItem;
