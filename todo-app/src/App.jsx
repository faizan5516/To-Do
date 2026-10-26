import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  // State 1: list of all todos
  // Load from localStorage if available (so tasks survive refresh)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // State 2: text being typed in the input
  const [input, setInput] = useState("");

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ADD a new todo
  const addTodo = () => {
    if (input.trim() === "") return; // ignore empty input
    const newTodo = {
      id: Date.now(),      // unique id using timestamp
      text: input.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]); // new array = old + new
    setInput("");                   // clear input box
  };

  // DELETE a todo by its id
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // TOGGLE completed status
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="app-container">
      <h1>📝 My Todo App</h1>

      <TodoInput
        input={input}
        setInput={setInput}
        addTodo={addTodo}
      />

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />

      {todos.length > 0 && (
        <p className="counter">
          {todos.filter((t) => !t.completed).length} task(s) remaining
        </p>
      )}
    </div>
  );
}

export default App;
