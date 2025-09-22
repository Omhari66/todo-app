import React,{useEffect, useRef,useState} from 'react'
import todo_icon from "../assets/todo_icon.png"
import TodoItems from './TodoItems'

const Todo = () => {
  const [todoList,setTodoList]=useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]);
  const inputRef=useRef();

  const add=()=>{
    const inputText=inputRef.current.value.trim();
    if(!inputText) return; // empty na add ho
    const newTodo={
      id:Date.now(),
      text:inputText,
      isComplete:false,
    }
    setTodoList((prev)=>[...prev,newTodo]);
    inputRef.current.value="";
  }

  const delteTodo=(id)=>{
    setTodoList((prvTodos)=>{
      return prvTodos.filter((todo)=>todo.id!==id)
    })
  }

  const toggle=(id)=>{
    setTodoList((prevTodos)=>{
      return prevTodos.map((todo)=>{
        if(todo.id===id){
          return {...todo, isComplete: !todo.isComplete}
        }
        return todo;
      })
    })
  }

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todoList));
  },[todoList])

  return (
    <div className='bg-white place-self-center w-11/12 sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col p-5 sm:p-7 min-h-[500px] rounded-xl shadow-lg'>
      
      {/* -------title------ */}
      <div className='flex items-center mt-5 gap-2 justify-center sm:justify-start'>
        <img className='w-8' src={todo_icon} alt="" />
        <h1 className='text-2xl sm:text-3xl font-semibold'>To-Do List</h1>
      </div>

      {/* -------input area------ */}
      <div className='flex flex-col sm:flex-row items-center my-5 bg-gray-200 rounded-full p-2 gap-3'>
        <input ref={inputRef} 
          className='bg-transparent border-0 outline-none flex-1 h-12 sm:h-14 pl-4 pr-2 placeholder:text-slate-600 text-base sm:text-lg' 
          type='text' 
          placeholder='Add your task'/>
        <button onClick={add} 
          className='border-none rounded-full bg-orange-600 w-full sm:w-32 h-12 sm:h-14 text-white text-base sm:text-lg font-medium'>
          ADD +
        </button>
      </div>

      {/* -------todo list------ */}
      <div className='space-y-3'>
        {todoList.map((item,index)=>{
          return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} delteTodo={delteTodo} toggle={toggle}/>
        })}
      </div>

    </div>
  )
}

export default Todo
