/**
 * @flow
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    ListView,
    Button,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Image,
    RefreshControl
} from 'react-native'

import { TodoCell } from './TodoCell'
import { Colors } from './Colors'
import { connect } from 'react-redux'
import { add_todo, fetchTodoListAction } from './actions/ActionConstants'


class MainTodo extends Component {
    static navigationOptions = {
        title: 'TodoList',
    };

    constructor(props) {
        super(props)
        console.log('hello world', props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds
        }
    }


    componentDidMount(){
        this.props.fetchData()
    }
    


    renderRow(todo) {
        console.log("TodoCell", todo)
        return (
            <TodoCell todo={todo} navigation={this.props.navigation}/>
        )
    }


    render() {
        console.log('render', this.props)
        return (
            <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: 'white'}}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.isFetching}
                            onRefresh={this._onRefresh.bind(this)}
                            />
                    }
                    dataSource={this.state.dataSource.cloneWithRows(this.props.todoList)}
                    renderRow={this.renderRow.bind(this)}/>
                    <Animated.View style={styles.addBtn}>
                        <TouchableOpacity style={{
                            width: 56, height: 56, flex:1, flexDirection: 'column',alignItems: 'center', justifyContent: 'center'}}
                            onPress={()=>{
                                num = this.props.todoList.length + 1
                                this.props.addTodo({id:num.toString(), title: `Todo ${num}`})
                            }}>
                            <Text style={{fontSize: 32, color: 'white', paddingBottom: 2}}>{'+'}</Text>
                        </TouchableOpacity>
                    </Animated.View>
            </View>
        )
    }

    _onRefresh() {
        this.props.fetchData()
    }

}

const styles = StyleSheet.create({
    addBtn: {
      height: 56,
      width: 56,
      position: 'absolute',
      borderRadius: 28,
      bottom: 16,
      right: 16,
      alignItems: 'center',
      backgroundColor: '#0889fa',  
      elevation: 5
    },
})


const mapStateToProps = (state, ownProps) => {
    console.log('initialProps', ownProps)
    return {
        isFetching: state.todoList.isFetching,
        todoList: state.todoList.todoList.map(id => state.todoEntities[id])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(fetchTodoListAction()),
        addTodo: (todo) => dispatch(add_todo(todo))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainTodo)

