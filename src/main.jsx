import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "redux";
import App from "./containers/App";
import { ideasReducer } from "./services/ideas/ideas.ducks";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";
import history from "./utils/history";

const { VITE_AUTH0_CLIENT_ID, VITE_AUTH0_DOMAIN } = import.meta.env;

const store = createStore(ideasReducer);

const onRedirectCallback = (appState) => {
  const returnTo = appState && appState.returnTo;
  history.push(returnTo || window.location.pathname);
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      clientId={VITE_AUTH0_CLIENT_ID}
      domain={VITE_AUTH0_DOMAIN}
      onRedirectCallback={onRedirectCallback}
      redirectUri={window.location.origin}
    >
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();