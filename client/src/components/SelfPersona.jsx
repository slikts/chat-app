/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Panel } from "office-ui-fabric-react/lib/Panel";
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from "office-ui-fabric-react/lib/Persona";
import { compose, withStateHandlers } from "recompose";
import { Fragment } from "react";
import themes from "../themes";
import { separator } from "../styles";
import SelfDetails from "./SelfDetails";
import { withTheme } from "./Theme";
import { withUser } from "./Auth";

const SelfPersona = compose(
  withUser,
  withStateHandlers(
    { panelIsOpen: false },
    {
      panelOpen: () => () => ({ panelIsOpen: true }),
      panelClose: () => () => ({ panelIsOpen: false }),
    }
  ),
  withTheme
)(({ user, panelIsOpen, panelOpen, panelClose }) => (
  <Fragment>
    <Persona
      theme={themes.invertedDefault}
      text={user.name}
      size={PersonaSize.size10}
      presence={user.away ? PersonaPresence.away : PersonaPresence.online}
      onClick={panelOpen}
      css={[
        separator,
        css`
          cursor: pointer;
          .ms-Persona-primaryText {
            font-size: 14px;
          }
          &:hover {
            text-decoration: underline;
          }
          .ms-Persona-details {
            padding-right: 0;
          }
        `,
      ]}
    />
    <Panel
      isOpen={panelIsOpen}
      isLightDismiss
      headerText="User"
      onDismiss={panelClose}
    >
      <SelfDetails />
    </Panel>
  </Fragment>
));

export default SelfPersona;
