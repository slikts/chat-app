/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import {
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react/lib/MessageBar";

const normalizeErrorMessage = message => {
  if (/name = name/.test(message)) {
    return "Username is taken, please choose another.";
  }
  return message;
};

const LoginError = ({ error }) => {
  if (!error) {
    return "";
  }
  return (
    <MessageBar
      css={css`
        max-width: 90vw;
        width: auto;
      `}
      messageBarType={MessageBarType.error}
      isMultiline={false}
    >
      {normalizeErrorMessage(error.message)}
    </MessageBar>
  );
};

export default LoginError;
