/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { createRef } from "react";
import { withHandlers } from "recompose";
import NameField from "./NameField";

const NameForm = withHandlers({
  onSubmit: ({ onValidSubmit }) => field => event => {
    event.preventDefault();
    const { state } = field.current;
    const name = state.value.trim();
    if (state.errorMessage || !name) {
      return;
    }
    onValidSubmit(name);
  },
})(({ onSubmit, defaultName, children, disabled }) => {
  const field = createRef();
  return (
    <form onSubmit={onSubmit(field)}>
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <NameField disabled={disabled} ref={field} defaultName={defaultName} />
      </div>
      {children}
    </form>
  );
});

export default NameForm;
