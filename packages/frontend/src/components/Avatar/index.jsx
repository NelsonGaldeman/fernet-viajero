import React from "react";
//import { MediaRenderer } from "@thirdweb-dev/react";
import s from "./styles.module.css";
import defaultAvatar from "./default-avatar.png";
import useGetLensHandle from "../HoldersTable/Holder/useGetLensHandle";

const Avatar = ({ src, address,...props }) => {
  console.log('adress',address);
  const {
    data: currentHolder,
    loading: currentLoading,
    error: currentError,
  } = useGetLensHandle(address);
  
  const lensAvatar = currentHolder?.picture?.original?.url;

 return (
      <img
        src={src || lensAvatar || defaultAvatar}
        alt="Avatar"
        loading="lazy"
        {...props}
        className={s.avatar}
      />
    ) 
};

export default Avatar;
