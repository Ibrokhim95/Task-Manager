import { useContext } from "react";
import { TasksContext } from "../App";

const List = ({ inputRef }) => {
  const [state, dispatch] = useContext(TasksContext);

  const store = JSON.parse(localStorage.getItem("list")) || [];
  const fav = state.allTask.filter((item) => item.isFav === true);

  const deleteTask = (id) => {
    const filterredArr = state.allTask.filter((item) => item.id !== id);
    console.log(filterredArr);
    dispatch({ type: "FILTER_ARR", payload: filterredArr });
    localStorage.setItem("list", JSON.stringify(filterredArr));
  };

  const filter = (item) => {
    store.map((listItem) => {
      if (listItem.id === item.id) {
        if (!listItem.isFav) {
          listItem.isFav = true;
        } else {
          listItem.isFav = false;
        }
      }
    });
    dispatch({ type: "FAV", payload: store });
    localStorage.setItem("list", JSON.stringify(store));
  };

  const allTasks = () => {
    dispatch({ type: "ALL_LIST", payload: store });
    const title = document.getElementById("title")
    title.innerText = "All Tasks"
    const btn = document.getElementById("allBtn");
    btn.className = "active";
    btn.nextElementSibling.className = "filterButton";
  };


  const favTasks = () => {
    dispatch({ type: "FAV_LIST", payload: fav });
    const title = document.getElementById("title")
    title.innerText = "Favoured Tasks"
    const btn = document.getElementById("favBtn");
    btn.className = "active";
    btn.previousElementSibling.className = "filterButton";
  };

  const editHandler = (title, id) => {
    console.log(title, id);
    inputRef.current.value = title;
    inputRef.current.focus();
    state.edit = true;
    state.itemId = id;
  };

  return (
    <div className="mt-10">
      <div className="mb-6 sm:grid grid-cols-2 justify-items-end gap-4">

        <h1 id="title" className="mb-2  text-2xl font-semibold text-slate-700">All Tasks</h1>
        
        <div className="buttons flex justify-end mb-3">
          <button
            id="allBtn"
            onClick={allTasks}
            className="active filterButton"
            name="all"
          >
            All Tasks - <span className="font-bold">{store.length}</span>
          </button>
          <button
            id="favBtn"
            onClick={favTasks}
            className="filterButton"
            name="fav"
          >
            Fav Tasks - <span className="font-bold">{fav.length}</span>
          </button>
        </div>
        
      </div>

      <div className="list">
        {state.allTask.map((item, index) => (
          <div key={index} className="bg-zinc-50 mb-2 p-2 ">
            <div className="text-left capitalize flex items-center justify-between">
              <h1 className="font-semibold">{item.title}</h1>
              <div className="icons flex gap-4">
                <svg
                  onClick={() => editHandler(item.title, item.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-blue-600 active:text-red-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>

                <svg
                  onClick={() => filter(item)}
                  name="heart"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-red-500"
                  style={{ fill: item.isFav ? "red" : "" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>

                <svg
                  onClick={() => deleteTask(item.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
