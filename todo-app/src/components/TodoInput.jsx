import "./TodoInput.css";

function TodoInput({ input, setInput, addTodo }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo(); // Enter dabane par bhi add ho
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        value={input}
        placeholder="What needs to be done?"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default TodoInput;