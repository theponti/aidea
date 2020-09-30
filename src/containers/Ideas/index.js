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

  return (
    <div className={styles.container}>
      {ideas.length ? ideas.map(idea => <IdeaListItem key={idea.id} idea={idea}/>) : null}
    </div>
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
