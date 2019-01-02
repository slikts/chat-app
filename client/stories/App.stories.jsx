/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import App from "../src/components/App";
import RoomHeader from "../src/components/RoomHeader";
import SelfDetails from "../src/components/SelfDetails";

storiesOf("App", module)
  .add("main", () => (
    <div
      css={css`
        height: 600px;
      `}
    >
      <App title="Chat App" />
    </div>
  ))
  .add("room header", () => <RoomHeader title="Foo" />)
  .add("self details", () => <SelfDetails />);
