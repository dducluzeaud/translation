import { ApolloProvider } from '@apollo/react-hooks'
import { Grommet } from 'grommet'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Appbar from './components/Appbar/Appbar'
import AddTranslation from './pages/AddTranslation'
import TranslationList from './pages/TranslationList'
import { theme } from './utils/ui/theme'
import { client } from './ApolloClient'
import ExportTranslation from './pages/ExportTranslation'

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme} full>
        <Appbar />
        <Router>
          <Switch>
            <Route path="/" exact component={TranslationList} />
            <Route exact path="/translation/add" component={AddTranslation} />
            <Route exact path="/translations" component={TranslationList} />
            <Route
              exact
              path="/translations/export"
              component={ExportTranslation}
            />
          </Switch>
        </Router>
      </Grommet>
    </ApolloProvider>
  )
}

export default App
