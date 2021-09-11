import React, { useCallback, useContext, useState } from 'react'
import { actionTypes, saveIdea } from 'src/actions'
import Button from 'src/components/Button'
import FormGroup from 'src/components/FormGroup'
import { IdeasContext } from 'src/providers/IdeasProvider'
import styles from './IdeaForm.module.scss'

const useForm = function () {
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')

  const onDescriptionChange = useCallback(e => setDescription(e.target.value), [])
  const onTitleChange = useCallback(e => setTitle(e.target.value), [])

  const reset = useCallback(
    () => {
      setDescription('')
      setTitle('')
    },
    []
  )

  const handleSubmit = useCallback(
    submitFn => {
      submitFn({ title, description })
    },
    [description, title]
  )

  return { description, handleSubmit, onDescriptionChange, onTitleChange, reset, title }
}

export default function IdeaForm () {
  const { description, handleSubmit, onDescriptionChange, onTitleChange, reset, title } = useForm()
  const { dispatch } = useContext(IdeasContext)

  async function onSubmit (idea) {
    // Dispatch event
    dispatch({ type: actionTypes.ADD_IDEA })

    await saveIdea(idea)

    dispatch({ type: actionTypes.LOADED })

    // Clear values from form
    reset()
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
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
  )
}
