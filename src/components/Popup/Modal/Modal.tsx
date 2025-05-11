import Button from '~/components/Button';
import ModalWrapper from './ModalWrapper';
import { ChevronLeft } from 'lucide-react';
import { IChildNode } from '~/common/types';
import { useCallback, useEffect, useRef } from 'react';
import { useAuthModal, useBookingModal } from '~/hooks/useModalStore';

export default function Modal({ children }: IChildNode) {
  const { closeAuthModal } = useAuthModal();
  const { setIsBookingModal } = useBookingModal();

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModalHandle = useCallback(() => {
    closeAuthModal();
    setIsBookingModal(false);
  }, [closeAuthModal, setIsBookingModal]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModalHandle();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, [closeModalHandle]);

  return (
    <ModalWrapper>
      <div
        ref={modalRef}
        className="font-VNPro min-h-[100px] w-full max-w-sm overflow-hidden overflow-y-auto rounded-lg bg-gradient-to-r from-[#f3e9e8] to-[#96b9d9] px-2 py-3"
      >
        <Button
          className="text text-sm font-medium"
          leftIcon={<ChevronLeft className="h-4 w-4" />}
          onClick={closeModalHandle}
        >
          Quay lại
        </Button>
        {children}
      </div>
    </ModalWrapper>
  );
}
