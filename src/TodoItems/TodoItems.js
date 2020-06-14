import React, { Component } from "react";
import Uparrow from "../Assets/Icons/upArrow";
import Downarrow from "../Assets/Icons/downArrow";
import Backarrow from "../Assets/Icons/backArrow";
import './TodoItem.scss';

class TodoItems extends Component {
  constructor(props) {
    super(props);
  }

  delete(key) {
    this.props.delete(key);
  }

  postionChange(key, direction) {
    this.props.postionChange(key, direction);
  }

  render() {
    let listItems = [];
    if (this.props.entries.length > 0) {
      listItems = this.props.entries.map((item) => {
        return (
          <li className="list-item" key={item.key}>
            {item.text}

            <span className="arrows"
              onClick={() => {
                this.postionChange(item.key, -1);
              }}
            >
              {" "}
              <Uparrow />
            </span>
            <span className="arrows"
              onClick={() => {
                this.postionChange(item.key, 1);
              }}
            >
              {" "}
              <Downarrow />
            </span>

            <span className="arrows"
              onClick={() => {
                this.delete(item.key);
              }}
            >
              {" "}
              <Backarrow />
            </span>
          </li>
        );
      });
    }
    return <ol className="theList">{listItems}</ol>;
  }
}

export default TodoItems;
