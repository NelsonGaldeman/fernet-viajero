import React from "react";
import {
  diferenciaEnSegundos,
  tiempoTranscurrido,
  timestampToDateString,
} from "../../../utils";
import useGetCurretOwner from "./useGetCurretOwner";
import useGetEnsData from "../useGetEnsData";
import Avatar from "../../Avatar";
import Skeleton from "../../Skeleton";
import ErrorComponent from "../../ErrorComponent";

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
      <td>Escabiando...</td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Avatar src={ensData?.avatar} />
          {ensData?.domain || curretOwner?.address}
        </div>
      </td>
      <td>
        {curretOwner &&
          tiempoTranscurrido(diferenciaEnSegundos(curretOwner.timestamp))}
      </td>
      <td>{timestampToDateString(curretOwner.timestamp)}</td>
    </tr>
  );
};

export default Owner;
