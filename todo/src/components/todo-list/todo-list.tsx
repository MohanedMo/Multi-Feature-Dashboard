
import type React from "react"
import { useState, useEffect } from "react"

import TodoItems from "../todo-item/todo-item"
import "./todo.css"

interface Task {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("todoTasks")
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks)
        setTasks(parsedTasks)
      } catch (error) {
        console.error("Error parsing saved tasks:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todoTasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask.trim(),
          completed: false,
        },
      ])
      setNewTask("")
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  return (
    <div className="todo-container">
      {!isLoaded ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      ) : (
        <div className="todo-wrapper">
          <header className="todo-header">
            <h1 className="todo-title">My Todo List</h1>
            <p className="todo-subtitle">Stay organized and productive</p>
            {totalCount > 0 && (
              <div className="progress-info">
                <span className="progress-text">
                  {completedCount} of {totalCount} tasks completed
                </span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            )}
          </header>

          <div className="input-section">
            <div className="input-wrapper">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new task..."
                className="task-input"
              />
              <button onClick={addTask} className="add-button" disabled={!newTask.trim()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className="tasks-section">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                  </svg>
                </div>
                <h3 className="empty-title">No tasks yet</h3>
                <p className="empty-description">Add your first task above to get started!</p>
              </div>
            ) : (
              <TodoItems tasks = {tasks} onToggleTask = {toggleTask} onDeleteTask = {deleteTask}/>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

