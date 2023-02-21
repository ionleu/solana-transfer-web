import { ITextInput } from "../../models";

export const TextInput = ({
  type = "text",
  label,
  classes,
  placeholder,
  onChange,
}: ITextInput) => {
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
