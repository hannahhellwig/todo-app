import React from "react"

class TodoList extends React.Component {

  render() {
    return (
      <ul>
        <li>
          <input
            type="checkbox"
            key={this.props.id}
            checked={this.props.status}
            onChange={this.props.handleBoxCheck} />
          {this.props.name}
        </li>
      </ul>
    )
  }
}

export default TodoList
