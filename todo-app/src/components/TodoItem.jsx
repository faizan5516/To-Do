import "./TodoItem.css";

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className="todo-text">{todo.text}</span>
      <button
        className="delete-btn"
        onClick={() => deleteTodo(todo.id)}
        title="Delete"
      >
        ✕
      </button>
    </li>
  );
}

export default TodoItem;
