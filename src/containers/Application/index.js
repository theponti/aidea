import { Router } from '@reach/router'
import React, { useContext } from 'react'
import { UserContext } from 'src/providers/UserProvider'
import IdeaForm from '../IdeaForm'
import Ideas from '../Ideas'
import PasswordReset from '../PasswordReset'
import ProfilePage from '../ProfilePage'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import styles from './Application.module.scss'

function IdeasPath () {
  return (
    <>
      <IdeaForm/>
      <Ideas/>
    </>
  )
}

function Application () {
  const { user, authenticated } = useContext(UserContext)

  if (authenticated === false) {
    return (
      <h2 className={styles.loading}>Loading...</h2>
    )
  }

  return (
    user
      ? (
        <Router>
          <ProfilePage path="profile" />
          <IdeasPath default path="/" />
        </Router>
      )
      : (
        <Router>
          <SignIn path="/" default />
          <SignUp path="signUp" />
          <PasswordReset path="passwordReset" />
        </Router>
      )
  )
}

export default Application
