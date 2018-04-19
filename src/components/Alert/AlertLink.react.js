// @flow

import * as React from "react";
import cn from "classnames";

type Props = {|
  +children?: React.Node,
  +className?: string,
  +href?: string,
|};

function AlertLink({ children, className, href }: Props): React.Node {
  const classes = cn(`alert-link`, className);
  return (
    <a className={classes} href={href}>
      {children}
    </a>
  );
}

export default AlertLink;
