import Rreact from "react";
import useGetPreviousHolders from "./useGetPreviousHolders";
import PreviousHolder from "./PreviousHolder";
import Skeleton from "../../Skeleton";
import ErrorComponent from "../../ErrorComponent";

const PreviousHolders = () => {
  const {
    data: previousHolders,
    loading: previousHoldersLoading,
    error: previousHoldersError,
  } = useGetPreviousHolders();

  return previousHoldersError ? (
    <tr>
      <ErrorComponent as="td" colSpan={4}>
        {previousHoldersError.message}
      </ErrorComponent>
    </tr>
  ) : previousHoldersLoading ? (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <tr key={i}>
          <Skeleton as="td" />
          <Skeleton as="td" />
          <Skeleton as="td" />
          <Skeleton as="td" />
        </tr>
      ))}
    </>
  ) : (
    <>
      {previousHolders?.map((previousHolder, i) => (
        <PreviousHolder key={i} previousHolder={previousHolder} />
      ))}
    </>
  );
};

export default PreviousHolders;
