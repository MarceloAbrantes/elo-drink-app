import { useModalStore } from '@/data/stores/modal.store';
import { Dialog, DialogContent } from '@packages/ui/components';

export interface ModalProps {
  id: string;
  isOpen: boolean;
  children: React.ReactNode;
  contentClassName?: string;
}
export default function Modals() {
  const { state, actions } = useModalStore();

  return (
    <>
      {state.modals.map((modal) => (
        <Dialog
          key={`modal-${modal.id}`}
          open={modal.isOpen}
          onOpenChange={() => actions.closeModal(modal.id)}
        >
          <DialogContent className={modal.contentClassName}>{modal.children}</DialogContent>
        </Dialog>
      ))}
    </>
  );
}
