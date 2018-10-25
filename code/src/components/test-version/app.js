import React from "react"
import TodoItem from "./todoitem"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todoList: localStorage.getItem("userTodo") ? JSON.parse(localStorage.getItem("userTodo")) : []
    }
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value })
    const currentTodoList = this.state.todoList
    localStorage.setItem("userTodo", JSON.stringify(currentTodoList))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (!this.state.text.length) {
      return
    }
    const newItem = {
      text: this.state.text,
      done: false
    }
    this.setState(state => ({
      todoList: state.todoList.concat(newItem)
    }))
    const currentTodoList = this.state.todoList
    localStorage.setItem("userTodo", JSON.stringify(currentTodoList))
  }

  handleBoxCheck = (checked, id) => {
    const listUpdate = this.state.todoList
    listUpdate[id].done = !listUpdate[id].done
    this.setState({
      todoList: listUpdate
    })
    const currentTodoList = this.state.todoList
    localStorage.setItem("userTodo", JSON.stringify(currentTodoList))
  }

  // <pre>{JSON.stringify(this.state, null, 4)}</pre>

  render() {
    return (
      <div>
        <div className="container">
          <h3>Todo List</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              id="newTodo"
              onChange={this.handleChange}
              value={this.state.text}
              placeholder="New todo.." />
            <button>
              Add
            </button>
          </form>
          {this.state.todoList.map((item, index) =>
            <TodoItem
              id={index}
              name={item.text}
              status={item.done}
              handleBoxCheck={() => this.handleBoxCheck(item.done, index)} />)}
        </div>
      </div>
    )
  }
}

export default App
