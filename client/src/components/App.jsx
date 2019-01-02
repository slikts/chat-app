/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Query } from "react-apollo";
import { compose, lifecycle } from "recompose";
// import { loadTheme } from "office-ui-fabric-react";
import Room from "./Room";
import LoginForm from "./LoginForm";
import { CURRENT_USER } from "./Auth";
import { withTheme } from "./Theme";
// import themes from "../themes";

const App = compose(
  withTheme,
  lifecycle({
    componentWillMount() {
      // loadTheme(this.props.theme);
    },
  })
)(({ title }) => (
  <Query query={CURRENT_USER}>
    {({ loading, data }) => {
      if (loading) return <p>Loading</p>;
      const { user } = data;
      if (!user) {
        return (
          <LoginForm title={title}>
            {userData => (
              <div>
                <p>logged in</p>
                {JSON.stringify(userData)}
              </div>
            )}
          </LoginForm>
        );
      }
      return <Room />;
    }}
  </Query>
));

export default App;
