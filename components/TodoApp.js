import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const STORAGE_KEY = "todo-list-app-items";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const addTodo = () => {
    const trimmed = newTodo.trim();
    if (!trimmed || !startTime || !endTime) return;
    setTodos((current) => [
      ...current,
      { id: Date.now().toString(), text: trimmed, startTime, endTime, completed: false, completedAt: null },
    ]);
    setNewTodo("");
    setStartTime("");
    setEndTime("");
  };

  const toggleTodo = (id) => {
    const now = new Date().toISOString();
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? now : null } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;
    const updatedText = prompt("Edit task", todo.text);
    if (updatedText === null) return;
    const trimmed = updatedText.trim();
    if (!trimmed) return;
    setTodos((current) =>
      current.map((item) =>
        item.id === id ? { ...item, text: trimmed } : item
      )
    );
  };

  const calculateTimeTaken = (startTime, completedAt) => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const completedDate = new Date(completedAt);
    const startDate = new Date();
    startDate.setHours(startHour, startMin, 0, 0);
    const diffMs = completedDate - startDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours} hours and ${diffMins} minutes`;
  };

  const getCompletionStatus = (todo) => {
    if (!todo.completedAt) return "";
    const [endHour, endMin] = todo.endTime.split(':').map(Number);
    const completedDate = new Date(todo.completedAt);
    const endDate = new Date();
    endDate.setHours(endHour, endMin, 0, 0);
    const within = completedDate <= endDate;
    const timeTaken = calculateTimeTaken(todo.startTime, todo.completedAt);
    return `Completed in ${timeTaken} (${within ? 'Within deadline' : 'Out of deadline'})`;
  };

  return (
    <section className={styles.appContainer}>
      <header className={styles.appHeader}>
        <h1>Karmanya</h1>
      </header>

      <div className={styles.hierarchicalList}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Add Task</h2>
          <div className={styles.addTaskForm}>
            <input
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
              placeholder="Task description..."
              aria-label="New task"
            />
            <input
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              aria-label="Start time"
            />
            <input
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              aria-label="End time"
            />
            <button type="button" onClick={addTodo}>Add Task</button>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Active Tasks</h2>
          <ul className={styles.taskList}>
            {activeTodos.length === 0 ? (
              <li className={styles.emptyMessage}>No active tasks.</li>
            ) : (
              activeTodos.map((todo) => (
                <li key={todo.id} className={`${styles.taskItem} ${styles.active}`}>
                  <span className={styles.activeDot}></span>
                  <p className={styles.taskText}>{todo.text}</p>
                  <span className={styles.deadline}>Time: {todo.startTime} to {todo.endTime}</span>
                  <div className={styles.taskActions}>
                    <button onClick={() => toggleTodo(todo.id)}>Complete</button>
                    <button onClick={() => editTodo(todo.id)}>Edit</button>
                    <button onClick={() => removeTodo(todo.id)}>Delete</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Completed Tasks</h2>
          <ul className={styles.taskList}>
            {completedTodos.length === 0 ? (
              <li className={styles.emptyMessage}>No completed tasks.</li>
            ) : (
              completedTodos.map((todo) => (
                <li key={todo.id} className={`${styles.taskItem} ${styles.completed}`}>
                  <p className={styles.taskText}>{todo.text}</p>
                  <span className={styles.completionMessage}>{getCompletionStatus(todo)}</span>
                  <div className={styles.taskActions}>
                    <button onClick={() => toggleTodo(todo.id)}>Reopen</button>
                    <button onClick={() => removeTodo(todo.id)}>Delete</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
