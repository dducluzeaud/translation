import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import { Grommet, Box } from "grommet";
import Appbar from "./components/Appbar/Appbar";

import { theme } from "./utils/ui/theme";
import TranslationList from "./pages/TranslationList";
import AddTranslation from "./pages/AddTranslation";

const client = new ApolloClient({
  uri: "http://localhost:5000"
});

const Home: React.FC = () => <p>HOME</p>;

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme} full>
        <Box fill>
          <Appbar />
          <Box justify="center" align="center" fill>
            <Box width="xlarge">
              <Router>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route
                    exact
                    path="/translation/add"
                    component={AddTranslation}
                  />
                  <Route
                    exact
                    path="/translation/:project"
                    component={TranslationList}
                  />
                </Switch>
              </Router>
            </Box>
          </Box>
        </Box>
      </Grommet>
    </ApolloProvider>
  );
};

export default App;
