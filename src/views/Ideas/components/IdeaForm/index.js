import Button from "@aidea/components/Button";
import FormGroup from "@aidea/components/FormGroup";
import { IdeasContext } from "@aidea/providers/IdeasProvider";
import React, { useContext } from "react";
import { useAddIdea } from "./components/useAddIdea";
import styles from "./IdeaForm.module.scss";

function IdeaForm() {
  const { dispatch } = useContext(IdeasContext);
  const { description, onSubmit, onDescriptionChange, onTitleChange, title } =
    useAddIdea({ dispatch });

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

export default IdeaForm;
