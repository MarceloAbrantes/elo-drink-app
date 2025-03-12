import { Button } from '@packages/ui/components';
import React from 'react';

interface ModalDeleteProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  isLoading?: boolean;
  onCancel?: () => void;
  onConfirm: () => void;
  textButtonConfirm?: string;
}

export function ModalConfirm({
  icon,
  title,
  message,
  isLoading,
  onCancel,
  onConfirm,
  textButtonConfirm,
}: ModalDeleteProps) {
  return (
    <div className="min-w-[400px] w-full max-w-[540px] h-full flex flex-col items-center justify-center gap-2 select-none">
      {icon}
      <label className="text-primary-600 text-2xl font-bold text-center">{title}</label>
      <label className="text-neutral-500 text-base font-normal text-center">{message}</label>

      <div className="flex flex-row justify-center items-center gap-4 mt-6 w-full">
        {onCancel && (
          <Button variant="ghost" className="w-full" onClick={() => onCancel()}>
            Cancelar
          </Button>
        )}
        <Button variant="default" isLoading={isLoading} className="w-full" onClick={onConfirm}>
          {textButtonConfirm}
        </Button>
      </div>
    </div>
  );
}
