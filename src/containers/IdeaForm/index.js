import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { actionTypes, saveIdea } from 'src/actions'
import Button from 'src/components/Button'
import FormGroup from 'src/components/FormGroup'
import { IdeasContext } from 'src/providers/IdeasProvider'
import styles from './IdeaForm.module.scss'

export default function IdeaForm () {
  const { register, handleSubmit, reset } = useForm()
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
          type="text"
          name="title"
          ref={register}
          placeholder="What's your idea's name?"
        />
      </FormGroup>
      <FormGroup>
        <textarea
          name="description"
          ref={register}
          placeholder="Describe it to us..."
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
