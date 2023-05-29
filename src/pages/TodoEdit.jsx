import { useEffect, useState } from "react";
import { editTodoService, getTodoDetailsService } from "../services/todo.services";
import { useParams, useNavigate } from "react-router-dom";

function TodoEdit() {

  const params = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {

      const response = await getTodoDetailsService(params.id)
      console.log(response)

      setTitle(response.data.title)
      setDescription(response.data.description)
      setIsUrgent(response.data.isUrgent)
      
    } catch (error) {
      console.log(error)
      //navigate a error
    }

  }

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleIsUrgentChange = (e) => setIsUrgent(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... edit the ToDo here

    try {

      const updatedTodo = {
        title,
        description,
        isUrgent
      }
      
      await editTodoService(params.id, updatedTodo)
      navigate(`/todos/${params.id}/details`)

    } catch (error) {
      console.log(error)
      //navigate a error
    }

  };

  return (
    <div>
      <h3>Editar To-Do</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />

        <br />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />

        <br />

        <label htmlFor="isUrgent">Urgent</label>
        <input
          type="checkbox"
          name="isUrgent"
          onChange={handleIsUrgentChange}
          checked={isUrgent}
        />

        <br />

        <button type="submit">Editar</button>
      </form>
    </div>
  );
}

export default TodoEdit;
