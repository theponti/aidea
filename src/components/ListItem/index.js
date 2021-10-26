import t from "prop-types";
import React from "react";
import styles from "./ListItem.module.scss";

export function ListItem({ children }) {
  return <div className={styles.container}>{children}</div>;
}

ListItem.propTypes = {
  children: t.node,
};

export default ListItem;
