import React, { useContext, useEffect } from 'react'
import IdeaListItem from 'src/components/IdeaListItem'
import { getIdeas } from 'src/context/Firebase'
import { IdeasContext } from 'src/providers/IdeasProvider'
import { actionTypes } from 'src/reducers/action-types'
import styles from './Ideas.module.scss'

export default function Ideas () {
  const { state: { ideas }, dispatch } = useContext(IdeasContext)

  useEffect(() => {
    async function fetchData () {
      dispatch({ type: actionTypes.FETCH_IDEAS })

      try {
        const ideas = await getIdeas()
        dispatch({ type: actionTypes.FETCH_SUCCESS, payload: ideas })
      } catch (error) {
        dispatch({ type: actionTypes.FETCH_ERROR, error: error.message })
      }
    }

    fetchData()
  }, [dispatch])

  if (!ideas) return <div>Loading...</div>

  return (
    // <IdeasProvider>
    <div className={styles.container}>
      {ideas.length ? ideas.map(idea => <IdeaListItem key={idea.id} idea={idea}/>) : null}
    </div>
    // </IdeasProvider>
  )
}
