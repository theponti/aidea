import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import t from 'prop-types'
import React, { createContext, useState } from 'react'
import { User } from 'src/interfaces/User'

interface UserContext {
  user?: User | undefined;
  authState?: string;
}

export const UserContext = createContext<UserContext>({ })

export const UserProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<string>()
  const [user, setUser] = useState<User>()

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData as User)
    })
  }, [])

  return (
    <UserContext.Provider value={{ authState, user }}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: t.node
}

export default UserProvider
