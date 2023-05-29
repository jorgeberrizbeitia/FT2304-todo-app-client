import { useState } from "react";
import axios from "axios";
import { createTodoService } from "../services/todo.services";

function AddForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleIsUrgentChange = (e) => setIsUrgent(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault()
    // ... add the ToDo here
    console.log("apretando el boton!!")

    props.setIsLoading(true)

    try {
      
      const newTodo = {
        title,
        description,
        isUrgent
      }

      // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/todo`, {
      //   title,
      //   description,
      //   isUrgent
      // })

      await createTodoService(newTodo)

      // ir de nuevo al Server y recibir los Todo actualizados
      props.getData()

    } catch (error) {
      console.log(error)
    }
    

  }

  return (
    <div>
      <h3>Agregar To-Do</h3>

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

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default AddForm;
