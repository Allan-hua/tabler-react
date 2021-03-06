import * as React from "react";
import cn from "classnames";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

function PageTitle({ className, children }: Props) {
  const classes = cn("page-title", className);
  return <h1 className={classes}>{children}</h1>;
}

PageTitle.displayName = "Page.Title";

export default PageTitle;
