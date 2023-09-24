import { useRef } from "react"
import { useContext } from "react"
import { TasksContext } from "../App"



const Form = ({inputRef}) => {
  
  const [state, dispatch] = useContext(TasksContext)

  const btnEdit = () => {
      if(state.edit) {
        btn.innerText = "edit"
      }
  }
  btnEdit()


  const submitHandler = (e) => {
    e.preventDefault()
    const store = JSON.parse(localStorage.getItem("list")) || []
    const title = inputRef.current.value
    const id = new Date().getTime().toString()

    if (state.edit) {
      state.allTask.map(item => {
        if (item.id === state.itemId) {
          item.title = title
        }
      })
      dispatch({type: "EDIT", payload: state.allTask})
      localStorage.setItem('list', JSON.stringify(state.allTask))
      state.edit = false
    } else {
      if(title) {
        dispatch({type: "SET_ITEM", payload: {id, title, isFav: false}})
        store.push({id, title, isFav: false})
        localStorage.setItem('list', JSON.stringify(store))
      } 
      else {
        alert("Error")
      }
    }

    e.target.reset()
  }


  return (
    <div className='flex justify-centerw-[100%] mx-auto'>
      <form onSubmit={submitHandler} className='md:flex'>
        <input ref={inputRef} className='w-[100%] rounded mb-3 md:mb-0 md:w-[60%]' type="text" name="add" id="" placeholder='I need to...' />
        <div className="flex justify-end gap-3 md:gap-0">
          <button className='active:scale-90 bg-green-500 text-white p-2 rounded shadow' id="btn">Add task</button>
          <button onClick={() => localStorage.clear()} className='active:scale-90 bg-red-500 text-white p-2 rounded shadow'>Clear</button>
        </div>
      </form>
    
    </div>
  )
}

export default Form