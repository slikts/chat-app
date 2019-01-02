/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { formatDistance } from "date-fns";

const UserDetails = ({ user }) => (
  <Fragment>
    <p>{`ID: ${user.id}`}</p>
    <p>
      <time dateTime={user.createdAt}>
        {`Joined ${formatDistance(new Date(user.createdAt), new Date())} ago.`}
      </time>
    </p>
  </Fragment>
);

export default UserDetails;
