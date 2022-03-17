import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import constants from "src/constants";
import { ACCOUNT_PATH } from "src/constants/routes";
import Brain from "../../../../components/Brain";
import styles from "./Header.module.scss";

function Header() {
  const { isAuthenticated, loginWithPopup, logout } = useAuth0();

  return (
    <header className={styles.header}>
      <div className={styles.rightNav}>
        <Link to="ideas" className={styles.appName}>
          <Brain size={40} />
          {constants.APP_NAME}
        </Link>
      </div>
      <div className={styles.leftNav}>
        <Link
          to={ACCOUNT_PATH}
          className={classNames(
            styles.link,
            "font-normal",
            "text-slate-700",
            "tracking-wide"
          )}
        >
          Account
        </Link>
        {isAuthenticated ? (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={logout}
          >
            Log Out
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={loginWithPopup}
          >
            Log In
          </Button>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {};

export default Header;
