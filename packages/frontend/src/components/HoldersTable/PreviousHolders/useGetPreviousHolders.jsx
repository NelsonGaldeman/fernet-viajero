import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_PREVIOUS_HOLDERS = gql`
  query getPreviousHolders {
    previousHolders(orderBy: block, orderDirection: desc) {
      address
      tiempo
      timestamp
    }
  }
`;

const useGetPreviousHolders = () => {
  const { data: rawData, loading, error } = useQuery(GET_PREVIOUS_HOLDERS);

  const data = useMemo(() => {
    return rawData?.previousHolders.map((previousHolder, index) => ({
      ...previousHolder,
      number: rawData.previousHolders.length - index,
    }));
  }, [rawData]);

  return { data, loading, error };
};

export default useGetPreviousHolders;
