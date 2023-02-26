import { FC } from "react";

import { IModal } from "../../models";

export const Modal: FC<IModal> = (props): JSX.Element => {
  const { show, title, children, onClose } = props;

  return (
    <div className={`modal ${show && "is-active"}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">{children}</section>
      </div>
    </div>
  );
};
