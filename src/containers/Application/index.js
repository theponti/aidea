import React, { useContext } from 'react'
import { Router } from '@reach/router'

import SignIn from '../SignIn'
import SignUp from '../SignUp'
import ProfilePage from '../ProfilePage'
import PasswordReset from '../PasswordReset'

import IdeaForm from '../IdeaForm'
import Ideas from '../Ideas'
import { UserContext } from 'src/providers/UserProvider'

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
          <IdeasPath path="/" />
        </Router>
      )
      : (
        <Router>
          <SignIn path="/" />
          <SignUp path="signUp" />
          <PasswordReset path = "passwordReset" />
        </Router>
      )
  )
}
export default Application
