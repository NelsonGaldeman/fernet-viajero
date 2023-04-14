import { gql, useQuery } from "@apollo/client";

const GET_CURRENT_OWNER = gql`
  query getCurretOwner {
    currents(id: "1") {
      address
      block
      timestamp
    }
  }
`;

const useGetCurretOwner = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_OWNER);
  return { data: data?.currents[0], loading, error };
};

export default useGetCurretOwner;
