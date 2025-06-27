import "./todo-item.css";

const TodoItems = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? "completed" : ""}`}
        >
          <div className="task-content">
            <button
              onClick={() => onToggleTask(task.id)}
              className="checkbox-button"
              aria-label={
                task.completed ? "Mark as incomplete" : "Mark as complete"
              }
            >
              <div className="checkbox">
                {task.completed && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                )}
              </div>
            </button>
            <span className="task-text">{task.text}</span>
          </div>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="delete-button"
            aria-label="Delete task"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoItems;
