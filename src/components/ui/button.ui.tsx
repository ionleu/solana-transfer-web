import { FC } from "react";

import { IButton } from "../../models";

export const Button: FC<IButton> = (props): JSX.Element => {
  const { title, isLoading, isPrimary = true, style, onClick } = props;

  return (
    <button
      className={`button button-action ${
        isPrimary ? "is-primary" : "is-outline"
      }`}
      style={style}
      onClick={onClick}
      disabled={isLoading}
    >
      {!isLoading ? title : "Is loading..."}
    </button>
  );
};
