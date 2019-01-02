/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";
import { ActionButton } from "office-ui-fabric-react/lib/Button";
import clientToken from "../clientToken";
import themes from "../themes";

export const DELETE_USER = gql`
  mutation {
    deleteUser(where: { token: "${clientToken}" }) {
      id
    }
  }
`;

const LogoutButton = props => (
  <Mutation
    mutation={DELETE_USER}
    update={(cache, { data: { deleteUser } }) => {
      cache.data.delete(defaultDataIdFromObject(deleteUser));
    }}
  >
    {deleteUser => (
      <ActionButton
        css={css`
          &:hover .ms-Button-label {
            text-decoration: underline;
          }
        `}
        iconProps={{ iconName: "PlugDisconnected" }}
        theme={themes.invertedDefault}
        onClick={deleteUser}
        {...props}
      >
        Disconnect
      </ActionButton>
    )}
  </Mutation>
);

export default LogoutButton;
