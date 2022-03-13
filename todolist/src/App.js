import React, { useState, useEffect } from "react";
import Todos from "./Todos";
import Form from "./Form";
import { nanoid } from "nanoid";
import Instructions from "./Instructions";
import Sort from "./Sort";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Login from "./Login";
import SignOut from "./SignOut";

export default function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todolist")) || []
  );
  const [todoTask, setTodoTask] = useState("");
  const [todoDate, setTodoDate] = useState(todayDate);
  const [todoNoOfPersons, setTodoNoOfPersons] = useState("");
  const [todoAssignedTo, setTodoAssignedTo] = useState("Bob");
  const [todoLocation, setTodoLocation] = useState("");
  const [dragId, setDragId] = useState();
  const loginUser = useSelector((state) => state.user.loginUser);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  console.log(loginUser);

  function datePadding(number) {
    if (number.toString().length === 1) {
      return "0" + number;
    } else {
      return number;
    }
  }

  function todayDate() {
    return `${new Date().getFullYear()}-${datePadding(
      new Date().getMonth() + 1
    )}-${datePadding(new Date().getDate())}`;
  }

  useEffect(
    function () {
      localStorage.setItem("todolist", JSON.stringify(todos));
    },
    [todos]
  );

  function handleTodoInput(event) {
    setTodoTask(event.target.value);
  }

  console.log(todos);

  function handleTodoLocation(event) {
    setTodoLocation(event.target.value);
  }

  function handleTodoNoOfPersons(event) {
    setTodoNoOfPersons(event.target.value);
  }

  function handleTodoAssignedTo(event) {
    setTodoAssignedTo(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newTodo = {
      id: nanoid(),
      task: todoTask,
      date: todoDate,
      isComplete: false,
      location: todoLocation,
      noOfPersons: todoNoOfPersons,
      assignedTo: todoAssignedTo,
      order: todos.length + 1,
    };

    setTodoTask("");
    setTodoAssignedTo("Bob");
    setTodoLocation("");
    setTodoNoOfPersons(0);
    setTodoDate(todayDate);

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  function handleTodoDate(event) {
    setTodoDate(event.target.value);
  }

  function toggleComplete(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return todo.id === id
          ? { ...todo, isComplete: !todo.isComplete }
          : todo;
      })
    );
  }

  function deleteTodoItem(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function sortTodoByComplete() {
    const newArray = [];

    todos.map((todo) => {
      todo.isComplete ? newArray.unshift(todo) : newArray.push(todo);
    });

    setTodos(newArray);
  }

  function sortTodoByIncomplete() {
    const newArray = [];

    todos.map((todo) => {
      todo.isComplete ? newArray.unshift(todo) : newArray.push(todo);
    });

    setTodos(newArray.reverse());
  }

  function sortTodoByEarliestDate() {
    const newArrayByDate = todos.sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date);
    });

    const newArray = [...newArrayByDate];

    setTodos(newArray);
  }

  function sortTodoByLatestDate() {
    const newArrayByDate = todos.sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date);
    });

    const newArray = [...newArrayByDate];

    setTodos(newArray.reverse());
  }

  function sortByAlphabeticalOrder() {
    const newArray = todos.sort((a, b) => a.task.localeCompare(b.task));

    const newArray2 = [...newArray];

    setTodos(newArray2);
  }

  function handleDrag(event) {
    setDragId(event.target.id);
  }

  function handleDrop(event) {
    const dragTodos = todos.find((todo) => todo.id === dragId);
    const dropTodos = todos.find((todo) => todo.id === event.target.id);

    console.log(event.target);

    const dragTodoOrder = dragTodos.order;
    const dropTodoOrder = dropTodos.order;

    const newTodosOrder = todos.map((todo) => {
      if (todo.id === dragId) {
        todo.order = dropTodoOrder;
      }

      if (todo.id === event.target.id) {
        todo.order = dragTodoOrder;
      }

      return todo;
    });

    setTodos(newTodosOrder);
  }

  function updateTodoOrder() {
    setTodos((prevTodos) =>
      prevTodos.map((todo, index) => {
        return {
          ...todo,
          order: index + 1,
        };
      })
    );
  }

  function handleSortChange(event) {
    switch (event.target.value) {
      case "earliestDate":
        sortTodoByEarliestDate();
        break;

      case "latestDate":
        sortTodoByLatestDate();
        break;

      case "complete":
        sortTodoByComplete();
        break;

      case "incomplete":
        sortTodoByIncomplete();
        break;

      case "alphabetical":
        sortByAlphabeticalOrder();
        break;
    }

    updateTodoOrder();
  }

  const filteredEventElements = todos.filter(
    (item) => item.assignedTo === loginUser
  );

  const todoElements = filteredEventElements
    .sort((a, b) => a.order - b.order)
    .map((todoItem) => (
      <Todos
        key={todoItem.id}
        task={todoItem.task}
        date={todoItem.date}
        location={todoItem.location}
        noOfPersons={todoItem.noOfPersons}
        assignedTo={todoItem.assignedTo}
        isComplete={todoItem.isComplete}
        handleToggle={toggleComplete}
        id={todoItem.id}
        deleteTodo={deleteTodoItem}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
        order={todoItem.order}
      />
    ));

  return (
    <main>
      {isLoggedIn ? (
        <>
          <SignOut />
          <Instructions />
          <div className="todolist-container">
            <h1 className="header-title">Todolist</h1>
            <Form
              todoTask={todoTask}
              todoDate={todoDate}
              todoLocation={todoLocation}
              todoNoOfPersons={todoNoOfPersons}
              todoAssignedTo={todoAssignedTo}
              handleSubmit={handleSubmit}
              handleTodoInput={handleTodoInput}
              handleTodoDate={handleTodoDate}
              handleTodoLocation={handleTodoLocation}
              handleTodoNoOfPersons={handleTodoNoOfPersons}
              handleTodoAssignedTo={handleTodoAssignedTo}
            />
            <Sort handleChange={handleSortChange} />
            <div className="todos-container">{todoElements}</div>
          </div>
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </main>
  );
}
