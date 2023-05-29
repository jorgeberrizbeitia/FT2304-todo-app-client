import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteTodoService, getTodoDetailsService } from "../services/todo.services";

function TodoDetails() {
  const params = useParams();
  const navigate = useNavigate()

  const [oneTodo, setOneTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []); // componentDidMount

  const getData = async () => {
    try {
      // const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todo/${params.id}`);
      const response = await getTodoDetailsService(params.id)
      console.log(response);
      setOneTodo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // navigate // todo
    }
  };

  const handleDelete = async () => {

    try {
      
      await deleteTodoService(params.id)
      // redireccionamos a "/todos"
      navigate("/todos")

    } catch (error) {
      console.log(error)
      // navigate // todo
    }

  }

  // if ( isLoading === true ) {
  if (isLoading) {
    return <h3>...buscando</h3>;
  }

  return (
    <div>
      <h3>Detalles de To-Do</h3>

      <div>
        <h3>{oneTodo.title}</h3>
        <p>{oneTodo.description}</p>
        <p>Es Urgente? {oneTodo.isUrgent === true ? "SIIII" : "Nah"}</p>

        <button onClick={handleDelete}>Borrar</button>
        <Link to={`/todos/${params.id}/edit`}>
          <button>Ir a Editar</button>
        </Link>

      </div>

    </div>
  );
}

export default TodoDetails;
