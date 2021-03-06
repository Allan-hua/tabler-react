import * as React from "react";
import cn from "classnames";
import FormInput from "./FormInput";

import { FormEvents, FocusEvents } from "../../types";

export interface Props extends FormEvents, FocusEvents {
  className?: string;
  /**
   * Wrap the checkbox with a label
   */
  label?: string;
  value?: string | number;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  isInline?: boolean;
}

function FormCheckbox({
  className,
  label,
  value,
  name,
  checked,
  disabled,
  readOnly,
  onChange,
  onFocus,
  onBlur,
  isInline,
}: Props) {
  const classes = cn(
    "custom-control custom-checkbox",
    { "custom-control-inline": isInline },
    className
  );
  const inputComponent = (
    <FormInput
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      className={classes}
      disabled={disabled}
      readOnly={readOnly}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );

  return label ? (
    <label className={classes}>
      {inputComponent}
      <span className="custom-control-label">{label}</span>
    </label>
  ) : (
    inputComponent
  );
}

FormCheckbox.displayName = "Form.Checkbox";

/** @component */
export default FormCheckbox;
