# GraphQL

In the front-end Apollo-client seems to be the way to go. It is very flexible and its two major features are the caching layer and React support (with HOC and React query and mutation elements).

## Querying

As `apollo-react` provides a Query component we just need to wrap the components with it, this way we have access to the query result object.

```javascript
const ALL_PROJECTS_QUERY = gql`
  {
    allProjects {
      id
      name
    }
  }
`;

const ProjectListContainer = (
  <Query query={ALL_PROJECTS_QUERY}>
    {({ error, loading, data }) => {
      if (error) return <div>Error loading project list</div>;
      if (loading) return <div>Loading...</div>;

      return (
        <ProjectListPresentational
          {...this.props}
          projects={data.allProjects}
        />
      );
    }}
  </Query>
);
```

There's a core component that handles loading and error cases automatically (providing the option to retry on error):

```javascript
const ProjectListContainer = (
  <HandledQuery query={ALL_PROJECTS_QUERY} component={ProjectListPresentational}>
    {({ data }) => {
      return <ProjectListPresentational {...this.props} projects={data.allProjects} />;
    }}
  </Query>
);
```

## Resources

- https://www.howtographql.com
- https://www.howtographql.com/react-apollo/0-introduction/
- https://www.apollographql.com/docs/react/essentials/queries.html
- https://www.apollographql.com/docs/react/essentials/mutations.html
