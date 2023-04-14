import React from "react";
import { tiempoTranscurrido, timestampToDateString } from "../../../../utils";
import useGetEnsData from "../../useGetEnsData";
import Avatar from "../../../Avatar";
import Skeleton from "../../../Skeleton";
import ErrorComponent from "../../../ErrorComponent";

const PreviousHolder = ({ previousHolder }) => {
  const {
    data: ensData,
    loading: ensDataLoading,
    error: ensDataError,
  } = useGetEnsData(previousHolder.address);

  return ensDataError ? (
    <tr>
      <ErrorComponent as="td" colSpan={4}>
        {ensDataError?.message}
      </ErrorComponent>
    </tr>
  ) : ensDataLoading ? (
    <tr>
      <Skeleton as="td" />
      <Skeleton as="td" />
      <Skeleton as="td" />
      <Skeleton as="td" />
    </tr>
  ) : (
    <tr>
      <td>#{previousHolder.number}</td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Avatar src={ensData?.avatar} />
          {ensData?.domain || previousHolder.address}
        </div>
      </td>
      <td>
        {previousHolder.tiempo && tiempoTranscurrido(previousHolder.tiempo)}
        {previousHolder.tiempo && previousHolder.tiempo >= 86400 && " 💀"}
      </td>
      <td>
        {previousHolder.timestamp &&
          timestampToDateString(previousHolder.timestamp)}
      </td>
    </tr>
  );
};

export default PreviousHolder;
