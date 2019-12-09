import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: ""
    };
  }
  onChangeHandler = e => {
    this.setState({
      link: e.target.value
    });
  };

  onFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.link.substring(0, 32) === "https://www.youtube.com/watch?v="
    ) {
      this.props.submitHandler(this.state.link);
    } else {
      alert("Incorrect Link");
    }
  };

  render() {
    //console.log(this.props);
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
            className="formInputStyle"
            type="text"
            placeholder="Youtube Link"
            value={this.state.link}
            onChange={this.onChangeHandler}
          />
        </form>
      </div>
    );
  }
}
