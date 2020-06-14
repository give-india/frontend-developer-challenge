import React, { Component } from "react";
import TodoItems from "../TodoItems/TodoItems";
import validator from "validator";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { connect } from "react-redux";
import * as todoActionCreator from "../Store/Action/todoActionCreator";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  addItem(e) {
    if (
      this._inputElement.value !== "" &&
      validator.isURL(this._inputElement.value) &&
      !validator.isEmail(this._inputElement.value)
    ) {
      let hostName = new URL(this._inputElement.value).host;
      let pathName = new URL(this._inputElement.value).pathname;
      console.log("hostName " + hostName);
      console.log("pathName " + pathName);
      if (hostName === "www.youtube.com" && pathName === "/watch") {
        let newItem = {
          text: this._inputElement.value,
          key: Date.now(),
        };

        this.props.onAddItem(newItem);
        this._inputElement.value = "";
      } else {
        alert("Enter proper youtube url");
        this._inputElement.value = "";
      }
    } else {
      alert("This is not a url, may be random text");
    }

    e.preventDefault();
  }

  deleteItem(key) {
    let filteredItems = this.props.todoItems.filter((item) => {
      return item.key !== key;
    });
    this.props.onRemoveItem(filteredItems);
  }

  handleMove(key, direction) {
    const UP = -1;
    const DOWN = 1;
    const { todoItems } = this.props;

    let positionOfItem = todoItems.findIndex((i) => {
      return i.key === key;
    });
    
    if (positionOfItem < 0) {
      alert("Given item not found.");
    } else if (
      (direction === UP && positionOfItem === 0) ||
      (direction === DOWN && positionOfItem === todoItems.length - 1)
    ) {
      return; // cannot move outside of array
    }
    const item = todoItems[positionOfItem]; // save item for later
    const newItems = todoItems.filter((i) => i.key !== key); // remove item from array
    newItems.splice(positionOfItem + direction, 0, item);
    this.props.onReorderItem(newItems);
  }

  render() {
    return (
      <div className="todoListMain">
        <form onSubmit={this.addItem}>
          <input
            className="form-control"
            ref={(a) => {
              this._inputElement = a;
            }}
            placeholder="Enter Youtube Url"
          />
          <button type="submit">add</button>
        </form>

        <TodoItems
          entries={this.props.todoItems}
          delete={this.deleteItem}
          postionChange={this.handleMove}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoItems: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddItem: (inputVal) => dispatch(todoActionCreator.additem(inputVal)),
    onRemoveItem: (remainItems) =>
      dispatch(todoActionCreator.removeitem(remainItems)),
    onReorderItem: (reorderItems) =>
      dispatch(todoActionCreator.reorderitem(reorderItems)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
