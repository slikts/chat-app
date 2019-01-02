/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { compose } from "recompose";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react/lib/MessageBar";
import UserDetails from "./UserDetails";
import NameForm from "./NameForm";
import { withUser } from "./Auth";
import clientToken from "../clientToken";
import fragments from "../fragments";
import LoginError from "./LoginError";

export const UPDATE_SELF = gql`
  mutation($data: UserUpdateInput!) {
    updateUser(where: { token: "${clientToken}" }, data: $data) {
      ...UserData
    }
  }
  ${fragments.UserData}
`;

const SelfDetails = compose(withUser)(({ user }) => (
  <Fragment>
    <UserDetails user={user} />
    <Mutation mutation={UPDATE_SELF}>
      {updateSelf => (
        <Toggle
          label="Away"
          onText="On"
          offText="Off"
          checked={user.away}
          onChange={(_, away) => {
            updateSelf({ variables: { data: { away } } });
          }}
        />
      )}
    </Mutation>
    <Mutation
      mutation={UPDATE_SELF}
      update={(
        cache,
        {
          data: {
            updateUser: { name },
          },
        }
      ) => {
        cache.writeData({
          data: {
            lastName: name,
          },
        });
      }}
    >
      {(updateSelf, { loading, error, data }) => (
        <Fragment>
          <NameForm
            disabled={loading}
            defaultName={user.name}
            onValidSubmit={name => {
              updateSelf({ variables: { data: { name } } });
            }}
          >
            <DefaultButton disabled={loading} type="submit">
              Rename
            </DefaultButton>
            <div
              css={css`
                margin-top: 10px;
              `}
            >
              <LoginError error={error} />
              {data && (
                <MessageBar
                  messageBarType={MessageBarType.success}
                  isMultiline={false}
                >
                  Name changed.
                </MessageBar>
              )}
            </div>
          </NameForm>
        </Fragment>
      )}
    </Mutation>
  </Fragment>
));

export default SelfDetails;
