import React from "react";
import "./style.css";
import "antd/dist/antd.css";

import { Input,Button } from "antd";

export const AddLink: React.FC = () => {
  return (
    <div className="link-main">
      <div>
        <Input className = "link-input" size="large" placeholder="Enter Link" />
      </div>
      <div className="add-link-button">
      <Button type="primary" size="large">
          Add Link
        </Button>
      </div>
    </div>
  );
};
