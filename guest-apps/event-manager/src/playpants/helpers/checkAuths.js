export default (
  statuses = {},
  currentUserID,
  { authorizations, authorizers }
) => {
  if (statuses.show_authorization) {
    const hasUserResponded = authorizations.find(
      auth => auth.user.id === currentUserID
    );
    const isAuthorizer = authorizers.find(
      authorizer => authorizer.id === currentUserID
    );
    return !hasUserResponded && isAuthorizer;
  }
  return statuses.show_authorization;
};
