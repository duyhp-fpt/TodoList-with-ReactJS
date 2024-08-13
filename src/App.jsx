import { useEffect, useState } from "react";
import TodoInput from "./components/todoInput"
import TodoList from "./components/TodoList"

function App() {

  const [todos, setTodos] = useState([])
  const [todoValue , setTodoValue] = useState('')

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodos){
    const newTodoList = [...todos, newTodos]
    persistData(newTodoList)
    setTodos(newTodoList)
  } 

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex)=>{
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    console.log(localTodos)
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  }, [])

  return (
    <main>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos= {handleAddTodos}/>

      <TodoList handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} todos={todos}/>
    </main>
  )
}

export default App
