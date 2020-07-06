import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import FormGroup from '../../components/FormGroup'
import { GlobalContext } from '../../context/GlobalState'
import styles from './IdeaForm.module.scss'
import Button from 'src/components/Button'

IdeaForm.propTypes = {}

export default function IdeaForm () {
  const { register, handleSubmit, setValue } = useForm()
  const { addIdea } = useContext(GlobalContext)

  function onSubmit (record) {
    // Dispatch event
    addIdea({ ...record })

    // Clear values from form
    setValue('title', '')
    setValue('description', '')
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <input type="text" name="title" ref={register} placeholder="What's your idea's name?"/>
      </FormGroup>
      <FormGroup>
        <textarea name="description" ref={register} placeholder="Describe it to us..."/>
      </FormGroup>
      <FormGroup>
        <Button type="submit" variant="success">
          Submit For Inspection
          <span role="img" aria-label="inspect" className="ml1">🕵️‍♀️</span>
        </Button>
      </FormGroup>
    </form>
  )
}
