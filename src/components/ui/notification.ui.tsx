import { FC } from "react";

import { INotification } from "../../models";

export const Notification: FC<INotification> = (props): JSX.Element | null => {
  const { show, children, onClose } = props;

  return show ? (
    <div className="notification is-primary mt-5">
      <button className="delete" onClick={() => onClose()}></button>
      {children}
    </div>
  ) : null;
};
