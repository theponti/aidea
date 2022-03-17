import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import constants from "src/constants";
import { ACCOUNT_PATH } from "src/constants/routes";
import Brain from "../../../../components/Brain";
import styles from "./Header.module.scss";

function MenuItem({ children }) {
  return <div className={styles.menuItem}>{children}</div>;
}

MenuItem.propTypes = {
  children: PropTypes.node,
};

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
        <Link to={ACCOUNT_PATH} className={styles.menuItem}>
          Account
        </Link>
        {isAuthenticated ? (
          <MenuItem onClick={logout}>Log Out</MenuItem>
        ) : (
          <MenuItem onClick={loginWithPopup}>Log In</MenuItem>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {};

export default Header;
