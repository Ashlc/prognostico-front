import { IToastHook, ToastContext } from "context/toastContext";
import React from "react";

export const useToast = () => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContext must be used within a ToastContextProvider');
  }

  return context as IToastHook;
};