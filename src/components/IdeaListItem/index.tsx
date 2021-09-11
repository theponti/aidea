import { useAuth0 } from '@auth0/auth0-react'
import t from 'prop-types'
import React, { useContext, useState } from 'react'
import { actionTypes, addVoteToIdea } from 'src/actions'
import Button from 'src/components/Button'
import ListItem from 'src/components/ListItem'
import { Idea } from 'src/interfaces/Idea'
import { IdeasContext } from 'src/providers/IdeasProvider'
import styles from './IdeaListItem.module.scss'

interface IdeaListItemProps {
  idea: Idea;
}

IdeaListItem.propTypes = {
  ideas: t.arrayOf(
    t.shape({
      _id: t.string,
      title: t.string,
      description: t.string,
      upvotes: t.number,
      downvotes: t.number
    })
  )
}

function IdeaListItem ({
  idea: { id, title, description, upvotes, downvotes, ...idea }
}: IdeaListItemProps) {
  const { dispatch } = useContext(IdeasContext)
  const { user } = useAuth0()
  const [error, setError] = useState(null)

  async function voteOnIdea (_id: string, score: number) {
    dispatch({ type: actionTypes.IDEA_UPDATE })

    try {
      await addVoteToIdea(_id, score)
      dispatch({ type: actionTypes.IDEA_UPDATE_SUCCESS })
    } catch (err) {
      setError(err.message)
      dispatch({ type: actionTypes.IDEA_UPDATE_ERROR, payload: err.message })
    }
  }

  if (!user) {
    return null
  }

  const isUser = idea.user === user.uid
  const hasVoted = user.votes.indexOf(id) !== -1

  return (
    <ListItem>
      <div className={styles.title}>
        <p>{title}</p>
        <div className={styles.votes}>
          <p>upvotes: {upvotes}</p>
          <p>downvotes: {downvotes}</p>
        </div>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.btnContainer}>
        <Button
          aria-label="upvote idea"
          variant="success"
          onClick={() => voteOnIdea(id, 1)}
          disabled={hasVoted || isUser}
        >
          {' '}
          Upvote{' '}
        </Button>
        <Button
          aria-label="downvote idea"
          variant="danger"
          onClick={() => voteOnIdea(id, -1)}
          disabled={hasVoted || isUser}
        >
          {' '}
          Downvote{' '}
        </Button>
      </div>
      {error && <div className="error">{error}</div>}
    </ListItem>
  )
}

export default IdeaListItem
