import { useAuth0 } from "@auth0/auth0-react";
import t from "prop-types";
import React, { useContext, useState } from "react";
import Button from "src/components/Button";
import ListItem from "src/components/ListItem";
import { actionTypes, addVoteToIdea } from "src/services/ideas/ideas.ducks";
import { IdeasContext } from "src/services/ideas/ideas.provider";
import styles from "./IdeaListItem.module.scss";

function IdeaListItem({ idea }) {
  const { id, title, description, upvotes, downvotes } = idea;
  const { dispatch } = useContext(IdeasContext);
  const { user } = useAuth0();
  const [error, setError] = useState(null);

  async function voteOnIdea(_id, score) {
    dispatch({ type: actionTypes.IDEA_UPDATE });

    try {
      await addVoteToIdea(_id, score);
      dispatch({ type: actionTypes.IDEA_UPDATE_SUCCESS });
    } catch (err) {
      setError(err.message);
      dispatch({ type: actionTypes.IDEA_UPDATE_ERROR, payload: err.message });
    }
  }

  if (!user) {
    return null;
  }

  const isUser = idea.user === user.uid;
  const hasVoted = user.votes.indexOf(id) !== -1;

  return (
    <ListItem>
      <div className={styles.title}>
        <p>{title}</p>
        <div className={styles.votes}>
          <p>upvotes: {upvotes}</p>
          <p>downvotes: {downvotes}</p>
        </div>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.btnContainer}>
        <Button
          aria-label="upvote idea"
          variant="success"
          onClick={() => voteOnIdea(id, 1)}
          disabled={hasVoted || isUser}
        >
          {" "}
          Upvote{" "}
        </Button>
        <Button
          aria-label="downvote idea"
          variant="danger"
          onClick={() => voteOnIdea(id, -1)}
          disabled={hasVoted || isUser}
        >
          {" "}
          Downvote{" "}
        </Button>
      </div>
      {error && <div className="error">{error}</div>}
    </ListItem>
  );
}

IdeaListItem.propTypes = {
  idea: t.shape({
    description: t.string.isRequired,
    downvotes: t.number.isRequired,
    id: t.string.isRequired,
    title: t.string.isRequired,
    upvotes: t.number.isRequired,
    user: t.string.isRequired,
  }),
};

export default IdeaListItem;
