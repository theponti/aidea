import React, { useContext } from 'react'
import styles from './IdeaListItem.module.scss'
import ListItem from '../../components/ListItem'
import { GlobalContext } from 'src/context/GlobalState'
import Button from 'src/components/Button'

function IdeaListItem({ idea: { _id, title, description, votes, ...idea  }}) {
  const { upvoteIdea, downvoteIdea, user } = useContext(GlobalContext)
  const isUser = user && idea.user === user._id
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
        <Button
          aria-label="upvote idea"
          variant="success"
          onClick={() => upvoteIdea(_id)}
          disabled={isUser}
          > Upvote </Button>
        <Button 
          aria-label="downvote idea"
          variant="danger"
          onClick={() => downvoteIdea(_id)} 
          disabled={isUser || votes === 0}> Downvote </Button>
      </div>
    </ListItem>
  )
}

export default IdeaListItem
