/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { Label } from "office-ui-fabric-react/lib/Label";
import { withApollo } from "react-apollo";
import { compose, withHandlers } from "recompose";
import { Fragment } from "react";
import { loadTheme } from "office-ui-fabric-react";
import themes from "../themes";
import { withTheme } from "./Theme";

const ThemeToggle = compose(
  withApollo,
  withHandlers({
    onChange: ({ client }) => (_, checked) => {
      const theme = checked ? "dark" : "default";
      client.writeData({ data: { theme } });
      loadTheme(themes[theme]);
    },
  }),
  withTheme
)(({ onChange, theme }) => (
  <Fragment>
    <Toggle
      css={css`
        margin: -0.5ch 1.5ch 0 0;
      `}
      onChange={onChange}
      theme={themes.invertedDefault}
      checked={theme === themes.dark}
      id="darkMode"
    />
    <Label
      css={css`
        padding: 0;
      `}
      htmlFor="darkMode"
      theme={themes.invertedDefault}
    >
      Dark Mode
    </Label>
  </Fragment>
));

export default ThemeToggle;
