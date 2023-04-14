import React, { createElement } from "react";
import s from "./styles.module.css";

const Skeleton = ({ as, ...props }) => {
  return createElement(as || "div", {
    ...props,
    className: s.skeleton,
  });
};

export default Skeleton;
