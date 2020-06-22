import React, { useEffect } from 'react';

import { GlobalProvider } from './context/GlobalState';
import { FirebaseProvider } from './context/Firebase';

import IdeaForm from './containers/IdeaForm';
import Ideas from './containers/Ideas';
import { GlobalProvider } from './context/GlobalState';

import styles from './App.module.scss';
  return (
    <span 
      role="img" 
      className={styles.brain}
      aria-label="brain">🧠</span>
  )
}

function App() {
  useEffect(() => {
    document.title = 'Idears ??'
    return () => {}
  }, [])
  
  return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Brain />
          <h1 style={{ marginLeft: '3rem' }}>Idearz</h1>
          <Brain/>
        </header>
        <main className={styles.main}>
          <FirebaseProvider>
            <GlobalProvider>
              <IdeaForm/>
              <Ideas/>
            </GlobalProvider>
          </FirebaseProvider>
        </main>
      </div>
  );
}

export default App;
