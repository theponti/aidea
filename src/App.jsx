import Amplify from 'aws-amplify'
import clsx from 'clsx'
import React from 'react'
import styles from './App.module.scss'
import awsExports from './aws-exports'
import SideDrawer from './components/SideDrawer'
import Application from './containers/Application'
import UserProvider from './providers/UserProvider'

Amplify.configure(awsExports)

function App () {
  return (
    <UserProvider>
      <div className={styles.container}>
        <SideDrawer/>
        <main className={clsx(styles.main)}>
          <Application/>
        </main>
      </div>
    </UserProvider>
  )
}

export default App
