import React, { useContext } from 'react'
import t from 'prop-types'

import styles from './IdeaListItem.module.scss'

import Button from 'src/components/Button'
import ListItem from 'src/components/ListItem'

import { Idea } from 'src/interfaces/Idea'
import { UserContext } from 'src/providers/UserProvider'
import { IdeasContext } from 'src/providers/IdeasProvider'
import { actionTypes } from 'src/reducers/action-types'

interface IdeaListItemProps {
  idea: Idea
}

IdeaListItem.propTypes = {
  ideas: t.arrayOf(t.shape({
    _id: t.string,
    title: t.string,
    description: t.string,
    upvotes: t.number,
    downvotes: t.number
  }))
}

function IdeaListItem ({ idea: { _id, title, description, upvotes, downvotes, ...idea } }: IdeaListItemProps) {
  const { dispatch } = useContext(IdeasContext)
  const { user } = useContext(UserContext)

  if (!user) return null

  const isUser = idea.user === user.uid
  const hasVoted = (
    user.votes &&
    user.votes.indexOf(_id) !== -1
  )

  return (
    <ListItem key={_id}>
      <div className={styles.title}>
        <p>{title}</p>
        <div className={styles.votes}>
          <p>
            upvotes: {upvotes}
          </p>
          <p>
            downvotes: {downvotes}
          </p>
        </div>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.btnContainer}>
        <Button
          aria-label="upvote idea"
          variant="success"
          onClick={() => dispatch({ type: actionTypes.UPVOTE_IDEA, payload: _id })}
          disabled={hasVoted || isUser}
        > Upvote </Button>
        <Button
          aria-label="downvote idea"
          variant="danger"
          onClick={() => dispatch({ type: actionTypes.DOWNVOTE_IDEA, payload: _id })}
          disabled={hasVoted || isUser}> Downvote </Button>
      </div>
    </ListItem>
  )
}

export default IdeaListItem
