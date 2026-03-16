function TaskForm({ newTitle, setNewTitle, handleAddTask }) {
  return (
    <form onSubmit={handleAddTask} className="task-form">
      <input
        type="text"
        placeholder="Digite uma nova tarefa"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TaskForm;