import React, { Component, createContext } from 'react'
import t from 'prop-types'
import { auth, generateUserDocument } from '../context/Firebase'

interface FirebaseUser {
  displayName: string;
  email: string;
  photoUrl: string;
}

export const UserContext = createContext<FirebaseUser | null>(null)

class UserProvider extends Component {
  state = {
    user: null
  };

  static propTypes = {
    children: t.node
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth)
      this.setState({ user })
    })
  };

  render () {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider
