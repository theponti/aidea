import React from 'react'
import { Router } from '@reach/router'

import SignIn from '../SignIn'
import SignUp from '../SignUp'
import ProfilePage from '../ProfilePage'
import PasswordReset from '../PasswordReset'

import IdeaForm from '../IdeaForm'
import Ideas from '../Ideas'

function Application () {
  const user = null
  return (
    user
      ? (
        <>
          <ProfilePage />
          <IdeaForm/>
          <Ideas/>
        </>
      )
      : (
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>
      )

  )
}
export default Application
