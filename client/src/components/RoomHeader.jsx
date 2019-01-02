/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import themes from "../themes";
import { separator } from "../styles";
import { withTheme } from "./Theme";
import LogoutButton from "./LogoutButton";
import SelfPersona from "./SelfPersona";
import ThemeToggle from "./ThemeToggle";

const RoomHeader = withTheme(({ theme, title }) => (
  <header
    css={css`
      font-size: ${theme.fonts.large.fontSize};
      background: ${theme.palette.themePrimary};
      color: ${themes.invertedDefault.palette.black};
      display: flex;
      justify-content: space-between;
      grid-area: 1 / 1 / 1 / 3;
    `}
  >
    <p
      role="heading"
      css={css`
        margin: 0 0 0 10px;
        line-height: var(--header);
        align-self: flex-start;
      `}
    >
      {title}
    </p>
    <div
      css={css`
        align-self: flex-end;
        height: 100%;
        display: flex;
        align-items: center;
        padding-right: 10px;
      `}
    >
      <div
        css={[
          css`
            display: flex;
            align-items: center;
          `,
          separator,
        ]}
      >
        <ThemeToggle />
      </div>
      <SelfPersona />
      <LogoutButton />
    </div>
  </header>
));

export default RoomHeader;
