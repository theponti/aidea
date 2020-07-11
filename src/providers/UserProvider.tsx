import React, { Component, createContext } from 'react'
import t from 'prop-types'
import { auth, generateUserDocument } from 'src/context/Firebase'
import { FirebaseUser } from 'src/interfaces/User'

interface UserContext {
  user: FirebaseUser | null;
  authenticated: boolean;
}

export const UserContext = createContext<UserContext>({ user: null, authenticated: false })

class UserProvider extends Component {
  state = {
    user: null,
    authenticated: false
  };

  static propTypes = {
    children: t.node
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth)
      this.setState({ user, authenticated: true })
    })
  };

  render () {
    return (
      <UserContext.Provider value={{
        authenticated: this.state.authenticated,
        user: this.state.user
      }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider
