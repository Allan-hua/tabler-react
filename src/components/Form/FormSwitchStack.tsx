import * as React from "react";
import cn from "classnames";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

function FormToggleStack({ className, children }: Props) {
  const classes = cn("custom-switches-stacked", className);
  return <div className={classes}>{children}</div>;
}

FormToggleStack.displayName = "Form.ToggleStack";

export default FormToggleStack;
