import Button from '~/components/Button';
import ModalWrapper from './ModalWrapper';
import { useModalStore } from '~/hooks/useModalStore';

export default function Modal() {
  const { isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen) return;
  return (
    <ModalWrapper>
      <div className="flex w-full max-w-md justify-center rounded-lg bg-white p-6">
        <Button className="primary" onClick={closeModal}>
          Close Modal
        </Button>
      </div>
    </ModalWrapper>
  );
}
