import { IdeasProvider } from "@aidea/providers/IdeasProvider";
import Home from "@aidea/views/Home";
import Ideas from "@aidea/views/Ideas";
import ProfilePage from "@aidea/views/ProfilePage";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import classnames from "classnames";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";
import brain from "./components/brain.svg";

function App() {
  const { isLoading, error, loginWithRedirect } = useAuth0();
  const Brain = () => (
    <img src={brain} className={styles.brain} alt="brain emoji" />
  );

  useEffect(() => {
    document.title = "Idears";
    return () => {};
  }, []);

  if (isLoading) {
    return <h2 className={styles.loading}>Loading...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <IdeasProvider>
      <Router>
        <div className={styles.container}>
          <header className={styles.header}>
            <Brain />
            <Link to="ideas">Ideas</Link>
            <Button
              variant="outlined"
              color="primary"
              className={styles.loginButton}
              onClick={() => loginWithRedirect()}
            >
              Log In
            </Button>
          </header>
          <main className={classnames(styles.main, "mt-8")}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/ideas" component={Ideas} />
            </Switch>
          </main>
        </div>
      </Router>
    </IdeasProvider>
  );
}

export default App;
