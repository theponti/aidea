import React from 'react'
import styles from './ListItem.module.scss'

export function ListItem({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default ListItem
