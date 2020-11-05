import React from 'react';
import styles from './FormLabel.module.scss';

function FormLabel({ children }) {
  return <label className={styles.container}>{children}</label>;
}

export default FormLabel;
