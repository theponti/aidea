import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { navigate } from '@reach/router'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import FormGroup from 'src/components/FormGroup'
import { saveIdea } from 'src/providers/Amplify'
import { IdeasContext } from 'src/providers/IdeasProvider'
import { UserContext } from 'src/providers/UserProvider'
import { actionTypes } from 'src/reducers/action-types'
import styles from './IdeaForm.module.scss'

export default function IdeaForm () {
  const { user } = useContext(UserContext)
  const { register, handleSubmit } = useForm()
  const { dispatch } = useContext(IdeasContext)

  async function onSubmit (idea) {
    // Dispatch event
    dispatch({ type: actionTypes.IDEA_UPDATE })

    await saveIdea({ ...idea, userID: user.id })

    dispatch({ type: actionTypes.IDEA_UPDATE_SUCCESS })

    // Clear values from form
    navigate('/ideas')
  }

  return (
    <Card>
      <CardContent>
        <CardHeader>
          Post New Idea
        </CardHeader>
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <input type="text" name="title" ref={register} placeholder="What's your idea's name?"/>
          </FormGroup>
          <FormGroup>
            <textarea name="description" ref={register} placeholder="Describe it to us..."/>
          </FormGroup>
          <FormGroup>
            <Button type="submit" color="primary" variant="contained">
              Submit For Inspection
              <span role="img" aria-label="inspect" className="ml1">🕵️‍♀️</span>
            </Button>
          </FormGroup>
        </form>
      </CardContent>
    </Card>
  )
}
