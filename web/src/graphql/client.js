import ApolloClient from 'apollo-boost';

const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:8000/api/graphql';

const client = new ApolloClient({
  uri: graphqlEndpoint,
});

export default client;
