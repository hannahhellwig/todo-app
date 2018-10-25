import React from "react"

class LectureTodoItem extends React.Component {

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
      <div style={textStyle}>
        {text}
        <button onClick={this.handleDoneClick}>Done</button>
        <button onClick={this.handleDeleteClick}>Delete</button>
      </div>
    )
  }
}

export default LectureTodoItem
