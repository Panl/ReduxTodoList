import {
    Text,
    View,
    Switch,
    TouchableNativeFeedback
} from 'react-native'
import React, { Component } from 'react'
import { Colors } from './Colors' 
import { store }  from '../index.android'
import { delete_todo } from './actions/ActionConstants'


export class TodoCell extends Component {

    constructor(props) {
        console.log('TodoCellProps', props)
        super(props)
    }

    render() {
        const navigate = this.props.navigation.navigate;
        return (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()} 
                onLongPress={()=>{
                    console.log('longPressed: ', this.props.todo)
                    store.dispatch(delete_todo(this.props.todo))
                }}
                onPress={()=>{
                    navigate('TodoDetail', {todo: this.props.todo})
                }}>
                <View
                    style={{flex: 1, flexDirection:'column', padding:8, margin: 16, marginBottom: 0,backgroundColor: Colors.pink, borderRadius:2}}>
                    <Text style={{fontSize: 18, color: "#000000"}}>{this.props.todo.title}</Text>
                    <Text style={{marginTop: 4}}>{'2016 Mar 23'}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}