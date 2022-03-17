import React from "react";
import t from "prop-types";
import cx from "classnames";
import styles from "./Emoji.module.scss";

function Emoji({ className = "", label, emoji, ...props }) {
  return (
    <span
      role="img"
      className={cx(styles.container, className)}
      aria-label={label}
      {...props}
    >
      {emoji}
    </span>
  );
}

Emoji.propTypes = {
  className: t.string,
  label: t.string,
  emoji: t.string,
};

export default Emoji;
