import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos/index";

const router = Router();
router.get("/todos", getTodos);
router.post("/add-todo", addTodo);
router.put("/update-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);

export default router;
