import React from "react";
import IdeaForm from "./components/IdeaForm";
import IdeasList from "./components/IdeasList";
import styles from "./Ideas.module.scss";

function Ideas() {
  return (
    <div className={styles.wrap}>
      <IdeaForm />
      <IdeasList />
    </div>
  );
}

export default Ideas;
