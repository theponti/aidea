import t from 'prop-types'
import React from 'react'
import styles from './Label.module.scss'

export const Label = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

Label.propTypes = {
  children: t.node
}

export default Label
