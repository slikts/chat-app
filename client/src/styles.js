/* eslint-disable import/prefer-default-export */
import { css } from "@emotion/core";

export const offscreen = css`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

export const separator = css`
  position: relative;
  --margin: 15px;
  margin-right: calc(var(--margin) * 2);
  &::before {
    content: "";
    right: calc(var(--margin) * -1 - 2px);
    background: #fff;
    height: 20px;
    width: 1px;
    position: absolute;
    top: 50%;
    margin-top: -10px;
    opacity: 0.3;
  }
`;
