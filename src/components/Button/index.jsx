import cx from "classnames";
import t from "prop-types";
import React from "react";
import styles from "./Button.module.scss";

function Button({ children, className, variant, ...props }) {
  let buttonStyle;

  switch (variant) {
    case "success":
      buttonStyle = styles.btnSuccess;
      break;
    case "danger":
      buttonStyle = styles.btnDanger;
      break;
    default:
      buttonStyle = "";
  }

  return (
    <button
      data-testid="button"
      className={cx(styles.container, className, buttonStyle)}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: t.node,
  className: t.string,
  variant: t.oneOf(["success", "danger"]),
};

export default Button;
