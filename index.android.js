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
  View,
  Navigator
} from 'react-native';

import MainTodo from './js/MainToDo'
import { TodoDetail } from './js/TodoDetail'
import { createStore， applyMiddleware } from 'redux'
import rootReducer, { App } from './js/reducers/TodoReducer'
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk))

store.subscribe(()=>{
  console.log('store changed', store.getState())
})

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
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

AppRegistry.registerComponent('ReduxTodoList', () => Root);
