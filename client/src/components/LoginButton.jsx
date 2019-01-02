/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import themes from "../themes";

const LoginButton = ({ loading }) => (
  <PrimaryButton
    type="submit"
    css={css`
      width: 100%;
    `}
  >
    Join
    {loading && (
      <Spinner
        css={css`
          margin-left: 5px;
          margin-right: calc(-16px);
        `}
        theme={themes.invertedDefault}
        size={SpinnerSize.xSmall}
      />
    )}
  </PrimaryButton>
);

export default LoginButton;
