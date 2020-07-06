import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'

import IdeaListItem from '../IdeaListItem'
import styles from './Ideas.module.scss'

export default function Ideas () {
  const { ideas } = useContext(GlobalContext)

  if (!ideas) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      {ideas.length && ideas.map(idea => <IdeaListItem key={idea._id} idea={idea}/>)}
    </div>
  )
}
