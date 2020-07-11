import React, { useContext } from 'react'

import IdeaListItem from 'src/components/IdeaListItem'
import { IdeasContext, IdeasProvider } from 'src/providers/IdeasProvider'
import styles from './Ideas.module.scss'

export default function Ideas () {
  const { state: { ideas } } = useContext(IdeasContext)

  if (!ideas) return <div>Loading...</div>

  return (
    <IdeasProvider>
      <div className={styles.container}>
        {ideas.length ? ideas.map(idea => <IdeaListItem key={idea._id} idea={idea}/>) : null}
      </div>
    </IdeasProvider>
  )
}
