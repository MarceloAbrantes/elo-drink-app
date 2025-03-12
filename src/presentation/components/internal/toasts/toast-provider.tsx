import { TOAST_REMOVE_DELAY_IN_MILLISECONDS, useToastStore } from '@/data/stores/toast.store';
import {
  Toast,
  ToastActionElement,
  ToastClose,
  ToastDescription,
  ToastProps,
  ToastProvider as Toaster,
  ToastTitle,
  ToastViewport,
} from '@packages/ui/components';
import { useEffect } from 'react';

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

export default function ToastProvider() {
  const { state, actions } = useToastStore();

  useEffect(() => {
    const totalToasts = state.toasts.length;
    if (totalToasts > 0) {
      const lastToast = state.toasts[totalToasts - 1];
      setTimeout(() => {
        actions.closeToast(lastToast.id);
      }, TOAST_REMOVE_DELAY_IN_MILLISECONDS);
    }
  }, [state.toasts]);

  return (
    <Toaster>
      {state.toasts.map(function ({ id, title, description, action, ...props }: ToasterToast) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </Toaster>
  );
}
