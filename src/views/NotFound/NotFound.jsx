import classnames from "classnames";
import React from "react";
import styles from "./NotFound.module.scss";
import notFound from "./not_found.webp";

function NotFound() {
  return (
    <div className={classnames(styles.wrap, "text-lg", "font-medium")}>
      <img src={notFound} />
      <h1>You lost, buddy?</h1>
    </div>
  );
}

export default NotFound;
