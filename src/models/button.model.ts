import { CSSProperties } from "react";

export interface IButton {
  title: string;
  style?: CSSProperties;
  isPrimary?: boolean;
  onClick: () => void;
}
