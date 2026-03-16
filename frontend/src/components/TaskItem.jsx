function TaskItem({
  task,
  editingId,
  editingTitle,
  setEditingId,
  setEditingTitle,
  handleToggleTask,
  handleEditTask,
  handleDeleteTask,
}) {
  return (
    <li className="task-item">
      {editingId === task.id ? (
        <div className="edit-area">
          <input
            type="text"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
          />
          <button onClick={() => handleEditTask(task.id)}>Salvar</button>
          <button
            onClick={() => {
              setEditingId(null);
              setEditingTitle("");
            }}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <>
          <span
            className={task.completed ? "completed" : ""}
            onClick={() => handleToggleTask(task.id, task.completed)}
          >
            {task.title}
          </span>

          <div className="actions">
            <button
              onClick={() => {
                setEditingId(task.id);
                setEditingTitle(task.title);
              }}
            >
              Editar
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Excluir</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;