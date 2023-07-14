import styles from "./NavMenuItem.module.css";
import React from "react";

function NavMenuItem({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={styles.menuItem} {...props}>
      {children}
    </div>
  );
}

export default NavMenuItem;
