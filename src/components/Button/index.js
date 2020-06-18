import React, { Fragment } from 'react'
import styles from './Button.module.scss'
import cx from 'classnames'

function Button({ children, className, ...props }) {
  let buttonStyle

  switch(props.variant) {
    case 'success':
      buttonStyle = styles.btnSuccess
      break;
    case 'danger':
      buttonStyle = styles.btnDanger
      break;
    default:
      buttonStyle = ''
  }

  return (
      <button 
        data-testid="button"
        className={cx(styles.container, className, buttonStyle)} 
        {...props}
      >
        {children}
      </button>
  )
}

export default Button
