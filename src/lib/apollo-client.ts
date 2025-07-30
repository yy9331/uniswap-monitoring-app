import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/117294/uni-token-monitor-subgraph/v0.0.1/',
  cache: new InMemoryCache(),
});