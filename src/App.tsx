import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';
import React, { useEffect } from 'react';
import styles from './App.module.scss';
import brain from './brain.svg';
import Application from './containers/Application';
import { IdeasProvider } from './providers/IdeasProvider';

function App() {
  const { loginWithRedirect } = useAuth0();
  const Brain = () => (
    <img src={brain} className={styles.brain} alt="brain emoji" />
  );

  useEffect(() => {
    document.title = 'Idears';
    return () => {};
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Brain />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </Button>
      </header>
      <main className={classnames(styles.main, 'mt-8')}>
        <IdeasProvider>
          <Application />
        </IdeasProvider>
      </main>
    </div>
  );
}

export default App;
