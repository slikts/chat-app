/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from "office-ui-fabric-react/lib/Persona";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";
import { lifecycle, compose } from "recompose";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";
import fragments from "../fragments";

export const ALL_USERS = gql`
  query {
    users(orderBy: name_ASC) {
      ...UserData
    }
  }
  ${fragments.UserData}
`;

export const USER_CHANGED = gql`
  subscription {
    user {
      mutation
      previousValues {
        id
      }
      node {
        ...UserData
      }
    }
  }
  ${fragments.UserData}
`;

const compareNames = ({ name: a }, { name: b }) => a.localeCompare(b);

const Container = compose(
  withApollo,
  lifecycle({
    componentWillMount() {
      this.props.subscribe({
        document: USER_CHANGED,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          let { users } = prev;
          const {
            user: { node, mutation, previousValues },
          } = subscriptionData.data;
          if (mutation === "CREATED") {
            users = prev.users.concat(node).sort(compareNames);
          } else if (mutation === "UPDATED") {
            users = prev.users.map(user => (user.id === node.id ? node : user));
          } else if (mutation === "DELETED") {
            // Workaround for https://github.com/prisma/prisma/issues/2847
            const [, id] = previousValues.id.match(/\((\w+?)\)/);
            this.props.client.cache.data.delete(
              defaultDataIdFromObject({ id, __typename: "User" })
            );
            users = prev.users.filter(user => user.id !== id);
          }
          return { users };
        },
      });
    },
  })
)(({ children }) => children);

const UserList = () => (
  <Query query={ALL_USERS} fetchPolicy="network-only">
    {({ subscribeToMore, loading, error, data }) => {
      if (loading) {
        return "Loading";
      }
      if (error) {
        return error.message;
      }
      if (!data || !data.users) {
        return "";
      }
      return (
        <Container subscribe={subscribeToMore}>
          {data.users.map(({ id, name, away }) => (
            <Persona
              key={id}
              text={name}
              size={PersonaSize.size10}
              presence={away ? PersonaPresence.away : PersonaPresence.online}
            />
          ))}
        </Container>
      );
    }}
  </Query>
);

export const Users = ({ children }) => (
  <Query query={ALL_USERS} fetchPolicy="cache-only">
    {({ data: { users } }) => children(users)}
  </Query>
);

export default UserList;
