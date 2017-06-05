/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MainTodo from './js/MainToDo'
import { createStore } from 'redux'
import rootReducer from './js/reducers/TodoReducer'
import {Provider} from 'react-redux';


export const store = createStore(rootReducer)

function ReduxTodoList(props) {
  console.log('store', store.getState())
  return (
    <Provider store={store}>
      <MainTodo/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReduxTodoList', () => ReduxTodoList);