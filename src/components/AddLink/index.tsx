import React from "react";
import "./style.css";
import "antd/dist/antd.css";

import { Input, Button } from "antd";
import { LinkEntry } from "../../App";

interface AddLinkProps {

  onChange: (x: LinkEntry) => void;
  
}


export const AddLink: React.FC<AddLinkProps> = (props: AddLinkProps) => {
  const [link, setLink] = React.useState("");

  const onLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const onAddEntry = () => {
    const entry: LinkEntry = { name, id: Date.now() };
    props.onChange(entry);
  };


  return (
    <div className="link-main">
      <div>
        <Input
          className="link-input"
          size="large"
          placeholder="Enter Link"
          onChange={onLinkChange}
          value={link}
        />
      </div>
      <div className="add-link-button">
        <Button type="primary" size="large" onClick={onAddEntry}>
          Add Link
        </Button>
      </div>
    </div>
  );
};
