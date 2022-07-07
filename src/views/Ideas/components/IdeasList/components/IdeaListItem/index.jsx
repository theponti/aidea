import { useAuth0 } from "@auth0/auth0-react";
import ThumbUp from "@mui/icons-material/ThumbUpAltRounded";
import { useCallback } from "react";
import Button from "src/components/Button";
import ListItem from "src/components/ListItem";
import { useVoteOnIdea } from "src/services/ideas/ideas.hooks";
import { ideaPropType } from "src/utils/commonPropTypes";
import styles from "./IdeaListItem.module.scss";

function IdeaListItem({ idea }) {
  const { user } = useAuth0();
  const { error, vote } = useVoteOnIdea();
  const { id, title, description, upvotes, downvotes } = idea;

  const onDownvoteClick = useCallback(() => vote(id, -1), []);
  const onUpvoteClick = useCallback(() => vote(id, 1), []);

  if (!user) {
    return null;
  }

  const isUser = idea.user === user.uid;
  const hasVoted = user.votes.indexOf(id) !== -1;

  return (
    <ListItem>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.btnContainer}>
        <Button
          aria-label="upvote idea"
          variant="success"
          onClick={onUpvoteClick}
          disabled={hasVoted || isUser}
        >
          <ThumbUp />
          Upvote {upvotes}
        </Button>
        <Button
          aria-label="downvote idea"
          variant="danger"
          onClick={onDownvoteClick}
          disabled={hasVoted || isUser}
        >
          Downvote {downvotes}
        </Button>
      </div>
      {error && <div className="error">{error}</div>}
    </ListItem>
  );
}

IdeaListItem.propTypes = {
  idea: ideaPropType,
};

export default IdeaListItem;
