import React from "react";
import { render } from "react-dom";
import { Global, css } from "@emotion/core";
import { ApolloProvider } from "react-apollo";
import App from "./components/App";
import client from "./client";
import Wrapper from "./components/Wrapper";

render(
  <Wrapper>
    <App />
  </Wrapper>,
  document.querySelector("#root")
);
