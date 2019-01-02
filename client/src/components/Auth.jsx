/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { fromRenderProps } from "recompose";
import clientToken from "../clientToken";
import fragments from "../fragments";

export const CURRENT_USER = gql`
  query {
    user(where: { token: "${clientToken}" }) {
      ...UserData
    }
  }
  ${fragments.UserData}
`;

const Auth = ({ children, login }) => (
  <Query query={CURRENT_USER}>
    {({ loading, data }) => {
      if (loading) return <p>Loading</p>;
      const { user } = data;
      if (!user) {
        return login;
      }
      return children;
    }}
  </Query>
);

export const CurrentUser = ({ children }) => (
  <Query query={CURRENT_USER}>
    {({ data: { user } }) => children({ user: user || {} })}
  </Query>
);

export const withUser = fromRenderProps(CurrentUser, ({ user }) => ({ user }));

export default Auth;
