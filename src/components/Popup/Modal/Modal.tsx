import Button from '~/components/Button';
import ModalWrapper from './ModalWrapper';
import { ChevronLeft } from 'lucide-react';
import { ChildNode } from '~/common/types';
import { useModalStore } from '~/hooks/useModalStore';
import { useEffect, useRef } from 'react';

export default function Modal({ children }: ChildNode) {
  const { closeModal } = useModalStore();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  return (
    <ModalWrapper>
      <div
        ref={modalRef}
        className="font-VNPro min-h-[100px] w-full max-w-sm overflow-hidden overflow-y-auto rounded-lg bg-gradient-to-r from-[#f3e9e8] to-[#96b9d9] px-2 py-3"
      >
        <Button
          className="text text-sm font-medium"
          leftIcon={<ChevronLeft className="h-4 w-4" />}
          onClick={closeModal}
        >
          Quay lại
        </Button>
        {children}
      </div>
    </ModalWrapper>
  );
}
