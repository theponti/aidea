import React, { useContext } from 'react'
import t from 'prop-types'
import { useForm } from 'react-hook-form'
import FormGroup from '../../components/FormGroup'
import FormLabel from '../../components/FormLabel'
import { GlobalContext } from '../../context/GlobalState'
import styles from './IdeaForm.module.scss'
import buttonStyles from '../../styles/button.module.scss'

IdeaForm.propTypes = {}

export default function IdeaForm() {
  const { register, handleSubmit } = useForm()
  const { addIdea } = useContext(GlobalContext)

  function onSubmit(record) {
    addIdea({ ...record, votes: 0 })
  }
  
  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <FormLabel>What's your idea's name?</FormLabel>
        <input type="text" name="title" ref={register} />
      </FormGroup>
      <FormGroup>
        <FormLabel>Describe it to us...</FormLabel>
        <textarea name="description" ref={register} />  
      </FormGroup>
      <FormGroup>
        <button type="submit" className={buttonStyles.btnSuccess}> 
          Submit For Inspection 
          <span role="img" aria-label="inspect" className="ml1">🕵️‍♀️</span>
        </button>
      </FormGroup>
    </form>
  )
}