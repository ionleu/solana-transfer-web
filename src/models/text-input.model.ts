export interface ITextInput {
  type?: "text" | "number" | "password";
  label?: string;
  classes?: string[];
  placeholder: string;
  value?: string;
  showClear?: boolean;
  onChange: (value: string) => void;
  onClear?: () => void;
}
