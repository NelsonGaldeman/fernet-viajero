import React from "react";
import useGetLensHandle from "./useGetLensHandle" 
import { shortenAddress } from "../../../utils";

const Holder = (address) => {
  const {
    data: currentHolder,
    loading: currentLoading,
    error: currentError,
  } = useGetLensHandle(address.address);

  return currentHolder?.handle != undefined 
    ? (<p>{currentHolder?.handle}</p>)
    : shortenAddress(address.address);
};

export default Holder;