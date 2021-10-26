import { useAuth0 } from '@auth0/auth0-react'
import { Router } from '@reach/router'
import React from 'react'
import Home from 'src/views/Home'
import Ideas from 'src/views/Ideas'
import ProfilePage from '../ProfilePage'
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
      <Home default path="/" />
      <ProfilePage path="profile" />
      <Ideas path="ideas" />
    </Router>
  )
}

export default Application
