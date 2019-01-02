/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { compose, lifecycle } from "recompose";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import UserPanel from "./UserPanel";
import EventList from "./EventList";
import MessageInput from "./MessageInput";
import RoomHeader from "./RoomHeader";
import { withTheme } from "./Theme";
import { NetworkStatusNotifier } from "../client";
import { getErrorMessage } from "../util";
import clientToken from "../clientToken";

const PING = gql`
mutation($now: DateTime!) {
  updateUser(where: { token: "${clientToken}" }, data: { lastPing: $now}) {
    id
    lastPing
  }
}
`;
const Room = compose(
  withTheme,
  graphql(PING, {
    props: ({ mutate }) => ({
      ping: mutate,
    }),
  }),
  lifecycle({
    componentDidMount() {
      this.pingInterval = setInterval(() => {
        this.props.ping({
          variables: {
            now: new Date(),
          },
        });
      }, 45e3);
    },
    componentWillUnmount() {
      clearInterval(this.pingInterval);
    },
  })
)(({ title = "Chat App", theme }) => (
  <div
    css={css`
      display: grid;
      --sidebar: 200px;
      grid-template-columns: calc(100% - var(--sidebar)) var(--sidebar);
      height: 100%;
      --footer: 32px;
      --status: 24px;
      --header: 50px;
      grid-template-rows:
        var(--header)
        calc(100% - (var(--header) + var(--footer) + var(--status)))
        var(--footer)
        var(--status);
    `}
  >
    <RoomHeader title={title} />
    <main
      css={css`
        grid-area: 2 / 1;
      `}
    >
      <EventList last={0} />
    </main>
    <MessageInput
      css={css`
        grid-area: 3 / 1;
      `}
    />
    <aside
      css={css`
        grid-row: 2 / -2;
        grid-column: 2;
        border-bottom: 1px solid #c3c3c3;
      `}
    >
      <UserPanel />
    </aside>
    <footer
      css={css`
        grid-area: 4 / 1 / 4 / 3;
        line-height: var(--status);
        padding-left: 10px;
        font-size: 12px;
        background: ${theme.palette.neutralLighterAlt};
      `}
    >
      <NetworkStatusNotifier
        render={({ loading, error }) => {
          if (loading) {
            return "Fetching…";
          }
          if (error) {
            return getErrorMessage(error);
          }
          return "Connected";
        }}
      />
    </footer>
  </div>
));

export default Room;
