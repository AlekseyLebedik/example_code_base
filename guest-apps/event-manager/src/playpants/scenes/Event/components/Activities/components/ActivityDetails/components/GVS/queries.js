import { gql } from '@apollo/client';

export const GET_DRAFTS_QUERY = gql`
  query GetDrafts($titleId: ID!, $env: Env!) {
    gvsDrafts(titleId: $titleId, env: $env) {
      scopeType
      scopeName
      scopeURI
      drafts {
        id
        name
      }
    }
  }
`;

export const GET_EVENTS_QUERY = gql`
  query GetEvents(
    $titleId: ID!
    $env: Env!
    $scopeURI: String!
    $filterByDraftId: ID
  ) {
    gvsEvents(
      titleId: $titleId
      env: $env
      scopeUri: $scopeURI
      filterByDraftId: $filterByDraftId
    ) {
      events {
        eventID
        eventType
        eventName
        eventDraft {
          id
          name
          createdBy {
            id
            username
          }
        }
        labels
        createdAt
        createdBy {
          id
          username
        }
        scopes {
          scopeType
          scopeName
          scopeURI
        }
        comment
      }
    }
  }
`;
