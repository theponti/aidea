import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import IdeaForm from "./components/IdeaForm";
import IdeasList from "./components/IdeasList";
import styles from "./Ideas.module.scss";

function Ideas() {
  const { user } = useAuth0();
  console.log({ user });
  return (
    <div className={styles.wrap}>
      <IdeaForm user={user} />
      <IdeasList user={user} />
    </div>
  );
}

export default Ideas;
