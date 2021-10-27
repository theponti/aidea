import { actionTypes, addVoteToIdea } from "@aidea/actions";
import Button from "@aidea/components/Button";
import ListItem from "@aidea/components/ListItem";
import { IdeasContext } from "@aidea/providers/IdeasProvider";
import { useAuth0 } from "@auth0/auth0-react";
import t from "prop-types";
import React, { useContext, useState } from "react";
import styles from "./IdeaListItem.module.scss";

IdeaListItem.propTypes = {
  idea: t.shape({
    id: t.string.isRequired,
    title: t.string.isRequired,
    description: t.string.isRequired,
    upvotes: t.number.isRequired,
    downvotes: t.number.isRequired,
  }),
};

function IdeaListItem({
  idea: { id, title, description, upvotes, downvotes, ...idea },
}) {
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

export default IdeaListItem;
