export const  reducer = (state, action) => {

    if(action.type === "SET_ITEM") {
        return {...state, allTask: [...state.allTask, action.payload]}
    }
    if(action.type === "FILTER_ARR") {
        return {...state, allTask: action.payload}
    }
    if(action.type === "FAV") {
        return {...state, allTask: action.payload}
    }   
    if(action.type === "FAV_LIST") {
        return {...state, allTask: action.payload}
    }  
    if(action.type === "ALL_LIST") {
        return {...state, allTask: action.payload}
    }    
    if(action.type === "EDIT") {
        return {...state, allTask: action.payload}
    }   
    return state
}
