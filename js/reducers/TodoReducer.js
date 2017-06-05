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

export function todoList (state = ['1', '2', '3'], action) {
    switch(action.type) {
        case ADD_TODO :
            newState = Array.from(state)
            newState.push(action.todo.id)
            return newState
        case DELETE_TODO :
            newState = Array.from(state)
            newState.filter((value)=>{return value != action.todo.id })
            return newState
        default:
            return state
    }
}

export function todoEntities (state = {'1': {id: '1', title: 'Todo 1'}, '2': {id: '2', title: 'Todo 2'}, '3': {id: '3', title: 'Todo 3'}}, action) {
    switch(action.type) {
        case ADD_TODO :
            newState = Object.assign({}, state)
            newState[`${action.todo.id}`] = action.todo
            return newState
        case UPDATE_TODO :
            newState = Object.assign({}, state)
            newState[`${action.todo.id}`] = action.todo
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