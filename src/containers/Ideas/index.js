import React from 'react'
import IdeaListItem from 'src/components/IdeaListItem'
import useIdeas from 'src/hooks/useIdeas'
import styles from './Ideas.module.scss'

export default function Ideas () {
  const { ideas, isLoading, error } = useIdeas()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className={styles.container}>
      {ideas.length
        ? ideas.map((idea) => <IdeaListItem key={idea.id} idea={idea} />)
        : null}
    </div>
  )
}
