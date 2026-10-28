import "./TodoInput.css";

function TodoInput({
  input,
  setInput,
  addTodo,
  priority,
  setPriority,
  dueDate,
  setDueDate,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return (
    <section className="task-entry" aria-label="Add a task">
      <div className="entry-heading">
        <span className="entry-icon" aria-hidden="true">+</span>
        <div>
          <h2>Quick add</h2>
          <p>Capture it now, organize it as you go.</p>
        </div>
      </div>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          placeholder="What needs to be done?"
          aria-label="Task name"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={addTodo}>
          <span aria-hidden="true">+</span> Add task
        </button>
      </div>
      <div className="task-options">
        <label>
          <span>Priority</span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            aria-label="Priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          <span>Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            aria-label="Due date"
          />
        </label>
      </div>
    </section>
  );
}

export default TodoInput;