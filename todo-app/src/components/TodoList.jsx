import TodoItem from "./TodoItem";
import "./TodoList.css";

function TodoList({ todos, hasTasks, toggleTodo, deleteTodo }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">{hasTasks ? "⌕" : "✦"}</span>
        <p className="empty-title">{hasTasks ? "Nothing to see here" : "Your list is a blank canvas"}</p>
        <p className="empty-msg">
          {hasTasks ? "Try another filter to find your tasks." : "Add your first task above and start building momentum."}
        </p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
