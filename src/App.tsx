import React, { useEffect } from 'react';

import { GlobalProvider } from './context/GlobalState'

import IdeaForm from './containers/IdeaForm';
import Ideas from './containers/Ideas';

import brain from './brain.svg';
import styles from './App.module.scss';

function App() {
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
          <GlobalProvider>
            <IdeaForm/>
            <Ideas/>
          </GlobalProvider>
        </main>
      </div>
  );
}

export default App;
