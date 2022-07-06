import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Brain from "src/components/Brain";
import Button from "src/components/Button";
import constants from "src/constants";
import { ACCOUNT_PATH } from "src/constants/routes";
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
        {isAuthenticated && (
          <Link to={ACCOUNT_PATH} className={styles.menuItem}>
            Account
          </Link>
        )}
        {isAuthenticated ? (
          <MenuItem onClick={logout}>Log Out</MenuItem>
        ) : (
          <Button onClick={loginWithPopup}>Log In</Button>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {};

export default Header;
