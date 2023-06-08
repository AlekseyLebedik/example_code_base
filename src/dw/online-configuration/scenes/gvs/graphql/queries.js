import { gql } from '@apollo/client';

export const GET_SCOPES_QUERY = gql`
  query GetScopes($titleId: ID!, $env: Env!, $scopeURI: String) {
    gvsScopes(titleId: $titleId, env: $env, scopeUri: $scopeURI) {
      scopeType
      scopeName
      scopeURI
      parentScopeURI
    }
  }
`;

export const GET_POPULATION_QUERY = gql`
  query getPopulation($type: String, $value: String) {
    Population(type: $type, value: $value) {
      type
      value
      displayValue
      current
    }
  }
`;

export const GET_POPULATIONS_QUERY = gql`
  query GetPopulations($titleId: ID!, $env: Env!, $scopeURI: String) {
    gvsPopulations(titleId: $titleId, env: $env, scopeUri: $scopeURI) {
      scopeType
      scopeName
      scopeURI
      populations {
        type
        value
        displayValue
        current
      }
    }
  }
`;

export const GET_POPULATIONS_DISPAY_VALUES_QUERY = gql`
  query GetPopulationsDisplayValues(
    $titleId: ID!
    $env: Env!
    $populations: [PopulationInput!]!
  ) {
    gvsPopulationsDisplayValues(
      titleId: $titleId
      env: $env
      populations: $populations
    ) {
      type
      value
      displayValue
    }
  }
`;

export const GET_DRAFTS_QUERY = gql`
  query GetDrafts($titleId: ID!, $env: Env!, $scopeURI: String) {
    gvsDrafts(
      titleId: $titleId
      env: $env
      scopeUri: $scopeURI
      includeEdits: true
    ) {
      scopeType
      scopeName
      scopeURI
      drafts {
        id
        name
        edits {
          id
          createdBy {
            id
          }
          createdAt
        }
        createdAt
      }
    }
  }
`;

export const GET_DRAFT_DETAILS_QUERY = gql`
  query GetDraftDetails(
    $titleId: ID!
    $env: Env!
    $draftId: ID!
    $scopeURI: String!
  ) {
    gvsDraftDetails(
      titleId: $titleId
      env: $env
      scopeUri: $scopeURI
      draftId: $draftId
    ) {
      name
      OCCToken
      diffs {
        scopeType
        scopeName
        scopeURI
        populationType
        populationValue
        variables {
          key
          valuesPerPlatform {
            platform
            source
            target
          }
        }
      }
    }
  }
`;

export const GET_CONFIGURATION_QUERY = gql`
  query GetConfiguration(
    $titleId: ID!
    $env: Env!
    $scopeURI: String!
    $populationType: String!
    $populationValue: String!
    $draftId: ID
    $eventId: ID
    $edits: [ConfigurationsMultiScopeEditsInput]
  ) {
    gvsConfigurations(
      titleId: $titleId
      env: $env
      scopeUri: $scopeURI
      populationType: $populationType
      populationValue: $populationValue
      draftId: $draftId
      eventId: $eventId
      obfuscatedKey: true
      editsInput: $edits
    ) {
      scopeType
      scopeName
      scopeURI
      populationType
      populationValue
      lastModifiedAt
      variables {
        key
        obfuscatedKey
        valuesPerPlatform {
          platform
          value
          parentValue
          source {
            scopeType
            scopeName
            scopeURI
            populationType
            populationValue
            draftID
            isUncommitted
          }
        }
        type
        validation
        category
      }
    }
  }
`;

export const GET_DEFINITIONS_QUERY = gql`
  query GetDefinitions($titleId: ID!, $env: Env!, $scopeURI: String) {
    gvsDefinitions(titleId: $titleId, env: $env, scopeUri: $scopeURI) {
      scopeType
      scopeName
      scopeURI
      definitions {
        key
        type
        validation
        description
        createdBy {
          username
        }
        owner {
          username
        }
        createdAt
        category
        isArchived
      }
    }
  }
`;

export const GET_DRAFT_EDITS_DIFFS_QUERY = gql`
  query GetDraftEditsDiffs($titleId: ID!, $env: Env!, $draftId: ID!) {
    gvsDraftEditsDiffs(titleId: $titleId, env: $env, draftId: $draftId) {
      edits {
        id
        createdAt
        createdBy {
          id
          username
        }
        comment
        diffs {
          scopeURI
          scopeName
          populationType
          populationValue
          variables {
            key
            valuesPerPlatform {
              platform
              source
              target
            }
          }
        }
      }
    }
  }
`;

export const GET_EVENT_EDITS_QUERY = gql`
  query GetEventEdits($titleId: ID!, $env: Env!, $eventId: ID!) {
    gvsEventEdits(titleId: $titleId, env: $env, eventId: $eventId) {
      event {
        eventID
        eventType
        eventName
        createdBy {
          username
        }
        comment
      }
      edits {
        id
        createdAt
        createdBy {
          id
          username
        }
        comment
        diffs {
          scopeURI
          scopeName
          populationType
          populationValue
          variables {
            key
            valuesPerPlatform {
              platform
              source
              target
            }
          }
        }
      }
    }
  }
`;

export const GET_DIFF_QUERY = gql`
  query GetDiff($titleId: ID!, $env: Env!, $diffInput: DiffInput!) {
    gvsDiffs(titleId: $titleId, env: $env, diffInput: $diffInput) {
      diffs {
        populationType
        populationValue
        variables {
          key
          valuesPerPlatform {
            platform
            source
            target
          }
        }
      }
    }
  }
`;

export const GET_EVENTS_QUERY = gql`
  query GetEvents(
    $titleId: ID!
    $env: Env!
    $scopeURI: String!
    $nextPageToken: String
  ) {
    gvsEvents(
      titleId: $titleId
      env: $env
      scopeUri: $scopeURI
      nextPageToken: $nextPageToken
    ) {
      nextPageToken
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

export const GET_ASSIGNED_OBFUSCATION_ALGORITHMS_QUERY = gql`
  query GetAssignedObfuscationAlgorithms(
    $titleId: ID!
    $env: Env!
    $scopeURI: String
    $filterAlgorithmType: ObfuscationAlgorithmType
  ) {
    gvsAssignedObfuscationAlgorithms(
      titleId: $titleId
      env: $env
      scopeUri: $scopeURI
      filterAlgorithmType: $filterAlgorithmType
    ) {
      scopeType
      scopeName
      scopeURI
      algorithmID
      algorithmName
      algorithmType
      parameters {
        name
        type
        default
        value
        required
      }
    }
  }
`;

export const GET_INSTANCED_OBFUSCATION_ALGORITHMS_QUERY = gql`
  query GetInstancedObfuscationAlgorithms(
    $titleId: ID!
    $env: Env!
    $filterAlgorithmType: ObfuscationAlgorithmType
  ) {
    gvsInstancedObfuscationAlgorithms(
      titleId: $titleId
      env: $env
      filterAlgorithmType: $filterAlgorithmType
    ) {
      algorithmID
      algorithmName
      algorithmType
      parameters {
        name
        type
        default
        value
        required
      }
    }
  }
`;
