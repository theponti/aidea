import React from 'react'
import styles from './FormGroup.module.scss'

export function FormGroup ({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default FormGroup
