import React from "react";
import s from "./styles.module.css";
import defaultAvatar from "./default-avatar.png";

const Avatar = ({ src, ...props }) => {
  return (
    <img
      src={src || defaultAvatar}
      alt="Avatar"
      loading="lazy"
      {...props}
      className={s.avatar}
    />
  );
};

export default Avatar;
