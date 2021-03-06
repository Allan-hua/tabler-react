import * as React from "react";
import FormSelect from "./FormSelect";
import FormInputGroup from "./FormInputGroup";

interface Props {
  children?: React.ReactNode;
  className?: string;
  defaultDate: Date;
  minYear: number;
  maxYear: number;
  format: string;
  monthLabels: Array<string>;
  onChange?: (date: Date) => void;
}

interface State {
  currentDate: Date;
}

type ChangeTypes = "mm" | "yyyy" | "dd";

type DateComponents = { [Key in ChangeTypes]: React.ReactNode };

class FormDatePicker extends React.PureComponent<Props, State> {
  static defaultProps = {
    monthLabels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    minYear: 1897,
    maxYear: new Date().getFullYear(),
    format: "mm/dd/yyyy",
    defaultDate: new Date(),
  };

  state = {
    currentDate: this.props.defaultDate,
  };

  // Handle date changes
  _handleOnChange = (type: ChangeTypes, value: number): void => {
    const { currentDate } = this.state;
    const { onChange } = this.props;
    const newDate: Date = new Date(currentDate);

    // Change month
    if (type === "mm") {
      newDate.setMonth(value);
    }

    // Change day
    if (type === "dd") {
      newDate.setDate(value);
    }

    if (type === "yyyy") {
      newDate.setFullYear(value);
    }

    this.setState({ currentDate: newDate }, () => {
      onChange && onChange(this.state.currentDate);
    });
  };

  // Creates an array with numeric values from start to end
  _range = (start: number, end: number): Array<number> =>
    Array.from({ length: end + 1 - start }, (v, k) => k + start);

  // Renders the months select
  _renderMonths = () => {
    const { currentDate } = this.state;
    const { monthLabels } = this.props;

    const onChangeMonths = (e: React.ChangeEvent<HTMLInputElement>): void =>
      this._handleOnChange("mm", Number(e.target.value));

    return (
      <FormSelect onChange={onChangeMonths}>
        {monthLabels.map((name, index) => (
          <option
            key={index}
            value={index}
            selected={currentDate.getUTCMonth() === index}
          >
            {name}
          </option>
        ))}
      </FormSelect>
    );
  };

  // Renders the days select
  _renderDays = () => {
    const { currentDate } = this.state;
    const currentMonthDays = new Date(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth() + 1,
      0
    ).getDate();
    const daysRange = this._range(1, currentMonthDays);
    const currentDay = currentDate.getUTCDate();

    const onChangeDays = (e: React.ChangeEvent<HTMLInputElement>) =>
      this._handleOnChange("dd", Number(e.target.value));

    return (
      <FormSelect onChange={onChangeDays}>
        {daysRange.map(day => (
          <option key={day} value={day} selected={currentDay === day}>
            {day}
          </option>
        ))}
      </FormSelect>
    );
  };

  // renderes the years select
  _renderYears = () => {
    const { minYear, maxYear } = this.props;
    const { currentDate } = this.state;
    const yearsRange = this._range(minYear, maxYear).reverse();
    const currentYear = currentDate.getUTCFullYear();

    const onChangeYears = (e: React.ChangeEvent<HTMLInputElement>) =>
      this._handleOnChange("yyyy", Number(e.target.value));

    return (
      <FormSelect onChange={onChangeYears}>
        {yearsRange.map(year => (
          <option key={year} value={year} selected={currentYear === year}>
            {year}
          </option>
        ))}
      </FormSelect>
    );
  };

  render() {
    const { format, className } = this.props;
    const formatSplit = format.split("/");
    const dateComponents: DateComponents = {
      mm: this._renderMonths(),
      dd: this._renderDays(),
      yyyy: this._renderYears(),
    };

    return (
      <div className={className}>
        <FormInputGroup>
          {formatSplit.map(
            (type: string): React.ReactNode =>
              dateComponents[type as ChangeTypes]
          )}
        </FormInputGroup>
      </div>
    );
  }
}

(FormDatePicker as any).displayName = "Form.DatePicker";

export default FormDatePicker;
