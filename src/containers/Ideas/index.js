import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { navigate } from '@reach/router'
import React from 'react'
import IdeaListItem from 'src/components/IdeaListItem'
import useIdeas from 'src/hooks/useIdeas'
import { IdeasProvider } from 'src/providers/IdeasProvider'
import { appStates } from 'src/reducers/action-types'
import styles from './Ideas.module.scss'

export function Ideas () {
  const { ideas, status, error } = useIdeas()

  if (status === appStates.LOADING) return <div>Loading...</div>

  if (status === appStates.ERROR) return <div>Error... {error}</div>

  function onCreateIdeaClick () {
    navigate('ideas/create')
  }
  return (
    <Grid container justify="center" direction="column" className={styles.container}>
      <Grid item style={{ marginBottom: '1rem' }}>
        <Button color="primary" variant="contained" onClick={onCreateIdeaClick}>
          Post New Idea
        </Button>
      </Grid>
      <Grid item>
        {ideas.length ? ideas.map(idea => <IdeaListItem key={idea.id} idea={idea}/>) : null}
      </Grid>
    </Grid>
  )
}

function IdeasContainer () {
  return (
    <IdeasProvider>
      <Ideas/>
    </IdeasProvider>
  )
}

export default IdeasContainer
