import { FC } from "react";

import { ITextInput } from "../../models";

export const TextInput: FC<ITextInput> = (props): JSX.Element => {
  const { type = "text", label, classes, placeholder, value, onChange } = props;

  return (
    <div className={`control ${classes?.join(" ")}`}>
      <label>{label}</label>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={($event) => onChange($event.target.value)}
      />
    </div>
  );
};
