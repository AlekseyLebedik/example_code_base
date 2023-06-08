import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getOAuthToken } from '@demonware/devzone-core/auth/utils';
import { GRAPHQL_URL, AUTH_CLIENT, DEFAULT_AUTH_CLIENT } from 'dw/config';

const clients = [];

const AUTH_CLIENT_QS =
  AUTH_CLIENT === DEFAULT_AUTH_CLIENT ? '' : `?client=${AUTH_CLIENT}`;

const httpLink = createHttpLink({
  uri: `${GRAPHQL_URL}${AUTH_CLIENT_QS}`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getOAuthToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token.accessToken,
    },
  };
});
export default (clientName = 'default', cacheProps) => {
  if (!clients[clientName]) {
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(cacheProps),
    });
    clients[clientName] = client;
  }
  return clients[clientName];
};
