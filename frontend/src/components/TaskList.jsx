import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  editingId,
  editingTitle,
  setEditingId,
  setEditingTitle,
  handleToggleTask,
  handleEditTask,
  handleDeleteTask,
}) {
  if (tasks.length === 0) {
    return <p className="empty">Nenhuma tarefa cadastrada.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editingId={editingId}
          editingTitle={editingTitle}
          setEditingId={setEditingId}
          setEditingTitle={setEditingTitle}
          handleToggleTask={handleToggleTask}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;