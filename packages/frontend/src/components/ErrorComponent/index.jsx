import React, { createElement } from "react";
import s from "./styles.module.css";

const ErrorComponent = ({ as, ...props }) => {
  return createElement(as || "div", {
    ...props,
    className: s.error,
  });
};

export default ErrorComponent;
