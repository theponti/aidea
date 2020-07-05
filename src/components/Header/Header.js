import React from 'react'
import t from 'prop-types'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <div className={styles.container}>
      <h1>Expense Tracker</h1>
    </div>
  )
}

export default Header
