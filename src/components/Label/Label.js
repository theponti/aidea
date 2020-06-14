import React from 'react'
import t from 'prop-types'
import styles from './Label.module.scss'

export const Label = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default Label