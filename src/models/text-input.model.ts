export interface ITextInput {
  type?: "text" | "number" | "password";
  label: string;
  classes?: string[];
  placeholder: string;
  onChange: (value: string) => void;
}
