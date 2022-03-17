import t from "prop-types";
import React from "react";
import styles from "./FormGroup.module.scss";

function FormGroup({ children }) {
  return <div className={styles.container}>{children}</div>;
}

FormGroup.propTypes = {
  children: t.node,
};

export default FormGroup;
