import { ToastOptions } from "react-toastify";

export const TOAST_OPTIONS: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const NOTIFICATION_TYPES = {
  ERROR: "error",
  SUCCESS: "success",
};
