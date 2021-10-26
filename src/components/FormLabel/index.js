import t from "prop-types";
import React from "react";
import styles from "./FormLabel.module.scss";

function FormLabel({ children }) {
  return <label className={styles.container}>{children}</label>;
}

FormLabel.propTypes = {
  children: t.node,
};

export default FormLabel;
