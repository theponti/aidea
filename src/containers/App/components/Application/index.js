import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from 'src/views/Home'
import Ideas from 'src/views/Ideas'
import ProfilePage from 'src/views/ProfilePage'
import styles from './Application.module.scss'

function Application () {
  const { isLoading, error } = useAuth0()

  if (isLoading) {
    return <h2 className={styles.loading}>Loading...</h2>
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/ideas" component={Ideas} />
      </Switch>
    </Router>
  )
}

export default Application
