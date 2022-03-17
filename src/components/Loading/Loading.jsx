import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import Brain from "../Brain";
import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div className={styles.loading}>
      <Brain size={164} />
      <h3 className={styles.loadingText}>Loading...</h3>
      <LinearProgress className={styles.linearProgress} />
    </div>
  );
}

export default Loading;
