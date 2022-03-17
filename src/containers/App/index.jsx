import { IdeasProvider } from "@aidea/services/ideas/ideas.provider";
import Home from "@aidea/views/Home";
import Ideas from "@aidea/views/Ideas";
import ProfilePage from "@aidea/views/ProfilePage";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import classnames from "classnames";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";
import brain from "./components/brain.svg";

function App() {
  const { isLoading, error, loginWithRedirect } = useAuth0();

  useEffect(() => {
    document.title = "Aidea";
    return () => {};
  }, []);

  if (isLoading) {
    return (
      <div>
        <CircularProgress size="" />
        <h2 className={styles.loading}>Loading...</h2>
      </div>
    );
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
            <img alt="brain emoji" className={styles.brain} src={brain} />
            <Link to="ideas">Ideas</Link>
            <Button
              variant="contained"
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
