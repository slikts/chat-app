/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createRef } from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { compose, withHandlers, lifecycle, withProps } from "recompose";
import { withUser } from "./Auth";

const alphaNumerical = /^\w$/;

export const CREATE_MESSAGE = gql`
  mutation($from: String!, $data: String!) {
    createEvent(data: { type: MESSAGE, from: $from, data: $data }) {
      id
    }
  }
`;

const MessageInput = compose(
  withUser,
  withProps({
    field: createRef(),
  }),
  withHandlers({
    onSubmit: ({ field, user }) => createMessage => event => {
      event.preventDefault();
      const input = field.current;
      const data = input.value.trim();
      if (!data) {
        return;
      }
      createMessage({ variables: { data, from: user.name } });
      input.setState({ value: "" });
    },
    handleGlobalKeydown: ({ field }) => event => {
      if (
        event.ctrlKey ||
        !alphaNumerical.test(event.key) ||
        document.activeElement !== document.body
      ) {
        return;
      }
      if (!field.current.state.isFocused) {
        field.current.focus();
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      document.addEventListener("keydown", this.props.handleGlobalKeydown);
    },
    componentWillUnmount() {
      document.removeEventListener("keydown", this.props.handleGlobalKeydown);
    },
  })
)(({ onSubmit, field }) => (
  <Mutation mutation={CREATE_MESSAGE}>
    {createMessage => (
      <form onSubmit={onSubmit(createMessage)}>
        <TextField
          componentRef={field}
          placeholder="Send message"
          ariaLabel="Enter text here"
          autoComplete="off"
          autoFocus
        />
      </form>
    )}
  </Mutation>
));

export default MessageInput;
