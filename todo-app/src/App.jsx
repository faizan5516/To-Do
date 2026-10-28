import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      priority,
      dueDate,
    };
    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setInput("");
    setDueDate("");
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;
  const completionRate = todos.length
    ? Math.round((completedCount / todos.length) * 100)
    : 0;
  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand-mark" aria-hidden="true">✓</div>
        <div className="header-copy">
          <p className="eyebrow">YOUR PERSONAL PLANNER</p>
          <h1>Make room for what matters.</h1>
          <p className="subtitle">A little progress adds up. One task at a time.</p>
        </div>
        <time className="today-label" dateTime={new Date().toISOString().slice(0, 10)}>
          <span className="today-dot" aria-hidden="true" />
          {todayLabel}
        </time>
      </header>

      <section className="overview" aria-label="Task overview">
        <div className="overview-card overview-total">
          <span className="overview-icon" aria-hidden="true">✦</span>
          <div>
            <p className="overview-label">Total tasks</p>
            <p className="overview-value">{todos.length}</p>
          </div>
        </div>
        <div className="overview-card overview-active">
          <span className="overview-icon" aria-hidden="true">◷</span>
          <div>
            <p className="overview-label">In progress</p>
            <p className="overview-value">{activeCount}</p>
          </div>
        </div>
        <div className="overview-card overview-completed">
          <span className="overview-icon" aria-hidden="true">✓</span>
          <div>
            <p className="overview-label">Completed</p>
            <p className="overview-value">{completedCount}</p>
          </div>
        </div>
      </section>

      <section className="progress-card" aria-label={`${completionRate}% of tasks completed`}>
        <div className="progress-copy">
          <div>
            <p className="progress-title">Your progress</p>
            <p className="progress-caption">
              {todos.length === 0
                ? "Add a task to get your day started."
                : completedCount === todos.length
                  ? "Everything is done. Take a moment to celebrate!"
                  : `${activeCount} ${activeCount === 1 ? "task" : "tasks"} left to go. You’ve got this!`}
            </p>
          </div>
          <span className="progress-percent">{completionRate}%</span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Tasks completed"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={completionRate}
        >
          <span style={{ width: `${completionRate}%` }} />
        </div>
      </section>

      <TodoInput
        input={input}
        setInput={setInput}
        addTodo={addTodo}
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
      />

      <section className="tasks-section">
        <div className="tasks-heading">
          <div>
            <p className="section-eyebrow">YOUR LIST</p>
            <h2>Tasks <span className="task-total">{todos.length}</span></h2>
          </div>
          <nav className="todo-filters" aria-label="Filter tasks">
            <button
              type="button"
              className={filter === "all" ? "filter-btn active" : "filter-btn"}
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All <span>{todos.length}</span>
            </button>
            <button
              type="button"
              className={filter === "active" ? "filter-btn active" : "filter-btn"}
              aria-pressed={filter === "active"}
              onClick={() => setFilter("active")}
            >
              Active <span>{activeCount}</span>
            </button>
            <button
              type="button"
              className={filter === "completed" ? "filter-btn active" : "filter-btn"}
              aria-pressed={filter === "completed"}
              onClick={() => setFilter("completed")}
            >
              Completed <span>{completedCount}</span>
            </button>
          </nav>
        </div>

        <TodoList
          todos={filteredTodos}
          hasTasks={todos.length > 0}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </section>
    </div>
  );
}

export default App;
