import { 
  ApolloClient, 
  InMemoryCache, 
  gql, 
  useQuery
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.lens.dev",
  cache: new InMemoryCache(),
});

const GET_LENS_HANDLE = gql`
  query DefaultProfile {
    defaultProfile(request: { ethereumAddress: $address}) {
      handle
    }
  }
`;

const useGetLensHandle = (address) => {
  const { data, loading, error } = useQuery(GET_LENS_HANDLE, {
    client,
    variables: { address }
  });
  console.log(data);
  return { data: data?.currents[0], loading, error };
};

export default useGetLensHandle;
