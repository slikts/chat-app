/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import UserPanel from "../src/components/UserPanel";
import UserList from "../src/components/UserList";

storiesOf("UserPanel", module) //
  .add("lists users", () => <UserList />)
  .add("panel", () => <UserPanel />);
