import { ApolloProvider } from '@apollo/react-hooks'
import { Box, Grommet } from 'grommet'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Appbar from './components/Appbar/Appbar'
import AddTranslation from './pages/AddTranslation'
import TranslationList from './pages/TranslationList'
import { theme } from './utils/ui/theme'
import { client } from './ApolloClient'

const Home: React.FC = () => <p>HOME</p>

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme} full>
        <Appbar />
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route exact path="/translation/add" component={AddTranslation} />
            <Route exact path="/translations" component={TranslationList} />
          </Switch>
        </Router>
      </Grommet>
    </ApolloProvider>
  )
}

export default App
