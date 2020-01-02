import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

const Router: React.FC = ({ children }) => (
  <BrowserRouter>
    <Switch>
      <Route path='/'>
        {children}
      </Route>
    </Switch>
  </BrowserRouter>
)