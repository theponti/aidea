import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import IdeaForm from '../containers/IdeaForm'
import IdeasList from '../containers/Ideas'

function Ideas () {
  return (
    <>
      <IdeaForm />
      <IdeasList />
    </>
  )
}

export default withAuthenticationRequired(Ideas)
