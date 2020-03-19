import React from "react";
import "./styles.css";

const InputBox = () => {
	return (
		<div className="mb-50">
			<p className={`error-text ${true ? "d-none" : ""}`}>
				Please enter valid Youtube video link!!!
			</p>
			<input type="text" className="add-link-input-field" />
			<button className="add-link-button">Add Link</button>
		</div>
	);
};

export default InputBox;
