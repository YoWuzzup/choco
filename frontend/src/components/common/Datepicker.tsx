"use client";
import Datepicker, {
  DateValueType,
  DatepickerType,
} from "react-tailwindcss-datepicker";

type DatepickingProps = {
  value: DateValueType;
  handleChange: (
    value: DateValueType,
    e?: HTMLInputElement | null | undefined
  ) => void;
} & Partial<DatepickerType>;

export const Datepicking: React.FC<DatepickingProps> = ({
  value,
  handleChange,
  ...props
}) => {
  return (
    <div className="w-full h-full">
      <Datepicker value={value} onChange={handleChange} {...props} /> dsa
    </div>
  );
};
