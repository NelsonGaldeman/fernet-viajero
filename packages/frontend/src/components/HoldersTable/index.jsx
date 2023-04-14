import React from "react";
import s from "./styles.module.css";
import Owner from "./Owner";
import PreviousHolders from "./PreviousHolders";

const HoldersTable = () => {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Holder</th>
          <th>Hold time</th>
          <th>Recibido</th>
        </tr>
      </thead>
      <tbody>
        <Owner />
        <PreviousHolders />
      </tbody>
    </table>
  );
};

export default HoldersTable;
