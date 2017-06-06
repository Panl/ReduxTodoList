import getTodos from '../Api'


export const FETCH_TODO_LIST = 'fetch_todo_list'
export const FETCH_TODO_LIST_SUCCESS = 'fetch_todo_list_success'
export const FETCH_TODO_LIST_FAILURE = 'fetch_todo_list_failure'

export const ADD_TODO = 'add_todo'
export const UPDATE_TODO = 'update_todo'
export const DELETE_TODO = 'delete_todo'

export function add_todo(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

export function update_todo(todo) {
    return {
        type: UPDATE_TODO,
        todo
    }
}

export function delete_todo(todo) {
    return {
        type: DELETE_TODO,
        todo
    }
}

export function fetchTodoList() {
    return {
        type: FETCH_TODO_LIST
    }
}

export function fetchTodoListSuccess(data) {
    return {
        type: FETCH_TODO_LIST_SUCCESS,
        data
    }
}


export function fetchTodoListFailure() {
    return {
        type: FETCH_TODO_LIST_FAILURE
    }
}

export function fetchTodoListAction() {
    return (dispatch) => {
        dispatch(fetchTodoList())
        getTodos()
            .then((data)=>{
                dispatch(fetchTodoListSuccess(data))
            })
            .catch((error)=>{
                console.log(error)
                dispatch(fetchTodoListFailure())
            })
    }
}