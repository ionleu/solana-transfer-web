import { FC } from "react";

import { IButton } from "../../models";

export const Button: FC<IButton> = ({
  title,
  isPrimary = true,
  style,
  onClick,
}) => {
  return (
    <button
      className={`button button-action ${
        isPrimary ? "is-primary" : "is-outline"
      }`}
      style={style}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
