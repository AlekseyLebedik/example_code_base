import React from 'react';
import PropTypes from 'prop-types';

import { ApolloProvider } from '@apollo/react-hooks';
import setupApollo from 'dw/core/helpers/setupApollo';

const cacheProps = {
  typePolicies: {
    Query: {
      fields: {
        Population(_, { args, toReference }) {
          return toReference({
            __typename: 'Population',
            ...args,
          });
        },
      },
    },
    Scope: {
      keyFields: ['scopeURI'],
    },
    DraftsScope: {
      keyFields: ['scopeURI'],
    },
    PopulationsScope: {
      keyFields: ['scopeURI'],
      fields: {
        populations: {
          merge(existing, incoming) {
            return incoming || existing || [];
          },
        },
      },
    },
    Population: {
      keyFields: ['type', 'value'],
      fields: {
        displayValue: {
          merge(existing, incoming) {
            return incoming || existing || null;
          },
        },
      },
    },
    Definition: {
      keyFields: ['key'],
    },
  },
  addTypename: true,
};

const Provider = ({ children }) => (
  <ApolloProvider client={setupApollo('gvs', cacheProps)}>
    {children}
  </ApolloProvider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
