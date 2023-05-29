// configurar que herramienta usamos y donde contactamos al backend

import axios from "axios";

// create nos permite crear un objeto donde organizamos todas las llamada al backend
const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL // http://localhost:5005/api
})

export default service