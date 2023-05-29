import { useEffect, useState } from "react";
import AddForm from "../components/AddForm";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getAllTodoService } from "../services/todo.services";

// Este componente contactará al Backend para listar todos los Todos

function TodoList() {

  const navigate = useNavigate()

  const [ todos, setTodos ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    getData()
  }, []) // ComponentDidMount

  const getData = async () => {
    try {
      // const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todo`)
      const response = await getAllTodoService()
      console.log(response)
      setTodos(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  // if ( isLoading === true ) {
  if ( isLoading ) {
    return <h3>...buscando</h3>
  }

  return (
    <div>
      <AddForm getData={getData} setIsLoading={setIsLoading}/>
      <hr />
      <h3>Lista de To-Do</h3>

      {todos.map((eachTodo) => {
        return (
          <div key={eachTodo._id}>
            <li>
              <Link to={`/todos/${eachTodo._id}/details`}>{eachTodo.title}</Link>
            </li>
          </div>
        )
      })}
    </div>
  );
}

export default TodoList;
