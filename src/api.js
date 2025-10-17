import axios from "axios";

const API = axios.create({
  baseURL:process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);


export const getTodos = () => API.get("/todos");
export const addTodo = (todo) => API.post("/todos", todo);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);


export default API;
