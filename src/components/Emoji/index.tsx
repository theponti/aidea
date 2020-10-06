import clsx from 'clsx'
import t from 'prop-types'
import React from 'react'
import styles from './Emoji.module.scss'

interface EmojiProps {
  className?: string;
  label: string;
  emoji: string
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
      className={clsx(styles.container, className)}
      aria-label={label}
      {...props}
    >
      {emoji}
    </span>
  )
}

export default Emoji
