/** @jsx jsx */
import { Fragment } from "react";
import { Global, css, jsx } from "@emotion/core";
import { ApolloProvider } from "react-apollo";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import "normalize.css";
import "react-custom-scroll/dist/customScroll.css";
import client from "../client";

const Wrapper = ({ children }) => (
  <Fragment>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }
        .ms-Fabric,
        :root,
        body,
        #root {
          height: 100%;
        }
      `}
    />
    <ApolloProvider client={client}>
      <Fabric>{children}</Fabric>
    </ApolloProvider>
  </Fragment>
);

export default Wrapper;
