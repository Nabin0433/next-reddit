import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://walledlake.stepzen.net/api/coiled-stingray/__graphql',
  headers: {
    authorization: `ApiKey walledlake::stepzen.net+1000::4a32b01ef93130ea92e54b5862fc97de4cce6ffa60b66a4091644958cb7c0b5d`,
  },
  cache: new InMemoryCache(),
})

export default client
