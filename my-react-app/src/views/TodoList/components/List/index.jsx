import React, { Component } from "react"
import ListItem from "../ListItem"
import "./index.css"

export default class List extends Component {
  render() {
    const { todoList, deleteTodo, updateTodo } = this.props
    return (
      <ul className="todo-main">
        {todoList.map(todo => (
          <ListItem
            {...todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    )
  }
}
