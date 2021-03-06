import * as React from "react";
import cn from "classnames";
import Grid from "../Grid";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

function FormColorCheck({ className, children }: Props) {
  const classes = cn("gutters-xs", className);
  return <Grid.Row className={classes}>{children}</Grid.Row>;
}

FormColorCheck.displayName = "Form.ColorCheck";

export default FormColorCheck;
