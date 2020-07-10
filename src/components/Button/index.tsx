import React, { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'
import cx from 'classnames'

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string
}

function Button ({ children, className, variant, ...props }: Button) {
  let buttonStyle

  switch (variant) {
    case 'success':
      buttonStyle = styles.btnSuccess
      break
    case 'danger':
      buttonStyle = styles.btnDanger
      break
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
