import { FC } from "react";

import { ITextInput } from "../../models";

export const TextInput: FC<ITextInput> = (props): JSX.Element => {
  const {
    type = "text",
    label,
    classes,
    placeholder,
    value,
    showClear,
    onChange,
    onClear,
  } = props;

  return (
    <div className={`control ${classes?.join(" ")}`}>
      <label>{label}</label>

      <div className="input-wrap">
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          value={value || ""}
          onChange={($event) => onChange($event.target.value)}
        />
        {showClear && value?.trim() && (
          <button
            className="delete"
            aria-label="close"
            onClick={onClear}
          ></button>
        )}
      </div>
    </div>
  );
};
