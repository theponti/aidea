import React from 'react'
import t from 'prop-types'

import ListItem from '../ListItem'
import styles from './List.module.scss'

List.propTypes = {
  data: t.arrayOf(
    t.shape({
      description: t.string
    })
  )
}
export function List ({ data }) {
  return (
    <div className={styles.container}>
      {data.map((item) => (
        <ListItem key={item._id} item={item} />
      ))}
    </div>
  )
}

export default List
