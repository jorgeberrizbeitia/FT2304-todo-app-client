// organizando todas las llamadas al backend que tengan que ver con Todo (CRUD)

import service from "./config.services"

const getAllTodoService = () => {
  return service.get("/todo")
}

const createTodoService = (newTodo) => {
  return service.post("/todo", newTodo)
}

const getTodoDetailsService = (todoId) => {
  return service.get(`/todo/${todoId}`)
}

const deleteTodoService = (todoId) => {
  return service.delete(`/todo/${todoId}`)
}

const editTodoService = (todoId, updatedTodo) => {
  return service.put(`/todo/${todoId}`, updatedTodo)
}

export {
  getAllTodoService,
  createTodoService,
  getTodoDetailsService,
  deleteTodoService,
  editTodoService
}