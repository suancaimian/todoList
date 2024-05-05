import { ITodo } from "../../types/todo";
import { Response, Request } from "express";

import Todo from "../../models/todo";

// @desc    Get all todos
const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    throw error;
    // res.status(500).json({ message: error });
  }
};

// @desc    Add a todo
const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;
    console.log("🚀 ~ addTodo ~ req.body:", req.body);
    console.log("🚀 ~ addTodo ~ body:", body);
    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });
    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();
    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: allTodos });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// @desc    Update a todo
const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      {
        _id: id,
      },
      body
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// @desc    Delete a todo
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteTodo: ITodo | null = await Todo.findByIdAndDelete(
      req.params.id
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo deleted",
      todo: deleteTodo,
      todos: allTodos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
