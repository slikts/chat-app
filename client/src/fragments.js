import gql from "graphql-tag";

export default {
  UserData: gql`
    fragment UserData on User {
      id
      name
      createdAt
      away
    }
  `,
  EventData: gql`
    fragment EventData on Event {
      id
      createdAt
      type
      from
      data
    }
  `,
};
