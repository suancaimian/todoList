import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./API";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    (async function getItems() {
      const fetchDatas = await getTodos();
      // console.log("🚀 ~ getItems ~ fetchDatas:", fetchDatas);
      const data: ITodo[] | any = fetchDatas.data;
      console.log("🚀 ~ getItems ~ data:", data);
      // if (!data) {
      //   setTodos(data);
      // }

      setTodos(data);
      console.log("🚀 ~ todos ~ data:", todos);
    })();
  }, []);
  // setTodos([{ _id: "1", name: "1", description: "34", status: false }]);
  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };
  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="App">
      <h1>Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  );
};

export default App;
