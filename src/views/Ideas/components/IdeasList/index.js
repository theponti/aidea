import React from "react";
import useIdeas from "src/hooks/useIdeas";
import IdeaListItem from "./components/IdeaListItem";
import styles from "./IdeasList.module.scss";

export default function IdeasList() {
  const { ideas, isLoading, error } = useIdeas();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      {ideas.length
        ? ideas.map((idea) => <IdeaListItem key={idea.id} idea={idea} />)
        : null}
    </div>
  );
}
