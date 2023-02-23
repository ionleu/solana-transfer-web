import { CSSProperties } from "react";

export interface IButton {
  title: string;
  style?: CSSProperties;
  isLoading: boolean;
  isPrimary?: boolean;
  onClick: () => void;
}
