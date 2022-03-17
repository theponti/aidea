import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "src/components/Loading";
import constants from "src/constants";
import * as routes from "src/constants/routes";
import { IdeasProvider } from "src/services/ideas/ideas.provider";
import Home from "src/views/Home";
import Ideas from "src/views/Ideas";
import NotFound from "src/views/NotFound/NotFound";
import ProfilePage from "src/views/ProfilePage";
import styles from "./App.module.scss";
import Header from "./components/Header";

const { APP_NAME } = constants;

function App() {
  const { isLoading, error } = useAuth0();

  useEffect(() => {
    document.title = APP_NAME;
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <IdeasProvider>
      <Router>
        <div className={styles.container}>
          <Header />
          <main className={styles.main}>
            {error ? (
              <div className={styles.error}>
                <h2>Error</h2>
                <p>{error.message}</p>
              </div>
            ) : (
              <Switch>
                <Route path={routes.ACCOUNT_PATH} component={ProfilePage} />
                <Route path={routes.IDEAS_PATH} component={Ideas} />
                <Route exact path={routes.LANDING_PATH} component={Home} />
                <Route path={routes.WILDCARD_PATH} component={NotFound} />
              </Switch>
            )}
          </main>
        </div>
      </Router>
    </IdeasProvider>
  );
}

export default App;
