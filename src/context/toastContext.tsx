import { Toast } from 'primereact/toast';
import React, { ReactNode, createContext, useRef } from 'react';

interface IToastParams {
  severity: 'success' | 'info' | 'warn' | 'error' | undefined;
  summary: string;
  detail: string;
}

interface IContentToastParams {
  severity: 'success' | 'info' | 'warn' | 'error' | undefined;
  content: ReactNode;
}

export interface IToastHook {
  showToast: (params: IToastParams) => void;
  showContentToast: (params: IContentToastParams) => void;
}

export const ToastContext = createContext({});

function ToastContextProvider({ children }: {children: ReactNode}) {
  const toast = useRef<Toast>(null);

  const showToast = ({ severity, summary, detail } : IToastParams) => {
    if (toast.current) {
      toast.current.show({
        severity, summary, detail, life: 3000,
      });
    }
  };

  const showContentToast = ({ severity, content }: IContentToastParams) => {
    if (toast.current) {
      toast.current.show({
        severity, content, life: 3000,
      });
    }
  };

  const contextValue = React.useMemo(() => ({
    showToast,
    showContentToast,
  }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
}

export default ToastContextProvider;
