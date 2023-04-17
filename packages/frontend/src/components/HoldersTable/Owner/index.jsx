import React from "react";
import {
  diferenciaEnSegundos,
  tiempoTranscurridoHoras,
  shortenAddress,
} from "../../../utils";
import useGetCurretOwner from "./useGetCurretOwner";
import useGetEnsData from "../useGetEnsData";
import Avatar from "../../Avatar";
import Skeleton from "../../Skeleton";
import ErrorComponent from "../../ErrorComponent";
import s from "./styles.module.css";
import parentS from "../styles.module.css";

const Owner = () => {
  const {
    data: curretOwner,
    loading: curretOwnerLoading,
    error: curretOwnerError,
  } = useGetCurretOwner();

  const {
    data: ensData,
    loading: ensDataLoading,
    error: ensDataError,
  } = useGetEnsData(curretOwner?.address);

  return curretOwnerError || ensDataError ? (
    <tr>
      <ErrorComponent as="td" colSpan={4}>
        {curretOwnerError?.message || ensDataError?.message}
      </ErrorComponent>
    </tr>
  ) : curretOwnerLoading || ensDataLoading ? (
    <tr>
      <Skeleton as="td" />
      <Skeleton as="td" />
      <Skeleton as="td" />
      <Skeleton as="td" />
    </tr>
  ) : (
    <tr>
      <td>
        <a target="_blank" href={"https://welook.io/" + curretOwner?.address + "/polygon.0x6c84d94e7c868e55aaabc4a5e06bdfc90ef3bc72.21260.ERC721"}>
          <img class={s.viajero}/>
        </a>
      </td>
      <td>
        <a class={parentS.link} target="_blank" href={"https://welook.io/" + curretOwner?.address}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Avatar src={ensData?.avatar} />
            {ensData?.domain || shortenAddress(curretOwner?.address)}
          </div>
        </a>
      </td>
      <td colSpan={2}>
        {curretOwner &&
          tiempoTranscurridoHoras(diferenciaEnSegundos(curretOwner.timestamp))}
        {curretOwner &&
          diferenciaEnSegundos(curretOwner.timestamp) > 3600 * 4 ? "&nbsp;💀":""}
      </td>
    </tr>
  );
};

export default Owner;
