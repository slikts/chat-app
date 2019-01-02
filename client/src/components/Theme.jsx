/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { fromRenderProps } from "recompose";
import { initializeIcons } from "@uifabric/icons";
import { loadTheme } from "@uifabric/styling";
import themes from "../themes";

initializeIcons();

loadTheme(themes.default);

export const THEME = gql`
  {
    theme @client
  }
`;

const Theme = ({ children }) => (
  <Query query={THEME}>
    {({ data: { theme } }) => children({ theme: themes[theme] })}
  </Query>
);

export const withTheme = fromRenderProps(Theme, ({ theme }) => ({ theme }));

export default Theme;
