import React, { useEffect } from 'react'

import { IdeasProvider } from './providers/IdeasProvider'

import brain from './brain.svg'
import styles from './App.module.scss'
import Application from './containers/Application'
import UserProvider from './providers/UserProvider'

function App () {
  const Brain = () => (
    <img src={brain} className={styles.brain} alt="brain emoji"/>
  )

  useEffect(() => {
    document.title = 'Idears'
    return () => {}
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Brain />
        <h1>Idearz</h1>
        <Brain />
      </header>
      <main className={styles.main}>
        <IdeasProvider>
          <UserProvider>
            <Application/>
          </UserProvider>
        </IdeasProvider>
      </main>
    </div>
  )
}

export default App
