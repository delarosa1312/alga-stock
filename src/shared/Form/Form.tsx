import React, { useState } from "react";
import "./Form.scss";

declare interface FormProps {
  children?: string | any;
  title?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const preventedSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(event);
  };

  return (
    <div
      className={`AppDivCollapse ${isCollapsed ? "" : "collapsed"}`}
      onClick={toggleCollapse}
    >
      {props.title && <div className="Title">{props.title}</div>}
      <form className="AppForm" onSubmit={preventedSubmit}>
        {props.children}
      </form>
    </div>
  );
};

export default Form;
