import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ThumbUp from '@material-ui/icons/ThumbUp'
import t from 'prop-types'
import React, { useContext, useState } from 'react'
import ListItem from 'src/components/ListItem'
import { Idea } from 'src/interfaces/Idea'
import { addVote } from 'src/providers/Amplify'
import { IdeasContext } from 'src/providers/IdeasProvider'
import { UserContext } from 'src/providers/UserProvider'
import { actionTypes } from 'src/reducers/action-types'
import styles from './IdeaListItem.module.scss'


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

const useStyles = makeStyles({
  voteButton: {
    width: '1rem',
    marginRight: '0.5rem'
  }
})

function IdeaListItem ({ idea: { id, title, description, upvotes, downvotes, ...idea } }: IdeaListItemProps) {
  const { dispatch } = useContext(IdeasContext)
  const { user } = useContext(UserContext)
  const [error, setError] = useState(null)
  const classes  = useStyles()

  if (!user) return null

  async function voteOnIdea (_id: string, score: number) {
    dispatch({ type: actionTypes.IDEA_UPDATE })

    try {
      await addVote(_id, user?.id, score)
      dispatch({ type: actionTypes.IDEA_UPDATE_SUCCESS })
    } catch (err) {
      setError(err.message)
      dispatch({ type: actionTypes.IDEA_UPDATE_ERROR, payload: err.message })
    }
  }

  const isUser = idea.user === user.id
  const hasVoted = user && user.votes && user.votes.indexOf(id) !== -1

  return (
    <ListItem>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.btnContainer}>
        <Button
          aria-label="upvote idea"
          color="primary"
          variant="contained"
          onClick={() => voteOnIdea(id, 1)}
          disabled={hasVoted || isUser}
        > 
          <ThumbUp className={classes.voteButton}/> Upvote 
        </Button>
        <Button
          aria-label="downvote idea"
          color="secondary"
          variant="contained"
          onClick={() => voteOnIdea(id, -1)}
          disabled={hasVoted || isUser}> 
          <ThumbDown className={classes.voteButton}/> Downvote 
        </Button>
      </div>
      {error && <div className="error">{error}</div>}
    </ListItem>
  )
}

export default IdeaListItem
