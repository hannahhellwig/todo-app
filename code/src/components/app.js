import React from "react"
import TodoList from "./todolist"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { items: [{ text: "Clean", done: false }], text: "" }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ text: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (!this.state.text.length) {
      return
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    }
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ""
    }))
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <TodoList
          items={this.state.items} />
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
      </div>
    )
  }
}

export default App
