import React from "react"
import TodoList from "./todolist"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      toDoItems: [{ text: "Clean", done: false }, { text: "Work Out", done: false }], text: ""
    }
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value })
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
      toDoItems: state.toDoItems.concat(newItem),
      text: ""
    }))
    localStorage.setItem(event.target.toDoItems, JSON.stringify(event.target.toDoItems))
  }

  handleBoxCheck = (checked, id) => {
    const listUpdate = this.state.toDoItems
    listUpdate[id].done = !listUpdate[id].done
    this.setState({
      toDoItems: listUpdate
    })
  }

  // Spread Attributes
  // const x = {name:"david"}
  // const y = {...x,
  //   name:"fred",
  //   lastname: "shore"}

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
          {this.state.toDoItems.map((item, index) =>
            <TodoList
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
