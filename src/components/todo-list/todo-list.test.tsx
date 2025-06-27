import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import TodoList from "./todo-list"

// mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
    removeItem: (key: string) => {
      delete store[key]
    },
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

// Wait until loading spinner disappears
const waitForLoadingToFinish = async () => {
  await waitFor(() => expect(screen.queryByText(/loading your tasks/i)).not.toBeInTheDocument())
}

describe("TodoList", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test("renders loading spinner initially", () => {
    render(<TodoList />)
    expect(screen.getByText(/loading your tasks/i)).toBeInTheDocument()
  })

  test("adds a new task", async () => {
    render(<TodoList />)
    await waitForLoadingToFinish()

    const input = screen.getByPlaceholderText("Add a new task...")
    const button = screen.getByRole("button")

    fireEvent.change(input, { target: { value: "Learn Testing" } })
    fireEvent.click(button)

    expect(await screen.findByText("Learn Testing")).toBeInTheDocument()
  })

test("completes a task", async () => {
  render(<TodoList />)
  await waitForLoadingToFinish()

  fireEvent.change(screen.getByPlaceholderText("Add a new task..."), {
    target: { value: "Complete me" },
  })
  fireEvent.click(screen.getByRole("button"))

  const taskItem = await screen.findByText("Complete me")
  const checkboxButton = taskItem.closest("li")?.querySelector(".checkbox-button")

  fireEvent.click(checkboxButton!)
  expect(taskItem.closest("li")?.className).toMatch(/completed/)
})

 test("deletes a task", async () => {
  render(<TodoList />)
  await waitForLoadingToFinish()

  fireEvent.change(screen.getByPlaceholderText("Add a new task..."), {
    target: { value: "Delete me" },
  })
  fireEvent.click(screen.getByRole("button"))

  const taskItem = await screen.findByText("Delete me")
  const deleteButton = taskItem.closest("li")?.querySelector(".delete-button")

  expect(taskItem).toBeInTheDocument()
  fireEvent.click(deleteButton!)
  expect(screen.queryByText("Delete me")).not.toBeInTheDocument()
})


  test("persists tasks to localStorage", async () => {
    render(<TodoList />)
    await waitForLoadingToFinish()

    fireEvent.change(screen.getByPlaceholderText("Add a new task..."), {
      target: { value: "Persist me" },
    })
    fireEvent.click(screen.getByRole("button"))

    const saved = localStorage.getItem("todoTasks")
    expect(saved).toContain("Persist me")
  })

  test("shows empty state when no tasks", async () => {
    render(<TodoList />)
    await waitForLoadingToFinish()

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })
})
