import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import constants from "src/constants";
import brain from "./brain.svg";
import styles from "./Header.module.scss";

function Header({ login }) {
  return (
    <header className={styles.header}>
      <Link to="ideas" className={styles.appName}>
        <img alt="brain emoji" src={brain} />
        {constants.APP_NAME}
      </Link>
      <Button variant="outlined" color="primary" size="small" onClick={login}>
        Log In
      </Button>
    </header>
  );
}

Header.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Header;
