import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://tffs-j88k.onrender.com/tasks";

  async function fetchTasks() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Erro ao buscar tarefas.");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      setError("Não foi possível carregar as tarefas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleAddTask(e) {
    e.preventDefault();

    if (!newTitle.trim()) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
        }),
      });

      setNewTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  }

  async function handleToggleTask(id, completed) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !completed,
        }),
      });

      fetchTasks();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  }

  async function handleEditTask(id) {
    if (!editingTitle.trim()) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editingTitle,
        }),
      });

      setEditingId(null);
      setEditingTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <main className="app">
      <div className="container">
        <header className="header">
          <p className="eyebrow">Projeto 2 • Full Stack Task Manager</p>
          <h1>Controle de Tarefas</h1>
          <p className="subtitle">
            Organize, acompanhe e conclua suas tarefas em uma interface moderna
            conectada a uma API real.
          </p>
        </header>

        <TaskForm
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          handleAddTask={handleAddTask}
        />

        <div className="stats">
          <div className="stat-card">
            <span className="stat-label">Total</span>
            <strong>{totalTasks}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Pendentes</span>
            <strong>{pendingTasks}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Concluídas</span>
            <strong>{completedTasks}</strong>
          </div>
        </div>

        {loading && <p className="info-message">Carregando tarefas...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <TaskList
            tasks={tasks}
            editingId={editingId}
            editingTitle={editingTitle}
            setEditingId={setEditingId}
            setEditingTitle={setEditingTitle}
            handleToggleTask={handleToggleTask}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
          />
        )}
      </div>
    </main>
  );
}

export default App;