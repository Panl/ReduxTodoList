import React, { Component } from 'react';
import ReactNative, {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { store }  from '../index.android'
import { update_todo } from './actions/ActionConstants'
import { Todo } from './type'
import { connect } from 'react-redux'

 class TodoDetail extends Component {
    static navigationOptions = {
        title: 'Todo',
    };

    constructor(props){
        super(props)
        this.props = props
    }


    render() {
        console.log("TodoDetail", this.props)
        const todo = this.props.todo
        return(
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center',alignItems: 'center',}} >
                <TouchableOpacity onPress={()=>{
                        store.dispatch(update_todo({
                            id:todo.id,
                            title: todo.title + ' updated'
                        }))
                    }}>
                    <Text style={{fontSize:38}}>{todo.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('initialProps', ownProps)
    return {
        todo: state.todoEntities[ownProps.navigation.state.params.todo.id]
    }
}

export default connect(
    mapStateToProps
)(TodoDetail)