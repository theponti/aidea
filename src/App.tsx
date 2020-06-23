import React, { useEffect } from 'react';

import { GlobalProvider } from './context/GlobalState'

import IdeaForm from './containers/IdeaForm';
import Ideas from './containers/Ideas';
import Emoji from './components/Emoji';

import styles from './App.module.scss';

function App() {
  useEffect(() => {
    document.title = 'Idears'
    return () => {}
  }, [])
  
  return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Emoji className={styles.brain} label="brain" emoji="🧠" />
          <h1 style={{ marginLeft: '3rem' }}>Idearz</h1>
          <Emoji className={styles.brain} label="brain" emoji="🧠" />
        </header>
        <main className={styles.main}>
          <GlobalProvider>
            <IdeaForm/>
            <Ideas/>
          </GlobalProvider>
        </main>
      </div>
  );
}

export default App;
