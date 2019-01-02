/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { getTheme } from "@uifabric/styling";
import CustomScroll from "react-custom-scroll";
import UserList, { Users } from "./UserList";

const UserPanel = () => (
  <CustomScroll heightRelativeToParent="100%">
    <div
      css={css`
        height: 100%;
        position: relative;
        background: ${getTheme().palette.neutralLighterAlt};
        &::after {
          content: " ";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          width: 12px;
          height: 100%;
          background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.03)
          );
        }
        padding: 10px;
      `}
    >
      <h3
        css={css`
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-weight: 600;
        `}
      >
        <Users>{users => `Users (${users && users.length})`}</Users>
      </h3>
      <UserList />
    </div>
  </CustomScroll>
);

export default UserPanel;
