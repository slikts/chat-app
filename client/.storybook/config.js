import React from "react";
import { configure, addDecorator } from "@storybook/react";
import Wrapper from "../src/components/Wrapper";

const req = require.context("../stories", true, /.stories.jsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
// const { initializeIcons } = require("@uifabric/icons");
// const defaultTheme = require("../src/themes/default").default;
// const { loadTheme } = require("office-ui-fabric-react");

// loadTheme(defaultTheme);
// let icons = false;
// if (!icons) {
//   initializeIcons();
// }
// icons = true;

export default class FrameFix extends React.Component {
  constructor() {
    super();
    if (window.parent !== window) {
      // eslint-disable-next-line no-underscore-dangle
      window.parent.__APOLLO_CLIENT__ = window.__APOLLO_CLIENT__;
    }
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

addDecorator(story => (
  <Wrapper>
    <FrameFix>{story()}</FrameFix>
  </Wrapper>
));

configure(loadStories, module);
