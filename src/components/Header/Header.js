import React from 'react';
import t from 'prop-types';
import styles from './Header.module.scss';

export const Header = ({ children }) => {
  return (
    <div className={styles.container}>
      <h1>{children}</h1>
    </div>
  );
};

Header.propTypes = {
  children: t.node,
};

export default Header;
