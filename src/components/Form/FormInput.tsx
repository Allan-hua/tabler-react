import * as React from "react";
import Icon from "../Icon";
import cn from "classnames";
import FormGroup from "./FormGroup";

import {
  FormEvents,
  MouseEvents,
  PointerEvents,
  FocusEvents,
  KeyboardEvents,
  ClipboardEvents,
} from "../../";

interface FormStyle {
  className?: string;
  icon?: string;
  position?: "append" | "prepend";
  valid?: boolean;
  tick?: boolean;
  invalid?: boolean;
  cross?: boolean;
  feedback?: string;
  error?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string | number;
  min?: string | number;
  max?: string | number;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  checked?: boolean;
}

export interface Props
  extends FormStyle,
    FormEvents,
    MouseEvents,
    PointerEvents,
    FocusEvents,
    KeyboardEvents,
    ClipboardEvents {
  placeholder?: string;
  type?: "checkbox" | "radio" | "text" | "email" | "password" | "number";
  value?: string | number;
  /**
   * Wraps the input in Form.Group and adds a label
   */
  label?: string;
  autoComplete?: "on" | "off";
}

/**
 * A an input field
 */
function FormInput(props: Props) {
  const {
    className,
    name,
    icon,
    position = "prepend",
    valid,
    tick,
    invalid,
    cross,
    error,
    placeholder,
    value,
    min,
    max,
    minLength,
    maxLength,
    checked,
    onChange,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    onKeyPress,
    onKeyUp,
    onKeyDown,
    onCopy,
    onCut,
    onPaste,
    disabled,
    readOnly,
    autoFocus,
    required,
    label,
    autoComplete,
  } = props;
  const type = props.type || "text";

  const classes = cn(
    {
      "form-control": type !== "checkbox" && type !== "radio",
      "custom-control-input": type === "checkbox" || type === "radio",
      "is-valid": valid,
      "state-valid": tick,
      "is-invalid": invalid || !!error,
      "state-invalid": cross || !!error,
    },
    className
  );

  const feedback = error || props.feedback;

  const allInputProps = {
    name,
    className: classes,
    type,
    placeholder,
    value,
    min,
    max,
    minLength,
    maxLength,
    disabled,
    readOnly,
    autoFocus,
    required,
    onChange,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    onKeyPress,
    onKeyUp,
    onKeyDown,
    onCopy,
    onCut,
    onPaste,
    autoComplete,
  };

  const contents = !icon ? (
    <React.Fragment>
      {type === "checkbox" || type === "radio" ? (
        <input {...allInputProps} checked={checked} />
      ) : (
        <input {...allInputProps} />
      )}
      {feedback && <span className="invalid-feedback">{feedback}</span>}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="input-icon">
        {position === "prepend" && (
          <span className="input-icon-addon">
            <Icon name={icon} />
          </span>
        )}
        <input {...allInputProps} />
        {position === "append" && (
          <span className="input-icon-addon">
            <Icon name={icon} />
          </span>
        )}
      </div>
      {feedback && <span className="invalid-feedback">{feedback}</span>}
    </React.Fragment>
  );

  return label ? <FormGroup label={label}>{contents}</FormGroup> : contents;
}

FormInput.displayName = "Form.Input";

/** @component */
export default FormInput;
