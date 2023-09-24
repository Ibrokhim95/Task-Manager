

import React, { useReducer, useEffect, useRef } from 'react'
import { createContext } from 'react'
import Form from './components/Form'
import List from './components/List'
import { reducer } from './components/reducer'

export const TasksContext = createContext()

const App = () => {


  const initialValue = {
    allTask: JSON.parse(localStorage.getItem("list")) || [],
    store: JSON.parse(localStorage.getItem("list")) || [],
    fav: JSON.parse(localStorage.getItem("list")) || [],
    edit: false,
    itemId: null,
    btn: "#btn",
  }
  const [state, dispatch] = useReducer(reducer, initialValue)

  const inputRef = useRef("")

  return (
    <div className='text-center w-[70%] mt-[80px] mx-auto flex flex-col gap-12 justify-center'>

      <div className='flex justify-center items-center gap-3'>
        <img className='w-12 rotate-[-15deg]' src="./src/assets/logo.svg" alt="" />
        <h1 className='rotate-[3deg] text-2xl font-bold text-gray-500'>Task Manager</h1>
      </div>

      <TasksContext.Provider value={[state, dispatch]}>
        <Form inputRef={inputRef}/>
        <List inputRef={inputRef}/>
      </TasksContext.Provider>

      <h1 className='m-[100px] mb-[30px]'>This is made by <a className='text-blue-600' href="#">Ibrokhim</a></h1>
    </div>
  )
}

export default App