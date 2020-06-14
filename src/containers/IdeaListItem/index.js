import React, { useContext } from 'react'
import styles from './IdeaListItem.module.scss'
import ListItem from '../../components/ListItem'
import { GlobalContext } from 'src/context/GlobalState'
import buttonStyles from '../../styles/button.module.scss'

function IdeaListItem({ idea: { _id, title, description, votes  }}) {
  const { upvoteIdea, downvoteIdea } = useContext(GlobalContext)
  
  return (
    <ListItem key={_id}> 
      <div className={styles.title}>
        <p>{title}</p>
        <p className={styles.votes}>
          Votes: {votes}
        </p>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.btnContainer}>
        <button 
          className={buttonStyles.btnSuccess} 
          onClick={() => upvoteIdea(_id)}> Upvote </button>
        <button 
          className={buttonStyles.btnDanger}
          onClick={() => downvoteIdea(_id)} 
          disabled={votes === 0}> Downvote </button>
      </div>
    </ListItem>
  )
}

export default IdeaListItem
