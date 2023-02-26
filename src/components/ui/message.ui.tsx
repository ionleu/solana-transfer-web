import { FC } from "react";

export const Message: FC<{ content: string }> = (props): JSX.Element => {
  const { content } = props;

  return <p style={{ textAlign: "center" }}>{content}</p>;
};
