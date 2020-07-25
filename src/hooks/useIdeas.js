import { useContext, useEffect } from 'react'
import { getIdeas } from 'src/context/Firebase'
import { IdeasContext } from 'src/providers/IdeasProvider'
import { actionTypes } from 'src/reducers/action-types'

export default function useIdeas () {
  const { state: { ideas, error, status }, dispatch } = useContext(IdeasContext)

  useEffect(() => {
    async function fetchData () {
      dispatch({ type: actionTypes.FETCH_IDEAS })

      try {
        const ideas = await getIdeas()
        dispatch({ type: actionTypes.FETCH_IDEAS_SUCCESS, payload: ideas })
      } catch (error) {
        dispatch({ type: actionTypes.FETCH_IDEAS_ERROR, error: error.message })
      }
    }

    fetchData()
  }, [dispatch])

  return { status, ideas, error }
}
