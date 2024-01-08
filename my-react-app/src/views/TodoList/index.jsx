import React, { Component } from "react"
import Header from "./components/Header"
import List from "./components/List"
import Footer from "./components/Footer"
import "./index.css"

export default class TodoList extends Component {
  state = {
    todoList: [
      { id: 0, name: "吃饭", done: false },
      { id: 1, name: "睡觉", done: false },
    ],
  }
  addTodo = todo => {
    let { todoList } = this.state
    let newTodo = {
      id: Date.now(),
      name: todo,
      done: false,
    }
    this.setState({ todoList: [newTodo, ...todoList] })
  }
  deleteTodo = id => {
    let { todoList } = this.state
    let newTodos = todoList.filter(todo => todo.id !== id)
    this.setState({ todoList: newTodos })
  }
  updateTodo = (id, isDone) => {
    let { todoList } = this.state
    let newTodoList = todoList.map(todo => {
      if (todo.id === id) {
        todo.done = isDone
      }
      return todo
    })
    this.setState({ todoList: newTodoList })
  }
  checkedAll = flag => {
    let { todoList } = this.state
    let newTodoList = todoList.map(todo => {
      todo.done = flag
      return todo
    })
    this.setState({ todoList: newTodoList })
  }
  handleClearIsDone = () => {
    let { todoList } = this.state
    let newTodos = todoList.filter(todo => todo.done !== true)
    this.setState({ todoList: newTodos })
  }
  render() {
    const { todoList } = this.state
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List
            todoList={todoList}
            deleteTodo={this.deleteTodo}
            updateTodo={this.updateTodo}
          />
          <Footer
            todoList={todoList}
            checkedAll={this.checkedAll}
            handleClearIsDone={this.handleClearIsDone}
          />
        </div>
      </div>
    )
  }
}
