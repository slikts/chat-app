import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { split, ApolloLink } from "apollo-link";
import { withClientState } from "apollo-link-state";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { createNetworkStatusNotifier } from "react-apollo-network-status";
import { persistCache } from "apollo-cache-persist";
import { endpoint } from "../config.json";

const notifier = createNetworkStatusNotifier();
export const { NetworkStatusNotifier } = notifier;

const httpLink = new HttpLink({
  uri: `https://${endpoint}`,
});
const wsLink = new WebSocketLink({
  uri: `wss://${endpoint}`,
  options: {
    reconnect: true,
  },
});
const cache = new InMemoryCache({
  cacheRedirects: {
    Mutation: {
      upsertUser: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: "User", id: args.id }),
    },
  },
});

// persistCache({
//   cache,
//   storage: window.localStorage,
// });

const stateLink = withClientState({
  cache,
  defaults: {
    userSidebarWidth: 200,
    lastUsername: "",
    theme: "default",
  },
  resolvers: {},
});
const link = ApolloLink.from([
  stateLink,
  split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    notifier.link.concat(httpLink)
  ),
]);
const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
});

window.client = client;

export default client;
