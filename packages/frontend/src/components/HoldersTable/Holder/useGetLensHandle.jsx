import { gql, useQuery } from "@apollo/client";

const GET_LENS_HANDLE = gql`
query DefaultProfile($address: EthereumAddress!){
  defaultProfile(request: { ethereumAddress: $address}) {
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
	}
}
`;

const useGetLensHandle = (address) => {
  const { data, loading, error } = useQuery(GET_LENS_HANDLE, {
    variables: {address},
    context: {clientName: 'endpoint2'}
  });
  return { data: data?.defaultProfile, loading, error };
};

export default useGetLensHandle;
