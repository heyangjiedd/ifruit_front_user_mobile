import React from 'react';
import {connect} from 'react-redux'
import {addTodo, deleteTodo, pushTodo, popTodo} from '../../action/index'
import Carousel from '../../component/carousel'

@connect(state => ({
    count: state.count,
    list: state.list
}), {addTodo, deleteTodo, pushTodo, popTodo})
class App extends React.Component {
    render() {
        return (
            <div>
                <Carousel></Carousel>
            </div>
        );
    }
}
export default App;
