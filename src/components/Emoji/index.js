import React from 'react'
import t from 'prop-types'
import cx from 'classnames'
import styles from './Emoji.module.scss'

interface EmojiProps {
  className?: string;
  label: string;
  emoji: string;
}

Emoji.propTypes = {
  className: t.string,
  label: t.string,
  emoji: t.string
}

function Emoji ({ className = '', label, emoji, ...props }: EmojiProps) {
  return (
    <span
      role="img"
      className={cx(styles.container, className)}
      aria-label={label}
      {...props}
    >
      {emoji}
    </span>
  )
}

export default Emoji
