import React from "react"

class TodoList extends React.Component {

  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li>
            <label>
              <input
                type="checkbox"
                key={item.id}
                checked={this.props.done} />
              {item.text}
            </label>
          </li>
        ))}
      </ul>
    )
  }
}

// onChange={this.props.handleBoxCheck()}
export default TodoList
