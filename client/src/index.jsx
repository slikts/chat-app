import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import Wrapper from "./components/Wrapper";

render(
  <Wrapper>
    <App />
  </Wrapper>,
  document.querySelector("#root")
);
