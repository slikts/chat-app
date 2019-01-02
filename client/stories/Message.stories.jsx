/* eslint-disable no-console */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "react-apollo/test-utils";
import EventList, {
  LAST_EVENTS,
  EVENT_CREATED,
} from "../src/components/EventList";
import Event from "../src/components/Event";
import MessageInput from "../src/components/MessageInput";

const message = {
  id: "abc",
  type: "MESSAGE",
  from: "foo",
  data: "lorem ipsum dolor sit amet",
  createdAt: "2019-01-01T12:28:49.774Z",
  __typename: "Event",
};

const randomMessages = length =>
  Array.from({ length }, (_, i) => ({
    id: `random${i}`,
    type: "MESSAGE",
    from: String(Math.random()),
    data: "lorem ipsum dolor sit amet",
    createdAt: "2019-01-01T12:28:49.774Z",
    __typename: "Event",
  }));

const last = 100;

const mocks = (messages = []) => [
  {
    request: {
      query: EVENT_CREATED,
    },
    result: {
      data: {
        event: {
          __typename: "EventSubscriptionPayload",
          node: {
            id: "abc3",
            type: "MESSAGE",
            from: "user",
            data: "subscription message",
            createdAt: "2019-01-01T15:29:49.774Z",
            __typename: "Event",
          },
        },
      },
    },
  },
  {
    request: {
      query: LAST_EVENTS,
      variables: { last },
    },
    result: {
      data: {
        events: [
          ...messages,
          message,
          {
            id: "abc2",
            type: "MESSAGE",
            from: "bar",
            data: "lorem ipsum",
            createdAt: "2019-01-01T15:29:49.774Z",
            __typename: "Event",
          },
          {
            id: "abc5",
            type: "MESSAGE",
            from: "bar",
            data:
              "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2019-01-01T15:39:49.774Z",
            __typename: "Event",
          },
        ],
      },
    },
  },
];

storiesOf("Message", module)
  .add("message", () => <Event {...message} />)
  .add("join", () => <Event {...message} type="JOIN" />)
  .add("event list", () => (
    <MockedProvider mocks={mocks()}>
      <div
        css={css`
          height: 600px;
        `}
      >
        <EventList last={last} />
      </div>
    </MockedProvider>
  ))
  .add("long event list", () => (
    <MockedProvider mocks={mocks(randomMessages(100))}>
      <div
        css={css`
          height: 600px;
        `}
      >
        <EventList last={last} />
      </div>
    </MockedProvider>
  ))
  .add("input", () => (
    <div>
      <MessageInput self={{ name: "foofoo" }} userData={[]} />
      <input type="text" />
    </div>
  ))
  .add("live event list", () => (
    <div
      css={css`
        height: 600px;
      `}
    >
      <EventList last={last} />
    </div>
  ));
