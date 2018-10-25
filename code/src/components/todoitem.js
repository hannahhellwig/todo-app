import React from "react"

class TodoItem extends React.Component {

  handleDoneClick = () => {
    const { done, id, updateTodo } = this.props
    updateTodo(!done, id)
  }

  handleDeleteClick = () => {
    const { id, deleteTodo } = this.props
    deleteTodo(id)
  }

  render() {
    const { text, done } = this.props

    const textStyle = done ? { textDecoration: "line-through" } : {}

    return (
      <div className="todoItem">
        <button className="doneButton" onClick={this.handleDoneClick}>Done</button>
        <p style={textStyle} >{text}</p>
        <button className="deleteButton" onClick={this.handleDeleteClick}>x</button>
      </div>
    )
  }
}

export default TodoItem
