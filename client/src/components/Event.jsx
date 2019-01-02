/** @jsx jsx */
import { format } from "date-fns";
import { jsx, css } from "@emotion/core";
import Gist from "react-gist";
import Linkify from "linkifyjs/react";
import { find } from "linkifyjs";
import { getTheme } from "@uifabric/styling";
import { nameToColor, selectElement } from "../util";

const hidden = css`
  display: inline-block;
  text-indent: -2000em;
`;

const linkOptions = {
  attributes: {
    rel: "noopener noreferrer",
  },
};

const selectText = e => {
  if (e.detail === 3) {
    e.preventDefault();
    selectElement(e.target);
  }
};

const Event = ({ id, type, from, data, createdAt }) => {
  const [link] = find(data);
  const time = new Date(createdAt);
  const theme = getTheme();
  const [, gistId] =
    (link && link.value.match(/https?:\/\/gist.github.com\/.*\/(\w+)/)) || [];
  return (
    <div
      role="listitem"
      className=""
      key={id}
      css={css`
        --offset: 9ch;
        margin: 0.25ch 0;
        margin-left: var(--offset);
        text-indent: calc(var(--offset) * -1);
        overflow-wrap: break-word;
      `}
    >
      <h2
        css={css`
          display: inline;
          font-size: 1rem;
          font-weight: normal;
          --margin: 0.5ch;
          margin-right: var(--margin);
        `}
      >
        <time
          css={css`
            display: inline-block;
            width: calc(var(--margin) + 5ch);
            text-indent: 0;
            font-size: 11px;
            opacity: 0.75;
          `}
          dateTime={time.getTime()}
        >
          {format(time, "HH:mm")}
          &nbsp;
        </time>
        {type === "MESSAGE" ? (
          ""
        ) : (
          <span
            css={css`
              background: ${theme.palette.black};
              color: ${theme.palette.white};
              font-size: 11px;
              padding: 1px 3px;
              border-radius: 3px;
              margin-right: var(--margin);
            `}
          >
            {type}
          </span>
        )}
        <span
          css={css`
            font-weight: 600;
            color: ${nameToColor(from)};
          `}
        >
          {from}
        </span>
        <span css={hidden}>:&nbsp;</span>
      </h2>
      <span role="presentation" onMouseDown={selectText}>
        <Linkify options={linkOptions}>{data}</Linkify>
        {gistId && <Gist id={gistId} />}
      </span>
    </div>
  );
};

export default Event;
