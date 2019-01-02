import React from "react";
import { render } from "react-dom";
import { Global, css } from "@emotion/core";
import { ApolloProvider } from "react-apollo";
import App from "./components/App";
import client from "./client";

render(
  <React.Fragment>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }
        :root,
        body,
        #root {
          height: 100%;
        }
      `}
    />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.Fragment>,
  document.querySelector("#root")
);
