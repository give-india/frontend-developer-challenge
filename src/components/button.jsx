import React from "react";
import "../styles/playlist.css";

const Button = props => {
  return <button onClick={props.handleChange}>{props.children}</button>;
};

export default Button;
