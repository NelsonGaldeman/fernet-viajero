import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client'

const endpoint1 = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/nelsongaldeman/fernet-viajero',
})
const endpoint2 = new HttpLink({
  uri: 'https://api.lens.dev/',
})

//pass them to apollo-client config
const splitClient = new ApolloClient({
  link: split(
    operation => operation.getContext().clientName === 'endpoint2',
    endpoint2,
    endpoint1
  ),
  cache: new InMemoryCache(),
})

export { splitClient };
