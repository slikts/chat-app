/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import NameForm from "./NameForm";
import clientToken from "../clientToken";
import LoginButton from "./LoginButton";
import LoginError from "./LoginError";
import fragments from "../fragments";
import { CURRENT_USER } from "./Auth";
import "./Theme";

export const LAST_USERNAME = gql`
  {
    lastUsername @client
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($name: String!) {
    upsertUser(
      where: { token: "${clientToken}" }
      update: { name: $name }
      create: { name: $name, token: "${clientToken}" }
    ) {
      ...UserData
    }
  }
  ${fragments.UserData}
`;

const LoginForm = ({ title }) => (
  <Query query={LAST_USERNAME}>
    {({ data: { lastUsername } }) => (
      <Mutation
        mutation={LOGIN_USER}
        update={(cache, { data: { upsertUser } }) => {
          cache.writeQuery({
            query: CURRENT_USER,
            data: { user: upsertUser },
          });
          cache.writeQuery({
            query: LAST_USERNAME,
            data: {
              lastUsername: upsertUser.name,
            },
          });
        }}
      >
        {(upsertUser, { loading, error }) => (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              height: 100%;
            `}
          >
            <div
              css={css`
                width: 100%;
                position: relative;
              `}
            >
              <div
                css={css`
                  max-width: 30ch;
                  position: relative;
                  margin: auto;
                `}
              >
                <h1
                  css={css`
                    font-weight: 600;
                    font-size: 18px;
                  `}
                >
                  {title}
                </h1>
                <NameForm
                  onValidSubmit={name => {
                    upsertUser({ variables: { name } });
                  }}
                  defaultName={lastUsername}
                >
                  <LoginButton loading={loading} />
                </NameForm>
              </div>
              <div
                css={css`
                  position: absolute;
                  top: calc(100% + 10px);
                  width: 100%;
                  display: flex;
                  justify-content: center;
                `}
              >
                <LoginError error={error} />
              </div>
            </div>
          </div>
        )}
      </Mutation>
    )}
  </Query>
);

export default LoginForm;
