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