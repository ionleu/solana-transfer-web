export interface ITextInput {
  type?: "text" | "number" | "password";
  label: string;
  classes?: string[];
  placeholder: string;
  value: number | string;
  onChange: (value: string) => void;
}
