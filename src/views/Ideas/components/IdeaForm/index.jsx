import React, { useContext } from "react";
import Button from "src/components/Button";
import FormGroup from "src/components/FormGroup";
import { IdeasContext } from "src/services/ideas/ideas.provider";
import { userPropType } from "src/utils/commonPropTypes";
import { useAddIdea } from "./components/useAddIdea";
import styles from "./IdeaForm.module.scss";

function IdeaForm({ user }) {
  const { dispatch } = useContext(IdeasContext);
  const { description, onSubmit, onDescriptionChange, onTitleChange, title } =
    useAddIdea({ dispatch, user });

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <FormGroup>
        <input
          name="title"
          onChange={onTitleChange}
          placeholder="What's your idea's name?"
          type="text"
          value={title}
        />
      </FormGroup>
      <FormGroup>
        <textarea
          name="description"
          onChange={onDescriptionChange}
          placeholder="Describe it to us..."
          value={description}
        />
      </FormGroup>
      <FormGroup>
        <Button type="submit" variant="success">
          Submit For Inspection
          <span role="img" aria-label="inspect" className="ml1">
            🕵️‍♀️
          </span>
        </Button>
      </FormGroup>
    </form>
  );
}

IdeaForm.propTypes = {
  user: userPropType,
};

export default IdeaForm;
