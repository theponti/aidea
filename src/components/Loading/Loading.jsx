import LinearProgress from "@material-ui/core/LinearProgress";
import React from "react";
import Brain from "../Brain";
import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div className={styles.loading}>
      <Brain size={64} />
      <h3>Loading...</h3>
      <LinearProgress className={styles.linearProgress} />
    </div>
  );
}

export default Loading;
