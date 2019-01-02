/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";

const usernamePattern = /^[a-z_\-[\]\\^{}|`][a-z0-9_\-[\]\\^{}|`]*$/i;

const NameField = forwardRef(
  ({ defaultName, disabled, maxLength = 16 }, ref) => (
    <TextField
      placeholder="Username"
      name="username"
      defaultValue={defaultName}
      autoCorrect="off"
      disabled={disabled}
      autoCapitalize="off"
      componentRef={ref}
      onGetErrorMessage={async value => {
        if (value && !usernamePattern.test(value)) {
          return "Invalid name";
        }
        if (value.length > maxLength) {
          return `Maximum name length is ${maxLength} characters`;
        }
        return null;
      }}
    />
  )
);

export default NameField;
