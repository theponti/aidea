import Amplify from 'aws-amplify'
import classnames from 'classnames'
import React from 'react'
import styles from './App.module.scss'
import awsExports from './aws-exports'
import brain from './brain.svg'
import Application from './containers/Application'
import UserProvider from './providers/UserProvider'

Amplify.configure(awsExports)

function App () {
  const Brain = () => (
    <img src={brain} className={styles.brain} alt="brain emoji"/>
  )

  return (
    <UserProvider>
      <div className={styles.container}>
        <header className={styles.header}>
          <Brain />
        </header>
        <main className={classnames(styles.main, 'mt-8')}>
          <Application/>
        </main>
      </div>
    </UserProvider>
  )
}

export default App
