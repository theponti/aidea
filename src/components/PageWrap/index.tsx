import classNames from "classnames";
import { ReactNode } from "react";

type PageWrapProps = {
  className?: string;
  children: ReactNode;
};
function PageWrap({ className, children }: PageWrapProps) {
  return (
    <div
      className={classNames(
        "col-start-2 col-span-10 grid grid-cols-12 grid-rows-[min-content] my-20",
        className && {
          [className]: className,
        }
      )}
    >
      {children}
    </div>
  );
}

export default PageWrap;
