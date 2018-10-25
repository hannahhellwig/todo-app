import React from "react"
import TodoItem from "./todoitem"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todoList: localStorage.getItem("userTodo") ? JSON.parse(localStorage.getItem("userTodo")) : []
    }
  }

  handleInputText = (e) => {
    this.setState({ inputText: e.target.value })
  }

  addTodo = () => {
    const todo = { text: this.state.inputText, done: false, id: Date.now() }
    const newTodoList = [...this.state.todoList, todo]
    this.setState({ todoList: newTodoList })
    localStorage.setItem("userTodo", JSON.stringify(newTodoList))
  }

  updateTodo = (done, id) => {
    const updateTodoList =
      this.state.todoList.map((item) => {
        if (item.id === id) {
          item.done = done
        }
        return item
      })
    this.setState({ todoList: updateTodoList })
  }

  deleteTodo = (id) => {
    const updateTodoList =
      this.state.todoList.filter((item) => {
        return item.id !== id
      })
    this.setState({ todoList: updateTodoList })
  }

  render() {
    const listItems = this.state.todoList.map((item) => {
      return (
        <TodoItem
          text={item.text}
          done={item.done}
          id={item.id}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo} />
      )
    })

    return (
      <div>
        <div className="container">
          <h3>Todo List</h3>
          <div className="inputContainer">
            <input
              type="text"
              onChange={this.handleInputText}
              placeholder="New todo.." />
            <button className="addButton" onClick={this.addTodo}>Add</button>
          </div>
          {listItems}
        </div>
      </div>
    )
  }
}

export default App
