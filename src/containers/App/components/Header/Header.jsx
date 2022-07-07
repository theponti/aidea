import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { Fragment } from "react";
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

const GetStartedButton = styled(Button)`
  padding: 12px 16px;
  background-color: black;
`;

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
        {isAuthenticated ? (
          <Fragment>
            <Link to={ACCOUNT_PATH} className={styles.menuItem}>
              Account
            </Link>
            <MenuItem onClick={logout}>Log Out</MenuItem>
          </Fragment>
        ) : (
          <Fragment>
            <MenuItem onClick={loginWithPopup}>Log In</MenuItem>
            <GetStartedButton onClick={loginWithPopup}>
              Get Started
            </GetStartedButton>
          </Fragment>
        )}
      </div>
    </header>
  );
}

export default Header;
