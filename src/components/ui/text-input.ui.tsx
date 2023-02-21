import { FC } from "react";

import { ITextInput } from "../../models";

export const TextInput: FC<ITextInput> = ({
  type = "text",
  label,
  classes,
  placeholder,
  onChange,
}) => {
  return (
    <div className={`control ${classes?.join(" ")}`}>
      <label>{label}</label>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        onChange={($event) => onChange($event.target.value)}
      />
    </div>
  );
};
