import React from "react";
import "./style.css";
import "antd/dist/antd.css";

import { Input, Button, Modal } from "antd";
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
    
    let validate = false;
    let regexp: RegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/
    if(regexp.test(link))
    {
      validate = true;
    }
    if (validate) {
      const entry: LinkEntry = { link, id: Date.now() };
      props.onChange(entry);
    } else {
      Modal.warning({
        title: "Invalid URL",
        content: "Please enter URL in proper format",
      });
      
    }
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
