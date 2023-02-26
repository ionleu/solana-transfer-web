import { toast } from "react-toastify";

import { TOAST_OPTIONS } from "../constants";

/**
 * @name emitNotification
 * @description
 * Dispaly a toast message notification
 *
 * @param type - A toast notification type
 * @param {string} msg - A toast notification message to display
 */
export const emitNotification = (type: "error" | "success", msg: string) => {
  toast[type](`STH: ${msg}`, TOAST_OPTIONS);
};
