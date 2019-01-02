/* eslint-disable no-console */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { createRef } from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "react-apollo/test-utils";
import NameForm from "../src/components/NameForm";
import NameField from "../src/components/NameField";
import LoginForm, {
  LAST_USERNAME,
  LOGIN_USER,
} from "../src/components/LoginForm";
import LoginError from "../src/components/LoginError";
import LoginButton from "../src/components/LoginButton";
import LogoutButton from "../src/components/LogoutButton";
import Auth, { CurrentUser } from "../src/components/Auth";

const mocks = [
  {
    request: {
      query: LAST_USERNAME,
    },
    result: {
      data: {
        lastUsername: "foo",
      },
    },
  },
  {
    request: {
      query: LOGIN_USER,
      variables: { name: "foo" },
    },
    error: new Error("error"),
  },
];

storiesOf("Login", module)
  .add("name field", () => {
    const field = createRef();
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          console.log(field.current);
        }}
      >
        <NameField defaultName="default_name" ref={field} />
      </form>
    );
  })
  .add("name form", () => (
    <NameForm
      defaultName="default_name"
      onValidSubmit={name => {
        console.log({ name });
      }}
    >
      children
    </NameForm>
  ))
  .add("login form", () => (
    <div
      css={css`
        height: 600px;
      `}
    >
      <LoginForm title="Title">{JSON.stringify}</LoginForm>
    </div>
  ))
  .add("login form error", () => {
    setTimeout(() => {
      document.querySelector("button").click();
    }, 100);
    return (
      <div
        css={css`
          height: 600px;
        `}
      >
        <MockedProvider mocks={mocks}>
          <LoginForm title="Title">{JSON.stringify}</LoginForm>
        </MockedProvider>
      </div>
    );
  })
  .add("logout button", () => (
    <div
      css={css`
        background: #000;
      `}
    >
      <LogoutButton>log out</LogoutButton>
    </div>
  ))
  .add("auth", () => <Auth login="not logged in">logged in</Auth>)
  .add("error message", () => (
    <LoginError error={{ message: "Error message" }} />
  ))
  .add("empty error", () => <LoginError />)
  .add("login button", () => <LoginButton />)
  .add("login button loading", () => <LoginButton loading />)
  .add("current user", () => <CurrentUser>{JSON.stringify}</CurrentUser>);
