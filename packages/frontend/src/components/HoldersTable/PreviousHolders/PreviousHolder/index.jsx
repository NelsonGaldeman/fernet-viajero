import React from "react";
import { 
  diferenciaEnSegundos, 
  tiempoTranscurrido, 
  tiempoTranscurridoHoras,
  shortenAddress,
} from "../../../../utils";
import useGetEnsData from "../../useGetEnsData";
import Avatar from "../../../Avatar";
import Skeleton from "../../../Skeleton";
import ErrorComponent from "../../../ErrorComponent";
import parentS from "../../styles.module.css";

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
        <a className={parentS.link} target="_blank" href={"https://welook.io/" + previousHolder.address}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Avatar src={ensData?.avatar} />
            {ensData?.domain || ensData?.lens || shortenAddress(previousHolder.address)}
          </div>
        </a>
      </td>
      <td>
        {previousHolder.tiempo && tiempoTranscurridoHoras(previousHolder.tiempo)}
        {previousHolder.tiempo && previousHolder.tiempo >= 3600 * 4 && " 💀"}
      </td>
      <td>
        {previousHolder.timestamp &&
          tiempoTranscurrido(diferenciaEnSegundos(previousHolder.timestamp))}
      </td>
    </tr>
  );
};

export default PreviousHolder;
