import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import TodoListContainer from "./assets/pages/TodoListContainer";

function App() {
  const [count, setCount] = useState<number>(0);
  const increment = () => {
    return setCount(count + 1);
  };
  return (
    <>
      <TodoListContainer />
      <div onClick={increment}>{count}</div>
    </>
  );
}

export default App;
