import {
    FETCH_TODO_LIST,
    FETCH_TODO_LIST_SUCCESS,
    FETCH_TODO_LIST_FAILURE,
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
} from '../actions/ActionConstants'
import MainTodo from '../MainToDo'
import TodoDetail from '../TodoDetail'
import { StackNavigator } from 'react-navigation'
import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';



import { combineReducers } from 'redux'

export function todoList (state = {isFetching: false, todoList: []}, action) {
    switch(action.type) {
        case ADD_TODO :
            newState = Object.assign({}, state)
            newState.todoList.push(action.todo.id)
            return newState
        case DELETE_TODO :
            newState = Object.assign({}, state)
            newState.todoList.filter((value)=>{return value != action.todo.id })
            return newState
        case FETCH_TODO_LIST_SUCCESS :
            newState = {isFetching: false, todoList: []}
            newState.isFetching=false
            for (todo of action.data) {
                newState.todoList.push(todo.id)
            }
            return newState
        case FETCH_TODO_LIST :
            newState = Object.assign({}, state)
            newState.isFetching = true
            return newState
        default:
            return state
    }
}

export function todoEntities (state = {}, action) {
    switch(action.type) {
        case ADD_TODO :
            newState = Object.assign({}, state)
            newState[action.todo.id] = action.todo
            return newState
        case UPDATE_TODO :
            newState = Object.assign({}, state)
            newState[action.todo.id] = action.todo
            return newState
        case FETCH_TODO_LIST_SUCCESS :
            newState = Object.assign({}, state)
            for (todo of action.data) {
                newState[todo.id] = todo
            }
            return newState
        default:
            return state
    }
}

AppRouteConfigs = {
    Main:{screen: MainTodo},
    TodoDetail:{screen: TodoDetail},
}
export const AppNavigator = StackNavigator(AppRouteConfigs);

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Main'));
const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};


export class App extends Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    )
  }
}


export default rootReducer = combineReducers({
    nav: navReducer,
    todoList,
    todoEntities
})