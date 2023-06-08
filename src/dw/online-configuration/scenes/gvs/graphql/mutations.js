import { gql } from '@apollo/client';

export const CREATE_SCOPE_MUTATION = gql`
  mutation CreateScope(
    $titleId: ID!
    $env: Env!
    $parentScopeUri: String!
    $scopeName: String!
    $algorithmID: ID!
  ) {
    gvsCreateScope(
      titleId: $titleId
      env: $env
      parentScopeUri: $parentScopeUri
      scopeName: $scopeName
      instancedObfuscationAlgorithmID: $algorithmID
    ) {
      scopeURI
    }
  }
`;

export const CREATE_DEFINITION_MUTATION = gql`
  mutation CreateDefinition(
    $titleId: ID!
    $env: Env!
    $scopeURI: String!
    $definitionData: DefinitionInput!
  ) {
    gvsCreateDefinition(
      titleId: $titleId
      env: $env
      scopeUri: $scopeURI
      definitionData: $definitionData
    ) {
      ok
    }
  }
`;

export const UPDATE_DEFINITION_MUTATION = gql`
  mutation UpdateDefinition(
    $titleId: ID!
    $env: Env!
    $scopeURI: String!
    $definitionData: DefinitionInput!
  ) {
    gvsUpdateDefinition(
      titleId: $titleId
      env: $env
      scopeUri: $scopeURI
      definitionData: $definitionData
    ) {
      ok
    }
  }
`;

export const ARCHIVE_DEFINITIONS_MUTATION = gql`
  mutation ArchiveDefinitions(
    $titleId: ID!
    $env: Env!
    $scopeURI: String!
    $keys: [String!]!
  ) {
    gvsArchiveDefinitions(
      titleId: $titleId
      env: $env
      scopeUri: $scopeURI
      keys: $keys
    ) {
      ok
    }
  }
`;

export const RESTORE_DEFINITIONS_MUTATION = gql`
  mutation RestoreDefinitions(
    $titleId: ID!
    $env: Env!
    $scopeURI: String!
    $keys: [String!]!
  ) {
    gvsRestoreDefinitions(
      titleId: $titleId
      env: $env
      scopeUri: $scopeURI
      keys: $keys
    ) {
      ok
    }
  }
`;

export const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraft(
    $titleId: ID!
    $env: Env!
    $scopeURI: String!
    $draftData: DraftInput!
    $editData: ClearPopulationInput
    $restoreData: RestoreEventInput
    $edits: [MultiScopeEditInput]
  ) {
    gvsCreateDraft(
      titleId: $titleId
      env: $env
      scopeUri: $scopeURI
      draftData: $draftData
      editData: $editData
      restoreData: $restoreData
      edits: $edits
    ) {
      id
    }
  }
`;

export const CREATE_EDIT_MUTATION = gql`
  mutation CreateEdit(
    $titleId: ID!
    $env: Env!
    $draftId: ID!
    $comment: String
    $editData: EditInput
    $edits: [MultiScopeEditInput]
  ) {
    gvsCreateEdits(
      titleId: $titleId
      env: $env
      draftId: $draftId
      comment: $comment
      editData: $editData
      edits: $edits
    ) {
      id
    }
  }
`;

export const CREATE_CLEAR_POPULATION_MUTATION = gql`
  mutation ClearPopulationEdit(
    $titleId: ID!
    $env: Env!
    $draftId: ID!
    $editData: ClearPopulationInput!
  ) {
    gvsCreateClearPopulationEdit(
      titleId: $titleId
      env: $env
      draftId: $draftId
      editData: $editData
    ) {
      id
    }
  }
`;

export const DELETE_DRAFT_MUTATION = gql`
  mutation DeleteDraft($titleId: ID!, $env: Env!, $draftId: ID!) {
    gvsDeleteDraft(titleId: $titleId, env: $env, draftId: $draftId) {
      ok
    }
  }
`;

export const DELETE_DRAFTS_EDIT_MUTATION = gql`
  mutation DeleteDraftsEdit(
    $titleId: ID!
    $env: Env!
    $draftId: ID!
    $editId: ID!
  ) {
    gvsDeleteDraftsEdit(
      titleId: $titleId
      env: $env
      draftId: $draftId
      editId: $editId
    ) {
      ok
    }
  }
`;

export const RELEASE_DRAFT_MUTATION = gql`
  mutation ReleaseDraft(
    $titleId: ID!
    $env: Env!
    $event: EventInput!
    $notificationSettings: NotificationSettingsInput
  ) {
    gvsReleaseDraft(
      titleId: $titleId
      env: $env
      event: $event
      notificationSettings: $notificationSettings
    ) {
      statusCode
      body
    }
  }
`;

export const PROPAGATE_CONFIGURATION_MUTATION = gql`
  mutation PropagateConfiguration(
    $sourceEnv: PropagateEnvironmentInput!
    $targetEnv: PropagateEnvironmentInput!
    $draftName: String!
    $syncSource: Boolean
    $force: Boolean
  ) {
    gvsPropagateConfiguration(
      sourceEnv: $sourceEnv
      targetEnv: $targetEnv
      draftName: $draftName
      syncSource: $syncSource
      force: $force
    ) {
      id
    }
  }
`;

export const PROPAGATE_DEFINITIONS_MUTATION = gql`
  mutation PropagateDefinition(
    $sourceEnv: PropagateEnvironmentInput!
    $targetEnv: PropagateEnvironmentInput!
    $definitionKeys: [String]!
    $force: Boolean
    $dryRun: Boolean
  ) {
    gvsPropagateDefinition(
      sourceEnv: $sourceEnv
      targetEnv: $targetEnv
      definitionKeys: $definitionKeys
      force: $force
      dryRun: $dryRun
    ) {
      ok
    }
  }
`;
