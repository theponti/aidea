import cx from "classnames";
import { ReactNode } from "react";

function PageWrap({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cx("container mx-auto flex-col pt-14 px-4", {
        [className || ""]: className,
      })}
    >
      {children}
    </div>
  );
}

export default PageWrap;
