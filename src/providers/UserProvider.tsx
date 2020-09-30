import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import t from 'prop-types'
import React, { createContext, useState } from 'react'
import { User } from 'src/interfaces/User'

interface UserContext {
  user?: User | undefined;
  authState?: string;
}

interface AuthData {
  username: string
  attributes: UserAttributes;
}

interface UserAttributes {
  email: string;
  'custom:displayName': string;
}

export const UserContext = createContext<UserContext>({ })

export const UserProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<string>()
  const [user, setUser] = useState<User>()

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState: string, authData) => {
      setAuthState(nextAuthState)

      if (authData) {
        const data = authData as AuthData
        const attributes = data.attributes
        setUser({
          id: data.username,
          email: attributes.email,
          displayName: attributes['custom:displayName']
        } as User)
      } else {
        setUser(undefined)
      }
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
