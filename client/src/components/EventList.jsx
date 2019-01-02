/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import CustomScroll from "react-custom-scroll";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { lifecycle, compose } from "recompose";
import Event from "./Event";
import fragments from "../fragments";
import { withTheme } from "./Theme";

export const LAST_EVENTS = gql`
  query LastEvents($last: Int!) {
    events(last: $last) {
      ...EventData
    }
  }
  ${fragments.EventData}
`;

export const EVENT_CREATED = gql`
  subscription {
    event(where: { mutation_in: [CREATED] }) {
      node {
        ...EventData
      }
    }
  }
  ${fragments.EventData}
`;

const Container = compose(
  lifecycle({
    componentWillMount() {
      this.props.subscribe({
        document: EVENT_CREATED,
        updateQuery: ({ events }, { subscriptionData }) => ({
          events: events.concat(subscriptionData.data.event.node),
        }),
      });
    },
  }),
  withTheme
)(({ children, theme }) => {
  console.log(theme);
  return (
    <CustomScroll
      heightRelativeToParent="100%"
      keepAtBottom
      ref={this.scroller}
      scrollTo={9999}
    >
      <div
        role="list"
        css={css`
          background: ${theme.palette.white};
          padding: 10px;
          min-height: 100%;
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
          border-right: 1px solid ${theme.semanticColors.inputBorder};
        `}
      >
        {children}
      </div>
    </CustomScroll>
  );
});

const EventList = ({ last }) => (
  <Query query={LAST_EVENTS} variables={{ last }} fetchPolicy="network-only">
    {({ subscribeToMore, data, loading, error }) => {
      if (loading) {
        return "Loading";
      }
      if (error) {
        return error.message;
      }
      return (
        <Container subscribe={subscribeToMore}>
          {data.events.map(event => (
            <Event key={event.id} {...event} />
          ))}
        </Container>
      );
    }}
  </Query>
);

export default EventList;
