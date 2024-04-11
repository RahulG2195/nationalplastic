// notifications.js

import { Bounce, toast } from "react-toastify";

export const notify = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce, // Assuming Bounce is already defined somewhere
  });
};

export const notifyError = (errorMessage) => {
  toast.error(errorMessage, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce, // Assuming Bounce is already defined somewhere
  });
};
