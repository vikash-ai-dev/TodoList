import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";


export const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    async function getTodos() {
      const getResponse = await fetch("http://localhost:5000/api/todos")
      const getData = await getResponse.json();
      console.log(getData);
      setTodos(getData);
    }
    getTodos();

  }, []);

  const handleAdd = async () => {
    if (todo.trim() === "") {
      return;
    }

    if (editId) {
      const patchResponse = await fetch(`http://localhost:5000/api/todos/${editId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: todo
        })

      })
      const UpdatedTodo = todos.map((item)=>{
        if(item._id === editId){
          return {...item, text:todo}
        };
        return item;
    
      })
       setTodos(UpdatedTodo);
       setTodo("")
       setEditId(null)

    }
    else {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: todo,
          completed: false
        })

      });
      const data = await response.json();
      console.log(data);
      console.log(todos);
      setTodos([...todos, data]);
      setTodo("");
    }
  }






  const handleEdit = (id) => {
    const selectedTodo = todos.find((item) => {
      return item._id === id;
    });
    setTodo(selectedTodo.text)
    setEditId(id);

  }

  const handleDelete = async (id) => {

    const deleteResponse = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    })
    console.log(deleteResponse);

    const newTodos = todos.filter((item) => {
      return item._id !== id;
    })
    setTodos(newTodos);
  }

  const handleCheckbox = async(id) => {
    const checkedTodo = todos.find((item)=>{
      return item._id === id
    })

    const CheckboxResponse = await fetch(`http://localhost:5000/api/todos/${id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: !checkedTodo.completed
      })
    })
    const selectedTodos = todos.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          completed: !item.completed
        };
      }
      return item;
    })
    setTodos(selectedTodos);

  }


  return (
    <>
      <Navbar />
      <div className="container mx-10 my-3  bg-fuchsia-100 p-5 rounded-xl border min-h-[80vh] w-auto ">
        <div className="todos">
          <h2 className="text-lg font-bold leading-5">Add a Todo</h2>
        </div>

        <div>
          <input value={todo}
            onChange={(e) => { setTodo(e.target.value) }}
            className="rounded-xl w-sm my-3 border-2 border-fuchsia-300 px-3 py-1
             outline-none
             focus:outline-none
             focus:border-fuchsia-500"
          />
          <button onClick={handleAdd}
            className="border rounded-lg px-3 py-2 text-sm font-bold bg-fuchsia-500 mx-5">{editId ? "Update" : "Add"}</button>
        </div>
        <div className="">
          <h1 className="text-lg font-bold leading-5">Your Tools</h1>
        </div>

        <div className="todos">

          {todos.length === 0 && <div className="mt-4 font-medium">No Todos to display</div>}

          {todos.map((item, index) => {
            return (<div key={index} className="flex items-center justify-between my-3 p-2 border rounded-lg w-xl">
              <div className="flex items-center gap-3">
                <input checked={item.completed}
                  onChange={() => handleCheckbox(item._id)}
                  type="checkbox" className="w-4 h-4 shrink-0" />
                <p className={`text-md font-semibold ${item.completed ? "line-through font-semibold" : ""}`}
                >{item.text}</p>
              </div>

              <div className="flex h-full shrink-0  ">
                <button onClick={() => { handleEdit(item._id) }} className="border rounded-lg px-3 py-2 text-sm font-bold bg-fuchsia-500 mx-1">Edit</button>

                <button onClick={() => {
                  handleDelete(item._id)
                }} className="border rounded-lg px-3 py-2 text-sm font-bold bg-fuchsia-500 mx-1">Delete</button>
              </div>

            </div>);

          })}
        </div>




      </div>
    </>
  )
}