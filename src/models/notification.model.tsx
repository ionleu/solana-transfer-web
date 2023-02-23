import React from "react";

export interface INotification {
  show: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}
